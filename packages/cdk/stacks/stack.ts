import path from "path";
import {
  Stack,
  StackProps,
  aws_lambda as Lambda,
  Duration,
  CfnOutput,
  aws_apigateway as apigateway,
} from "aws-cdk-lib";
import { Construct } from "constructs";

export type PikkuKirjastoEnvironment = "dev" | "prod";
export const PIKKURKIRJASTO = "Pikkukirjasto";

interface ICreateDescription {
  env: PikkuKirjastoEnvironment;
  description: string;
}

function createDescription({ env, description }: ICreateDescription) {
  return `${description}:${env}`;
}

export class PikkuKirjastoStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    env: PikkuKirjastoEnvironment,
    props?: StackProps
  ) {
    super(scope, id, props);

    const backendLambda = new Lambda.Function(this, "BackendLambda", {
      runtime: Lambda.Runtime.NODEJS_18_X,
      handler: "main.handler",
      layers: [],
      code: Lambda.Code.fromAsset(
        path.resolve(__dirname, "../../../apps/server/dist"),
        {
          exclude: ["node_modules"],
        }
      ),
      timeout: Duration.seconds(15),
    });

    // api gateway
    const api = new apigateway.LambdaRestApi(this, `${PIKKURKIRJASTO}-api`, {
      handler: backendLambda,
      description: createDescription({
        env,
        description: "Pikkukirjasto API",
      }),
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowCredentials: true,
        allowHeaders: [
          "Content-Type",
          "authorization",
          "x-amz-date",
          "x-amz-security-token",
        ],
      },
      endpointConfiguration: { types: [apigateway.EndpointType.REGIONAL] },
      proxy: false,
      cloudWatchRole: false,
    });

    const backendIntegration = new apigateway.LambdaIntegration(backendLambda, {
      contentHandling: apigateway.ContentHandling.CONVERT_TO_BINARY,
    });

    api.root.addResource("{proxy+}").addMethod("ANY", backendIntegration, {
      authorizationType: apigateway.AuthorizationType.NONE,
    });

    // outputs
    new CfnOutput(this, "backendLambdaArn", {
      value: backendLambda.functionArn,
      exportName: `${props?.stackName ?? id}:backendLambdaArn`,
    });
  }
}
