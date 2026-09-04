import { useCallback, useEffect, useState } from 'react'
import QuestionForm from '../components/QuestionForm'
import {
  createQuestion,
  deleteQuestion,
  getQuestions
} from '../services/adminService'
import '../styles/admin.css'

function AdminPanel() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const loadQuestions = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getQuestions()
      setQuestions(Array.isArray(data) ? data : [])
    } catch (loadError) {
      setError(loadError.message || 'No se pudieron cargar las preguntas.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadQuestions()
  }, [loadQuestions])

  const handleCreate = async (question) => {
    try {
      setSaving(true)
      setError('')
      setSuccess('')
      const createdQuestion = await createQuestion(question)
      setQuestions((current) => [...current, createdQuestion])
      setSuccess('Pregunta creada correctamente.')
    } catch (createError) {
      setError(createError.message || 'No se pudo crear la pregunta.')
      throw createError
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm('¿Seguro que deseas eliminar esta pregunta?')

    if (!confirmed) {
      return
    }

    try {
      setDeletingId(id)
      setError('')
      setSuccess('')
      await deleteQuestion(id)
      setQuestions((current) => current.filter((question) => question.id !== id))
      setSuccess('Pregunta eliminada correctamente.')
    } catch (deleteError) {
      setError(deleteError.message || 'No se pudo eliminar la pregunta.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <main className="admin-page">
      <div className="admin-container">
        <header className="admin-header">
          <div>
            <p className="admin-eyebrow">Panel de administrador</p>
            <h1>Administración de preguntas</h1>
            <p className="admin-subtitle">
              Crea y elimina las preguntas que utilizará el juego.
            </p>
          </div>

          <div className="admin-summary" aria-label="Resumen de preguntas">
            <strong>{questions.length}</strong>
            <span>preguntas</span>
          </div>
        </header>

        {(error || success) && (
          <div
            className={`admin-message ${error ? 'admin-message--error' : 'admin-message--success'}`}
            role={error ? 'alert' : 'status'}
          >
            {error || success}
          </div>
        )}

        <section className="admin-grid">
          <QuestionForm onCreate={handleCreate} disabled={saving} />

          <section className="question-list-card" aria-labelledby="question-list-title">
            <div className="question-list-card__heading">
              <div>
                <p className="admin-eyebrow">Banco de preguntas</p>
                <h2 id="question-list-title">Preguntas registradas</h2>
              </div>
              <button
                className="admin-secondary-button"
                type="button"
                onClick={loadQuestions}
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Recargar'}
              </button>
            </div>

            {loading ? (
              <p className="question-list__empty">Cargando preguntas...</p>
            ) : questions.length === 0 ? (
              <p className="question-list__empty">No hay preguntas registradas todavía.</p>
            ) : (
              <div className="question-list">
                {questions.map((question, index) => (
                  <article className="question-item" key={question.id}>
                    <div className="question-item__number" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <div className="question-item__content">
                      <div className="question-item__meta">
                        <span>{question.category}</span>
                        <span>{question.options?.length || 0} opciones</span>
                      </div>
                      <h3>{question.question}</h3>
                      <p>
                        Correcta: <strong>{question.correctAnswer}</strong>
                      </p>
                    </div>

                    <button
                      className="admin-delete-button"
                      type="button"
                      onClick={() => handleDelete(question.id)}
                      disabled={deletingId === question.id}
                    >
                      {deletingId === question.id ? 'Eliminando...' : 'Eliminar'}
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>
        </section>
      </div>
    </main>
  )
}

export default AdminPanel
