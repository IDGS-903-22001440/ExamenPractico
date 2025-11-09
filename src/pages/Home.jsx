import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css"; // opcional: asegúrate de tener body, html al 100%

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column min-vh-100 bg-pattern"
      style={{ minHeight: "100vh", overflowX: "hidden" }}
    >
      {/* === SECCIÓN DE LOGOS === */}
      <div className="container py-4">
        <div className="row justify-content-center align-items-center text-center g-4">
          <div className="col-6 col-md-4 col-lg-3">
            <img
              src="/public/icons/logoutl.png"
              alt="Logo 1"
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: "200px", objectFit: "contain" }}
            />
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <img
              src="/icons/logotics.png"
              alt="Logo 2"
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: "200px", objectFit: "contain" }}
            />
          </div>
        </div>
      </div>

      {/* === CONTENIDO PRINCIPAL === */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center text-center px-3">
        <div
          className="bg-dark shadow-lg rounded-4 p-5 w-100 border-0"
          style={{
            maxWidth: "650px",
            minHeight: "300px",
          }}
        >
          <h1
            className="fw-bold mb-3"
            style={{
              color: "#0d6efd",
              fontSize: "2rem",
              letterSpacing: "0.5px",
            }}
          >
            Bienvenido al Sistema de Registro
          </h1>

          <p
            className="text-secondary mb-4"
            style={{
              fontSize: "1.05rem",
              lineHeight: "1.7",
              maxWidth: "550px",
              margin: "0 auto",
            }}
          >
            Accede a nuestra plataforma oficial para el{" "}
            <strong>Evento Internacional de Innovación y Tecnología</strong>.  
            Registra tu participación, gestiona tus datos y obtén tu credencial digital de acceso.
          </p>

          <button
            onClick={() => navigate("/participantes")}
            className="btn btn-gradient btn-lg px-5 py-3 fw-semibold shadow-sm"
          >
            Ingresar al Sistema
          </button>
        </div>
      </div>

      {/* === PIE DE PÁGINA === */}
      <footer className="text-center py-3 bg-dark text-white mt-auto">
        <small>
          © {new Date().getFullYear()} Evento Internacional — Todos los derechos
          reservados.
        </small>
      </footer>
    </div>
  );
}