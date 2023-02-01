import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { BatchWriteCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { chunk } from "lodash";

export const deleteFeature = async ({
  client,
  tableName,
  featureId,
  indexName,
}: {
  client: DynamoDBClient;
  tableName: string;
  featureId: string;
  indexName: string;
}) => {
  const feature = `f#${featureId}`;

  console.log(`Feature Key: ${feature}`);

  const querySKCommand = new QueryCommand({
    TableName: tableName,
    IndexName: indexName,
    KeyConditionExpression: "SK = :SK",
    ExpressionAttributeValues: {
      ":SK": feature,
    },
  });

  console.log(`Query SK Command: ${JSON.stringify(querySKCommand, null, 2)}`);

  const response = await client.send(querySKCommand);

  console.log(`Responses: ${response}`);

  const queryResponseItems = response.Items ?? [];

  console.log(`Query Response Items: ${queryResponseItems}`);

  if (queryResponseItems?.length > 0) {
    const chunks = chunk(queryResponseItems, 25);

    console.log(`Chunks: ${chunks}`);

    const batchedRequests = chunks.map(async (chunk) => {
      const deleteRequests = chunk.map((item) => {
        return {
          DeleteRequest: {
            Key: {
              PK: item.PK,
              SK: item.SK,
            },
          },
        };
      });

      console.log(
        `Delete Requests: ${JSON.stringify(deleteRequests, null, 2)}`
      );

      const batchWriteCommand = new BatchWriteCommand({
        RequestItems: {
          [tableName]: deleteRequests,
        },
      });

      console.log(
        `Batch Write Command: ${JSON.stringify(batchWriteCommand, null, 2)}`
      );

      await client.send(batchWriteCommand);
    });

    console.log(`Batched Requests: ${batchedRequests}`);

    await Promise.all(batchedRequests);
  }
};
