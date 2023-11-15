import { Template, Match } from "@aws-cdk/assertions";
import { testHelper } from "../../lib/test-helper";

const helper = new testHelper();

it("Should contain only one Api Gateway V2 resource definition", () => {
  helper.getTemplate().resourceCountIs("AWS::ApiGatewayV2::Api", 1);
})

describe("Outbound Proxy Api Gateway Integration URLs", () => {
  test.each`
    ENVIRONMENT      | HMRCURL                                              | PRETTYPROXYURL
    ${"dev"}         | ${"https://api.isc.externaltest.tax.service.gov.uk"} | ${"proxy.review-bav.dev.account.gov.uk"}
    ${"build"}       | ${"https://api.isc.externaltest.tax.service.gov.uk"} | ${"proxy.review-bav.build.account.gov.uk"}
    ${"staging"}     | ${"https://api.isc.externaltest.tax.service.gov.uk"} | ${"proxy.review-bav.staging.account.gov.uk"}
    ${"integration"} | ${"https://api.isc.externaltest.tax.service.gov.uk"} | ${"proxy.review-bav.integration.account.gov.uk"}
    ${"production"}  | ${"https://api.isc.externaltest.tax.service.gov.uk"} | ${"proxy.review-bav.account.gov.uk"}
  `(
    `HTTP proxy integration with proxied URIs for $ENVIRONMENT have correct values`,
    ({ ENVIRONMENT, POSTOFFICEURL, YOTIURL, PRETTYPROXYURL }) => {
      const mappings = helper
        .getTemplate()
        .findMappings("EnvironmentVariables");
      expect(mappings.EnvironmentVariables[ENVIRONMENT].POSTOFFICEURL).toBe(POSTOFFICEURL)
      expect(mappings.EnvironmentVariables[ENVIRONMENT].YOTIURL).toBe(YOTIURL)
      expect(mappings.EnvironmentVariables[ENVIRONMENT].PRETTYPROXYURL).toBe(PRETTYPROXYURL)
    }
  );
})

it("The Outbound Proxy Api Gateway integration type http proxy", () => {
  expect_proxy(helper.getTemplate());
})

it("The Outbound Proxy Api Gateway route any method under /postoffice - proxy", () => {
  expect_route_postoffice(helper.getTemplate());
})

it("The Outbound Proxy Api Gateway route any method under /yoti - proxy", () => {
  expect_route_yoti(helper.getTemplate());
})

it("The Outbound Proxy API should contain default stage with this specification", () => {
  expect_default_stage(helper.getTemplate());
})

it("The API Gateway should contain associated access log", () => {
  expect_associated_access_log(helper.getTemplate());
})

const expect_proxy = (template: Template) => {
  template.hasResourceProperties("AWS::ApiGatewayV2::Integration", {
    IntegrationType: "HTTP_PROXY",
    IntegrationMethod: "ANY",
  });
}

const expect_route_postoffice = (template: Template) => {
  template.hasResourceProperties("AWS::ApiGatewayV2::Route", {
    ApiId: { Ref: "OutboundProxyApiGatewayAPI" },
    RouteKey: "ANY /postoffice/{proxy+}",
    Target: Match.objectLike({
      "Fn::Join": [
        "/",
        ["integrations", { Ref: "PostOfficeProxyApiGatewayIntegration" }],
      ],
    }),
  });
}

const expect_route_yoti = (template: Template) => {
  template.hasResourceProperties("AWS::ApiGatewayV2::Route", {
    ApiId: { Ref: "OutboundProxyApiGatewayAPI" },
    RouteKey: "ANY /yoti/{proxy+}",
    Target: Match.objectLike({
      "Fn::Join": [
        "/",
        ["integrations", { Ref: "YotiProxyApiGatewayIntegration" }],
      ],
    }),
  });
}

const expect_default_stage = (template: Template) => {
  template.hasResourceProperties("AWS::ApiGatewayV2::Stage", {
    ApiId: Match.objectLike({ Ref: "OutboundProxyApiGatewayAPI" }),
    StageName: "$default",
    AutoDeploy: true,
    DefaultRouteSettings: {
      DataTraceEnabled: false,
      DetailedMetricsEnabled: true,
      ThrottlingBurstLimit: 400,
      ThrottlingRateLimit: 200,
    },
  });
}

const expect_associated_access_log = (template: Template) => {
  template.hasResourceProperties("AWS::Logs::LogGroup", {
    LogGroupName: Match.objectLike({
      "Fn::Sub":
        "/aws/apigateway/outbound-proxy-${Environment}-${AWS::StackName}-APIGW-Access-Log",
    }),
    RetentionInDays: 7,
  });
}
