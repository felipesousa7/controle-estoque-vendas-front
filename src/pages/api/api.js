import Axios from 'axios'

const api = Axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
})

export default api
