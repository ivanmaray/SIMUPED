import React from "react";

export default function Inicio({ onStart }) {
  return (
    <div className="text-center">
      <button
        onClick={onStart}
        className="bg-blue-600 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:bg-blue-700 transition"
      >
        Iniciar Simulación
      </button>
    </div>
  );
}
