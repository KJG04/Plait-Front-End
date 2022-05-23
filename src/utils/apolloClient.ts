import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const link = createHttpLink({
  uri: "http://localhost:8080/graphql",
  credentials: "include",
});

const apolloClient = new ApolloClient({
  link,
  credentials: "include",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default apolloClient;
