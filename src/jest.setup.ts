process.env.REGION = 'eu-west-2'
process.env.PERSON_IDENTITY_TABLE_NAME = 'PERSONALIDENTITYTABLE'
process.env.SESSION_TABLE = 'SESSIONTABLE'
process.env.TXMA_QUEUE_URL = "MYQUEUE"
process.env.KMS_KEY_ARN = 'MYKMSKEY'
process.env.DNSSUFFIX = "DNSSUFFIX"
process.env.AUTH_SESSION_TTL_SECS = '950400'
process.env.ISSUER = 'https://XXX-c.env.account.gov.uk'
process.env.ENCRYPTION_KEY_IDS = 'EncryptionKeyArn'
process.env.CLIENT_CONFIG = '[{"jwksEndpoint":"https://api.identity.account.gov.uk/.well-known/jwks.json","clientId":"ipv-core-stub","redirectUri":"http://localhost:8085/callback"}]'
process.env.HMRC_TOKEN_SSM_PATH = "/dev/HMRC/TOKEN"
process.env.HMRC_CLIENT_ID_SSM_PATH = '/dev/HMRC/CLIENT_ID'
process.env.HMRC_CLIENT_SECRET_SSM_PATH = '/dev/HMRC/CLIENT_SECRET'
process.env.PUBLIC_KEY_SSM_PATH = "dev/person-info/PUBLIC_KEY"
process.env.HMRC_BASE_URL = "https://hmrc"
process.env.HMRC_CLIENT_ID = "hmrc client ID"
process.env.HMRC_CLIENT_SECRET = "hmrc client secret"
process.env.HMRC_TOKEN_BACKOFF_PERIOD_MS = "2000"
process.env.HMRC_MAX_RETRIES = "3"
process.env.CREDENTIAL_VENDOR_SSM_PATH = "/dev/bav/vendor"
// pragma: allowlist secret
process.env.PRIVATE_KEY_SSM_PATH = "person-info/PRIVATE_KEY"
process.env.PARTIAL_MATCHES_QEUEUE_URL = "PARTIALMATCH_QUEUE"
process.env.EXPERIAN_TOKEN_TABLE = "experianTokenTable"
process.env.EXPERIAN_MAX_RETRIES = "2"
process.env.EXPERIAN_USERNAME_SSM_PATH = "username",
process.env.EXPERIAN_PASSWORD_SSM_PATH = "password",
process.env.EXPERIAN_CLIENT_ID_SSM_PATH = "id",
process.env.EXPERIAN_CLIENT_SECRET_SSM_PATH = "secret"
process.env.EXPERIAN_VERIFY_URL_SSM_PATH = "https://localhost/verify"
process.env.EXPERIAN_TOKEN_URL_SSM_PATH = "https://localhost/token"