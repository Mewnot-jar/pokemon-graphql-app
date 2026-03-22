import { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client/react";
import { GET_POKEMON_LIST, GET_POKEMON_BY_NAME } from "./graphql/queries";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";

export default function App() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedPokemon, setSearchedPokemon] = useState([]);
  const [isShowingSearch, setIsShowingSearch] = useState(false);

  const limit = 12;
  const offset = (currentPage - 1) * limit;

  const { loading, error, data } = useQuery(GET_POKEMON_LIST, {
    variables: { limit, offset },
  });

  const [getPokemonByName, { loading: searching, error: searchError }] =
  useLazyQuery(GET_POKEMON_BY_NAME, {
    fetchPolicy: "network-only",
  });

  const handleSearch = async () => {
  const trimmed = search.toLowerCase().trim();
  if (!trimmed) return;

  setIsShowingSearch(true);
  setSearchedPokemon([]);

  try {
    const result = await getPokemonByName({
      variables: { name: trimmed },
    });

    setSearchedPokemon(result.data?.pokemon || []);
  } catch (error) {
    setSearchedPokemon([]);
    console.error(error);
  }
};

  const handleClearSearch = () => {
    setSearch("");
    setSearchedPokemon([]);
    setIsShowingSearch(false);
  };

  const pokemons = isShowingSearch ? searchedPokemon : data?.pokemon || [];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        background: "#f5f5f5",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Pokedex con React + GraphQL</h1>

      <SearchBar
        value={search}
        onChange={setSearch}
        onSearch={handleSearch}
      />

      {isShowingSearch && (
        <button onClick={handleClearSearch} style={{ marginBottom: "20px" }}>
          Volver a la lista
        </button>
      )}

      {(loading || searching) && <p>Cargando...</p>}
      {error && <p>Error al cargar lista: {error.message}</p>}
      {searchError && <p>Error en búsqueda: {searchError.message}</p>}

      {!loading && !searching && isShowingSearch && searchedPokemon.length === 0 && !searchError && (
        <p>No se encontró ese Pokémon.</p>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {!isShowingSearch && (
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>

          <span>Pagina {currentPage}</span>

          <button onClick={() => setCurrentPage((prev) => prev + 1)}>
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}