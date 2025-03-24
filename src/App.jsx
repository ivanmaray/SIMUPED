import React, { useState } from "react";

const roles = ["Médico", "Enfermero", "Farmacéutico"];
const escenarios = [
  {
    id: 1,
    titulo: "Escenario 1",
    descripcion:
      "Paciente de 4 años con fiebre, dolor abdominal, saturación baja, petequias y signos de sepsis.",
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
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center" }}>
        SimuPed
      </h1>

      {fase === "inicio" && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button onClick={iniciarSimulacion}>Iniciar Simulación</button>
        </div>
      )}

      {fase === "rol" && (
        <div>
          <h2 style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
            Selecciona tu rol
          </h2>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {roles.map((r) => (
              <button key={r} onClick={() => seleccionarRol(r)}>
                {r}
              </button>
            ))}
          </div>
        </div>
      )}

      {fase === "escenario" && (
        <div>
          <h2 style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
            Selecciona un escenario
          </h2>
          {escenarios.map((e) => (
            <div
              key={e.id}
              onClick={() => seleccionarEscenario(e)}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                margin: "1rem 0",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <h3>{e.titulo}</h3>
              <p>{e.descripcion}</p>
            </div>
          ))}
        </div>
      )}

      {fase === "simulacion" && escenario && (
        <div>
          <h2 style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
            {escenario.titulo}
          </h2>
          <p>{escenario.descripcion}</p>
          <div
            style={{
              backgroundColor: "#f5f5f5",
              padding: "1rem",
              borderRadius: "6px",
              marginTop: "1rem",
            }}
          >
            <p>
              Pregunta para el rol <strong>{rol}</strong>: ¿Cuál sería la actitud
              menos recomendable inicialmente?
            </p>
            <ul style={{ marginTop: "0.5rem" }}>
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