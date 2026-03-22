import { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client/react";
import { GET_POKEMON_LIST, GET_POKEMON_BY_NAME, GET_POKEMON_BY_ID, GET_POKEMON_BY_TYPE, GET_POKEMON_BY_GENERATION } from "./graphql/queries";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";
import SearchModeSelector from "./components/SearchModeSelector";
import TypeSelect from "./components/TypeSelect";
import GenerationSelect from "./components/GenerationSelect";

export default function App() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedPokemon, setSearchedPokemon] = useState([]);
  const [isShowingSearch, setIsShowingSearch] = useState(false);
  const [searchMode, setSearchMode] = useState("name");

  const limit = 12;
  const offset = (currentPage - 1) * limit;

  const { loading, error, data } = useQuery(GET_POKEMON_LIST, {
    variables: { limit, offset },
  });

  const [getPokemonByName, { loading: searching, error: searchError }] =
    useLazyQuery(GET_POKEMON_BY_NAME, {
      fetchPolicy: "network-only",
  });
  const [getPokemonById, { loading: searchingById, error: searchByIdError }] =
    useLazyQuery(GET_POKEMON_BY_ID, {
      fetchPolicy: "network-only",
  });
  const [getPokemonByType, { loading: searchingByType, error: searchByTypeError }] =
    useLazyQuery(GET_POKEMON_BY_TYPE, {
      fetchPolicy: "network-only",
  });
  const [getPokemonByGeneration, { loading: searchingByGeneration, error: searchByGeneration }] =
    useLazyQuery(GET_POKEMON_BY_GENERATION, {
      fetchPolicy: "network-only",
  });

  const isSearching = searching || searchingById || searchingByType || searchingByGeneration;
  const currentSearchError = searchError || searchByIdError || searchByTypeError || searchByGeneration;
  
  const fetchPokemonByType = async (typeValue, page = currentPage) => {
    const pageOffset = (page - 1) * limit
    try{
      const result = await getPokemonByType({
        variables: {
          type: typeValue.toLowerCase().trim(),
          limit,
          offset: pageOffset,
        },
      })
      setSearchedPokemon(result.data?.pokemon || [])
    }catch(error){
      setSearchedPokemon([])
      console.log(error)
    }
  }

  const fetchPokemonByGeneration = async (generationValue, page = currentPage) => {
    const pageOffset = (page - 1) * limit
    try{
      const result = await getPokemonByGeneration({
        variables: {
          id: generationValue,
          limit,
          offset: pageOffset,
        },
      })
      setSearchedPokemon(result.data?.pokemon || [])
    }catch(error){
      setSearchedPokemon([])
      console.log(error)
    }
  }

  const handleSearch = async () => {
    const trimmed = search.toLowerCase().trim();
    if (!trimmed) return;

    setIsShowingSearch(true);
    setSearchedPokemon([]);

    try {
      if(searchMode === "name"){
        const result = await getPokemonByName({
          variables: { name: trimmed },
        });
        setSearchedPokemon(result.data?.pokemon || []);
        return;
      }
      if(searchMode === "pokedexNumber"){
        const pokemonId = Number(trimmed);
        if(Number.isNaN(pokemonId) || pokemonId <= 0){
          setSearchedPokemon([])
          return;
        }
        const result = await getPokemonById({
          variables: {id: pokemonId},
        })
        setSearchedPokemon(result.data?.pokemon || []);
        return;
      }
      if(searchMode === "type"){
        setCurrentPage(1)
        await fetchPokemonByType(trimmed, 1)
        return  
      }
      if(searchMode === "generation"){
        setCurrentPage(1)
        await fetchPokemonByGeneration(trimmed, 1)
        return  
      }
      alert("Ese criterio de busqueda aun no esta implementado")
      setSearchedPokemon([])
    } catch (error) {
      setSearchedPokemon([]);
      console.error(error);
    }
  };
  const handleClearFilters = () => {
  setSearch("");
  setSearchMode("name"); // opcional, puedes dejar el modo actual si quieres
  setSearchedPokemon([]);
  setIsShowingSearch(false);
  setCurrentPage(1);
};

  const handleChangeSearchMode = (mode) => {
    setSearchMode(mode)
    setSearch("")
    setSearchedPokemon([])
    setIsShowingSearch(false)
    setCurrentPage(1)
  }

  const getPlaceholder = () => {
    if (searchMode === "name") return "Ej: pikachu";
    if (searchMode === "pokedexNumber") return "Ej: 25";
    if (searchMode === "generation") return "Ej: 1";
    return "";
  };

  const isTypeSearch = isShowingSearch && searchMode === "type";
  const isGenerationSearch = isShowingSearch && searchMode === "generation";
  const showPagination = !isShowingSearch || isTypeSearch || isGenerationSearch;
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

      <SearchModeSelector
        searchMode={searchMode}
        onChange={handleChangeSearchMode}
      />

      {searchMode === "type" ? (
        <div>
          <TypeSelect value={search} onChange={setSearch}/>
          <button onClick={handleSearch}>Buscar</button>
        </div>
      ): searchMode === "generation" ?(
        <div>
          <GenerationSelect value={search} onChange={setSearch}/>
          <button onClick={handleSearch}>Buscar</button>
        </div>
      ):(
        <SearchBar
          value={search}
          onChange={setSearch}
          onSearch={handleSearch}
          placeholder={getPlaceholder()}
        />
      )}

      
      
      {isShowingSearch &&(
        <button onClick={handleClearFilters} style={{ marginBottom: "20px" }}>
          Limpiar Filtro
        </button>
      )}

      {(loading || isSearching) && <p>Cargando...</p>}
      {error && <p>Error al cargar lista: {error.message}</p>}
      {currentSearchError && <p>Error en búsqueda: {currentSearchError.message}</p>}

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

      {showPagination &&(
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            onClick={async () => {
              const newPage = Math.max(currentPage - 1, 1)
              setCurrentPage(newPage)
              if(isShowingSearch && searchMode === "type"){
                await fetchPokemonByType(search, newPage)
              }
              if(isShowingSearch && searchMode === "generation"){
                await fetchPokemonByGeneration(search, newPage)
              }
            }}
            disabled={currentPage === 1}
          >
            Anterior
          </button>

          <span>Pagina {currentPage}</span>

          <button onClick={async () => {
            const newPage = currentPage + 1
            setCurrentPage(newPage)
            if(isShowingSearch && searchMode === "type"){
              await fetchPokemonByType(search, newPage)
            }
            if(isShowingSearch && searchMode === "generation"){
              await fetchPokemonByGeneration(search, newPage)
            }
          }}>
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}