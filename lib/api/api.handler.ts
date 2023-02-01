import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { createEdge } from "./create-edge";
import { createEdgeFeature } from "./create-edge-feature";
import { createFeature } from "./create-feature";
import { createNode } from "./create-node";
import { createNodeFeature } from "./create-node-feature";
import { deleteEdge } from "./delete-edge";
import { deleteEdgeFeature } from "./delete-edge-feature";
import { deleteFeature } from "./delete-feature";
import { deleteNode } from "./delete-node";
import { deleteNodeFeature } from "./delete-node-feature";
import { updateFeature } from "./update-feature";

const dynamoDbClient = new DynamoDBClient({
  region: "us-east-1",
});

exports.handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);

  console.log(`Context: ${JSON.stringify(context, null, 2)}`);

  const tableName = process.env.TABLE_NAME as string;

  console.log(`Table Name: ${tableName}`);

  const invertedIndexName = process.env.INVERTED_INDEX_NAME as string;

  console.log(`Inverted Index Name: ${invertedIndexName}`);

  const { httpMethod, path, body, queryStringParameters } = event;

  console.log(`HTTP Method: ${httpMethod}`);

  console.log(`Resource: ${path}`);

  console.log(`Body: ${body}`);

  console.log(`Query String Parameters: ${queryStringParameters}`);

  if (path === "/edge") {
    if (httpMethod === "POST") {
      const json = JSON.parse(body ?? "{}");

      console.log(`JSON: ${JSON.stringify(json, null, 2)}`);

      const firstNodeId = json.firstNodeId;

      console.log(`First Node ID: ${firstNodeId}`);

      if (!firstNodeId) {
        return {
          statusCode: 404,
          body: `The body of your request must contain a "firstNodeId" key with a corresponding string value.`,
        };
      }

      const secondNodeId = json.secondNodeId;

      console.log(`Second Node ID: ${secondNodeId}`);

      if (!secondNodeId) {
        return {
          statusCode: 404,
          body: `The body of your request must contain a "secondNodeId" key with a corresponding string value.`,
        };
      }

      const response = await createEdge({
        client: dynamoDbClient,
        tableName,
        firstNodeId,
        secondNodeId,
      });

      console.log(`Create Edge Response: ${JSON.stringify(response, null, 2)}`);

      return {
        statusCode: 201,
        body: "edge created",
      };
    } else if (httpMethod === "DELETE") {
      const edgeId = queryStringParameters?.edgeId;

      console.log(`Edge ID: ${edgeId}`);

      if (!edgeId) {
        return {
          statusCode: 404,
          body: `Your request must contain a query string parameter named "edgeId" with a corresponding string value.`,
        };
      }

      const response = await deleteEdge({
        client: dynamoDbClient,
        tableName,
        edgeId,
        invertedIndexName,
      });

      console.log(`Response: ${JSON.stringify(response, null, 2)}`);

      return {
        statusCode: 200,
        body: "edge deleted",
      };
    } else {
      return {
        statusCode: 405,
        body: `${httpMethod} is not a supported HTTP method for the "edge" path. Please choose one of the following supported HTTP method types for your next request: "CREATE"; "DELETE".`,
      };
    }
  } else if (path === "/edgeFeature") {
    if (httpMethod === "POST") {
      const json = JSON.parse(body ?? "null");

      console.log(`JSON: ${JSON.stringify(json, null, 2)}`);

      const edgeId = json.edgeId;

      console.log(`Edge ID: ${edgeId}`);

      if (!edgeId) {
        return {
          statusCode: 404,
          body: `The body of your request must contain an "edgeId" key with a corresponding string value.`,
        };
      }

      const featureId = json.featureId;

      console.log(`Feature ID: ${featureId}`);

      if (!featureId) {
        return {
          statusCode: 404,
          body: `The body of your request must contain a "featureId" key with a corresponding string value.`,
        };
      }

      const response = await createEdgeFeature({
        client: dynamoDbClient,
        tableName,
        edgeId,
        featureId,
      });

      console.log(
        `Create EdgeFeature Response: ${JSON.stringify(response, null, 2)}`
      );

      return {
        statusCode: 201,
        body: "edgeFeature created",
      };
    } else if (httpMethod === "DELETE") {
      const edgeId = queryStringParameters?.edgeId;

      console.log(`Edge ID: ${edgeId}`);

      if (!edgeId) {
        return {
          statusCode: 404,
          body: `Your request must contain a query string parameter named "edgeId" with a corresponding string value.`,
        };
      }

      const featureId = queryStringParameters?.featureId;

      console.log(`Feature ID: ${featureId}`);

      if (!featureId) {
        return {
          statusCode: 404,
          body: `Your request must contain a query string parameter named "featureId" with a corresponding string value.`,
        };
      }

      const response = await deleteEdgeFeature({
        client: dynamoDbClient,
        tableName,
        edgeId,
        featureId,
      });

      console.log(`Response: ${JSON.stringify(response, null, 2)}`);

      return {
        statusCode: 200,
        body: "edgeFeature deleted",
      };
    } else {
      return {
        statusCode: 405,
        body: `${httpMethod} is not a supported HTTP method for the "edgeFeature" path. Please choose one of the following supported HTTP method types for your next request: "CREATE"; "DELETE".`,
      };
    }
  } else if (path === "/feature") {
    if (httpMethod === "POST") {
      const json = JSON.parse(body ?? "null");

      console.log(`JSON: ${JSON.stringify(json, null, 2)}`);

      const key = json.key;

      console.log(`JSON: ${key}`);

      if (!key) {
        return {
          statusCode: 404,
          body: `Your request must contain a query string parameter named "key" with a corresponding string value.`,
        };
      }

      const value = json.value;

      console.log(`JSON: ${value}`);

      if (!value) {
        return {
          statusCode: 404,
          body: `Your request must contain a query string parameter named "value" with a corresponding value.`,
        };
      }

      const response = await createFeature({
        client: dynamoDbClient,
        tableName,
        key,
        value,
      });

      console.log(
        `Create EdgeFeature Response: ${JSON.stringify(response, null, 2)}`
      );

      return {
        statusCode: 201,
        body: "feature created",
      };
    } else if (httpMethod === "DELETE") {
      const featureId = queryStringParameters?.featureId;

      console.log(`Feature ID: ${featureId}`);

      if (!featureId) {
        return {
          statusCode: 404,
          body: `Your request must contain a query string parameter named "featureId" with a corresponding string value.`,
        };
      }

      const response = await deleteFeature({
        client: dynamoDbClient,
        tableName,
        featureId,
        indexName: invertedIndexName,
      });

      console.log(`Response: ${JSON.stringify(response, null, 2)}`);

      return {
        statusCode: 200,
        body: "feature deleted",
      };
    } else if (httpMethod === "PUT") {
      const json = JSON.parse(body ?? "null");

      console.log(`JSON: ${JSON.stringify(json, null, 2)}`);

      const featureId = queryStringParameters?.featureId;

      console.log(`Feature ID: ${featureId}`);

      if (!featureId) {
        return {
          statusCode: 404,
          body: `Your request must contain a query string parameter named "featureId" with a corresponding string value.`,
        };
      }

      const key = json.key;

      console.log(`JSON: ${key}`);

      if (!key) {
        return {
          statusCode: 404,
          body: `Your request must contain a query string parameter named "key" with a corresponding string value.`,
        };
      }

      const value = json.value;

      console.log(`JSON: ${value}`);

      if (!value) {
        return {
          statusCode: 404,
          body: `Your request must contain a query string parameter named "value" with a corresponding value.`,
        };
      }

      const response = await updateFeature({
        client: dynamoDbClient,
        tableName,
        featureId,
        key,
        value,
      });

      console.log(
        `Update Feature Response: ${JSON.stringify(response, null, 2)}`
      );

      return {
        statusCode: 200,
        body: "feature updated",
      };
    } else {
      return {
        statusCode: 405,
        body: `${httpMethod} is not a supported HTTP method for the "feature" path. Please choose one of the following supported HTTP method types for your next request: "CREATE"; "DELETE".`,
      };
    }
  } else if (path === "/node") {
    if (httpMethod === "POST") {
      const response = await createNode({
        client: dynamoDbClient,
        tableName,
      });

      console.log(`Create Node Response: ${JSON.stringify(response, null, 2)}`);

      return {
        statusCode: 201,
        body: "node created",
      };
    } else if (httpMethod === "DELETE") {
      const nodeId = queryStringParameters?.nodeId;

      console.log(`Node ID: ${nodeId}`);

      if (!nodeId) {
        return {
          statusCode: 404,
          body: `Your request must contain a query string parameter named "nodeId" with a corresponding string value.`,
        };
      }

      const response = await deleteNode({
        client: dynamoDbClient,
        tableName,
        nodeId,
      });

      console.log(`Response: ${JSON.stringify(response, null, 2)}`);

      return {
        statusCode: 200,
        body: "node deleted",
      };
    } else {
      return {
        statusCode: 405,
        body: `${httpMethod} is not a supported HTTP method for the "node" path. Please choose one of the following supported HTTP method types for your next request: "CREATE"; "DELETE".`,
      };
    }
  } else if (path === "/nodeFeature") {
    if (httpMethod === "POST") {
      const json = JSON.parse(body ?? "null");

      console.log(`JSON: ${JSON.stringify(json, null, 2)}`);

      const nodeId = json.nodeId;

      console.log(`Node ID: ${nodeId}`);

      if (!nodeId) {
        return {
          statusCode: 404,
          body: `The body of your request must contain an "nodeId" key with a corresponding string value.`,
        };
      }

      const featureId = json.featureId;

      console.log(`Feature ID: ${featureId}`);

      if (!featureId) {
        return {
          statusCode: 404,
          body: `The body of your request must contain a "featureId" key with a corresponding string value.`,
        };
      }

      const response = await createNodeFeature({
        client: dynamoDbClient,
        tableName,
        nodeId,
        featureId,
      });

      console.log(
        `Create NodeFeature Response: ${JSON.stringify(response, null, 2)}`
      );

      return {
        statusCode: 201,
        body: "nodeFeature created",
      };
    } else if (httpMethod === "DELETE") {
      const nodeId = queryStringParameters?.nodeId;

      console.log(`Node ID: ${nodeId}`);

      if (!nodeId) {
        return {
          statusCode: 404,
          body: `Your request must contain a query string parameter named "nodeId" with a corresponding string value.`,
        };
      }

      const featureId = queryStringParameters?.featureId;

      console.log(`Feature ID: ${featureId}`);

      if (!featureId) {
        return {
          statusCode: 404,
          body: `Your request must contain a query string parameter named "featureId" with a corresponding string value.`,
        };
      }

      const response = await deleteNodeFeature({
        client: dynamoDbClient,
        tableName,
        nodeId,
        featureId,
      });

      console.log(`Response: ${JSON.stringify(response, null, 2)}`);

      return {
        statusCode: 200,
        body: "nodeFeature deleted",
      };
    } else {
      return {
        statusCode: 405,
        body: `${httpMethod} is not a supported HTTP method for the "nodeFeature" path. Please choose one of the following supported HTTP method types for your next request: "CREATE"; "DELETE".`,
      };
    }
  } else {
    return {
      statusCode: 404,
      body: `"${path}" is not a supported resource type. Please choose one of the following supported resource types for your next request: "edge"; "edgeFeature"; "feature"; "node"; "nodeFeature".`,
    };
  }

  return {
    statusCode: 500,
    body: "The server has encountered a situation it does not know how to handle.",
  };
};
