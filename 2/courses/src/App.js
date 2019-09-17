import React from 'react';
import logo from './logo.svg';
import './App.css';
import Course from './components/Course'

const App = ({ courses }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map((course) => <Course course={course} />)}
    </>
  )
}

export default App;
