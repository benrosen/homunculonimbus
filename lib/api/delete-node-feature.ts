import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export const deleteNodeFeature = async ({
  client,
  tableName,
  nodeId,
  featureId,
}: {
  client: DynamoDBDocumentClient;
  tableName: string;
  nodeId: string;
  featureId: string;
}) => {
  const nodeKey = `n#${nodeId}`;

  console.log(`Node Key: ${nodeKey}`);

  const featureKey = `f#${featureId}`;

  console.log(`Feature Key: ${featureKey}`);

  const deleteCommand = new DeleteCommand({
    TableName: tableName,
    Key: {
      PK: nodeKey,
      SK: featureKey,
    },
  });

  console.log(`Delete Command: ${JSON.stringify(deleteCommand, null, 2)}`);

  const response = await client.send(deleteCommand);

  console.log(`Response: ${JSON.stringify(response, null, 2)}`);
};
