import config from 'config'
import axios from 'axios'

const api = axios.create({
  baseURL: config.apiEndpoint,
})

function errorHandler(error) {
  const {
    response: { status },
  } = error

  if (!error.response) {
    return Promise.reject(error)
  }
  if (status === 401) {
    return Promise.reject(error)
  }
  if (status >= 400 || status <= 499) {
    console.log('Network error', error.response)
  }
  return Promise.reject(error)
}

api.interceptors.request.use((req) => {
  const token = JSON.parse(localStorage.getItem('token'))
  req.headers['Content-Type'] = 'application/json'
  req.headers.Accept = 'application/json'
  if (token) req.headers.Authorization = token

  return req
})

api.interceptors.response.use(
  (response) => response,
  (error) => errorHandler(error),
)

export { api }
