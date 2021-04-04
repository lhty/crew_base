import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import * as me from "../graphql/queries/me.graphql";

export default async (apolloClient: ApolloClient<NormalizedCacheObject>) => {
  return apolloClient
    .query({
      query: me,
    })
    .then(({ data }) => {
      return { user: data.whoAmI.user, jwt: data.whoAmI.jwt };
    })
    .catch(e => {
      // Fail gracefully
      return { user: undefined, jwt: "" };
    });
};
