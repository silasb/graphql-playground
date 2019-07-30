import { HttpLink } from 'apollo-link-http'

export default new HttpLink({
  uri: 'http://localhost:8080/v1/graphql',
})
