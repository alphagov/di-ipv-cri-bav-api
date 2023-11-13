import { Metrics, MetricUnits } from "@aws-lambda-powertools/metrics";
import { Logger } from "@aws-lambda-powertools/logger";
import { BavService } from "./BavService";
import { HmrcService } from "./HmrcService";
import { HttpCodesEnum } from "../models/enums/HttpCodesEnum";
import { MessageCodes } from "../models/enums/MessageCodes";
import { EnvironmentVariables } from "../utils/Constants";
import { createDynamoDbClient } from "../utils/DynamoDBFactory";
import { checkEnvironmentVariable } from "../utils/EnvironmentVariables";
import { KmsJwtAdapter } from "../utils/KmsJwtAdapter";
import { getFullName } from "../utils/PersonIdentityUtils";
import { Response } from "../utils/Response";
import { VerifyAccountPayload } from "../type/VerifyAccountPayload";

export class VerifyAccountRequestProcessor {
  private static instance: VerifyAccountRequestProcessor;

  private readonly logger: Logger;

	private readonly issuer: string;

	private readonly personIdentityTableName: string;

  private readonly metrics: Metrics;

  private readonly BavService: BavService;
	
  private readonly HmrcService: HmrcService;

  private readonly kmsDecryptor: KmsJwtAdapter;

  constructor(logger: Logger, metrics: Metrics) {
  	this.logger = logger;
  	this.metrics = metrics;
  	logger.debug("metrics is  " + JSON.stringify(this.metrics));
  	this.metrics.addMetric("Called", MetricUnits.Count, 1);

  	const sessionTableName: string = checkEnvironmentVariable(EnvironmentVariables.SESSION_TABLE, this.logger);
  	this.personIdentityTableName = checkEnvironmentVariable(EnvironmentVariables.PERSON_IDENTITY_TABLE_NAME, this.logger);
  	const encryptionKeyIds: string = checkEnvironmentVariable(EnvironmentVariables.ENCRYPTION_KEY_IDS, this.logger);
  	this.issuer = checkEnvironmentVariable(EnvironmentVariables.ISSUER, this.logger);
  	const hmrcBaseUrl = checkEnvironmentVariable(EnvironmentVariables.HMRC_BASE_URL, this.logger);
  	const hmrcClientId = checkEnvironmentVariable(EnvironmentVariables.HMRC_CLIENT_ID, this.logger);
  	const hmrcClientSecret = checkEnvironmentVariable(EnvironmentVariables.HMRC_CLIENT_SECRET, this.logger);

  	this.BavService = BavService.getInstance(sessionTableName, this.logger, createDynamoDbClient());
  	this.HmrcService = HmrcService.getInstance(this.logger, hmrcBaseUrl, hmrcClientId, hmrcClientSecret);
  	this.kmsDecryptor = new KmsJwtAdapter(encryptionKeyIds);
  }

  static getInstance(logger: Logger, metrics: Metrics): VerifyAccountRequestProcessor {
  	if (!VerifyAccountRequestProcessor.instance) {
  		VerifyAccountRequestProcessor.instance = new VerifyAccountRequestProcessor(logger, metrics);
  	}
  	return VerifyAccountRequestProcessor.instance;
  }

  async processRequest(sessionId: string, body: VerifyAccountPayload): Promise<Response> {
  	const { account_number: accountNumber, sort_code: sortCode } = body;
  	const person  = await this.BavService.getPersonIdentityById(sessionId, this.personIdentityTableName);

  	if (!person) {
  		this.logger.error("No person found for session id", {
  			messageCode: MessageCodes.SESSION_NOT_FOUND,
  		});
  		return new Response(HttpCodesEnum.UNAUTHORIZED, `No person found with the session id: ${sessionId}`);
  	}

  	await this.BavService.updateAccountDetails(sessionId, accountNumber, sortCode, this.personIdentityTableName);

  	const name = getFullName(person.name);
  	const verifyResponse = await this.HmrcService.verify({ accountNumber, sortCode, name });
  	// Save cop result to session table
  	// Update session state

  	const session = await this.BavService.getSessionById(sessionId);

  	if (!session) {
  		this.logger.error("No session found for session id", {
  			messageCode: MessageCodes.SESSION_NOT_FOUND,
  		});
  		return new Response(HttpCodesEnum.UNAUTHORIZED, `No session found with the session id: ${sessionId}`);
  	}

  	this.logger.info("found the session yay");

  	// Respond appropriately
  	return new Response(HttpCodesEnum.OK, "Success");
  }
}