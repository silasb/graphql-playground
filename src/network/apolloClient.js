import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";

const httpLink = new HttpLink({
  uri: "http://localhost:8080/v1/graphql"
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:8080/v1/graphql",
  options: {
    reconnect: true
  }
});

const terminatingLink = split(
  ({ query: { definitions } }) =>
    definitions.some(node => {
      const { kind, operation } = node;
      return kind === "OperationDefinition" && operation === "subscription";
    }),
  wsLink,
  httpLink
);

const link = ApolloLink.from([terminatingLink]);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default apolloClient;
