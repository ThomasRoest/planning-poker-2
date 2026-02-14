
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "apollo-link-ws";

const wsLink = new WebSocketLink({
  uri: import.meta.env.VITE_API_URL,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        "X-Hasura-Role": "anonymous",
      },
    },
  },
});

export const createApolloClient = () => {
  return new ApolloClient({
    link: (wsLink as any),
    cache: new InMemoryCache(),
  });
};
