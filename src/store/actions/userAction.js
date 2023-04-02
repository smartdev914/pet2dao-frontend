import axios from 'axios'
import { actionTypes } from './types'
import config from 'config/index'
import jwtdecode from 'jwt-decode'
import { client } from 'services/api/useApi'
import { keccak256 } from '@ethersproject/keccak256'
import { toUtf8Bytes } from '@ethersproject/strings'

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
      .then(async (response) => {
        if (response.data.token) {
          const payload = jwtdecode(response.data.token)
          try {
            const token = JSON.parse(localStorage.getItem('token'))
            const customOption = {
              headers: {
                Authorization: token,
              },
            }
            const { department, role } = payload
            const _permission = await client(
              `/api/permission/findAllByKeccak256/${keccak256(
                toUtf8Bytes(`${department}_${role}`),
              )}`,
              'GET',
              customOption,
            )
            console.log(department, role, _permission.data)
            payload.approvePermission = _permission.data
          } catch (e) {
            console.log(e)
          }

          console.log('+++++++++++++++++', payload)
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
