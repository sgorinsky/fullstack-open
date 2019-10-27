import React from 'react';
import './App.css';
// hooks
import useCounter from './hooks/useCounter'
import useField from './hooks/useField'
import useResource from './hooks/useResource'

const App = (props) => {
  const left = useCounter()
  const right = useCounter()

  const name = useField('text')
  const number = useField('text')
  const born = useField('date')
  const height = useField('number')
  

  const [persons, personService] = useResource('http://localhost:3005/api/persons')
  //const [notes, noteService] = useResource('http://localhost:3005/api/notes')

  /*
  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
  */

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
  }

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

      <div>
        {/*
        COMMENTING THIS PART OUT BECAUSE I DON'T HAVE THE NOTES BACKEND SET UP FOR THIS EXERCISE, JUST PHONEBOOK
          <h2>notes</h2>
          <form onSubmit={handleNoteSubmit}>
            <input {...content} />
            <button>create</button>
          </form>
          {notes.map(n => <p key={n.id}>{n.content}</p>)}
        */}
        

        <h2>persons</h2>
        <form onSubmit={handlePersonSubmit}>
          name <input {...name} /> <br />
          number <input {...number} />
          <button>create</button>
        </form>
        {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
      </div>
    </>
  )
}

export default App;
