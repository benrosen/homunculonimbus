import gql from "graphql-tag";

export const interpretQueryString = ({
  queryString,
}: {
  queryString: string;
}) => {
  const ast = gql`
    ${queryString}
  `;
};
