import React, { useState } from 'react';
import logo from '../assets/logo.png';
import logoEfrei from '../assets/efrei-logo.png';
import './LoginPage.css';
import { GoogleLogin } from 'react-google-login';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Perform login authentication logic here
    // Example: Check if the entered email and password match a list of credentials
    const credentials = [
      { email: 'user1@example.com', password: 'password1' },
      { email: 'user2@example.com', password: 'password2' },
      // Add more credentials as needed
    ];

    const matchedCredential = credentials.find(
      (credential) => credential.email === email && credential.password === password
    );

    if (matchedCredential) {
      // Successful authentication
      // Call the onLogin callback to indicate successful login
      onLogin();
    } else {
      // Authentication failed
      // Handle error or display error message
      console.log('Invalid email or password');
    }

    // Clear form fields after submission
    setEmail('');
    setPassword('');
  };

  const handleGoogleLoginSuccess = (response) => {
    // Get the email from the response
    const { email } = response.profileObj;

    // Call the onLogin function with the email to indicate successful login
    onLogin(email);
  };

  const handleGoogleLoginFailure = (error) => {
    console.log('Google login failed:', error);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={logoEfrei} alt="Logo Efrei" className="logo-efrei" />
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="login-title">Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email" className="label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        <GoogleLogin
          clientId="VOTRE_CLIENT_ID"
          buttonText="Sign in with Google"
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          cookiePolicy="single_host_origin"
        />
      </div>
    </div>
  );
}

export default LoginPage;
