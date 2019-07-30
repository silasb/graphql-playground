import gql from 'graphql-tag'
import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import UserList from './UserList'
import QueryResult from '../lib/ui/QueryResult'
import basicUserDetails from './queries/fragments/basicUserDetails'
import filteredFriends from './queries/fragments/filteredFriends'

const ConnectedUserList = ({ friendsCondition = '', usersCondition = '' }) => {
  const query = useQuery(gql`
    query {
      users(where: { ${usersCondition} }) {
        ...UserBasic
        ...UserFilteredFriends
      }
    }

    ${basicUserDetails}
    ${filteredFriends(friendsCondition)}
  `)

  return (
    <QueryResult {...query}>
      {({ users = [] }) => <UserList users={users} />}
    </QueryResult>
  )
}

export default ConnectedUserList
