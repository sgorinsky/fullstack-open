import React from 'react'
import { filterAnecdotes } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  const handleChange = (event) => {
    return props.filterAnecdotes(event.target.value)
  }
  return (
    <input placeholder='filter' onChange={handleChange} />
  )
}

export default connect(
  null,
  { filterAnecdotes }
)(Filter)