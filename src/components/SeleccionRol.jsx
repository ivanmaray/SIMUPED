// src/components/SeleccionRol.jsx
import React from "react";

export default function SeleccionRol({ roles, elegirRol, volver }) {
  return (
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
  );
}