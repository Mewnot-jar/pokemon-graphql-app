export default function SearchModeSelector({searchMode, onChange}){
    return(
        <div style={{ marginBottom: "16px" }}>
            <p style={{ marginBottom: "8px", fontWeight: "bold" }}>
                Buscar por:
            </p>
            <div>
                <label>
                    <input 
                        type="radio" 
                        name="searchMode"
                        value="name"
                        checked={searchMode === "name"}
                        onChange={(e)=>onChange(e.target.value)}
                    />
                    {" "}Nombre
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="searchMode"
                        value="pokedexNumber"
                        checked={searchMode === "pokedexNumber"}
                        onChange={(e)=>onChange(e.target.value)}
                    />
                    {" "}Nro Pokedex
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="searchMode"
                        value="type"
                        checked={searchMode === "type"}
                        onChange={(e)=>onChange(e.target.value)}
                    />
                    {" "}Tipo
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="searchMode"
                        value="generation"
                        checked={searchMode === "generation"}
                        onChange={(e)=>onChange(e.target.value)}
                    />
                    {" "}Generacion
                </label>
            </div>
        </div>
    )
}