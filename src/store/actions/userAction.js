import { actionTypes } from './types'
import jwtdecode from 'jwt-decode'
import { keccak256 } from '@ethersproject/keccak256'
import { toUtf8Bytes } from '@ethersproject/strings'
import { api } from 'services/api/useApi'

const signIn = (account, navigate) => {
  return async (dispatch) => {
    await api
      .post('/employee/signIn', { accountAddr: account })
      .then(async (response) => {
        if (response.data.token) {
          const payload = jwtdecode(response.data.token)
          try {
            const { department, role } = payload
            const _permission = await api.get(
              `/permission/findAllByKeccak256/${keccak256(
                toUtf8Bytes(`${department}_${role}`),
              )}`,
            )
            console.log(
              'User Signin Department %s, Role %s, Permission',
              department,
              role,
              _permission.data,
            )
            payload.approvePermission = _permission.data
          } catch (e) {
            console.log('SignIn Error', e)
          }

          console.log('Decoded user', payload)
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
        console.error('SignIn Error', error)
      })
  }
}

export { signIn }
