import React from 'react';
import { connect } from 'react-redux'

import { clearErrorNotification, setErrorNotification } from '../reducers/notifications'
import { logout } from '../reducers/users'

const Logout = ({ user, logout, clearErrorNotification, setErrorNotification }) => {
    const handleClick = async () => {
        window.localStorage.clear()
        setErrorNotification(`${user.username} logged out`)
        setTimeout(() => {
            clearErrorNotification()
        }, 2000)
    }

    return (
        <button className='btn btn-warning m-1' onClick={handleClick}> are you sure? </button>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.users.user
    }
}

const mapDispatchToProps = {
    logout,
    clearErrorNotification,
    setErrorNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)