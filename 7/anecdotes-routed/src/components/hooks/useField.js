import { useState } from 'react'

const useField = () => {

  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const clear = () => {
    setContent('')
    setAuthor('')
    setInfo('')
  }
  
  return {
    content,
    setContent,
    author,
    setAuthor,
    info,
    setInfo,
    clear,
  }
}

export default useField