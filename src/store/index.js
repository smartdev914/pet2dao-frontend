import { useSelector } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { userReducer } from './reducers/userReducer'
import { employeeReducer } from './reducers/employeeReducer'
import { proposalReducer } from './reducers/proposalReducer'

const rootReducer = combineReducers({
  userReducer,
  employeeReducer,
  proposalReducer,
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
)

// Infer the `RootState` and `AppDispatch` types from the store itself
// type RootState = ReturnType<typeof store.getState>;

// const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector = useSelector

export { store, useAppSelector }
