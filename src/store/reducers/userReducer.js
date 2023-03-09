import { actionTypes } from '../actions/types'

const initialState = {
  id: 0,
  name: '',
  permission: '',
  isManager: false,
  isApproved: false,
  department: '',
  role: '',
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.siginIn:
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        permission: action.payload.permission,
        isManager: action.payload.isManager,
        isApproved: action.payload.isApproved,
        department: action.payload.department,
        role: action.payload.role,
      }
    default:
      return state
  }
}

export { userReducer }
