import { useState } from "react";
import { crearParticipante } from "../api/participantesApi";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Participantes.css"; // reutilizamos los mismos estilos

export default function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    usuarioTwitter: "",
    ocupacion: "",
    avatar: "avatar1",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await crearParticipante(form);
    navigate("/participantes");
  };

  return (
    <>
      <Navbar />
      <div className="bg-pattern min-vh-100 position-relative">
        <div
          className="registro-card position-absolute top-50 start-50 translate-middle w-100"
          style={{ maxWidth: "500px" }}
        >
          <h2 className="text-center fw-bold mb-4 text-dark">
            Registrar Participante
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              name="nombre"
              placeholder="Nombre"
              onChange={handleChange}
              className="form-control form-control-lg rounded-3 shadow-sm mb-3"
            />
            <input
              name="apellidos"
              placeholder="Apellidos"
              onChange={handleChange}
              className="form-control form-control-lg rounded-3 shadow-sm mb-3"
            />
            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="form-control form-control-lg rounded-3 shadow-sm mb-3"
            />
            <input
              name="usuarioTwitter"
              placeholder="Usuario de Twitter"
              onChange={handleChange}
              className="form-control form-control-lg rounded-3 shadow-sm mb-3"
            />
            <input
              name="ocupacion"
              placeholder="Ocupación"
              onChange={handleChange}
              className="form-control form-control-lg rounded-3 shadow-sm mb-4"
            />

            {/* Avatares */}
            <div className="d-flex justify-content-center gap-4 mb-4">
              {["avatar1", "avatar2", "avatar3"].map((a) => (
                <label
                  key={a}
                  className={`avatar-option ${
                    form.avatar === a ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="avatar"
                    value={a}
                    checked={form.avatar === a}
                    onChange={handleChange}
                  />
                  <img
                    src={`/avatars/${a}.png`}
                    alt={a}
                    className="avatar-img"
                  />
                </label>
              ))}
            </div>

            <button
              type="submit"
              className="btn btn-gradient w-100 py-2 fw-semibold shadow-sm"
            >
              Guardar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}