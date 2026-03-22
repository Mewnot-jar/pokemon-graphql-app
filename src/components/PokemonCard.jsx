const typeColors = {
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC",
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
};

export default function PokemonCard({ pokemon }) {
  const spriteRaw = pokemon.pokemonsprites?.[0]?.sprites;
  let image = "";

  try {
    const parsed = typeof spriteRaw === "string" ? JSON.parse(spriteRaw) : spriteRaw;
    image =
      parsed?.other?.["official-artwork"]?.front_default ||
      parsed?.front_default ||
      "";
  } catch {
    image = "";
  }

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "14px",
        padding: "16px",
        width: "220px",
        textAlign: "center",
        background: "#fff",
      }}
    >
      {image && (
        <img
          src={image}
          alt={pokemon.name}
          style={{ width: "120px", height: "120px", objectFit: "contain" }}
        />
      )}

      <h3 style={{ textTransform: "capitalize" }}>{pokemon.name}</h3>
      <p>Nro Pokedex: {pokemon.id}</p>
      {pokemon.pokemontypes.map((t) => {
        const typeName = t.type.name;
        const icon = `https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${typeName}.svg`;

        return (
          <div
            key={typeName}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: typeColors[typeName],
              color: "#fff",
              padding: "6px 10px",
              borderRadius: "8px",
              width: "fit-content",
            }}
          >
            <img src={icon} alt={typeName} width={20} style={{width: "14px", height: "14px"}}/>
            <span>{typeName.charAt(0).toUpperCase()+typeName.slice(1)}</span>
          </div>
        );
      })}

      {pokemon.height && <p>Altura: {pokemon.height}</p>}
      {pokemon.weight && <p>Peso: {pokemon.weight}</p>}
    </div>
  );
}