import axios from 'axios'
import { actionTypes } from './types'
import config from 'config/index'
// import jwtdecode from 'jwt-decode'

const getAllDepartment = () => {
  return async (dispatch) => {
    const options = {
      method: 'GET',
      url: `${config.apiEndpoint}/api/department/findAll`,
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
    }
    await axios
      .request(options)
      .then(function (response) {
        dispatch({
          type: actionTypes.updateAllDepartment,
          data: response.data,
        })
      })
      .catch(function (error) {
        console.error(error)
      })
  }
}

const getAllRole = () => {
  return async (dispatch) => {
    const options = {
      method: 'GET',
      url: `${config.apiEndpoint}/api/role/findAll`,
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
    }
    await axios
      .request(options)
      .then(function (response) {
        dispatch({
          type: actionTypes.updateAllRole,
          data: response.data,
        })
      })
      .catch(function (error) {
        console.error(error)
      })
  }
}

const getAllEmployee = () => {
  const token = JSON.parse(localStorage.getItem('token'))
  return async (dispatch) => {
    const options = {
      method: 'GET',
      url: `${config.apiEndpoint}/api/employee/findAll`,
      headers: {
        'content-type': 'application/json',
        Authorization: token,
      },
    }
    await axios
      .request(options)
      .then(function (response) {
        dispatch({
          type: actionTypes.updateAllEmployee,
          data: response.data,
        })
      })
      .catch(function (error) {
        console.error(error)
      })
  }
}

const findOneByAccountAddr = async (accountAddr) => {
  const options = {
    method: 'GET',
    url: `${config.apiEndpoint}/api/employee/findOneByAccountAddr/${accountAddr}`,
    headers: {
      'content-type': 'application/json',
    },
  }
  try {
    const respones = await axios.request(options)
    return respones.data
  } catch (e) {
    console.log(e)
  }
}

const updateEmployee = (id, data, toast) => {
  const token = JSON.parse(localStorage.getItem('token'))
  return async (dispatch) => {
    const options = {
      method: 'PUT',
      url: `${config.apiEndpoint}/api/employee/update/${id}`,
      headers: {
        'content-type': 'application/json',
        Authorization: token,
      },
      data: {
        ...data,
      },
    }
    await axios
      .request(options)
      .then(function (response) {
        if (response.status == 200) {
          dispatch({
            type: actionTypes.updateEmployee,
            data: response.data.data,
          })
          toast({
            title: `Employee is Updated Successfully.`,
            position: 'top-right',
            isClosable: true,
          })
        } else {
          console.log('error')
        }
      })
      .catch(function (error) {
        console.error(error)
      })
  }
}

export {
  getAllDepartment,
  getAllRole,
  getAllEmployee,
  updateEmployee,
  findOneByAccountAddr,
}
