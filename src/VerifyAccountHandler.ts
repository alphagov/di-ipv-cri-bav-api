import { APIGatewayProxyEvent } from "aws-lambda";
import { LambdaInterface } from "@aws-lambda-powertools/commons";
import { Metrics } from "@aws-lambda-powertools/metrics";
import { Logger } from "@aws-lambda-powertools/logger";
import { Constants } from "./utils/Constants";
import { Response } from "./utils/Response";
import { MessageCodes } from "./models/enums/MessageCodes";
import { HttpCodesEnum } from "./models/enums/HttpCodesEnum";
import { VerifyAccountRequestProcessor } from "./services/VerifyAccountRequestProcessor";
import { VerifyAccountPayload } from "./type/VerifyAccountPayload";
import { AppError } from "./utils/AppError";
import { getSessionIdHeaderErrors } from "./utils/Validations";
import { getPayloadValidationErrors } from "./utils/VerifyAccountRequestValidation";

const { POWERTOOLS_METRICS_NAMESPACE = Constants.BAV_METRICS_NAMESPACE, POWERTOOLS_LOG_LEVEL = "DEBUG", POWERTOOLS_SERVICE_NAME = Constants.ACCESSTOKEN_LOGGER_SVC_NAME } = process.env;

const logger = new Logger({
	logLevel: POWERTOOLS_LOG_LEVEL,
	serviceName: POWERTOOLS_SERVICE_NAME,
});

const metrics = new Metrics({ namespace: POWERTOOLS_METRICS_NAMESPACE, serviceName: POWERTOOLS_SERVICE_NAME });

export class VerifyAccount implements LambdaInterface {

	// TODO
	// @metrics.logMetrics({ throwOnEmptyMetrics: false, captureColdStartMetric: true })

	handler(event: APIGatewayProxyEvent, context: any): Response | void {

		logger.setPersistentLogAttributes({});
		logger.addContext(context);

		const sessionIdError = getSessionIdHeaderErrors(event.headers);
		if (sessionIdError) {
			logger.error({ message: sessionIdError, messageCode: MessageCodes.INVALID_SESSION_ID });
			return new Response(HttpCodesEnum.BAD_REQUEST, sessionIdError);
		}

		if (!event.body) {
			const message = "Invalid request: missing body";
			logger.error({ message, messageCode: MessageCodes.INVALID_SESSION_ID });
			return new Response(HttpCodesEnum.UNAUTHORIZED, message);
		}

		const deserialisedRequestBody: VerifyAccountPayload = JSON.parse(event.body) as VerifyAccountPayload;
		const payloadError = getPayloadValidationErrors(deserialisedRequestBody);

		if (payloadError) {
			logger.error({ message: payloadError, messageCode: MessageCodes.INVALID_REQUEST_PAYLOAD });
			return new Response(HttpCodesEnum.UNAUTHORIZED, payloadError);
		}

		try {
			logger.info("Starting VerifyAccountRequestProcessor");
			VerifyAccountRequestProcessor.getInstance(logger, metrics).processRequest(event);
		} catch (error: any) {
			logger.error({ message: "An error has occurred.", error, messageCode: MessageCodes.SERVER_ERROR });
			if (error instanceof AppError) {
				return new Response(error.statusCode, error.message);
			}
			return new Response(HttpCodesEnum.SERVER_ERROR, "Server Error");
		}
	}
}

const handlerClass = new VerifyAccount();
export const lambdaHandler = handlerClass.handler.bind(handlerClass);