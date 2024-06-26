import { actionTypes } from './types'
import { api } from 'services/api/useApi'
import { toastError, toastSuccess } from 'utils/log'

const getAllDepartment = () => {
  return async (dispatch) => {
    await api
      .get('department/findAll')
      .then(function (response) {
        dispatch({
          type: actionTypes.updateAllDepartment,
          data: response.data,
        })
      })
      .catch(function (error) {
        console.error('Get Department Error:', error)
      })
  }
}

const getAllRole = () => {
  return async (dispatch) => {
    await api
      .get('/role/findAll')
      .then(function (response) {
        dispatch({
          type: actionTypes.updateAllRole,
          data: response.data,
        })
      })
      .catch(function (error) {
        console.error('Get Role Error:', error)
      })
  }
}

const getAllEmployee = () => {
  return async (dispatch) => {
    await api
      .get('/employee/findAll')
      .then(function (response) {
        dispatch({
          type: actionTypes.updateAllEmployee,
          data: response.data,
        })
      })
      .catch(function (error) {
        console.error('Get All Employee Error:', error)
      })
  }
}

const createEmployee = (data, navigate = null) => {
  return async (dispatch) => {
    await api
      .post('/employee/create', data)
      .then(function (response) {
        if (response.data.id) {
          if (navigate == null) {
            dispatch({
              type: actionTypes.createEmployee,
              data: response.data,
            })
            toastSuccess(`New Employee is Successfully Created.`)
          }
        } else navigate('/proposal/public')
      })
      .catch(function (error) {
        toastError('Network Error', 'Employee Creation Error:', error)
      })
  }
}

const updateEmployee = (id, data, next) => {
  return async (dispatch) => {
    await api
      .put(`/employee/update/${id}`, data)
      .then(function (response) {
        if (response.status == 200) {
          dispatch({
            type: actionTypes.updateEmployee,
            data: response.data.data,
          })
          toastSuccess(`Employee is Successfully Updated.`)
        } else {
          toastError(`You can't update employee.`)
        }
        next()
      })
      .catch(function (error) {
        toastError('Network Error', 'Employee Update Error:', error)
        next()
      })
  }
}

const deleteEmployee = (id) => {
  return async (dispatch) => {
    await api
      .delete(`/employee/delete/${id}`)
      .then(function (response) {
        if (response.status == 200) {
          dispatch({
            type: actionTypes.deleteEmployee,
            data: { id: id },
          })
          toastSuccess(`Employee is Deleted Successfully.`)
        } else {
          toastError(`You can't delete employee.`)
        }
      })
      .catch(function (error) {
        console.error('Delete Employee Error:', error)
      })
  }
}

export {
  getAllDepartment,
  getAllRole,
  getAllEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
}
