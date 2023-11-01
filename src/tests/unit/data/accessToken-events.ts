import { randomUUID } from "crypto";

const AUTHORIZATION_CODE = randomUUID();
const ENCODED_REDIRECT_URI = encodeURIComponent("http://localhost:8085/callback");
export const VALID_ACCESSTOKEN = {
	body:`code=${AUTHORIZATION_CODE}&grant_type=authorization_code&redirect_uri=${ENCODED_REDIRECT_URI}`,
	httpMethod: "POST",
	headers: {},
	isBase64Encoded: false,
	multiValueHeaders: {},
	multiValueQueryStringParameters: {},
	pathParameters: {},
	queryStringParameters: {},
	path: "/token",
	requestContext:{
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
		path: "/token",
		protocol: "HTTP/1.1",
		requestId: "ba9b369a-ab98-11ed-afa1-0242ac120002",
		requestTimeEpoch: 1428582896000,
		resourceId: "123456",
		resourcePath: "/token",
		stage: "dev",
	},
	resource: "/token",
	stageVariables: {},
};

export const MISSING_BODY_ACCESSTOKEN = {
	body:"",
	httpMethod: "POST",
	headers: {},
	isBase64Encoded: false,
	multiValueHeaders: {},
	multiValueQueryStringParameters: {},
	pathParameters: {},
	queryStringParameters: {},
	path: "/token",
	requestContext:{
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
		path: "/token",
		protocol: "HTTP/1.1",
		requestId: "ba9b369a-ab98-11ed-afa1-0242ac120002",
		requestTimeEpoch: 1428582896000,
		resourceId: "123456",
		resourcePath: "/token",
		stage: "dev",
	},
	resource: "/token",
	stageVariables: {},
};

