// QuestionForm.jsx
// Formulario controlado para crear una nueva pregunta.
// No sabe nada de fetch ni de JSON Server: solo arma el objeto y
// llama a la función que recibe por props (onCreate).

import { useState } from "react";

const initialState = {
  question: "",
  category: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  correctAnswer: "",
};

function QuestionForm({ onCreate }) {
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const { question, category, optionA, optionB, optionC, optionD, correctAnswer } = formData;

    if (!question.trim()) return "La pregunta no puede estar vacía.";
    if (!category.trim()) return "La categoría no puede estar vacía.";
    if (!optionA.trim() || !optionB.trim() || !optionC.trim() || !optionD.trim()) {
      return "Ninguna opción puede estar vacía.";
    }
    if (!correctAnswer) return "Debes seleccionar cuál opción es la correcta.";

    const options = [optionA.trim(), optionB.trim(), optionC.trim(), optionD.trim()];
    if (!options.includes(correctAnswer)) {
      return "La respuesta correcta debe coincidir exactamente con una de las opciones.";
    }

    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationError = validate();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    const newQuestion = {
      question: formData.question.trim(),
      options: [
        formData.optionA.trim(),
        formData.optionB.trim(),
        formData.optionC.trim(),
        formData.optionD.trim(),
      ],
      correctAnswer: formData.correctAnswer,
      category: formData.category.trim(),
    };

    setFormError("");
    setSubmitting(true);

    try {
      await onCreate(newQuestion);
      // Solo limpiamos el formulario si la creación fue exitosa.
      setFormData(initialState);
    } catch (error) {
      setFormError(error.message || "No se pudo crear la pregunta.");
    } finally {
      setSubmitting(false);
    }
  }

  const options = [formData.optionA, formData.optionB, formData.optionC, formData.optionD];

  return (
    <form className="question-form" onSubmit={handleSubmit}>
      <h2>Nueva pregunta</h2>

      <label htmlFor="question">Pregunta</label>
      <input
        id="question"
        name="question"
        type="text"
        value={formData.question}
        onChange={handleChange}
        placeholder="Escribe la pregunta"
      />

      <label htmlFor="category">Categoría</label>
      <input
        id="category"
        name="category"
        type="text"
        value={formData.category}
        onChange={handleChange}
        placeholder="Ej: React, JavaScript, HTML..."
      />

      <label htmlFor="optionA">Respuesta A</label>
      <input
        id="optionA"
        name="optionA"
        type="text"
        value={formData.optionA}
        onChange={handleChange}
      />

      <label htmlFor="optionB">Respuesta B</label>
      <input
        id="optionB"
        name="optionB"
        type="text"
        value={formData.optionB}
        onChange={handleChange}
      />

      <label htmlFor="optionC">Respuesta C</label>
      <input
        id="optionC"
        name="optionC"
        type="text"
        value={formData.optionC}
        onChange={handleChange}
      />

      <label htmlFor="optionD">Respuesta D</label>
      <input
        id="optionD"
        name="optionD"
        type="text"
        value={formData.optionD}
        onChange={handleChange}
      />

      <label htmlFor="correctAnswer">Respuesta correcta</label>
      <select
        id="correctAnswer"
        name="correctAnswer"
        value={formData.correctAnswer}
        onChange={handleChange}
      >
        <option value="">Selecciona la opción correcta</option>
        {options.map((option, index) => (
          option.trim() ? (
            <option key={index} value={option}>
              {option}
            </option>
          ) : null
        ))}
      </select>

      {formError && <p className="question-form-error">{formError}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? "Creando..." : "Crear pregunta"}
      </button>
    </form>
  );
}

export default QuestionForm;
