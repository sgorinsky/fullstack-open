import React from 'react'
import ReactDOM from 'react-dom'


const course = {
  name: 'Half Stack application development',
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
}

const sum = course.parts.reduce((total, next) => {
  return total + next.exercises;
}, 0);


const Header = (course) => {
  return (
    <div>
      <h1>{course.name}</h1>      
    </div>
  )
} 

const Part = (course) => {
  return (
    <div>
      <p>
        {course.part} {course.exercises}
      </p>

    </div>
  )
} 

const Content = () => {

  return (
    <div>
      <Part part={course.parts[0].name} exercises={course.parts[0].exercises} />
      <Part part={course.parts[1].name} exercises={course.parts[1].exercises} />
      <Part part={course.parts[2].name} exercises={course.parts[2].exercises} />
    </div>
  )
} 

const Total = (sum) => {

  return (
    <p>
      Number of exercises: {sum.total}
    </p>
    
  )
} 

const App = () => {
  return (
    <>  
      <Header name={course.name} />
      <Content />
      <Total total={sum} />
    </>
  
    )
  }
  
ReactDOM.render(<App />, document.getElementById('root'))