import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
    uri: `https://strapixcloud2-pm4voc2waa-uc.a.run.app/graphql`,
    cache: new InMemoryCache(),
});
