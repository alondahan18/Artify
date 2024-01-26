import './Scoreboard.css'
import React from 'react';

const highScores = [
    { name: 'Bill', score: 123 },
    { name: 'Garry', score: 34 },
    // ... other player data
  ];
function Scoreboard() {
    return (
        <div>
            <span><h1>Artify</h1><span>Home</span></span>
        <div className="wrapper">
          <table>
            <caption>High Scores (total {highScores.length})</caption>
            <tr>
              <th>Name</th>
              <th>Score</th>
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
