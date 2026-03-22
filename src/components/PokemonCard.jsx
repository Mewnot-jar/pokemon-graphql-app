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
      <p>ID: {pokemon.id}</p>
      {pokemon.pokemontypes && (
        <div>
          <strong>Tipos:</strong>
          <p>{pokemon.pokemontypes.map((t) => t.type.name).join(", ")}</p>
        </div>
      )}

      {pokemon.height && <p>Altura: {pokemon.height}</p>}
      {pokemon.weight && <p>Peso: {pokemon.weight}</p>}
    </div>
  );
}