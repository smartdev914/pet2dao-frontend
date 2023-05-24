import { getAllDepartment, getAllRole } from 'store/actions/employeeAction'
import { api } from 'services/api/useApi'
import { toastSuccess, toastError } from 'utils/log'

const handleDepartmentAdd = async (_department, dispatch, successCallback) => {
  if (_department == '') {
    toastError(`Please input the department name.`)
    return
  }
  api
    .post('/department/create', {
      name: _department,
    })
    .then(function (response) {
      if (response.data.id) {
        toastSuccess(`New Department added Successfully.`)
        dispatch(getAllDepartment())
        // setDepartment('')
        successCallback()
      }
    })
    .catch(function (error) {
      console.error('Department Error:', error)
    })
}

const handleDepartmentDelete = (item, dispatch) => {
  api
    .delete(`/department/delete/${item.id}`)
    .then(function (response) {
      if (response.data) {
        toastSuccess(`Department deleted Successfully.`)
        dispatch(getAllDepartment())
      }
    })
    .catch(function (error) {
      console.error('Department Delete Error:', error)
    })
}

const handleRoleAdd = async (_role, dispatch, successCallback) => {
  if (_role == '') {
    toastError(`Please input the role name.`)
    return
  }
  api
    .post('/role/create', {
      name: _role,
    })
    .then(function (response) {
      if (response.data.id) {
        toastSuccess(`New Role added Successfully.`)
        dispatch(getAllRole())
        successCallback()
        // setRole('')
      }
    })
    .catch(function (error) {
      console.error('Role Create Error:', error)
    })
}

const handleRoleDelete = (item, dispatch) => {
  api
    .delete(`/role/delete/${item.id}`)
    .then(function (response) {
      if (response.data) {
        toastSuccess(`Role deleted Successfully.`)
        dispatch(getAllRole())
      }
    })
    .catch(function (error) {
      console.error('Role Delete Error:', error)
    })
}

export {
  handleDepartmentAdd,
  handleDepartmentDelete,
  handleRoleAdd,
  handleRoleDelete,
}
