import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as createId } from "uuid";

export const createFeature = async ({
  client,
  tableName,
  key,
  value,
}: {
  client: DynamoDBDocumentClient;
  tableName: string;
  key: string;
  value: any;
}) => {
  const featureId = createId();

  console.log(`Feature ID: ${featureId}`);

  const featureKey = `f#${featureId}`;

  console.log(`Node Key: ${featureKey}`);

  const putCommand = new PutCommand({
    TableName: tableName,
    Item: {
      PK: featureKey,
      SK: featureKey,
      FK: key,
      FV: value,
    },
  });

  console.log(`Put Command: ${JSON.stringify(putCommand, null, 2)}`);

  const response = await client.send(putCommand);

  console.log(`Response: ${JSON.stringify(response, null, 2)}`);
};
