import React from 'react';
const Logout = ({setUsername, setPassword, setUser}) => {
    return (
        <>
            <button onClick={
                () => {
                    setUsername('username')
                    setPassword('password')
                    setUser(null)
                    window.localStorage.clear()
                }}>
                logout
            </button>
        </>
    )
}

export default Logout;