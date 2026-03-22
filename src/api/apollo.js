import { HttpLink } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";
import { ApolloClient } from "@apollo/client";


export const client = new ApolloClient({
    link: new HttpLink({
        uri: "https://graphql.pokeapi.co/v1beta2",
    }),
    cache: new InMemoryCache()
})