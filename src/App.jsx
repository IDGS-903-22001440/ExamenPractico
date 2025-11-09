import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Participantes from "./pages/Participantes";
import Registro from "./pages/Registro";
import Gafet from "./pages/Gafet";
import Busqueda from "./pages/Busqueda";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/participantes" element={<Participantes />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/gafet/:id" element={<Gafet />} />
        <Route path="/participantes/buscar" element={<Busqueda />} />
      </Routes>
    </Router>
  );
}

export default App;