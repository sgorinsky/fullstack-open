import React from 'react';
import { connect } from 'react-redux'

import { clearAllNotifications, setErrorNotification } from '../reducers/notifications'
import { logout } from '../reducers/user'

const Logout = ({ user, logout, clearAllNotifications, setErrorNotification }) => {
    const handleClick = () => {
        const temp = user.username

        logout()
        window.localStorage.clear()

        setErrorNotification(`${temp} has logged out`)
        setTimeout(() => {
            clearAllNotifications()
        }, 3000)
    }

    return (
        <button onClick={handleClick}> are you sure? </button>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = {
    logout,
    clearAllNotifications,
    setErrorNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)