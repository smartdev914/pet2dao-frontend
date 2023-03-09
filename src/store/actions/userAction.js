import axios from 'axios'
import { actionTypes } from './types'
import config from 'config/index'
import jwtdecode from 'jwt-decode'

const signIn = (account, navigate) => {
  return async (dispatch) => {
    const options = {
      method: 'POST',
      url: `${config.apiEndpoint}/api/employee/signIn`,
      // params: { accountAddr: account },
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
      data: { accountAddr: account },
    }

    await axios
      .request(options)
      .then(function (response) {
        if (response.data.token) {
          const payload = jwtdecode(response.data.token)
          dispatch({
            type: actionTypes.siginIn,
            payload: payload,
          })
          localStorage.setItem('token', JSON.stringify(response.data.token))
          navigate('/proposal/public')
        } else {
          navigate('/signup')
        }
      })
      .catch(function (error) {
        console.error(error)
      })
  }
}

export { signIn }
