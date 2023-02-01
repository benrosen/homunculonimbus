import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

export const createNodeFeature = async ({
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

  const putCommand = new PutCommand({
    TableName: tableName,
    Item: {
      PK: nodeKey,
      SK: featureKey,
    },
  });

  console.log(`Put Command: ${JSON.stringify(putCommand, null, 2)}`);

  const response = await client.send(putCommand);

  console.log(`Response: ${JSON.stringify(response, null, 2)}`);
};
