import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import store from './store'
import { Provider } from 'react-redux'

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