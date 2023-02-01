import { ReturnValue } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

export const updateFeature = async ({
  client,
  tableName,
  featureId,
  key,
  value,
}: {
  client: DynamoDBDocumentClient;
  tableName: string;
  featureId: string;
  key: string;
  value: any;
}) => {
  const featureKey = `f#${featureId}`;

  console.log(`Feature Key: ${featureKey}`);

  const updateCommand = new UpdateCommand({
    TableName: tableName,
    Key: {
      PK: featureKey,
      SK: featureKey,
    },
    UpdateExpression: "set FK = :FK, FV = :FV",
    ExpressionAttributeValues: {
      ":FK": key,
      ":FV": value,
    },
    ReturnValues: ReturnValue.ALL_NEW,
  });

  console.log(`Update Command: ${JSON.stringify(updateCommand, null, 2)}`);

  const response = await client.send(updateCommand);

  console.log(`Response: ${JSON.stringify(response, null, 2)}`);
};
