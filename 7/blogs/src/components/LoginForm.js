import React from 'react';
import { connect } from 'react-redux'
import useField from '../hooks/useField'

import { login } from '../reducers/user'
import { clearAllNotifications , setSuccessNotification, setErrorNotification, } from '../reducers/notifications'

const LoginForm = ({ user, login, clearAllNotifications, setSuccessNotification, setErrorNotification }) => {
    const usernameField = useField('text', 'username');
    const passwordField = useField('password', 'password');

    const handleLogin = (event) => {
        event.preventDefault()
        try {
            const tempUsername = usernameField.input.value
            login({ username: tempUsername, password: passwordField.input.value })

            window.localStorage.setItem('loggedInBlogsUser', JSON.stringify(user))

            usernameField.reset()
            passwordField.reset()
            setSuccessNotification(`${tempUsername} logged in!`)

            setTimeout(() => {
                clearAllNotifications()
            }, 1000)
            
        } catch (exception) {
            console.log(exception)
            setErrorNotification('Wrong credentials');
            setTimeout(() => {
                clearAllNotifications()
            }, 3000)
            
        }
    }
    return (
        <>
            <form onSubmit={handleLogin} className='login'>
                <div>
                    <h4> Blogs login </h4>
                    username
                    <input { ...usernameField.input } />
                </div>
                <div>
                    password
                    <input { ...passwordField.input } />
                </div>
                <button type="submit"> login </button>
            </form>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    login,
    clearAllNotifications,
    setSuccessNotification,
    setErrorNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)