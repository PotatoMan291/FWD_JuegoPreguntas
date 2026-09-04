// AdminPanel.jsx
// Panel de administración de preguntas. Accesible únicamente para role "admin"
// (la protección real la hace ProtectedRoute al envolver esta ruta en App.jsx).
//
// Responsabilidades:
// - Cargar las preguntas existentes desde JSON Server (useEffect).
// - Mostrarlas en una lista (useState + key=question.id).
// - Permitir crear una pregunta nueva (a través de QuestionForm).
// - Permitir eliminar una pregunta existente.

import { useEffect, useState } from "react";
import QuestionForm from "../components/QuestionForm";
import { getQuestions, createQuestion, deleteQuestion } from "../services/adminService";
import "../styles/admin.css";

function AdminPanel() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadQuestions() {
      setLoading(true);
      setError("");

      try {
        const data = await getQuestions();
        if (isMounted) {
          setQuestions(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Ocurrió un error al cargar las preguntas.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadQuestions();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleCreate(newQuestion) {
    const createdQuestion = await createQuestion(newQuestion);
    setQuestions((prevQuestions) => [...prevQuestions, createdQuestion]);
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("¿Seguro que deseas eliminar esta pregunta?");
    if (!confirmed) return;

    setDeleteError("");

    try {
      await deleteQuestion(id);
      setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
    } catch (err) {
      setDeleteError(err.message || "No se pudo eliminar la pregunta.");
    }
  }

  return (
    <main className="admin-panel-container">
      <h1>Administración de preguntas</h1>

      <QuestionForm onCreate={handleCreate} />

      {deleteError && <p className="admin-panel-error">{deleteError}</p>}

      <section className="admin-panel-list">
        <h2>Preguntas existentes</h2>

        {loading && <p>Cargando preguntas...</p>}

        {!loading && error && <p className="admin-panel-error">{error}</p>}

        {!loading && !error && questions.length === 0 && (
          <p>Todavía no hay preguntas registradas.</p>
        )}

        {!loading && !error && questions.length > 0 && (
          <ul>
            {questions.map((question) => (
              <li key={question.id} className="admin-question-item">
                <div className="admin-question-info">
                  <span className="admin-question-text">{question.question}</span>
                  <span className="admin-question-category">{question.category}</span>
                </div>
                <button
                  type="button"
                  className="admin-delete-button"
                  onClick={() => handleDelete(question.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default AdminPanel;
