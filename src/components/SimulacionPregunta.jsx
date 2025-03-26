// src/components/SimulacionPregunta.jsx
import React from "react";

export default function SimulacionPregunta({
  escenario,
  rol,
  respuesta,
  registrarRespuesta,
  resultados,
  siguientePregunta
}) {
  // Cuántas preguntas se han respondido ya
  const respondidas = resultados.filter(r => r.escenario === escenario.titulo).length;
  const pregunta = escenario.preguntas[rol][respondidas];

  // Si ya no hay más preguntas, devolvemos null para que App.jsx muestre el resumen
  if (!pregunta) return null;

  return (
    <>
      <h2 className="text-2xl font-semibold text-blue-900 text-center">{escenario.titulo}</h2>
      <p className="text-gray-700 text-center">{escenario.descripcion}</p>
      <div className="bg-blue-50 p-6 rounded-xl mt-4">
        <p className="mb-3 font-medium">
          Pregunta {respondidas + 1} para <strong>{rol}</strong>:
        </p>
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
          <div className="flex justify-end mt-4">
            <button
              onClick={siguientePregunta}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Siguiente pregunta
            </button>
          </div>
        )}
      </div>
    </>
  );
}