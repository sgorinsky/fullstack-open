import React from 'react';
import { connect } from 'react-redux'

const Logout = ({user, setUser, setError, setNotification }) => {
    const handleClick = async () => {
        const temp = user.username;
        setUser(null)
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

export default Logout