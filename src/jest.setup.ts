process.env.REGION = 'eu-west-2'
process.env.PERSON_IDENTITY_TABLE_NAME = 'PERSONALIDENTITYTABLE'
process.env.SESSION_TABLE = 'SESSIONTABLE'
process.env.TXMA_QUEUE_URL = "MYQUEUE"
process.env.KMS_KEY_ARN = 'MYKMSKEY'
process.env.AUTH_SESSION_TTL_SECS = '950400'
process.env.ISSUER = 'https://XXX-c.env.account.gov.uk'
process.env.ENCRYPTION_KEY_IDS = 'EncryptionKeyArn'
process.env.CLIENT_CONFIG = '[{"jwksEndpoint":"https://api.identity.account.gov.uk/.well-known/jwks.json","clientId":"ipv-core-stub","redirectUri":"http://localhost:8085/callback"}]'
process.env.HMRC_BASE_URL = "https://hmrc"
process.env.HMRC_CLIENT_ID = "hmrc client ID"
process.env.HMRC_CLIENT_SECRET = "hmrc client secret"
