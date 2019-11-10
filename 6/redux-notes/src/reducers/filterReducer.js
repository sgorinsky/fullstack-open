const filterReducer = (state = 'SET_FILTER', action) => {
  console.log('FILTER REDUCER')
  switch(action.type) {
    case 'SET_FILTER':
      return action.filter
    default:
      return state
  }
}

export const filterChange = filter => {
  return {
    type: 'SET_FILTER',
    filter,
  }
}

export default filterReducer