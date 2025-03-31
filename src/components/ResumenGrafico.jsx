// src/components/ResumenGrafico.jsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ResumenGrafico({ resultados }) {
  const correctas = resultados.filter((r) => r.correcta).length;
  const incorrectas = resultados.length - correctas;

  const data = {
    labels: ["Correctas", "Incorrectas"],
    datasets: [
      {
        data: [correctas, incorrectas],
        backgroundColor: ["#34D399", "#F87171"], // Verde y rojo
        hoverBackgroundColor: ["#10B981", "#EF4444"],
      },
    ],
  };

  return (
    <div className="max-w-sm mx-auto">
      <h3 className="text-center font-semibold mb-4">Resumen de Resultados</h3>
      <Pie data={data} />
    </div>
  );
}