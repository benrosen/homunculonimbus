import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";

exports.handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);

  console.log(`Context: ${JSON.stringify(context, null, 2)}`);

  return {
    statusCode: 501,
    body: "not implemented",
  };
};
