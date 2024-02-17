// Menu.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';
import { Link } from 'react-router-dom';
import { useToken } from '../TokenContext';


const Menu = () => {
  const { token, userScore } = useToken(); // Access token and userScore from useToken hook
  console.log(userScore)

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/user/above_average', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setUsers(data.above_average_users);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [token]);

  const handleCollectionClick = () => {
    fetch('http://localhost:5000/api/artworks/learned', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Data obtained from server:', data);
        // Navigate to the Collection page with the data
        navigate('/Collection', { state: { collectionData: data } });
      })
      .catch(error => {
        console.error('Error fetching collection data:', error);
      });
  };

  

  const handleScoreboardClick = () => {
    console.log(users[0])
    navigate('/Scoreboard', { state: { users: users } });
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
          console.log('User deleted successfully');
          navigate('/')
          // Perform any necessary actions after successful deletion
        } else {
          console.error('Failed to delete user');
          // Handle error scenarios
        }
      })
      .catch(error => {
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
        console.error('Error logging out:', error);
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
        <span className="sb" onClick={handleCollectionClick} style={{ cursor: 'pointer' }}> Collection</span>
        <span className="sb" onClick={handleDeleteClick} style={{ cursor: 'pointer' }}> Delete User<i class="bi bi-trash3-fill"></i></span>
        <span className="sb dl" onClick={handleLogoutClick} style={{ cursor: 'pointer' }}> Logout<i className="bi bi-box-arrow-left"></i></span>
      </div>
    </div>
  );
};

export default Menu;
