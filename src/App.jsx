import React, { useState } from "react";

const roles = ["Médico", "Enfermero", "Farmacéutico"];
const escenarios = [
  {
    id: 1,
    titulo: "Sepsis pediátrica",
    descripcion: "Niño de 4 años con fiebre alta, petequias, dificultad respiratoria y signos de shock.",
    preguntas: {
      Médico: {
        texto: "¿Cuál es la conducta más adecuada ante este cuadro?",
        opciones: [
          "Administrar antitérmicos y observar",
          "Iniciar soporte vital, antibioterapia y volumen intravenoso",
          "Esperar resultados de laboratorio",
          "Derivar al centro de salud"
        ],
        correcta: 1
      },
      Enfermero: {
        texto: "¿Cómo prepararías la medicación antibiótica para este paciente?",
        opciones: [
          "Disolver en 100 mL de suero glucosado y administrar en bolo",
          "Diluir en suero fisiológico y administrar en perfusión lenta",
          "No es necesario diluir, administrar directamente",
          "Preparar en jeringa y administrar IM"
        ],
        correcta: 1
      },
      Farmacéutico: {
        texto: "¿Cuál de estos aspectos es crítico para el antibiótico en sepsis pediátrica?",
        opciones: [
          "Compatibilidad con calcio en la línea venosa",
          "Dosis exacta por kg, dilución y tiempo de administración",
          "Refrigeración previa a su uso",
          "Administrarlo junto a corticoides siempre"
        ],
        correcta: 1
      }
    }
  },
  {
    id: 2,
    titulo: "Convulsión febril",
    descripcion: "Niño de 2 años con fiebre y convulsión tónica-clónica de 2 minutos de duración.",
    preguntas: {
      Médico: {
        texto: "¿Qué medida inicial es más adecuada?",
        opciones: [
          "Administrar antipirético oral",
          "Colocar en posición lateral de seguridad y monitorizar",
          "Iniciar antibioterapia de amplio espectro",
          "Realizar punción lumbar urgente"
        ],
        correcta: 1
      },
      Enfermero: {
        texto: "¿Qué debe preparar la enfermería durante la convulsión?",
        opciones: [
          "Monitorización, canalización IV y medicación anticonvulsiva",
          "Administrar antipirético por vía oral",
          "Retirar al paciente de la habitación",
          "Poner oxígeno a 15 L/min sin mascarilla"
        ],
        correcta: 0
      },
      Farmacéutico: {
        texto: "¿Cuál es el tratamiento farmacológico de elección en convulsión febril prolongada?",
        opciones: [
          "Levetiracetam IV",
          "Diazepam rectal o midazolam bucal",
          "Paracetamol IV",
          "Fenitoína oral"
        ],
        correcta: 1
      }
    }
  }
];

export default function SimuPedApp() {
  const [fase, setFase] = useState("inicio");
  const [rol, setRol] = useState("");
  const [escenario, setEscenario] = useState(null);
  const [respuesta, setRespuesta] = useState(null);
  const [resultados, setResultados] = useState([]);
  const [finalizado, setFinalizado] = useState(false);

  const volver = () => {
    setRespuesta(null);
    if (fase === "rol") setFase("inicio");
    else if (fase === "escenario") setFase("rol");
    else if (fase === "simulacion") setFase("escenario");
  };

  const iniciar = () => {
    setResultados([]);
    setFinalizado(false);
    setFase("rol");
  };
  const elegirRol = (r) => {
    setRol(r);
    setFase("escenario");
  };
  const elegirEscenario = (e) => {
    setEscenario(e);
    setRespuesta(null);
    setFase("simulacion");
  };

  const registrarRespuesta = (idx) => {
    const correcta = idx === escenario.preguntas[rol].correcta;
    setRespuesta(idx);
    setResultados((prev) => {
      const nuevosResultados = [
        ...prev,
        { escenario: escenario.titulo, correcta }
      ];

      setTimeout(() => {
        const respondidos = nuevosResultados.map(r => r.escenario);
        const siguientes = escenarios.filter(e => !respondidos.includes(e.titulo));
        if (siguientes.length > 0) {
          setEscenario(siguientes[0]);
          setRespuesta(null);
        } else {
          setFase("final");
          setFinalizado(true);
        }
      }, 2000);

      return nuevosResultados;
    });
  };

  const totalCorrectas = resultados.filter((r) => r.correcta).length;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-tr from-sky-100 via-white to-blue-200 p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl mx-auto p-8 space-y-8">
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

        {fase === "simulacion" && escenario && (
          <>
            <h2 className="text-2xl font-semibold text-blue-900 text-center">{escenario.titulo}</h2>
            <p className="text-gray-700 text-center">{escenario.descripcion}</p>
            <div className="bg-blue-50 p-6 rounded-xl mt-4">
              <p className="mb-3 font-medium">Pregunta para <strong>{rol}</strong>:</p>
              <p className="mb-4">{escenario.preguntas[rol].texto}</p>
              <ul className="space-y-2">
                {escenario.preguntas[rol].opciones.map((op, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => registrarRespuesta(idx)}
                      disabled={respuesta !== null}
                      className={`w-full text-left px-4 py-2 rounded-lg border transition ${
                        respuesta === idx
                          ? idx === escenario.preguntas[rol].correcta
                            ? "bg-green-200 border-green-500"
                            : "bg-red-200 border-red-500"
                          : "bg-white hover:bg-blue-100 border-gray-300"
                      }`}
                    >
                      {op}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {fase === "final" && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-700">¡Simulación completada!</h2>
            <p className="text-lg mt-2">Has respondido correctamente {totalCorrectas} de {resultados.length} preguntas.</p>
            <button
              onClick={iniciar}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Volver a empezar
            </button>
          </div>
        )}
      </div>

      <footer className="text-center text-xs italic text-gray-500 mt-8 py-4 w-full">
        Web desarrollada por el equipo SIMUPED constituido por la UGC de Farmacia y la UCI Pediátrica de la AGC de la Infancia y Adolescencia en contexto del proyecto FHARMACHALLENGE.
      </footer>
    </div>
  );
}
