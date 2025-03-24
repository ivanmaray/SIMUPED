import React, { useState } from "react";

const roles = ["Médico", "Enfermero", "Farmacéutico"];
const escenarios = [
  {
    id: 1,
    titulo: "Sepsis pediátrica",
    descripcion: "Niño de 4 años con fiebre alta, petequias, dificultad respiratoria y signos de shock.",
  },
  {
    id: 2,
    titulo: "Convulsión febril",
    descripcion: "Niña de 2 años con convulsión tónico-clónica tras cuadro febril.",
  },
];

export default function SimuPedApp() {
  const [fase, setFase] = useState("inicio");
  const [rol, setRol] = useState("");
  const [escenario, setEscenario] = useState(null);

  const iniciar = () => setFase("rol");
  const elegirRol = (r) => {
    setRol(r);
    setFase("escenario");
  };
  const elegirEscenario = (e) => {
    setEscenario(e);
    setFase("simulacion");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-sky-100 via-white to-blue-200 p-6 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-blue-900 text-center">SimuPed 🩺</h1>

        {fase === "inicio" && (
          <div className="text-center">
            <button
              onClick={iniciar}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
            >
              Iniciar Simulación
            </button>
          </div>
        )}

        {fase === "rol" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Selecciona tu rol</h2>
            <div className="flex flex-wrap gap-4">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => elegirRol(r)}
                  className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-200 transition"
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        {fase === "escenario" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Selecciona un escenario</h2>
            <div className="space-y-4">
              {escenarios.map((e) => (
                <div
                  key={e.id}
                  onClick={() => elegirEscenario(e)}
                  className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:bg-blue-50 transition shadow-sm"
                >
                  <h3 className="text-lg font-bold text-blue-800">{e.titulo}</h3>
                  <p className="text-gray-600">{e.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {fase === "simulacion" && escenario && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-900">{escenario.titulo}</h2>
            <p className="text-gray-700">{escenario.descripcion}</p>
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="mb-2">
                Pregunta para el rol <strong>{rol}</strong>:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Oxigenoterapia con mascarilla con reservorio</li>
                <li>Canalización de vía periférica e inicio de volumen</li>
                <li>Solicitar analítica y hemocultivo</li>
                <li>Solicitar radiografía de tórax</li>
                <li>Iniciar antibioterapia empírica EV</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}