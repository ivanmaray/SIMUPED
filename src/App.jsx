import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const roles = ["Médico", "Enfermero", "Farmacéutico"];

export default function SimuPedApp() {
  const [fase, setFase] = useState("inicio");
  const [rol, setRol] = useState("");
  const [escenario, setEscenario] = useState(null);
  const [respuesta, setRespuesta] = useState(null);
  const [resultados, setResultados] = useState([]);
  const [finalizado, setFinalizado] = useState(false);
  const [escenarios, setEscenarios] = useState([]);

  useEffect(() => {
    fetch("/escenarios_simuped.json")
      .then((res) => res.json())
      .then((data) => setEscenarios(data));
  }, []);

  if (escenarios.length === 0) {
    return <div className="text-center mt-10">Cargando escenarios...</div>;
  }

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
    const pregunta = Array.isArray(escenario.preguntas[rol])
      ? escenario.preguntas[rol][0]
      : escenario.preguntas[rol];
    const correcta = idx === pregunta.correcta;
    setRespuesta(idx);
    setResultados((prev) => {
      const nuevosResultados = [
        ...prev,
        {
          escenario: escenario.titulo,
          correcta,
          seleccion: idx,
          correctaIdx: pregunta.correcta,
          explicacion: pregunta.explicacion,
          opciones: pregunta.opciones,
          pregunta: pregunta.texto,
        },
      ];
      setTimeout(() => {
        const respondidos = nuevosResultados.map((r) => r.escenario);
        const siguientes = escenarios.filter((e) => !respondidos.includes(e.titulo));
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
  const progreso = (resultados.length / escenarios.length) * 100;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-tr from-sky-100 via-white to-blue-200 p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl mx-auto p-8 space-y-8">
        <h1 className="text-4xl font-bold text-blue-900 text-center">SimuPed 🩺</h1>

        {fase === "simulacion" && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progreso}%` }}
            ></div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={fase + (escenario ? escenario.id : "")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
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
              (() => {
                const pregunta = Array.isArray(escenario.preguntas[rol])
                  ? escenario.preguntas[rol][0]
                  : escenario.preguntas[rol];
                return (
                  <>
                    <h2 className="text-2xl font-semibold text-blue-900 text-center">{escenario.titulo}</h2>
                    <p className="text-gray-700 text-center">{escenario.descripcion}</p>
                    <div className="bg-blue-50 p-6 rounded-xl mt-4">
                      <p className="mb-3 font-medium">Pregunta para <strong>{rol}</strong>:</p>
                      <p className="mb-4">{pregunta.texto}</p>
                      <ul className="space-y-2">
                        {pregunta.opciones.map((op, idx) => (
                          <li key={idx}>
                            <button
                              onClick={() => registrarRespuesta(idx)}
                              disabled={respuesta !== null}
                              className={`w-full text-left px-4 py-2 rounded-lg border transition ${
                                respuesta === idx
                                  ? idx === pregunta.correcta
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
                      {respuesta !== null && (
                        <p className="mt-4 text-sm italic text-gray-600">
                          {pregunta.explicacion}
                        </p>
                      )}
                    </div>
                  </>
                );
              })()
            )}

            {fase === "final" && (
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-green-700">¡Simulación completada!</h2>
                <p className="text-lg">Has respondido correctamente {totalCorrectas} de {resultados.length} preguntas.</p>
                <div className="text-left space-y-4">
                  {resultados.map((r, i) => (
                    <div key={i} className="bg-white p-4 border rounded-lg shadow">
                      <p className="font-semibold text-blue-800">{r.pregunta}</p>
                      <p className="text-sm text-gray-700">Tu respuesta: <strong className={r.correcta ? 'text-green-600' : 'text-red-600'}>{r.opciones[r.seleccion]}</strong></p>
                      {!r.correcta && (
                        <p className="text-sm text-gray-700">Correcta: <strong className="text-green-600">{r.opciones[r.correctaIdx]}</strong></p>
                      )}
                      <p className="text-sm italic text-gray-500 mt-1">{r.explicacion}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={iniciar}
                  className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Volver a empezar
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className="text-center text-xs italic text-gray-500 mt-8 py-4 w-full">
        Web desarrollada por el equipo SIMUPED constituido por la UGC de Farmacia y la UCI Pediátrica de la AGC de la Infancia y Adolescencia del HUCA en contexto del proyecto FHARMACHALLENGE.
      </footer>
    </div>
  );
}
