import React from 'react';
import logo from '../assets/logo.png';
import logoEfrei from '../assets/efrei-logo.png';
import './LoggedinPage.css';

function LoggedinPage({ user, onLogout }) {
  const handleLogout = () => {
    onLogout(); // Appelle la fonction de rappel onLogout lors du clic sur le bouton "Sign Out"
  };

  return (
    <div className="loggedin-page">
      <div className="loggedin-container">
        <img src={logoEfrei} alt="Logo Efrei" className="logo-efrei" />
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="loggedin-title">Welcome, {user.name}!</h1>
        <button onClick={handleLogout} className="logout-button">Sign Out</button>
      </div>
    </div>
  );
}

export default LoggedinPage;
