import { useState } from 'react'

const NotificationHook = () => {
  const [notification, setNotification] = useState('')
  const [shouldAppear, setShouldAppear] = useState(false)

  const show = () => {
    setShouldAppear(true)
  }

  const hide = () => {
    setShouldAppear(false)
  }

  return {
    display: notification,
    setDisplay: (display) => setNotification(display),
    appear: shouldAppear,
    show,
    hide,
  }
}

export default NotificationHook