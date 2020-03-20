import { useState } from 'react'

const useNotification = () => {
  const [notification, setNotification] = useState('')
  const [shouldAppear, setShouldAppear] = useState(false)

  const show = () => {
    setShouldAppear(true)
  }

  const hide = () => {
    setShouldAppear(false)
  }

  return {
    show,
    hide,
    appear: shouldAppear,
    display: notification,
    setDisplay: (display) => setNotification(display),
  }
}

export default useNotification