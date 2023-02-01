import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { BatchWriteCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { chunk } from "lodash";

export const deleteNode = async ({
  client,
  tableName,
  nodeId,
}: {
  client: DynamoDBClient;
  tableName: string;
  nodeId: string;
}) => {
  const nodeKey = `n#${nodeId}`;

  console.log(`Node Key: ${nodeKey}`);

  const queryPKCommand = new QueryCommand({
    TableName: tableName,
    KeyConditionExpression: "PK = :PK",
    ExpressionAttributeValues: {
      ":PK": nodeKey,
    },
  });

  console.log(`Query PK Command: ${JSON.stringify(queryPKCommand, null, 2)}`);

  const response = await client.send(queryPKCommand);

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
