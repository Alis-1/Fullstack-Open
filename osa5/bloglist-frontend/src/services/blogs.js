import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog)
  return response.data
}

const update = async (id, newBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

const setToken = (newToken) => {
  const token = `bearer ${newToken}`
  axios.defaults.headers.common['Authorization'] = token
}

export default { getAll, create, update, remove, setToken }