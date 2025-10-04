// src/services/graphql/GraphQLClient.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { GRAPHQL_URL } from "@/config/env";
import fetch from "cross-fetch";

// Apollo client with lightweight cache (network is authoritative)
export const apollo = new ApolloClient({
  link: new HttpLink({ uri: GRAPHQL_URL, fetch }),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
