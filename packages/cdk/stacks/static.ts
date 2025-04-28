import {
  Stack,
  StackProps,
  CfnOutput,
  aws_s3 as S3,
  aws_cloudfront as CloudFront,
  aws_cloudfront_origins as Origins,
  aws_certificatemanager as Certificate,
  aws_route53_targets as targets,
  aws_iam as IAM,
  aws_route53 as route53,
} from "aws-cdk-lib";
import { Construct } from "constructs";

const SUBDOMAIN_ROOT = "example.library.com";

export class StaticStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    domains: string[],
    props: StackProps,
  ) {
    super(scope, id, props);

    const staticBucket = new S3.Bucket(this, `bucket-${id}`, {
      blockPublicAccess: S3.BlockPublicAccess.BLOCK_ALL,
      versioned: false,
    });

    const certificateUsEast1 = Certificate.Certificate.fromCertificateArn(
      this,
      "ssl-cert",
      "arn:aws:acm:us-east-1:211516352043:certificate/b115bf91-5f15-4e6c-bef1-c755ff57db37",
    );
    const staticDistro = new CloudFront.Distribution(this, `distro-${id}`, {
      certificate: certificateUsEast1,
      domainNames: [`${domains.join(".")}.${SUBDOMAIN_ROOT}`],
      webAclId: undefined,
      defaultBehavior: {
        origin: new Origins.S3Origin(staticBucket),
        viewerProtocolPolicy: CloudFront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      additionalBehaviors: undefined,
      defaultRootObject: "index.html",
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
        },
      ],
    });

    const frontendOriginID = new CloudFront.CfnCloudFrontOriginAccessIdentity(
      this,
      "store-origin",
      {
        cloudFrontOriginAccessIdentityConfig: {
          comment: "",
        },
      },
    );

    const frontendPolicy = new IAM.PolicyStatement({
      effect: IAM.Effect.ALLOW,
      actions: ["s3:ListBucket", "s3:GetObject"],
      resources: [staticBucket.bucketArn, staticBucket.arnForObjects("*")],
    });

    frontendPolicy.addCanonicalUserPrincipal(
      frontendOriginID.attrS3CanonicalUserId,
    );

    staticBucket.addToResourcePolicy(frontendPolicy);

    const zone = route53.HostedZone.fromLookup(this, "zone", {
      domainName: SUBDOMAIN_ROOT,
    });

    new route53.ARecord(this, `static-frontend-alias-${id}`, {
      zone,
      recordName: domains.join("."),
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(staticDistro),
      ),
    });

    new CfnOutput(this, `static-url-${id}`, {
      value: staticDistro.domainName,
    });

    new CfnOutput(this, `static-bucket-${id}`, {
      value: staticBucket.bucketArn,
    });

    new CfnOutput(this, `static-distro-id-${id}`, {
      value: staticDistro.distributionId,
    });

    new CfnOutput(this, `static-bucket-url-${id}`, {
      value: staticBucket.bucketName,
    });
  }
}
