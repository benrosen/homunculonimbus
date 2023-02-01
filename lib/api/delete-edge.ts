import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { BatchWriteCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { chunk, isEqual, uniqWith } from "lodash";

export const deleteEdge = async ({
  client,
  tableName,
  edgeId,
  invertedIndexName,
}: {
  client: DynamoDBClient;
  tableName: string;
  edgeId: string;
  invertedIndexName: string;
}) => {
  const edgeKey = `e#${edgeId}`;

  console.log(`Edge Key: ${edgeKey}`);

  const queryPKCommand = new QueryCommand({
    TableName: tableName,
    KeyConditionExpression: "PK = :PK",
    ExpressionAttributeValues: {
      ":PK": edgeKey,
    },
  });

  console.log(`Query PK Command: ${JSON.stringify(queryPKCommand, null, 2)}`);

  const querySKCommand = new QueryCommand({
    TableName: tableName,
    IndexName: invertedIndexName,
    KeyConditionExpression: "SK = :SK",
    ExpressionAttributeValues: {
      ":SK": edgeKey,
    },
  });

  console.log(`Query SK Command: ${JSON.stringify(querySKCommand, null, 2)}`);

  const responses = await Promise.all([
    client.send(queryPKCommand),
    client.send(querySKCommand),
  ]);

  console.log(`Responses: ${JSON.stringify(responses, null, 2)}`);

  const queryResponseItems = responses.flatMap((response) => {
    return response.Items ?? [];
  });

  console.log(
    `Query Response Items: ${JSON.stringify(queryResponseItems, null, 2)}`
  );

  const deduplicatedResponseItems = uniqWith(queryResponseItems, isEqual);

  console.log(
    `De-duplicated Response Items: ${JSON.stringify(
      deduplicatedResponseItems,
      null,
      2
    )}`
  );

  if (deduplicatedResponseItems?.length > 0) {
    const chunks = chunk(deduplicatedResponseItems, 25);

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
