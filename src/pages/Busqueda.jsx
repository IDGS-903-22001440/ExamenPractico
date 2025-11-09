import { useState } from "react";
import { buscarParticipantes } from "../api/participantesApi";
import { useNavigate } from "react-router-dom";

export default function Busqueda() {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await buscarParticipantes(query);
    setResultados(data);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre, email, ocupación..."
          className="flex-1 border p-2 rounded"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Buscar
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {resultados.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/gafet/${p.id}`)}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md cursor-pointer"
          >
            <img src={`/avatars/${p.avatar}.png`} alt={p.nombre} className="w-20 h-20 rounded-full mx-auto" />
            <h3 className="text-lg font-semibold text-center">
              {p.nombre} {p.apellidos}
            </h3>
            <p className="text-center text-gray-500">{p.ocupacion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}