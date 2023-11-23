import { Constants } from "../../../utils/Constants";

export const VALID_ABORT = {
	httpMethod: "POST",
	body: JSON.stringify({ "reason": "session_expired" }),
	headers: { [Constants.X_SESSION_ID]: "732075c8-08e6-4b25-ad5b-d6cb865a18e5" },
	isBase64Encoded: false,
	multiValueHeaders: {},
	multiValueQueryStringParameters: {},
	path: "/abort",
	pathParameters: {},
	queryStringParameters: {},
	requestContext: {
		accountId: "",
		apiId: "",
		authorizer: {},
		httpMethod: "post",
		identity: {
			accessKey: "",
			accountId: "",
			apiKey: "",
			apiKeyId: "",
			caller: "",
			clientCert: {
				clientCertPem: "",
				issuerDN: "",
				serialNumber: "",
				subjectDN: "",
				validity: { notAfter: "", notBefore: "" },
			},
			cognitoAuthenticationProvider: "",
			cognitoAuthenticationType: "",
			cognitoIdentityId: "",
			cognitoIdentityPoolId: "",
			principalOrgId: "",
			sourceIp: "",
			user: "",
			userAgent: "",
			userArn: "",
		},
		path: "/abort",
		protocol: "HTTP/1.1",
		requestId: "c6af9ac6-7b61-11e6-9a41-93e8deadbeef",
		requestTimeEpoch: 1428582896000,
		resourceId: "123456",
		resourcePath: "/abort",
		stage: "dev",
	},
	resource: "/abort",
	stageVariables: {},
};
