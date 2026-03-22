
import { useQuery } from "@apollo/client/react";
import { GET_GENERATIONS } from "../graphql/queries";

export default function GenerationSelect({value, onChange}){

    const { data, loading, error } = useQuery(GET_GENERATIONS);
    if (loading) return <p>Cargando generaciones...</p>;
    if (error) return <p>Error al cargar generaciones</p>;

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
                <option value="">Selecciona una Generacion</option>
                {data.generation.map((gen) => (
                    <option key={gen.id} value={gen.id}>
                        {gen.name.replace("generation-", "gen ").toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
    )
}