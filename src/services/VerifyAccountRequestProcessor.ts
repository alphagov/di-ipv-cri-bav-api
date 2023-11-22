import { Metrics, MetricUnits } from "@aws-lambda-powertools/metrics";
import { Logger } from "@aws-lambda-powertools/logger";
import { BavService } from "./BavService";
import { HmrcService } from "./HmrcService";
import { CopCheckResults } from "../models/enums/Hmrc";
import { HttpCodesEnum } from "../models/enums/HttpCodesEnum";
import { MessageCodes } from "../models/enums/MessageCodes";
import { HmrcVerifyResponse } from "../models/IHmrcResponse";
import { PersonIdentityItem } from "../models/PersonIdentityItem";
import { CopCheckResult, ISessionItem } from "../models/ISessionItem";
import { EnvironmentVariables } from "../utils/Constants";
import { createDynamoDbClient } from "../utils/DynamoDBFactory";
import { checkEnvironmentVariable } from "../utils/EnvironmentVariables";
import { getFullName } from "../utils/PersonIdentityUtils";
import { Response } from "../utils/Response";
import { VerifyAccountPayload } from "../type/VerifyAccountPayload";

export class VerifyAccountRequestProcessor {
  private static instance: VerifyAccountRequestProcessor;

  private readonly logger: Logger;

	private readonly personIdentityTableName: string;

  private readonly metrics: Metrics;

  private readonly BavService: BavService;
	
  private readonly HmrcService: HmrcService;

	private readonly hmrcToken: string;

	constructor(logger: Logger, metrics: Metrics, HMRC_TOKEN: string) {
  	this.logger = logger;
  	this.metrics = metrics;
  	logger.debug("metrics is  " + JSON.stringify(this.metrics));
  	this.metrics.addMetric("Called", MetricUnits.Count, 1);

  	const sessionTableName: string = checkEnvironmentVariable(EnvironmentVariables.SESSION_TABLE, this.logger);
  	this.personIdentityTableName = checkEnvironmentVariable(EnvironmentVariables.PERSON_IDENTITY_TABLE_NAME, this.logger);
  	const hmrcBaseUrl = checkEnvironmentVariable(EnvironmentVariables.HMRC_BASE_URL, this.logger);
  	this.hmrcToken = HMRC_TOKEN;

  	this.BavService = BavService.getInstance(sessionTableName, this.logger, createDynamoDbClient());
  	this.HmrcService = HmrcService.getInstance(this.logger, hmrcBaseUrl);
	}

	static getInstance(logger: Logger, metrics: Metrics, HMRC_TOKEN: string): VerifyAccountRequestProcessor {
  	if (!VerifyAccountRequestProcessor.instance) {
  		VerifyAccountRequestProcessor.instance = new VerifyAccountRequestProcessor(logger, metrics, HMRC_TOKEN);
  	}
  	return VerifyAccountRequestProcessor.instance;
	}

	async processRequest(sessionId: string, body: VerifyAccountPayload): Promise<Response> {
  	const { account_number: accountNumber, sort_code: sortCode } = body;
  	const paddedAccountNumber = accountNumber.padStart(8, "0");
  	const person: PersonIdentityItem | undefined = await this.BavService.getPersonIdentityById(sessionId, this.personIdentityTableName);
		const session: ISessionItem | undefined = await this.BavService.getSessionById(sessionId);

  	if (!person) {
  		this.logger.error("No person found for session id", {
  			messageCode: MessageCodes.PERSON_NOT_FOUND,
  		});
  		return new Response(HttpCodesEnum.UNAUTHORIZED, `No person found with the session id: ${sessionId}`);
  	}

  	if (!session) {
  		this.logger.error("No session found for session id", {
  			messageCode: MessageCodes.SESSION_NOT_FOUND,
  		});
  		return new Response(HttpCodesEnum.UNAUTHORIZED, `No session found with the session id: ${sessionId}`);
  	}

		this.logger.appendKeys({ govuk_signin_journey_id: session.clientSessionId });

  	await this.BavService.updateAccountDetails(sessionId, paddedAccountNumber, sortCode, this.personIdentityTableName);

  	const name = getFullName(person.name);
  	const verifyResponse = await this.HmrcService.verify({ accountNumber: paddedAccountNumber, sortCode, name }, this.hmrcToken);

  	const copCheckResult = this.calculateCopCheckResult(verifyResponse);
  	this.logger.debug(`copCheckResult is ${copCheckResult}`);

  	await this.BavService.saveCopCheckResult(sessionId, copCheckResult);

  	return new Response(HttpCodesEnum.OK, "Success");
	}

	calculateCopCheckResult(verifyResponse: HmrcVerifyResponse): CopCheckResult {
  	if (verifyResponse.nameMatches ===  "yes" && verifyResponse.accountExists === "yes") {
  		return CopCheckResults.FULL_MATCH;
  	} else if (verifyResponse.nameMatches ===  "partial" && verifyResponse.accountExists === "yes") {
  		return CopCheckResults.PARTIAL_MATCH;
  	} else {
  		return CopCheckResults.NO_MATCH;
  	}
	}
}