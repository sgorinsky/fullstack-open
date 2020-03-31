import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// Reducers
import blogs from './reducers/blogs'
import user from './reducers/user'
import notifications from './reducers/notifications'

const reducer = combineReducers({
  blogs,
  user,
  notifications,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store