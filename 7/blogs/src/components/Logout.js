import React from 'react';
import { connect } from 'react-redux'

import { clearErrorNotification, setErrorNotification } from '../reducers/notifications'
import { logout } from '../reducers/users'

const Logout = ({ user, logout, clearErrorNotification, setErrorNotification }) => {
    const handleClick = () => {
        let tempUsername;
        try {
            tempUsername = user.username
            window.localStorage.clear()
        } finally {
            setErrorNotification(`${tempUsername} logged out`)
            setTimeout(() => {
                // I believe we have to place logout in here because if we don't, logout will IMMEDIATELY rerender the ENTIRE App, 
                //      the parent of Notification, which immediately removes our notification from view. 
                //      So we place logout in a timeout in order to keep it from 
                //      rerendering ANY components that are tied to state.users.user
                // OR The bug could have something to do with redux's async middleware, because even after removing logout()
                //      from this timeout and removing all things tied to user state, in App.js, there is still no notification
                //      rendered after logout
                logout()
                // I'm beginning to suspect it's an redux-thunk async middleware issue because even if I take out 
                //      clearErrorNotification(), the Notification still doesn't appear
                clearErrorNotification()
            }, 1500)
        }
    }

    return (
        <button className='btn btn-danger m-1' onClick={handleClick}> are you sure? </button>
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