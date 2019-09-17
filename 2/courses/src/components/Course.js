import React from 'react'

const Course = ({course}) => {
    const parts = course['parts'].map(part => <li key={part.id}> {part.name} {part.exercises} </li>)
    const sum = course['parts'].reduce((next, part) => part.exercises + next, 0);
    return (
        <>
            <h3>{course.name}</h3>
            {parts}
            <strong> total of {sum} exercises </strong>
        </>
    )

}

export default Course
