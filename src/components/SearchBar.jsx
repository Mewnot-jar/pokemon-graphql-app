export default function SearchBar({value, onChange, onSearch}){
    return(
        <div style={{display: "flex", gap: "10px", marginBottom: "20px"}}>
            <input
                type="text"
                placeholder="Ej: Pikachu"
                value={value}
                onChange={(e)=> onChange(e.target.value)}
                style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    width: "220px"
                }}
            />
            <button onClick={onSearch}>Buscar</button>
        </div>
    )
}