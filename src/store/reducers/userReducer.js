import { actionTypes } from '../actions/types'

const initialState = {
  id: 0,
  name: '',
  isAdmin: false,
  approvePermission: [],
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
        isAdmin: action.payload.isAdmin,
        approvePermission: action.payload.approvePermission || [],
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
