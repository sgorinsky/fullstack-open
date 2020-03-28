import React from 'react';
import { connect } from 'react-redux'
import useField from '../hooks/useField'

import { login } from '../reducers/user'

const LoginForm = ({ user, login, setNotification, setError }) => {
    const usernameField = useField('text', 'username');
    const passwordField = useField('password', 'password');

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const tempUsername = usernameField.input.value
            login({ username: tempUsername, password: passwordField.input.value })

            window.localStorage.setItem('loggedInBlogsUser', JSON.stringify(user))

            usernameField.reset()
            passwordField.reset()
            setNotification(`${tempUsername} logged in!`)

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
        user: state.user
    }
}

const mapDispatchToProps = {
    login,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)