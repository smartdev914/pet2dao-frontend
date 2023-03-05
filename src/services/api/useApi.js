import config from 'config'
import axios from 'axios'

function client(endpoint, method, customOption = {}) {
  const options = {
    method: method,
    url: `${config.apiEndpoint}${endpoint}`,
    ...customOption,
  }
  return axios
    .request(options)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      console.error(error)
    })
}

export { client }
