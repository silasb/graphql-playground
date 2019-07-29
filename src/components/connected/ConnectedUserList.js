import gql from "graphql-tag";
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import UserList from "../ui/UserList";
import QueryResult from "../lib/QueryResult";
import basicUserDetails from "../../graphql/fragments/basicUserDetails";
import filteredFriends from "../../graphql/fragments/filteredFriends";

const ConnectedUserList = ({ friendsCondition = "", usersCondition = "" }) => {
  const query = useQuery(gql`
    query {
      users(where: { ${usersCondition} }) {
        ...UserBasic
        ...UserFilteredFriends      
      }
    }

    ${basicUserDetails}
    ${filteredFriends(friendsCondition)}
  `);

  return (
    <QueryResult {...query}>
      {({ users = [] }) => <UserList users={users} />}
    </QueryResult>
  );
};

export default ConnectedUserList;
