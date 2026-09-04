const API_URL = 'http://localhost:3001/questions'

async function request(url, options = {}) {
  const response = await fetch(url, options)

  if (!response.ok) {
    const message = await response.text().catch(() => '')
    throw new Error(message || `Error HTTP ${response.status}`)
  }

  if (response.status === 204) {
    return null
  }

  const text = await response.text()
  return text ? JSON.parse(text) : null
}

export function getQuestions() {
  return request(API_URL)
}

export function createQuestion(question) {
  return request(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(question)
  })
}

export function deleteQuestion(id) {
  return request(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
}
