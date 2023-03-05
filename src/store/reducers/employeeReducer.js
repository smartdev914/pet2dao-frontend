import { actionTypes } from '../actions/types'

const initialState = {
  department: [],
  role: [],
  employee: [],
}

const employeeReducer = (state = initialState, action) => {
  console.log('employeeRe', action.data)
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
    case actionTypes.updateEmployee: {
      const employee = state.employee.map((item) =>
        item.id === action.data.id ? action.data : item,
      )
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
