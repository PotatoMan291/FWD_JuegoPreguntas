// adminService.js
// Servicio encargado de las operaciones administrativas sobre las preguntas.
// Habla directamente con JSON Server usando Fetch API.
// No contiene lógica visual: solo hace las peticiones y devuelve datos o errores.

const BASE_URL = "http://localhost:3001";

/**
 * Obtiene todas las preguntas registradas.
 * GET /questions
 * @returns {Promise<Array>} arreglo de preguntas
 */
export async function getQuestions() {
  const response = await fetch(`${BASE_URL}/questions`);

  if (!response.ok) {
    throw new Error("No se pudieron cargar las preguntas. Verifica que JSON Server esté activo.");
  }

  const questions = await response.json();
  return questions;
}

/**
 * Crea una nueva pregunta.
 * POST /questions
 * @param {Object} question - objeto con { question, options, correctAnswer, category }
 * @returns {Promise<Object>} la pregunta creada (con el id que asigna JSON Server)
 */
export async function createQuestion(question) {
  const response = await fetch(`${BASE_URL}/questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(question),
  });

  if (!response.ok) {
    throw new Error("No se pudo crear la pregunta. Intenta nuevamente.");
  }

  const createdQuestion = await response.json();
  return createdQuestion;
}

/**
 * Elimina una pregunta por su id.
 * DELETE /questions/:id
 * @param {string} id
 * @returns {Promise<void>}
 */
export async function deleteQuestion(id) {
  const response = await fetch(`${BASE_URL}/questions/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("No se pudo eliminar la pregunta. Intenta nuevamente.");
  }
}
