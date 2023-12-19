import React, { useState, useRef } from 'react';
import './LoginPage.css';

const LoginPage = ({ onAuthentication }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const formRef = useRef(); // Reference to the form

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignUp ? 'http://localhost:8080/signup' : 'http://localhost:8080/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const result = await response.json();
          console.log('Response:', result);
          onAuthentication(true, username);
          setLoginMessage('Login successful!');
        } else {
          const textResult = await response.text();
          console.log('Response:', textResult);
          onAuthentication(true, username);
          setLoginMessage(textResult);
        }
      } else {
        setLoginMessage('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginMessage('An error occurred. Please try again.');
    }
  };

  const handleGuestLogin = async () => {
    const guestUsername = 'Anonymous'; // Guest username
    const guestPassword = 'guest'; // Guest password
    const url = 'http://localhost:8080/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: guestUsername, password: guestPassword }),
      });

      if (response.ok) {
        // Handle response for guest login
        onAuthentication(true, guestUsername);
        setLoginMessage('Guest login successful!');
      } else {
        // Handle failed login
        setLoginMessage('Guest login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-inner">
        <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        <form className="login-form" onSubmit={handleSubmit} ref={formRef}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />

          <div className="guest-login">
            <button onClick={handleGuestLogin}>Login as Guest</button> {/* Guest login button */}
          </div>

          <div className="button-container">
            <button className="sign-in" type="submit">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
            <button className="sign-up" type="button" onClick={toggleForm}>
              {isSignUp ? 'Go to Sign In' : 'Go to Sign Up'}
            </button>
          </div>
        </form>
        {loginMessage && <div className="login-message">{loginMessage}</div>}
      </div>
    </div>
  );
};

export default LoginPage;