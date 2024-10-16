export enum MessageCodes {
	SERVER_ERROR = "SERVER_ERROR",
	MISSING_CONFIGURATION = "MISSING_CONFIGURATION",
	INVALID_AUTH_CODE = "INVALID_AUTH_CODE",
	SESSION_NOT_FOUND = "SESSION_NOT_FOUND",
	PERSON_NOT_FOUND = "PERSON_NOT_FOUND",
	UNRECOGNISED_CLIENT = "UNRECOGNISED_CLIENT",
	FAILED_DECRYPTING_JWE = "FAILED_DECRYPTING_JWE",
	FAILED_DECODING_JWT = "FAILED_DECODING_JWT",
	FAILED_VERIFYING_JWT = "FAILED_VERIFYING_JWT",
	FAILED_VALIDATING_JWT = "FAILED_VALIDATING_JWT",
	FAILED_CREATING_SESSION = "FAILED_CREATING_SESSION",
	FAILED_SAVING_PERSON_IDENTITY = "FAILED_SAVING_PERSON_IDENTITY",
	FAILED_FETCHING_PERSON_IDENTITY = "FAILED_FETCHING_PERSON_IDENTITY",
	FAILED_TO_WRITE_TXMA = "FAILED_TO_WRITE_TXMA",
	FAILED_TO_WRITE_PARTIAL_NAME_INFO = "FAILED_TO_WRITE_PARTIAL_NAME_INFO",
	FAILED_VERIFYING_ACOUNT = "FAILED_VERIFYING_ACOUNT",
	FAILED_FETCHING_SESSION = "FAILED_FETCHING_SESSION",
	INVALID_PERSONAL_DETAILS = "INVALID_PERSONAL_DETAILS",
	EXPIRED_SESSION = "EXPIRED_SESSION",
	MISSING_HEADER = "MISSING_HEADER",
	INVALID_SESSION_ID = "INVALID_SESSION_ID",
	INVALID_REQUEST_PAYLOAD = "INVALID_REQUEST_PAYLOAD",
	INCORRECT_SESSION_STATE = "INCORRECT_SESSION_STATE",
	FAILED_SAVING_AUTH_CODE = "FAILED_SAVING_AUTH_CODE",
	FAILED_VALIDATING_REQUEST_BODY = "FAILED_VALIDATING_REQUEST_BODY",
	FAILED_FETCHING_SESSION_BY_AUTH_CODE = "FAILED_FETCHING_SESSION_BY_AUTH_CODE",
	FAILED_UPDATING_SESSION = "FAILED_UPDATING_SESSION",
	FAILED_UPDATING_PERSON_IDENTITY = "FAILED_UPDATING_PERSON_IDENTITY",
	FAILED_SIGNING_JWT = "FAILED_SIGNING_JWT",
	ERROR_SIGNING_VC = "ERROR_SIGNING_VC",
	MISSING_PERSONAL_DETAILS = "MISSING_PERSONAL_DETAILS",
	FAILED_GENERATING_HMRC_TOKEN = "FAILED_GENERATING_HMRC_TOKEN",
	FAILED_FETCHING_EXPERIAN_TOKEN = "FAILED_FETCHING_EXPERIAN_TOKEN",
	FAILED_GENERATING_EXPERIAN_TOKEN = "FAILED_GENERATING_EXPERIAN_TOKEN",
	NO_VERIFY_RESPONSE = "NO_VERIFY_RESPONSE",
	TOO_MANY_RETRIES = "TOO_MANY_RETRIES",
}
