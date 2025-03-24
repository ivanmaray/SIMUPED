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

  const volver = () => {
    if (fase === "rol") setFase("inicio");
    else if (fase === "escenario") setFase("rol");
    else if (fase === "simulacion") setFase("escenario");
  };

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
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-8 space-y-8">
        <h1 className="text-4xl font-bold text-blue-900 text-center">SimuPed 🩺</h1>

        {fase === "inicio" && (
          <div className="text-center">
            <button
              onClick={iniciar}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:bg-blue-700 transition"
            >
              Iniciar Simulación
            </button>
          </div>
        )}

        {fase === "rol" && (
          <>
            <h2 className="text-2xl font-semibold text-gray-700 text-center">Selecciona tu rol</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => elegirRol(r)}
                  className="bg-blue-100 text-blue-800 px-6 py-4 rounded-lg text-lg hover:bg-blue-200 transition w-full sm:w-auto"
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="text-center">
              <button
                onClick={volver}
                className="mt-6 text-sm text-gray-500 hover:text-gray-700 underline"
              >
                ← Volver al inicio
              </button>
            </div>
          </>
        )}

        {fase === "escenario" && (
          <>
            <h2 className="text-2xl font-semibold text-gray-700 text-center">Selecciona un escenario</h2>
            <div className="space-y-4">
              {escenarios.map((e) => (
                <div
                  key={e.id}
                  onClick={() => elegirEscenario(e)}
                  className="border border-gray-200 rounded-xl p-6 cursor-pointer hover:bg-blue-50 transition shadow-sm"
                >
                  <h3 className="text-lg font-bold text-blue-800">{e.titulo}</h3>
                  <p className="text-gray-600">{e.descripcion}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button
                onClick={volver}
                className="mt-6 text-sm text-gray-500 hover:text-gray-700 underline"
              >
                ← Volver a selección de rol
              </button>
            </div>
          </>
        )}

        {fase === "simulacion" && escenario && (
          <>
            <h2 className="text-2xl font-semibold text-blue-900 text-center">{escenario.titulo}</h2>
            <p className="text-gray-700 text-center">{escenario.descripcion}</p>
            <div className="bg-blue-50 p-6 rounded-xl mt-4">
              <p className="mb-3">
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
            <div className="text-center">
              <button
                onClick={volver}
                className="mt-6 text-sm text-gray-500 hover:text-gray-700 underline"
              >
                ← Volver a escenarios
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}