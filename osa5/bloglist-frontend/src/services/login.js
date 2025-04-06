import axios from 'axios'
import blogService from './blogs'

const baseUrl = 'http://localhost:3003/api'

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  const user = response.data
  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
  blogService.setToken(user.token)
  return user
}

const logout = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  blogService.setToken(null)
}

const getStoredUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    return user
  }
  return null
}

export default { login, logout, getStoredUser } 