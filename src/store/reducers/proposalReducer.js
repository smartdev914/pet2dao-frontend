import { actionTypes } from '../actions/types'

const initialState = {
  publicProposal: [],
  privateProposal: [],
}

const proposalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.updateAllPublicProposal:
      return {
        ...state,
        publicProposal: action.data,
      }
    case actionTypes.updateAllPrivateProposal: {
      return {
        ...state,
        privateProposal: action.data,
      }
    }

    default:
      return state
  }
}

export { proposalReducer }
