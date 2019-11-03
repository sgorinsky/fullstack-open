import React from 'react'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = (props) => {
  const filterClicked = (value) => {
    console.log(value)
    props.store.dispatch(filterChange(value))
  }
  return(
    <div>
      <div>
        <input type="radio" name="filter" onChange={() => filterClicked('ALL')} /> all
          <input type="radio" name="filter" onChange={() => filterClicked('IMPORTANT')} /> important
          <input type="radio" name="filter" onChange={() => filterClicked('NONIMPORTANT')} /> nonimportant
        </div>
    </div>
  )
}

export default VisibilityFilter 