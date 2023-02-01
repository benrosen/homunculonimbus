import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { Database } from "../database";

export class Api extends Construct {
  constructor(scope: Construct, id: string, database: Database) {
    super(scope, id);

    const handler = new NodejsFunction(this, "handler", {
      environment: {
        TABLE_NAME: database.tableName,
        INVERTED_INDEX_NAME: database.invertedIndexName,
      },
    });

    const policyStatement = new PolicyStatement({
      actions: [
        "dynamodb:BatchWriteItem",
        "dynamodb:PutItem",
        "dynamodb:DeleteItem",
        "dynamodb:Query",
        "dynamodb:UpdateItem",
      ],
      resources: [database.tableArn, database.invertedIndexArn],
    });

    handler.addToRolePolicy(policyStatement);

    handler.role?.attachInlinePolicy(
      new Policy(this, id + "-policy", {
        statements: [policyStatement],
      })
    );

    new LambdaRestApi(this, `${id}-lambda-rest-api`, {
      handler,
    });
  }
}
