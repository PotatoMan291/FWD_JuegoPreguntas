import { useMemo, useState } from 'react'

const INITIAL_FORM = {
  question: '',
  category: '',
  optionA: '',
  optionB: '',
  optionC: '',
  optionD: '',
  correctOption: ''
}

function QuestionForm({ onCreate, disabled = false }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [error, setError] = useState('')

  const options = useMemo(
    () => [form.optionA, form.optionB, form.optionC, form.optionD],
    [form.optionA, form.optionB, form.optionC, form.optionD]
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const cleanedOptions = options.map((option) => option.trim())
    const selectedIndex = Number(form.correctOption)

    if (
      !form.question.trim() ||
      !form.category.trim() ||
      cleanedOptions.some((option) => !option) ||
      !Number.isInteger(selectedIndex) ||
      selectedIndex < 0 ||
      selectedIndex > 3
    ) {
      setError('Completa todos los campos y selecciona la respuesta correcta.')
      return
    }

    const question = {
      question: form.question.trim(),
      options: cleanedOptions,
      correctAnswer: cleanedOptions[selectedIndex],
      category: form.category.trim()
    }

    try {
      await onCreate(question)
      setForm(INITIAL_FORM)
      setError('')
    } catch (submitError) {
      setError(submitError.message || 'No se pudo crear la pregunta.')
    }
  }

  return (
    <form className="question-form" onSubmit={handleSubmit}>
      <div className="question-form__heading">
        <div>
          <p className="admin-eyebrow">Nueva pregunta</p>
          <h2>Agregar pregunta</h2>
        </div>
        <span className="question-form__badge">4 opciones</span>
      </div>

      <label className="question-form__field question-form__field--wide">
        <span>Texto de la pregunta</span>
        <textarea
          name="question"
          value={form.question}
          onChange={handleChange}
          placeholder="Ej. ¿Qué hook de React permite manejar estado?"
          rows="3"
          required
          disabled={disabled}
        />
      </label>

      <label className="question-form__field question-form__field--wide">
        <span>Categoría</span>
        <input
          name="category"
          type="text"
          value={form.category}
          onChange={handleChange}
          placeholder="Ej. React"
          required
          disabled={disabled}
        />
      </label>

      <div className="question-form__options">
        <label className="question-form__field">
          <span>Respuesta A</span>
          <input
            name="optionA"
            type="text"
            value={form.optionA}
            onChange={handleChange}
            required
            disabled={disabled}
          />
        </label>

        <label className="question-form__field">
          <span>Respuesta B</span>
          <input
            name="optionB"
            type="text"
            value={form.optionB}
            onChange={handleChange}
            required
            disabled={disabled}
          />
        </label>

        <label className="question-form__field">
          <span>Respuesta C</span>
          <input
            name="optionC"
            type="text"
            value={form.optionC}
            onChange={handleChange}
            required
            disabled={disabled}
          />
        </label>

        <label className="question-form__field">
          <span>Respuesta D</span>
          <input
            name="optionD"
            type="text"
            value={form.optionD}
            onChange={handleChange}
            required
            disabled={disabled}
          />
        </label>
      </div>

      <label className="question-form__field question-form__field--wide">
        <span>Respuesta correcta</span>
        <select
          name="correctOption"
          value={form.correctOption}
          onChange={handleChange}
          required
          disabled={disabled}
        >
          <option value="">Selecciona una opción</option>
          <option value="0">Respuesta A</option>
          <option value="1">Respuesta B</option>
          <option value="2">Respuesta C</option>
          <option value="3">Respuesta D</option>
        </select>
      </label>

      {error && <p className="question-form__error" role="alert">{error}</p>}

      <button className="admin-primary-button" type="submit" disabled={disabled}>
        {disabled ? 'Guardando...' : 'Crear pregunta'}
      </button>
    </form>
  )
}

export default QuestionForm
