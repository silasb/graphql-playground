import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import getSchemaLink from './getSchemaLink'
import counterLink from './counterLink'

export default async () => {
  const httpLink = await getSchemaLink()

  const wsLink = new WebSocketLink({
    uri: 'ws://localhost:8080/v1/graphql',
    options: {
      reconnect: true,
    },
  })

  const terminatingLink = split(
    ({ query: { definitions } }) =>
      definitions.some(node => {
        const { kind, operation } = node
        return kind === 'OperationDefinition' && operation === 'subscription'
      }),
    wsLink,
    httpLink,
  )

  const link = ApolloLink.from([counterLink, terminatingLink])

  const queryRedirects = {}

  Object.entries(httpLink.schema._queryType._fields).forEach(([key, val]) => {
    const __typename = val.type.name
    if (val.type.name)
      queryRedirects[key] = (first, args, { getCacheKey, ...other }) =>
        getCacheKey({ __typename, id: args.id })
  })

  return new ApolloClient({
    cache: new InMemoryCache({
      //dataIdFromObject: object => object.id,
      cacheRedirects: {
        Query: queryRedirects,
      },
    }),
    link,
  })
}
