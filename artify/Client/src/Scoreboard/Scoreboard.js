import './Scoreboard.css'
import React from 'react';
import Menu from '../Menu/Menu';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useToken } from '../TokenContext';
function Scoreboard() {
  const { token } = useToken();
  const [users, setUsers] = useState([]);
  console.log(token)
  useEffect(() => {
    fetch('http://localhost:5000/api/user/above_average', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // replace YOUR_ACCESS_TOKEN with the actual token
      }
    })
    .then(response => response.json())
    .then(data => {
      setUsers(data.above_average_users);
      console.log(data)
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);
    return (
        <div>
          <Menu token={token}/>
        <div className="wrapper">
        <h2>Top Learners:</h2>
          <table>
            <tr>
              <th>Username</th>
              <th>XP</th>
            </tr>
            {users.map((player, index) => (
              <tr key={index}>
                <td>{player.username}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </table>
        </div>
        </div>
      );
    
}
export default Scoreboard
