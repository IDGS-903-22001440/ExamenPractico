const API_URL = "https://segundoparcial20251108172151-dvddefg6fef5c7b4.canadacentral-01.azurewebsites.net/api/Participantes";

export const obtenerParticipantes = async () => {
  const res = await fetch(API_URL);
  return res.json();
};



export const crearParticipante = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// Obtener todos los participantes
export const obtenerParticipantePorId = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Error al obtener participante");
  return await response.json();
};

// Buscar participantes por cualquier campo
export const buscarParticipantes = async (query) => {
  const response = await fetch(`${API_URL}?search=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error("Error al buscar participantes");
  return await response.json();
};