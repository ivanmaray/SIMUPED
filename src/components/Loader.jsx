// src/components/Loader.jsx
import React from "react";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-blue-800">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mb-4"></div>
      <p className="text-lg font-semibold">Cargando escenarios...</p>
    </div>
  );
}