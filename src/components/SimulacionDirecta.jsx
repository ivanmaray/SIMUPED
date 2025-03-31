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
      {/* Mostrar el GIF como video o imagen */}
      <div className="mt-4 w-full max-w-md mx-auto">
        <img src="/videos/video1_directo.gif" alt="Simulación en directo" className="w-full" />
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