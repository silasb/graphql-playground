import gql from "graphql-tag";

export default gql`
  fragment UserBasic on users {
    name
    team_name
  }
`;
