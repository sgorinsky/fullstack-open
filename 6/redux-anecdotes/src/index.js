import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(reducer)

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App store={store} />
    </Provider>,
    document.getElementById('root')
  )
}

renderApp()
store.subscribe(renderApp)