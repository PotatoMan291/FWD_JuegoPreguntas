import { useNavigate } from 'react-router-dom'
import '../styles/accessDenied.css'

function AccessDenied() {
  const navigate = useNavigate()

  const volver = () => {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }

    navigate('/dashboard')
  }

  return (
    <main className="access-denied-page">
      <section className="access-denied-card" aria-labelledby="access-denied-title">
        <div className="access-denied-icon" aria-hidden="true">!</div>
        <p className="access-denied-eyebrow">Permisos insuficientes</p>
        <h1 id="access-denied-title">Acceso denegado</h1>
        <p>No tienes permisos para entrar a esta sección.</p>
        <button type="button" onClick={volver}>
          Volver
        </button>
      </section>
    </main>
  )
}

export default AccessDenied
