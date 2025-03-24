import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const roles = ["Médico", "Enfermero", "Farmacéutico"];
const escenarios = [
  {
    id: 1,
    titulo: "Escenario 1",
    descripcion:
      "Paciente de 4 años con fiebre, dolor abdominal, saturación baja, petequias y signos de sepsis."
  },
  // Puedes añadir más escenarios aquí
];

export default function SimuPedApp() {
  const [fase, setFase] = useState("inicio");
  const [rol, setRol] = useState("");
  const [escenario, setEscenario] = useState(null);

  const iniciarSimulacion = () => setFase("rol");
  const seleccionarRol = (r) => {
    setRol(r);
    setFase("escenario");
  };
  const seleccionarEscenario = (e) => {
    setEscenario(e);
    setFase("simulacion");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold text-center">SimuPed</h1>

      {fase === "inicio" && (
        <div className="text-center">
          <Button onClick={iniciarSimulacion}>Iniciar Simulación</Button>
        </div>
      )}

      {fase === "rol" && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Selecciona tu rol</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roles.map((r) => (
              <Button key={r} onClick={() => seleccionarRol(r)}>
                {r}
              </Button>
            ))}
          </div>
        </div>
      )}

      {fase === "escenario" && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Selecciona un escenario</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {escenarios.map((e) => (
              <Card key={e.id} onClick={() => seleccionarEscenario(e)} className="cursor-pointer hover:shadow-lg">
                <CardContent className="p-4">
                  <h3 className="font-bold">{e.titulo}</h3>
                  <p>{e.descripcion}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {fase === "simulacion" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{escenario.titulo}</h2>
          <p>{escenario.descripcion}</p>
          <div className="bg-gray-100 p-4 rounded">
            <p className="italic">
              Pregunta para el rol <strong>{rol}</strong>: ¿Cuál sería la actitud menos recomendable inicialmente?
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>Oxigenoterapia con mascarilla con reservorio</li>
              <li>Canalización de vía periférica e inicio de volumen</li>
              <li>Solicitar analítica y hemocultivo</li>
              <li>Solicitar radiografía de tórax</li>
              <li>Iniciar antibioterapia empírica EV</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
