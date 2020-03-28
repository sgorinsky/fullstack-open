import React from 'react';
import { connect } from 'react-redux'
import useField from '../hooks/useField'

import { login } from '../reducers/users'

const LoginForm = ({ user, login, setNotification, setError }) => {
    const usernameField = useField('text', 'username');
    const passwordField = useField('password', 'password');

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const username = usernameField.input.value
            login({ username, password: passwordField.input.value })

            window.localStorage.setItem('loggedInBlogsUser', JSON.stringify(user))

            usernameField.reset()
            passwordField.reset()
            setNotification(`${username} logged in!`)

            setTimeout(() => {
                setNotification(null);
                setError(false);
            }, 1000)
            
        } catch (exception) {
            console.log(exception)
            setError(true);
            setNotification('Wrong credentials');
            setTimeout(() => {
                setNotification(null);
                setError(false);
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
        user: state.users
    }
}

const mapDispatchToProps = {
    login,
}

export default connect(null, mapDispatchToProps)(LoginForm)