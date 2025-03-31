// src/components/SelectorModalidad.jsx
import React from 'react';
import AnimatedButton from './AnimatedButton';

export default function SelectorModalidad({ onSelect }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 bg-gradient-to-tr from-sky-100 to-blue-200 p-6">
      <h1 className="text-4xl font-bold text-blue-900 mb-6">Selecciona la Modalidad</h1>
      <AnimatedButton
        onClick={() => onSelect("online")}
        className="bg-blue-600 text-white px-6 py-3 rounded shadow-lg hover:bg-blue-700"
      >
        Simulación Online
      </AnimatedButton>
      <AnimatedButton
        onClick={() => onSelect("directo")}
        className="bg-green-600 text-white px-6 py-3 rounded shadow-lg hover:bg-green-700"
      >
        Simulación en Directo
      </AnimatedButton>
    </div>
  );
}