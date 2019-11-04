const filterReducer = (state = [], action) => {
  switch (action.type) {
    case 'FILTER':
      return action.filter
    default:
      return action
  }
}

export const filterAnecdotes = (stringToFilter) => {
  return {
    type: 'FILTER',
    filter: stringToFilter ? stringToFilter : ''
  }
}

export default filterReducer