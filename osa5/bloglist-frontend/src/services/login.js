import axios from 'axios'

const baseUrl = 'http://localhost:3003/api'

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  const user = response.data
  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
  return user
}

const logout = () => {
  window.localStorage.removeItem('loggedBlogappUser')
}

const getStoredUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    return JSON.parse(loggedUserJSON)
  }
  return null
}

export default { login, logout, getStoredUser } 