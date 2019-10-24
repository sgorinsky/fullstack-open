import React from 'react';
import './App.css';
import useCounter from './hooks/useCounter'
import useField from './hooks/useField'

const App = (props) => {
  const left = useCounter()
  const right = useCounter()

  const name = useField('text')
  const born = useField('date')
  const height = useField('number')
  return (
    <>
      <div>
        <div>{left.value}</div>
        <button onClick={left.increase}>
          left plus
        </button>
        <button onClick={left.decrease}>
          left minus
        </button>
        <button onClick={left.zero}>
          left zero
        </button>
      </div>
      <div>
        <div>{right.value}</div>
        <button onClick={right.increase}>
          right plus
        </button>
        <button onClick={right.decrease}>
          right minus
        </button>
        <button onClick={right.zero}>
          right zero
        </button>
      </div>
      <br></br>
      <div>
        <form>
          name:
        <input {...name} />
          <br />
          birthdate:
        <input {...born} />
          <br />
          height:
        <input {...height} />
        </form>
        <div>
          {name.value} {born.value} {height.value ? height.value + '"' : ''} 
        </div>
      </div>
    </>
  )
}

export default App;
