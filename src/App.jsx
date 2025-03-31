// App.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Inicio from "./components/Inicio";
import SeleccionRol from "./components/SeleccionRol";
import SeleccionEscenario from "./components/SeleccionEscenario";
import SimulacionPregunta from "./components/SimulacionPregunta";
import ResumenEscenario from "./components/ResumenEscenario";
import ResumenFinal from "./components/ResumenFinal";
import Loader from "./components/Loader";
import SelectorModalidad from "./components/SelectorModalidad";

const roles = ["Médico", "Enfermero", "Farmacéutico"];

export default function SimuPedApp() {
  // Nuevo estado para la modalidad: "online" o "directo"
  const [modalidad, setModalidad] = useState(null);

  const [fase, setFase] = useState("inicio"); // inicio | rol | escenario | simulacion | final
  const [rol, setRol] = useState("");
  const [escenario, setEscenario] = useState(null);
  const [respuesta, setRespuesta] = useState(null);
  const [preguntaIndex, setPreguntaIndex] = useState(0);
  const [resultados, setResultados] = useState(() => {
    const guardados = localStorage.getItem("simuped_resultados");
    return guardados ? JSON.parse(guardados) : [];
  });
  const [escenarios, setEscenarios] = useState([]);
  const [mostrarResumen, setMostrarResumen] = useState(false);

  // Cargar JSON de escenarios
  useEffect(() => {
    fetch("/escenarios_simuped.json")
      .then((res) => res.json())
      .then((data) => setEscenarios(data));
  }, []);

  // Guardar resultados en localStorage
  useEffect(() => {
    localStorage.setItem("simuped_resultados", JSON.stringify(resultados));
  }, [resultados]);

  // Función para seleccionar la modalidad
  const seleccionarModalidad = (modo) => {
    setModalidad(modo);
    // Para el modo online usamos el flujo actual
    setFase("rol");
  };

  // -------- Navegación / Fases -----------
  const volver = () => {
    setRespuesta(null);
    if (fase === "rol") {
      setFase("inicio");
    } else if (fase === "escenario") {
      setFase("rol");
    } else if (fase === "simulacion") {
      setFase("escenario");
    }
  };

  const iniciar = () => {
    setResultados([]);
    setFase("rol");
    setMostrarResumen(false);
    setPreguntaIndex(0);
  };

  const elegirRol = (r) => {
    setRol(r);
    setFase("escenario");
  };

  const elegirEscenario = (e) => {
    setEscenario(e);
    setRespuesta(null);
    setFase("simulacion");
    setMostrarResumen(false);
    setPreguntaIndex(0);
  };

  // ---------- Registrar respuesta ----------
  const registrarRespuesta = (idx) => {
    const pregunta = escenario.preguntas[rol][preguntaIndex];
    const correcta = idx === pregunta.correcta;
    setRespuesta(idx);
    setResultados((prev) => [
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
    ]);
  };

  // ---------- Botón "Siguiente" en SimulacionPregunta ----------
  const siguientePregunta = () => {
    const total = escenario.preguntas[rol].length;
    if (preguntaIndex + 1 >= total) {
      setMostrarResumen(true);
    } else {
      setPreguntaIndex(preguntaIndex + 1);
      setRespuesta(null);
    }
  };

  // Al terminar el escenario, ver su resumen => y luego volver a lista de escenarios
  const volverAEscenarios = () => {
    setEscenario(null);
    setRespuesta(null);
    setMostrarResumen(false);
    setFase("escenario");
  };

  // ---------- Barra de progreso ----------
  const respondidasEscenario = preguntaIndex;
  const totalPreguntas = escenario?.preguntas?.[rol]?.length || 1;
  const progreso =
    fase === "simulacion" && !mostrarResumen
      ? (respondidasEscenario / totalPreguntas) * 100
      : 0;

  // Contabilizar correctas totales
  const totalCorrectas = resultados.filter((r) => r.correcta).length;

  if (escenarios.length === 0) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-tr from-sky-100 via-white to-blue-200 p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl mx-auto p-8 space-y-8">
        <h1 className="text-4xl font-bold text-blue-900 text-center">SimuPed 🩺</h1>

        {/* Si aún no se ha seleccionado la modalidad, mostramos el selector */}
        {!modalidad && <SelectorModalidad onSelect={seleccionarModalidad} />}

        {/* Una vez seleccionada la modalidad, continuamos con el flujo (actualmente online) */}
        {modalidad && fase === "inicio" && <Inicio onStart={iniciar} />}

        {modalidad && fase === "rol" && (
          <SeleccionRol roles={roles} elegirRol={elegirRol} volver={volver} />
        )}

        {modalidad && fase === "escenario" && (
          <SeleccionEscenario
            escenarios={escenarios}
            elegirEscenario={elegirEscenario}
            volver={volver}
          />
        )}

        {modalidad && fase === "simulacion" && escenario && !mostrarResumen && (
          <SimulacionPregunta
            escenario={escenario}
            rol={rol}
            respuesta={respuesta}
            registrarRespuesta={registrarRespuesta}
            resultados={resultados}
            siguientePregunta={siguientePregunta}
            preguntaIndex={preguntaIndex}
          />
        )}

        {modalidad && fase === "simulacion" && mostrarResumen && (
          <ResumenEscenario
            resumen={resultados.filter((r) => r.escenario === escenario.titulo)}
            volverAEscenarios={volverAEscenarios}
          />
        )}

        {modalidad && fase === "final" && (
          <ResumenFinal
            resultados={resultados}
            totalCorrectas={totalCorrectas}
            iniciar={iniciar}
          />
        )}
      </div>

      <footer className="text-center text-xs italic text-gray-500 mt-8 py-4 w-full">
        Web desarrollada por el equipo SIMUPED constituido por la UGC de Farmacia y la UCI Pediátrica
        de la AGC de la Infancia y Adolescencia del HUCA en contexto del proyecto FHARMACHALLENGE.
      </footer>
    </div>
  );
}