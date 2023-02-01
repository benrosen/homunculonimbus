import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as createId } from "uuid";

export const createNode = async ({
  client,
  tableName,
}: {
  client: DynamoDBDocumentClient;
  tableName: string;
}) => {
  const nodeId = createId();

  console.log(`Node ID: ${nodeId}`);

  const nodeKey = `n#${nodeId}`;

  console.log(`Node Key: ${nodeKey}`);

  const putCommand = new PutCommand({
    TableName: tableName,
    Item: {
      PK: nodeKey,
      SK: nodeKey,
    },
  });

  console.log(`Put Command: ${JSON.stringify(putCommand, null, 2)}`);

  const response = await client.send(putCommand);

  console.log(`Response: ${JSON.stringify(response, null, 2)}`);
};
