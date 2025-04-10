import axios from 'axios'

const baseUrl = 'http://localhost:3001/api'

const getAll = () => {
  return axios.get(`${baseUrl}/persons`)
}

const create = newPerson => {
  return axios.post(`${baseUrl}/persons`, newPerson)
}

const remove = id => {
  return axios.delete(`${baseUrl}/persons/${id}`)
}

export default { getAll, create, remove } 