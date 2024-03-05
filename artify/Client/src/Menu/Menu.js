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

  const handleCollectionClick = () => {
    fetch('http://localhost:5000/api/artworks/learned', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        // Navigate to the Collection page with the data
        navigate('/Collection', { state: { collectionData: data } });
      })
      .catch(error => {
        alert(error)
        console.error('Error fetching collection data:', error);
      });
  };

  

  const handleScoreboardClick = () => {
    fetch('http://localhost:5000/api/user/above_average', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        // Navigate to the Scoreboard page with the data
        navigate('/Scoreboard', { state: { users: data.above_average_users } });
      })
      .catch(error => {
        alert(error)
        console.error('Error fetching above average users:', error);
      });
  };

  const handleDeleteClick = () => {
    fetch('http://localhost:5000/api/user/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          navigate('/')
          // Perform any necessary actions after successful deletion
        } else {
          console.error('Failed to delete user');
          // Handle error scenarios
        }
      })
      .catch(error => {
        alert(error)
        console.error('Error deleting user:', error);
      });
  };

  const handleLogoutClick = () => {
    fetch('http://localhost:5000/api/user/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          // Clear token from localStorage and navigate to the login page
          localStorage.removeItem('token');
          navigate('/');
        } else {
          console.error('Failed to logout:', response.statusText);
        }
      })
      .catch(error => {
        alert(error)
        console.error('Error logging out:', error);
      });
  };

  const handleLearnedClick = () => {
    fetch('http://localhost:5000/api/artworks/all_learned', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        // Navigate to the Learned page with the data
        navigate('/Learned', { state: { learnedData: data } });
      })
      .catch(error => {
        alert(error)
        console.error('Error fetching learned data:', error);
      });
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
