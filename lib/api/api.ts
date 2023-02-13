import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import {
  CfnDataSource,
  CfnGraphQLApi,
  CfnResolver,
} from "aws-cdk-lib/aws-appsync";
import { Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { Database } from "../database";

export class Api extends Construct {
  constructor(scope: Construct, id: string, database: Database) {
    super(scope, id);

    const httpApiHandler = new NodejsFunction(this, "http", {
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

    httpApiHandler.addToRolePolicy(policyStatement);

    const inlinePolicy = new Policy(this, id + "-policy", {
      statements: [policyStatement],
    });

    httpApiHandler.role?.attachInlinePolicy(inlinePolicy);

    new LambdaRestApi(this, `${id}-lambda-rest-api`, {
      handler: httpApiHandler,
    });

    const graphqlApiHandler = new NodejsFunction(this, "graphql");

    graphqlApiHandler.addToRolePolicy(policyStatement);

    graphqlApiHandler.role?.attachInlinePolicy(inlinePolicy);

    const graphQlApi = new CfnGraphQLApi(this, `${id}-appsync-graphql-api`, {
      authenticationType: "API_KEY",
      name: `${id}-appsync-graphql-api`,
    });

    const lambdaDataSource = new CfnDataSource(
      this,
      `${id}-appsync-graphql-api-lambda-data-source`,
      {
        apiId: graphQlApi.attrApiId,
        name: `${id}-appsync-graphql-api-lambda-data-source`,
        type: "AWS_LAMBDA",
        lambdaConfig: {
          lambdaFunctionArn: graphqlApiHandler.functionArn,
        },
      }
    );

    new CfnResolver(this, `${id}-appsync-graphql-api-edges-query-resolver`, {
      apiId: graphQlApi.attrApiId,
      dataSourceName: lambdaDataSource.name,
      fieldName: "edges",
      typeName: "Query",
    });

    new CfnResolver(this, `${id}-appsync-graphql-api-features-query-resolver`, {
      apiId: graphQlApi.attrApiId,
      dataSourceName: lambdaDataSource.name,
      fieldName: "features",
      typeName: "Query",
    });

    new CfnResolver(this, `${id}-appsync-graphql-api-nodes-query-resolver`, {
      apiId: graphQlApi.attrApiId,
      dataSourceName: lambdaDataSource.name,
      fieldName: "nodes",
      typeName: "Query",
    });

    new CfnResolver(
      this,
      `${id}-appsync-graphql-api-create-mutation-resolver`,
      {
        apiId: graphQlApi.attrApiId,
        dataSourceName: lambdaDataSource.name,
        fieldName: "nodes",
        typeName: "Query",
      }
    );

    new CfnResolver(
      this,
      `${id}-appsync-graphql-api-update-mutation-resolver`,
      {
        apiId: graphQlApi.attrApiId,
        dataSourceName: lambdaDataSource.name,
        fieldName: "nodes",
        typeName: "Query",
      }
    );
  }
}
