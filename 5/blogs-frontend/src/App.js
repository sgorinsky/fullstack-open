import React, { useState } from 'react';
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(false);

  return (
    <>
      <Notification message={notification} error={error} />
      {
        user === null ?
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            setToken={setToken}
            setUser={setUser}
            setNotification={setNotification}
            error={error}
            setError={setError}
          /> :
          <div>
            <p>
              {user} logged in
              <button onClick={
                () => {
                  setUser(null)
                  window.localStorage.clear()
                  console.log(window.localStorage)
                }}>
                logout
              </button>
            </p>
          </div>
      }
    </>
  );
}

export default App;
