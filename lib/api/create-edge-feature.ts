import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

export const createEdgeFeature = async ({
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

  const putCommand = new PutCommand({
    TableName: tableName,
    Item: {
      PK: edgeKey,
      SK: featureKey,
    },
  });

  console.log(`Put Command: ${JSON.stringify(putCommand, null, 2)}`);

  const response = await client.send(putCommand);

  console.log(`Response: ${JSON.stringify(response, null, 2)}`);
};
