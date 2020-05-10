import React from 'react'

import { ME } from '../queries'
import { useQuery } from '@apollo/client'

const Recommend = ({ books }) => {
  const user = useQuery(ME)
  console.log(user)
  return (
    <div>
      {
        
      }
    </div>
  )
}

export default Recommend