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
export const GET_POKEMON_BY_NUMBER = gql`
  query GetPokemonByName($id: Int!) {
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
