// App.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Inicio from "./components/Inicio";
import SeleccionRol from "./components/SeleccionRol";
import SeleccionEscenario from "./components/SeleccionEscenario";
import SimulacionPregunta from "./components/SimulacionPregunta";
import ResumenFinal from "./components/ResumenFinal";
import Loader from "./components/Loader";

const roles = ["Médico", "Enfermero", "Farmacéutico"];

export default function SimuPedApp() {
  const [fase, setFase] = useState("inicio");
  const [rol, setRol] = useState("");
  const [escenario, setEscenario] = useState(null);
  const [respuesta, setRespuesta] = useState(null);
  const [resultados, setResultados] = useState(() => {
    const guardados = localStorage.getItem("simuped_resultados");
    return guardados ? JSON.parse(guardados) : [];
  });
  const [escenarios, setEscenarios] = useState([]);

  useEffect(() => {
    fetch("/escenarios_simuped.json")
      .then((res) => res.json())
      .then((data) => setEscenarios(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("simuped_resultados", JSON.stringify(resultados));
  }, [resultados]);

  const volver = () => {
    setRespuesta(null);
    if (fase === "rol") setFase("inicio");
    else if (fase === "escenario") setFase("rol");
    else if (fase === "simulacion") setFase("escenario");
  };

  const iniciar = () => {
    setResultados([]);
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
      ? escenario.preguntas[rol][resultados.filter(r => r.escenario === escenario.titulo).length]
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

      const totalRespondidas = nuevosResultados.filter(r => r.escenario === escenario.titulo).length;
      const quedan = escenario.preguntas[rol].length > totalRespondidas;

      setTimeout(() => {
        if (quedan) {
          setRespuesta(null);
        } else {
          const respondidos = nuevosResultados.map((r) => r.escenario);
          const siguientes = escenarios.filter((e) => !respondidos.includes(e.titulo));
          if (siguientes.length > 0) {
            setEscenario(siguientes[0]);
            setRespuesta(null);
          } else {
            setFase("final");
          }
        }
      }, 2000);

      return nuevosResultados;
    });
  };

  const totalCorrectas = resultados.filter((r) => r.correcta).length;
  const progreso = (resultados.length / escenarios.length) * 100;

  if (escenarios.length === 0) return <Loader />;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-tr from-sky-100 via-white to-blue-200 p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl mx-auto p-8 space-y-8">
        <h1 className="text-4xl font-bold text-blue-900 text-center">SimuPed 🩺</h1>

        {fase === "simulacion" && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progreso}%` }}></div>
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
            {fase === "inicio" && <Inicio onStart={iniciar} />}
            {fase === "rol" && <SeleccionRol roles={roles} elegirRol={elegirRol} volver={volver} />}
            {fase === "escenario" && <SeleccionEscenario escenarios={escenarios} elegirEscenario={elegirEscenario} volver={volver} />}
            {fase === "simulacion" && escenario && <SimulacionPregunta escenario={escenario} rol={rol} respuesta={respuesta} registrarRespuesta={registrarRespuesta} resultados={resultados} />}
            {fase === "final" && <Resultados resultados={resultados} totalCorrectas={totalCorrectas} iniciar={iniciar} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className="text-center text-xs italic text-gray-500 mt-8 py-4 w-full">
        Web desarrollada por el equipo SIMUPED constituido por la UGC de Farmacia y la UCI Pediátrica de la AGC de la Infancia y Adolescencia del HUCA en contexto del proyecto FHARMACHALLENGE.
      </footer>
    </div>
  );
}