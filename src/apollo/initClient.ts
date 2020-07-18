import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { from } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { authenticate } from "../lib/authenticate";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  const { token } = authenticate();
  return { headers: { ...headers, "x-shared-secret": token } };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.error(
        `[GraphQL error]: ${
          extensions?.code ? `Code: ${extensions.code}` : ""
        } Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) console.error(`[Network error]: ${networkError}`);
});

export const initClient = () =>
  new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
  });
