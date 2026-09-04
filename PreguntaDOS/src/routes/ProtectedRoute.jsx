// ProtectedRoute.jsx
// Componente reutilizable encargado únicamente de AUTORIZACIÓN de rutas.
// No maneja login, logout ni estado propio de sesión: toda esa información
// viene del AuthContext que expone el Integrante 1 (useAuth).
//
// Contrato esperado de useAuth():
//   const { isAuthenticated, isAdmin } = useAuth()
//
// Comportamiento:
// 1. Sin sesión                      -> redirige a /login
// 2. Con sesión, ruta no es admin    -> renderiza children
// 3. Con sesión, adminOnly y NO admin -> redirige a /access-denied
// 4. Con sesión, adminOnly y SÍ admin -> renderiza children

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
}

export default ProtectedRoute;
