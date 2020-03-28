import React from 'react';
import { connect } from 'react-redux'

import { logout } from '../reducers/users'

const Logout = ({ user, logout, setError, setNotification}) => {
    const handleClick = async () => {
        const temp = user.username;
        logout()
        window.localStorage.clear()
        setError(true);
        setNotification(`${temp} has logged out`)
        setTimeout(() => {
            setError(false);
            setNotification(null);
        }, 1000)
    }

    return (
        <button onClick={handleClick}> are you sure? </button>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.users
    }
}
const mapDispatchToProps = {
    logout,
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)