// react/redux dependencies
import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
//components
import Feedback from './components/Feedback'
// reducers
import counterReducer from './reducers/counterReducer'

const store = createStore(counterReducer)

const App = () => {
  

  return (
    <div>
      <button onClick={(e) => store.dispatch({type: 'GOOD'})}> good </button>
      <button onClick={(e) => store.dispatch({ type: 'NEUTRAL' })}>neutral</button>
      <button onClick={(e) => store.dispatch({ type: 'BAD' })}>bad</button>
      <button onClick={(e) => store.dispatch({ type: 'ZERO' })}>reset stats</button>
      <Feedback good={store.getState().good} bad={store.getState().bad} neutral={store.getState().neutral} />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
