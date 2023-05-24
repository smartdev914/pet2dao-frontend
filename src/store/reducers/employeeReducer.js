import { actionTypes } from '../actions/types'

const initialState = {
  department: [],
  role: [],
  employee: [],
}

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.updateAllDepartment:
      return {
        ...state,
        department: action.data,
      }

    case actionTypes.updateAllRole:
      return {
        ...state,
        role: action.data,
      }

    case actionTypes.updateAllEmployee:
      return {
        ...state,
        employee: action.data,
      }

    case actionTypes.createEmployee: {
      const employee = state.employee
      employee.push(action.data)
      return {
        ...state,
        employee: employee,
      }
    }

    case actionTypes.updateEmployee: {
      const employee = state.employee.map((item) =>
        item.id === action.data.id ? action.data : item,
      )
      return {
        ...state,
        employee: employee,
      }
    }

    case actionTypes.deleteEmployee: {
      const employee = state.employee.filter((item) => {
        return item.id !== action.data.id
      })
      return {
        ...state,
        employee: employee,
      }
    }

    default:
      return state
  }
}

export { employeeReducer }
