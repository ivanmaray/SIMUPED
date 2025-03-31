// src/components/SelectorModalidad.jsx
import React from 'react';
import AnimatedButton from './AnimatedButton';

export default function SelectorModalidad({ onSelect }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-sky-100 to-blue-200 p-6">
      <h1 className="text-4xl font-bold text-blue-900 mb-6">Selecciona la Modalidad</h1>
      <div className="flex space-x-6">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Simulación en Directo</h2>
          <AnimatedButton
            onClick={() => onSelect("directo")}
            className="bg-green-600 text-white px-6 py-3 rounded shadow-lg hover:bg-green-700"
          >
            Versión en Directo
          </AnimatedButton>
          {/* Mostrar el video/gif local para la modalidad en directo */}
          <div className="mt-4 w-64 h-36 bg-gray-200 flex items-center justify-center">
            <img
              src="/videos/video1_directo.gif"
              alt="Video Directo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Simulación Online</h2>
          <AnimatedButton
            onClick={() => onSelect("online")}
            className="bg-blue-600 text-white px-6 py-3 rounded shadow-lg hover:bg-blue-700"
          >
            Versión Online
          </AnimatedButton>
          {/* Placeholder para video online */}
          <div className="mt-4 w-64 h-36 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-600">Vídeo online</p>
          </div>
        </div>
      </div>
    </div>
  );
}