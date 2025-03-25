// src/components/ResumenFinal.jsx
import React from "react";

export default function ResumenFinal({ resultados, totalCorrectas, reiniciar }) {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold text-green-700">¡Simulación completada!</h2>
      <p className="text-lg">Has respondido correctamente {totalCorrectas} de {resultados.length} preguntas.</p>
      <div className="text-left space-y-4">
        {resultados.map((r, i) => (
          <div key={i} className="bg-white p-4 border rounded-lg shadow">
            <p className="font-semibold text-blue-800">{r.pregunta}</p>
            <p className="text-sm text-gray-700">
              Tu respuesta: <strong className={r.correcta ? 'text-green-600' : 'text-red-600'}>
                {r.opciones[r.seleccion]}
              </strong>
            </p>
            {!r.correcta && (
              <p className="text-sm text-gray-700">
                Correcta: <strong className="text-green-600">
                  {r.opciones[r.correctaIdx]}
                </strong>
              </p>
            )}
            <p className="text-sm italic text-gray-500 mt-1">{r.explicacion}</p>
          </div>
        ))}
      </div>
      <button
        onClick={reiniciar}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Volver a empezar
      </button>
    </div>
  );
}