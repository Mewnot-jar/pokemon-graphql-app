import { useQuery } from "@apollo/client/react";
import { GET_TYPES } from "../graphql/queries";
export default function TypeSelect({ value, onChange }) {
    const { data, loading, error } = useQuery(GET_TYPES);
    if (loading) return <p>Cargando Tipos...</p>;
    if (error) return <p>Error al cargar tipos</p>;
    return (
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
                {data.type.map((type) => (
                    <option key={type.id} value={type.name}>
                        {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    )
}