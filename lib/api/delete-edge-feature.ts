import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export const deleteEdgeFeature = async ({
  client,
  tableName,
  edgeId,
  featureId,
}: {
  client: DynamoDBDocumentClient;
  tableName: string;
  edgeId: string;
  featureId: string;
}) => {
  const edgeKey = `e#${edgeId}`;

  console.log(`Edge Key: ${edgeKey}`);

  const featureKey = `f#${featureId}`;

  console.log(`Feature Key: ${featureKey}`);

  const deleteCommand = new DeleteCommand({
    TableName: tableName,
    Key: {
      PK: edgeKey,
      SK: featureKey,
    },
  });

  console.log(`Delete Command: ${JSON.stringify(deleteCommand, null, 2)}`);

  const response = await client.send(deleteCommand);

  console.log(`Response: ${JSON.stringify(response, null, 2)}`);
};
