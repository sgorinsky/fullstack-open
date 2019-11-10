import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = (props) => {
  return(
    <div>
      <div>
        <input type="radio" name="filter" onChange={() => props.filterChange('ALL')} /> all
        <input type="radio" name="filter" onChange={() => props.filterChange('IMPORTANT')} /> important
        <input type="radio" name="filter" onChange={() => props.filterChange('NONIMPORTANT')} /> nonimportant
      </div>
    </div>
  )
}

export default connect(
  null, 
  { filterChange }
)(VisibilityFilter)