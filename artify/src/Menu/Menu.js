// Menu.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';  // You can create a CSS file for styling if needed

const Menu = () => {
  return (
    <div className="menu-container">
      <div className="menu-left">
      <Link to="/Filters"><h1>Artify</h1></Link>
      </div>
      <div className="menu-right">
        <span className="xp">XP: 0</span>
        <Link to="/Scoreboard">Scoreboard</Link>
        <Link to="/Collection">Collection</Link>
        <Link to="/">Logout<i class="bi bi-box-arrow-left"></i></Link>
      </div>
    </div>
  );
};

export default Menu;
