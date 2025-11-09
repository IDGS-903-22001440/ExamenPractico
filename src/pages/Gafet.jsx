import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { obtenerParticipantePorId } from "../api/participantesApi";
import "../styles/Gafet.css";

export default function Gafet() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [flipped, setFlipped] = useState(false); // 🔹 Control del giro

  useEffect(() => {
    obtenerParticipantePorId(id)
      .then((data) => {
        console.log("Participante obtenido:", data);
        setP(data);
      })
      .catch((error) => console.error("Error cargando participante:", error));
  }, [id]);

  if (!p) return <p className="p-4 text-light">Cargando...</p>;

  return (
    <>
      <Navbar />
      <div className="bg-pattern min-vh-100 d-flex justify-content-center align-items-center py-5">
        <div className="gafet-container">
          {/* === Tarjeta que gira al hacer clic === */}
          <div
            className={`gafet-card ${flipped ? "is-flipped" : ""}`}
            onClick={() => setFlipped(!flipped)} // 🔹 Gira al hacer clic
          >
            {/* === Frente === */}
            <div className="gafet-face front text-center">
              <img
                src={`/avatars/${p.avatar}.png`}
                alt={p.nombre}
                className="avatar-img mb-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/avatars/default.png";
                }}
              />
              <h2 className="fw-bold text-dark">
                {p.nombre} {p.apellidos}
              </h2>
              <p className="text-muted">{p.ocupacion}</p>
            </div>

            {/* === Reverso === */}
            <div className="gafet-face back text-center">
              <img
                src="/public/screenshot/pqr.png"
                alt="Imagen posterior"
                className="back-img mb-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/public/screenshot/pqr.png";
                }}
              />
              <p className="text-dark fw-semibold">{p.email}</p>
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
      </div>
    </>
  );
}