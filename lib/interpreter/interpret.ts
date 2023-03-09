import gql from "graphql-tag";

export const interpretQueryString = ({
  queryString,
}: {
  queryString: string;
}) => {
  return gql`
    ${queryString}
  `;
};
