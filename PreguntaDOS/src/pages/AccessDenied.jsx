// AccessDenied.jsx
// Página sencilla que se muestra cuando un usuario autenticado intenta
// entrar a una sección que requiere rol de administrador y no lo tiene.

import { useNavigate } from "react-router-dom";
import "../styles/accessDenied.css";

function AccessDenied() {
  const navigate = useNavigate();

  function handleGoHome() {
    navigate("/dashboard");
  }

  return (
    <main className="access-denied-container">
      <div className="access-denied-card">
        <h1>Acceso denegado</h1>
        <p>No tienes permisos para entrar a esta sección.</p>
        <button type="button" className="access-denied-button" onClick={handleGoHome}>
          Volver al inicio
        </button>
      </div>
    </main>
  );
}

export default AccessDenied;
