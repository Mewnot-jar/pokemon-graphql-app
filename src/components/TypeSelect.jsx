const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

export default function TypeSelect({value, onChange}){
    return(
        <div style={{ marginBottom: "20px" }}>
            <select 
                value={value} 
                onChange={(e) => onChange(e.target.value)}
                style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    width: "220px",
                }}
            >
                <option value="">Selecciona un tipo</option>
                {POKEMON_TYPES.map((type) => (
                    <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    )
}