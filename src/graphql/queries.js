import { gql } from "@apollo/client";

export const GET_POKEMON_LIST = gql`
  query GetPokemonList($limit: Int!, $offset: Int!) {
    pokemon(limit: $limit, offset: $offset, order_by: { id: asc }) {
      id
      name
      height
      weight
      pokemonsprites(limit: 1) {
        sprites
      }
      pokemontypes {
        type {
          name
        }
      }
    }
  }
`;

export const GET_POKEMON_BY_NAME = gql`
  query GetPokemonByName($name: String!) {
    pokemon(where: { name: { _eq: $name } }) {
      id
      name
      height
      weight
      pokemonsprites(limit: 1) {
        sprites
      }
      pokemontypes {
        type {
          name
        }
      }
    }
  }
`;
export const GET_POKEMON_BY_ID = gql`
  query GetPokemonById($id: Int!) {
    pokemon(where: { id: { _eq: $id } }) {
      id
      name
      height
      weight
      pokemonsprites(limit: 1) {
        sprites
      }
      pokemontypes {
        type {
          name
        }
      }
    }
  }
`;
export const GET_POKEMON_BY_TYPE = gql`
  query GetPokemonByType($limit: Int!, $offset: Int!, $type: String!) {
    pokemon(
      limit: $limit
      offset: $offset
      order_by: { id: asc }
      where: { pokemontypes: { type: { name: { _eq: $type } } } }
    ) {
      id
      name
      height
      weight
      pokemonsprites(limit: 1) {
        sprites
      }
      pokemontypes {
        type {
          name
        }
      }
    }
  }
`;
export const GET_POKEMON_BY_GENERATION = gql`
  query GetPokemonByGeneration($limit: Int!, $offset: Int!, $id: Int!) {
    pokemon(
      limit: $limit
      offset: $offset
      order_by: { id: asc }
      where: { pokemonspecy: { generation: { id: { _eq: $id } } } }
    ) {
      id
      name
      height
      weight
      pokemonsprites(limit: 1) {
        sprites
      }
      pokemontypes {
        type {
          name
        }
      }
    }
  }
`;
export const GET_GENERATIONS = gql`
  query GetGenerations{
    generation(order_by: {id: asc}) {
    id
    name
  }
  }
`;
export const GET_TYPES = gql`
  query GetTypes{
    type(order_by: {id: asc}, limit: 18) {
    id
    name
  }
  }
`;
