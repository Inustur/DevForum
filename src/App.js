import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import Channel from './Channel';  // Import Channel component
import TopicPage from './TopicPage';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const handleAuthentication = (status, user) => {
    setIsAuthenticated(status);
    setUsername(user);
  };

  return (
    <Router>
      <nav className="navbar">
        <div className="logo">Dev<span className="logo-distinct">Forum</span>.</div>
        <div className="nav-links">
          <Link to="/"><ion-icon name="home-outline"></ion-icon></Link>
          <Link to="/channel"><ion-icon name="albums-outline"></ion-icon></Link>
        </div>

        <div className="login">
          {isAuthenticated ? (
            <span>{username}</span>
          ) : (
            <Link to="/login"><ion-icon name="person-circle-outline"></ion-icon>Log In</Link>
          )}
        </div>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage onAuthentication={handleAuthentication} />} />
        <Route path="/channel" element={<Channel username={isAuthenticated ? username : 'None'} />} />
        <Route path="/topic" element={<TopicPage username={isAuthenticated ? username : 'None'}/>} />
      </Routes>
    </Router>
  );
}

const Home = () => (
  <div className="landing-container">
    <div className="intro">
      <h1>Welcome to <span>Dev<span className="logo-distinct">Forum</span>.</span></h1>
      <p>Dive into a hub where developers collaborate, share insights, and solve challenges together. It's not just coding—it's creating with a community!</p>
    </div>

    <div className="search-container">
      <input type="text" placeholder="Search..." />
      <button><ion-icon name="search-outline"></ion-icon></button>
    </div>

    <div className="reminder">
      <p><span>Sign-in</span> to use features</p>
    </div>
  </div>
);

export default App;



