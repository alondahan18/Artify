// Menu.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';
import { Link } from 'react-router-dom';
import { useToken } from '../TokenContext';


const Menu = () => {
  const { token, userScore } = useToken(); // Access token and userScore from useToken hook

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleCollectionClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/artworks/learned', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.error);
        throw new Error(errorData.error);
      }
  
      const data = await response.json();
      navigate('/Collection', { state: { collectionData: data } });
    } catch (error) {
      alert(error.message);
      console.error('Error fetching collection data:', error);
    }
  };

  

  const handleScoreboardClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/above_average', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Getting top scorers failed');
      }
  
      const data = await response.json();
      navigate('/Scoreboard', { state: { users: data.above_average_users } });
    } catch (error) {
      alert(error.message);
      console.error('Error fetching above average users:', error);
    }
  };
  

  const handleDeleteClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.ok) {
        navigate('/');
        // Perform any necessary actions after successful deletion
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Deleting users failed');
        // Handle error scenarios
      }
    } catch (error) {
      alert(error.message);
      console.error('Error deleting user:', error);
    }
  };
  

  const handleLogoutClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.ok) {
        // Clear token from localStorage and navigate to the login page
        localStorage.removeItem('token');
        navigate('/');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Logging out failed');
      }
    } catch (error) {
      alert(error.message);
      console.error('Error logging out:', error);
    }
  };
  

  const handleLearnedClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/artworks/all_learned', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Getting community collection failed');
      }
  
      const data = await response.json();
      navigate('/Learned', { state: { learnedData: data } });
    } catch (error) {
      alert(error.message);
      console.error('Error fetching learned data:', error);
    }
  };
  

  return (
    <div className="menu-container">
      <div className="menu-left">
        <h1>Artify</h1>
      </div>
      <div className="menu-right">
      <span className="xp">XP: {userScore !== null ? userScore : ''} </span> {/* Display user's score or 'Loading...' */}
      <Link to="/Filters">Home</Link>

        <span className="sb" onClick={handleScoreboardClick} style={{ cursor: 'pointer' }}> Scoreboard</span>
        <span className="sb" onClick={handleLearnedClick} style={{ cursor: 'pointer' }}> Community's Collection</span>
        <span className="sb" onClick={handleCollectionClick} style={{ cursor: 'pointer' }}> My Collection</span>
        <span className="sb" onClick={handleDeleteClick} style={{ cursor: 'pointer' }}> Delete User<i class="bi bi-trash3-fill"></i></span>
        <span className="sb dl" onClick={handleLogoutClick} style={{ cursor: 'pointer' }}> Logout<i className="bi bi-box-arrow-left"></i></span>
      </div>
    </div>
  );
};

export default Menu;
