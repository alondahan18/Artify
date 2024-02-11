import './Scoreboard.css'
import React from 'react';
import Menu from '../Menu/Menu';
const highScores = [
    { name: 'Bill', score: 123 },
    { name: 'Garry', score: 34 },
    { name: 'Al', score: 33 },
    { name: 'B', score: 32 },
    { name: 'C', score: 31 },
    { name: 'E', score: 30 },
    { name: 'D', score: 29 },
    { name: 'F', score: 27 },
    { name: 'K', score: 24 },
    { name: 'H', score: 23 }
    // ... other player data
  ];
function Scoreboard() {
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
            {highScores.map((player, index) => (
              <tr key={index}>
                <td>{player.name}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </table>
        </div>
        </div>
      );
    
}
export default Scoreboard
