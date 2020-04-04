import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import useField from '../hooks/useField'

import { login } from '../reducers/users'
import { 
    clearAllNotifications,
    setSuccessNotification, 
    setErrorNotification, 
} from '../reducers/notifications'

const LoginForm = ({ user, login, clearAllNotifications, setSuccessNotification, setErrorNotification }) => {
    const usernameField = useField('text', 'username');
    const passwordField = useField('password', 'password');

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInBlogsUser')
        if (typeof loggedUserJSON === 'object') {
            const u = JSON.parse(loggedUserJSON)
            login(u);
        }
    })

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const tempUsername = usernameField.input.value

            // If resetted after login dispatch, error for potential memory leak is raised
            usernameField.reset()
            passwordField.reset()

            const response = await login({ username: tempUsername, password: passwordField.input.value })

            window.localStorage.setItem('loggedInBlogsUser', JSON.stringify(user))

            if (response.username !== tempUsername) {
                setErrorNotification('Wrong credentials')
            } else {
                setSuccessNotification(`${tempUsername} logged in!`)
            }

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
        user: state.users.user
    }
}

const mapDispatchToProps = {
    login,
    clearAllNotifications,
    setSuccessNotification,
    setErrorNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)