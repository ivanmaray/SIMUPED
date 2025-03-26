// src/components/ResumenEscenario.jsx
import React from "react";

export default function ResumenEscenario({ resumen, volverAEscenarios }) {
  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-bold text-green-700">Escenario completado</h2>
      <p className="text-lg font-semibold text-blue-900">{resumen[0]?.escenario}</p>
      <p className="text-gray-700">
        Respuestas correctas: {resumen.filter(r => r.correcta).length} de {resumen.length}
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
                Correcta: <strong className="text-green-600">{r.opciones[r.correctaIdx]}</strong>
              </p>
            )}
            <p className="text-sm italic text-gray-500 mt-1">{r.explicacion}</p>
          </div>
        ))}
      </div>
      <button
        onClick={volverAEscenarios}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Escoger otro escenario
      </button>
    </div>
  );
}