const API_URL = 'http://localhost:3001'

export async function loginUser(email, password) {
  try {
    const response = await fetch(
      `${API_URL}/users?email=${encodeURIComponent(email.trim())}`
    )

    if (!response.ok) {
      throw new Error('Error al consultar el servidor')
    }

    const users = await response.json()

    if (users.length === 0) {
      return null
    }

    const user = users[0]

    if (String(user.password) !== String(password)) {
      return null
    }

    return user
  } catch (error) {
    console.error('Error en loginUser:', error)
    throw error
  }
}