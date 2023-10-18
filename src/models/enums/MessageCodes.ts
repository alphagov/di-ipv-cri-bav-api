export enum MessageCodes {
	SERVER_ERROR = "SERVER_ERROR",
	MISSING_CONFIGURATION = "MISSING_CONFIGURATION",
	INVALID_AUTH_CODE = "INVALID_AUTH_CODE",
	SESSION_NOT_FOUND = "SESSION_NOT_FOUND",
	SESSION_EXPIRED = "SESSION_EXPIRED",
	UNRECOGNISED_CLIENT = "UNRECOGNISED_CLIENT",
	FAILED_DECRYPTING_JWE = "FAILED_DECRYPTING_JWE",
	FAILED_DECODING_JWT = "FAILED_DECODING_JWT",
	FAILED_VERIFYING_JWT = "FAILED_VERIFYING_JWT",
	FAILED_VALIDATING_JWT = "FAILED_VALIDATING_JWT",
	FAILED_CREATING_SESSION = "FAILED_CREATING_SESSION",
	FAILED_SAVING_PERSON_IDENTITY = "FAILED_SAVING_PERSON_IDENTITY",
	FAILED_TO_WRITE_TXMA = "FAILED_TO_WRITE_TXMA",
	FAILED_FETCHING_SESSION = "FAILED_FETCHING_SESSION",
	INVALID_PERSONAL_DETAILS = "INVALID_PERSONAL_DETAILS",
	EXPIRED_SESSION = "EXPIRED_SESSION",
}