import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  obtenerParticipantes,
  buscarParticipantes,
} from "../api/participantesApi";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Participantes.css"; // agregaremos estilos aquí

export default function Participantes() {
  const [participantes, setParticipantes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const fetchParticipantes = async (query = "") => {
    setLoading(true);
    try {
      const data = query
        ? await buscarParticipantes(query)
        : await obtenerParticipantes();
      setParticipantes(data);
    } catch (err) {
      console.error("Error al cargar participantes:", err);
      setParticipantes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const term = searchParams.get("search") || "";
    setSearch(term);
    fetchParticipantes(term);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setSearchParams(value ? { search: value } : {});
    fetchParticipantes(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams(search ? { search } : {});
    fetchParticipantes(search);
  };

  return (
    <>
      <Navbar />
      <div className="bg-pattern min-vh-100 py-5">
        <div className="container text-center">
          {/* === TÍTULO Y BOTONES === */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
            <h1 className="fw-bold text-primary mb-3 mb-md-0">
              Lista de Participantes
            </h1>
            <button
              onClick={() => navigate("/registro")}
              className="btn btn-gradient px-4 py-2 fw-semibold shadow-sm"
            >
              + Registrar Nuevo
            </button>
          </div>

          {/* === BUSCADOR === */}
          <form
            onSubmit={handleSearchSubmit}
            className="d-flex flex-column flex-md-row gap-2 justify-content-center mb-5"
          >
            <input
              type="text"
              placeholder="Buscar por nombre, correo o usuario de Twitter..."
              value={search}
              onChange={handleSearchChange}
              className="form-control form-control-lg w-100 w-md-50 shadow-sm"
              style={{ maxWidth: "600px", borderRadius: "12px" }}
            />
            <button
              type="submit"
              className="btn btn-gradient btn-lg px-4 rounded-3 shadow-sm"
            >
              Buscar
            </button>
          </form>

          {/* === LISTADO DE PARTICIPANTES === */}
          {loading ? (
            <div className="text-white-50">Cargando participantes...</div>
          ) : participantes.length === 0 ? (
            <p className="text-muted">No se encontraron participantes.</p>
          ) : (
            <div className="row justify-content-center g-4">
              {participantes.map((p) => (
                <div
                  key={p.id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                  onClick={() => navigate(`/gafet/${p.id}`)}
                >
                  <div className="card participant-card h-100 border-0 shadow-sm">
                    <div className="card-body text-center">
                      <img
                        src={`/avatars/${p.avatar}.png`}
                        alt={`${p.nombre} ${p.apellidos}`}
                        className="rounded-circle mb-3"
                        style={{
                          width: "90px",
                          height: "90px",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/avatars/default.png";
                        }}
                      />
                      <h5 className="card-title fw-bold text-dark">
                        {p.nombre} {p.apellidos}
                      </h5>
                      <p className="text-muted mb-1">{p.ocupacion}</p>
                      {p.usuarioTwitter ? (
                          <a
                            href={`https://twitter.com/${p.usuarioTwitter.replace(/^@/, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="small mb-0 text-decoration-none hover-link"
                          >
                            @{p.usuarioTwitter}
                          </a>
                        ) : (
                          <p className="text-secondary small mb-0">—</p>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}