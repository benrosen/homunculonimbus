import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import {
  CfnDataSource,
  CfnGraphQLApi,
  CfnGraphQLSchema,
  CfnResolver,
} from "aws-cdk-lib/aws-appsync";
import {
  Policy,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from "aws-cdk-lib/aws-iam";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { readFileSync } from "fs";
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

    const appSyncLambdaServiceRole = new Role(
      this,
      `${id}-appsync-lambda-service-role`,
      {
        assumedBy: new ServicePrincipal("appsync.amazonaws.com"),
      }
    );

    graphqlApiHandler.grantInvoke(appSyncLambdaServiceRole);

    const graphQlApi = new CfnGraphQLApi(this, `${id}-appsync-graphql-api`, {
      authenticationType: "API_KEY",
      name: `${id}-appsync-graphql-api`,
    });

    const lambdaDataSource = new CfnDataSource(
      this,
      `${id}-appsync-graphql-api-lambda-data-source`,
      {
        apiId: graphQlApi.attrApiId,
        name: `homunculonimbusLambdaDataSource`,
        type: "AWS_LAMBDA",
        lambdaConfig: {
          lambdaFunctionArn: graphqlApiHandler.functionArn,
        },
        serviceRoleArn: appSyncLambdaServiceRole.roleArn,
      }
    );

    const schema = readFileSync("./schema.graphql", { encoding: "utf-8" });

    console.log(`Schema: ${JSON.stringify(schema, null, 2)}`);

    const graphQLSchema = new CfnGraphQLSchema(
      this,
      `${id}-appsync-graphql-schema`,
      {
        apiId: graphQlApi.attrApiId,
        definition: schema,
      }
    );

    const edgesQueryResolver = new CfnResolver(
      this,
      `${id}-appsync-graphql-api-edges-query-resolver`,
      {
        apiId: graphQlApi.attrApiId,
        dataSourceName: lambdaDataSource.attrName,
        fieldName: "edges",
        typeName: "Query",
      }
    );

    edgesQueryResolver.addDependency(graphQLSchema);

    const featuresQueryResolver = new CfnResolver(
      this,
      `${id}-appsync-graphql-api-features-query-resolver`,
      {
        apiId: graphQlApi.attrApiId,
        dataSourceName: lambdaDataSource.attrName,
        fieldName: "features",
        typeName: "Query",
      }
    );

    featuresQueryResolver.addDependency(graphQLSchema);

    const nodesQueryResolver = new CfnResolver(
      this,
      `${id}-appsync-graphql-api-nodes-query-resolver`,
      {
        apiId: graphQlApi.attrApiId,
        dataSourceName: lambdaDataSource.attrName,
        fieldName: "nodes",
        typeName: "Query",
      }
    );

    nodesQueryResolver.addDependency(graphQLSchema);

    const createMutationResolver = new CfnResolver(
      this,
      `${id}-appsync-graphql-api-create-mutation-resolver`,
      {
        apiId: graphQlApi.attrApiId,
        dataSourceName: lambdaDataSource.attrName,
        fieldName: "create",
        typeName: "Mutation",
      }
    );

    createMutationResolver.addDependency(graphQLSchema);

    const deleteMutationResolver = new CfnResolver(
      this,
      `${id}-appsync-graphql-api-delete-mutation-resolver`,
      {
        apiId: graphQlApi.attrApiId,
        dataSourceName: lambdaDataSource.attrName,
        fieldName: "delete",
        typeName: "Mutation",
      }
    );

    deleteMutationResolver.addDependency(graphQLSchema);
  }
}
