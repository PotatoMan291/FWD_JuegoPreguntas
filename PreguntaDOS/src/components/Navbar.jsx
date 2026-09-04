import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/navbar.css'

function Navbar() {
  const { user, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    return null
  }

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const linkClassName = ({ isActive }) =>
    isActive ? 'navbar-link navbar-link-active' : 'navbar-link'

  return (
    <header className="navbar">
      <div className="navbar-content">
        <NavLink className="navbar-brand" to="/dashboard">
          PreguntaDOS
        </NavLink>

        <nav className="navbar-links" aria-label="Navegación principal">
          <NavLink className={linkClassName} to="/dashboard">
            Inicio
          </NavLink>
          <NavLink className={linkClassName} to="/quiz">
            Jugar
          </NavLink>
          {isAdmin && (
            <NavLink className={linkClassName} to="/admin">
              Administración
            </NavLink>
          )}
        </nav>

        <div className="navbar-user">
          <span className="navbar-username">{user.name}</span>
          <button className="navbar-logout" type="button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
