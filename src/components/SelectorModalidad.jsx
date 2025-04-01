// src/components/SelectorModalidad.jsx
import React from 'react';
import AnimatedButton from './AnimatedButton';

export default function SelectorModalidad({ onSelect }) {
  return (
    <div className="flex flex-col items-center justify-center py-1 bg-blue-10">
      <h1 className="text-4xl font-bold text-blue-900 mb-4">Selecciona la Modalidad</h1>
      <div className="flex space-x-12">
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-xl font-semibold">Simulación en Directo</h2>
          <AnimatedButton
            onClick={() => onSelect("directo")}
            className="bg-green-600 text-white px-4 py-2 rounded shadow-lg hover:bg-green-700"
          >
            Versión en Directo
          </AnimatedButton>
          {/* Video/gif para modalidad en directo */}
          <div className="w-64 h-36 bg-gray-200 flex items-center justify-center">
            <img
              src="/videos/video1_directo.gif"
              alt="Video Directo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-xl font-semibold">Simulación Online</h2>
          <AnimatedButton
            onClick={() => onSelect("online")}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-700"
          >
            Versión Online
          </AnimatedButton>
          {/* GIF para modalidad online */}
          <div className="w-64 h-36 bg-gray-200 flex items-center justify-center">
            <img
              src="/videos/video1_online.gif"
              alt="Video Online"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
