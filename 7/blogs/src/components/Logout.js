import React from 'react';
import { connect } from 'react-redux'

import { clearErrorNotification, setErrorNotification } from '../reducers/notifications'
import { logout } from '../reducers/users'

const Logout = ({ user, logout, clearErrorNotification, setErrorNotification }) => {
    const handleClick = async () => {
        const temp = user.username

        logout()
        window.localStorage.clear()

        setErrorNotification(`${temp} has logged out`)
        setTimeout(() => {
            clearErrorNotification()
        }, 3000)
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