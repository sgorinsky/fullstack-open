import React from 'react';
import { connect } from 'react-redux'

import { clearErrorNotification, setErrorNotification } from '../reducers/notifications'
import { logout } from '../reducers/user'

const Logout = ({ user, logout, clearErrorNotification, setErrorNotification }) => {
    const handleClick = async () => {
        const temp = user.username

        logout()

        setErrorNotification(`${temp} has logged out`)
        setTimeout(() => {
            clearErrorNotification()
        }, 3000)
        window.localStorage.clear()
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
    clearErrorNotification,
    setErrorNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)