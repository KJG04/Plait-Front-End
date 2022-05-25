import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";

const wsLink = process.browser
  ? new WebSocketLink(
      new SubscriptionClient("ws://localhost:8080/graphql", {
        reconnect: true,
      }),
    )
  : null;

const httplink = new HttpLink({
  uri: "http://localhost:8080/graphql",
  credentials: "include",
});

const link = process.browser
  ? split(
      //only create the split in the browser
      // split based on operation type
      ({ query }) => {
        const def = getMainDefinition(query);
        return (
          def.kind === "OperationDefinition" && def.operation === "subscription"
        );
      },
      wsLink as WebSocketLink,
      httplink,
    )
  : httplink;

const apolloClient = new ApolloClient({
  link,
  credentials: "include",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default apolloClient;
