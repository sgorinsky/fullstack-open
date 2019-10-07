import React from 'react';
const Logout = ({user, setUser, setError, setNotification}) => {
    return (
        <button onClick={() => {
            const temp = user.username;
            setUser(null)
            window.localStorage.clear()
            
            setError(true);
            setNotification(`${temp} has logged out`)
            setTimeout(() => {
                setError(false);
                setNotification(null);
            }, 1000)
            
        }}> logout </button>
    )
}
export default Logout