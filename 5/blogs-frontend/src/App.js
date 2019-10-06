import React, { useState } from 'react';
import LoginForm from './components/LoginForm'

function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  
  
  return (
    <>
    {
      user === null ?
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          setToken={setToken}
          setErrorMessage={setErrorMessage}
        /> :
        <div>{user} logged in </div>
    }
      
    </>
  );
}

export default App;
