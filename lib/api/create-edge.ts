import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as createId } from "uuid";

export const createEdge = async ({
  client,
  tableName,
  firstNodeId,
  secondNodeId,
}: {
  client: DynamoDBClient;
  tableName: string;
  firstNodeId: string;
  secondNodeId: string;
}) => {
  const edgeId = createId();

  console.log(`Edge ID: ${edgeId}`);

  const edgeKey = `e#${edgeId}`;

  console.log(`Edge Key: ${edgeKey}`);

  const firstNodeKey = `n#${firstNodeId}`;

  console.log(`First Node Key: ${firstNodeKey}`);

  const secondNodeKey = `n#${secondNodeId}`;

  console.log(`Second Node Key: ${secondNodeKey}`);

  const batchWriteCommand = new BatchWriteCommand({
    RequestItems: {
      [tableName]: [
        {
          PutRequest: {
            Item: {
              PK: edgeKey,
              SK: edgeKey,
            },
          },
        },
        {
          PutRequest: {
            Item: {
              PK: firstNodeKey,
              SK: edgeKey,
            },
          },
        },
        {
          PutRequest: {
            Item: {
              PK: secondNodeKey,
              SK: edgeKey,
            },
          },
        },
      ],
    },
  });

  console.log(
    `Batch Write Command: ${JSON.stringify(batchWriteCommand, null, 2)}`
  );

  const response = await client.send(batchWriteCommand);

  console.log(`Response: ${JSON.stringify(response, null, 2)}`);
};
