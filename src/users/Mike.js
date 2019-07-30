import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import basicUserDetails from './queries/fragments/basicUserDetails'
import QueryResult from '../lib/ui/QueryResult'

export default () => {
  const query = useQuery(gql`
    query {
      users_by_pk(id: 4) {
        ...UserBasic
      }
    }

    ${basicUserDetails}
  `)

  return <QueryResult {...query}>{data => JSON.stringify(data)}</QueryResult>
}
