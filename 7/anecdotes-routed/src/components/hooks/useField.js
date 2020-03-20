import { useState } from 'react'

const useField = (name) => {

  const [value, setValue] = useState('')

  return {
    name,
    value,
    onChange: (e) => {
      if (e.target) {
        setValue(e.target.value)
      } else {
        setValue(e)
      }
    }
  }
}

export default useField