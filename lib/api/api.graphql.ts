import { APIGatewayProxyResult, AppSyncResolverEvent } from "aws-lambda";
import gql from "graphql-tag";

// derive dynamodb commands from AST
// issue commands and collect responses
// apply postprocessing
// return response

exports.handler = async (
  event: AppSyncResolverEvent<any>
): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);

  const parentTypeName = event.info.parentTypeName;

  console.log(`Parent Type Name: ${parentTypeName}`);

  const fieldName = event.info.fieldName;

  console.log(`Field Name: ${fieldName}`);

  const propertyQuotationMarkMatcher = /"(?=.*:)/g;

  console.log(
    `Property Quotation Mark Matcher: ${propertyQuotationMarkMatcher}`
  );

  const requestArguments = JSON.stringify(event.arguments)
    .slice(1, -1)
    .replace(propertyQuotationMarkMatcher, "");

  console.log(`Arguments: ${requestArguments}`);

  const selection = event.info.selectionSetGraphQL;

  console.log(`Selection: ${selection}`);

  const reconstructedQueryString = `${parentTypeName.toLowerCase()} {
  ${fieldName}${requestArguments ? `(${requestArguments})` : ""} ${selection}
}`;

  console.log(
    `Reconstructed GraphQL Query String: ${reconstructedQueryString}`
  );

  const ast = gql`
    ${reconstructedQueryString}
  `;

  console.log(`AST: ${JSON.stringify(ast, null, 2)}`);

  return {
    statusCode: 501,
    body: "not implemented",
  };
};
