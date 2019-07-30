import gql from 'graphql-tag'
import basicUserDetails from './basicUserDetails'

export default friendsCondition => gql`
  fragment UserFilteredFriends on users {
    friends(where: { details: { ${friendsCondition} } }) {
      details {
        ...UserBasic
      }
    }
  }

  ${basicUserDetails}
`
