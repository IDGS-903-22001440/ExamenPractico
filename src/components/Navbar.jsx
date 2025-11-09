import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-black text-yellow-400 p-3 relative shadow-lg border-b border-yellow-600">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo / Título */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => navigate("/")}
        >
          <h1 className="text-xl font-extrabold tracking-wide hover:text-yellow-300 transition-colors">
            Registro de Asistencia
          </h1>
        </div>

       
        {/* Icono hamburguesa */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menú"
          className="text-3xl md:hidden hover:text-yellow-300 transition-colors"
        >
          ☰
        </button>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="md:hidden absolute right-3 top-16 bg-neutral-900/95 border border-yellow-600 rounded-lg shadow-lg p-3 z-20 backdrop-blur-sm animate-fade-in">
          <ul className="flex flex-col gap-2 text-yellow-300 font-medium">
            <li>
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded hover:bg-yellow-600/20"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/participantes"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded hover:bg-yellow-600/20"
              >
                Participantes
              </Link>
            </li>
            <li>
              <Link
                to="/registro"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded hover:bg-yellow-600/20"
              >
                Registro
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}