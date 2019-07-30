import gql from 'graphql-tag'

export default gql`
  fragment UserBasic on users {
    id
    name
    team_name
  }
`
