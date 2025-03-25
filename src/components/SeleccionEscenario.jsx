// src/components/SeleccionEscenario.jsx
import React from "react";

export default function SeleccionEscenario({ escenarios, elegirEscenario, volver }) {
  return (
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
  );
}