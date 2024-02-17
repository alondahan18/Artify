import './Scoreboard.css'
import React from 'react';
import Menu from '../Menu/Menu';
import { useLocation } from 'react-router-dom';
function Scoreboard() {
  const location = useLocation();
  const users = location.state.users;
    return (
        <div>
          <Menu />
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
