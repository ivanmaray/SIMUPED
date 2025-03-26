// ResumenEscenario.jsx
import React from "react";

export default function ResumenEscenario({ resumen, volverAEscenarios }) {
  if (resumen.length === 0) {
    return (
      <div className="text-center">
        <p className="text-sm text-gray-600">No hay preguntas registradas.</p>
        <button
          onClick={volverAEscenarios}
          className="bg-blue-600 text-white px-6 py-2 rounded mt-4"
        >
          Volver a escenarios
        </button>
      </div>
    );
  }

  const correctas = resumen.filter((r) => r.correcta).length;

  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold text-green-700">Escenario completado</h2>
      <p className="text-lg font-semibold">
        {resumen[0].escenario}: Correctas {correctas} / {resumen.length}
      </p>
      <div className="text-left space-y-4">
        {resumen.map((r, i) => (
          <div key={i} className="bg-white p-4 border rounded-lg shadow">
            <p className="font-semibold text-blue-800">{r.pregunta}</p>
            <p className="text-sm text-gray-700">
              Tu respuesta:{" "}
              <strong className={r.correcta ? "text-green-600" : "text-red-600"}>
                {r.opciones[r.seleccion]}
              </strong>
            </p>
            {!r.correcta && (
              <p className="text-sm text-gray-700">
                Correcta:{" "}
                <strong className="text-green-600">{r.opciones[r.correctaIdx]}</strong>
              </p>
            )}
            <p className="text-sm italic text-gray-500 mt-1">{r.explicacion}</p>
          </div>
        ))}
      </div>
      <button
        onClick={volverAEscenarios}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        Escoger otro escenario
      </button>
    </div>
  );
}