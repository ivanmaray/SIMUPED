// src/components/SimulacionDirecta.jsx
import React from 'react';
import AnimatedButton from './AnimatedButton';

export default function SimulacionDirecta({ onStartDirecta }) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-green-700">Simulación en Directo</h2>
      <p className="text-lg">
        Esta es la versión en directo. Aquí se mostrará el caso en tiempo real, con preguntas
        dirigidas a los diferentes roles.
      </p>
      {/* Aquí se puede integrar un vídeo en vivo o una vista de la sala */}
      <div className="mt-4 w-full h-64 bg-gray-200 flex items-center justify-center">
        <p className="text-gray-600">Vídeo en vivo</p>
      </div>
      <div className="mt-6">
        <AnimatedButton
          onClick={onStartDirecta}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Iniciar Simulación en Directo
        </AnimatedButton>
      </div>
    </div>
  );
}