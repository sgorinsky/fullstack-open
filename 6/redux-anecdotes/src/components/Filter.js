import React from 'react'
import { filter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    return props.store.dispatch(filter(event.target.value))
  }
  return (
    <input placeholder='filter' onChange={handleChange} />
  )
}

export default Filter