import './App.css';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import LoggedinPage from './components/LoggedinPage';
import efreiLogo from './assets//efrei-logo.png'; 
import googleLogo from './assets/logo.png';


function App() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "18310793652-d43o2ggeohg4m5ldl2p38ktga16cnqel.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );

    google.accounts.id.prompt();
  }, []);

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    setIsLoggedIn(true);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleLogout() {
    setUser({});
    setIsLoggedIn(false);
    document.getElementById("signInDiv").hidden = false;
  }

  function handleLogin(e) {
    e.preventDefault();

    // Perform login authentication logic here
    // Example: Check if the entered email and password match a list of credentials
    const credentials = [
      { email: 'dsgfdgdqsdg392@gmail.com', password: '123456789pro' },
      { email: 'user2@example.com', password: 'password2' },
      // Add more credentials as needed
    ];

    const matchedCredential = credentials.find(
      (credential) => credential.email === email && credential.password === password
    );

    if (matchedCredential) {
      // Successful authentication
      setIsLoggedIn(true);
    } else {
      // Authentication failed
      console.log('Invalid email or password');
    }

    // Clear form fields after submission
    setEmail('');
    setPassword('');
  }

  function handleGoogleLoginSuccess(response) {
    const { email } = response.profileObj;
    handleLogin(email);
  }

  function handleGoogleLoginFailure(error) {
    console.log('Google login failed:', error);
  }

  function handleCreateAccount() {
    window.open('https://accounts.google.com/signup', '_blank');
  }

  return (
    <div className="App">
      <img src={efreiLogo} alt="Efrei Logo" className="efrei-logo" />
      <div id="signInDiv"></div>
      {isLoggedIn ? (
        <LoggedinPage user={user} onLogout={handleLogout} />
      ) : (
        <div className="login-page">
          <div className="login-container">
          <img src={googleLogo} alt="Logo" className="logo" />
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
              <button
                type="button"
                className="create-account-button"
                onClick={handleCreateAccount}
              >
                Create an Account
              </button>
            </form>
            <GoogleLogin
              clientId="18310793652-d43o2ggeohg4m5ldl2p38ktga16cnqel.apps.googleusercontent.com"
              buttonText="Sign in with Google"
              onSuccess={handleGoogleLoginSuccess}
              onFailure={handleGoogleLoginFailure}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
