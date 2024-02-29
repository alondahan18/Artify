import React from 'react';
import './App.css';
import Signup from './Signup/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Quiz from './Quiz/Quiz';
import Studying from './Studying/Studying';
import Filters from './Filters/Filters';
import Scoreboard from './Scoreboard/Scoreboard';
import Learned from './Learned/Learned';
import Collection from './Collection/Collection';
import { TokenProvider } from './TokenContext'; // Import the TokenProvider

function App() {
  return (
    <TokenProvider> {/* Wrap the entire application with TokenProvider */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Filters" element={<Filters />} />
          <Route path="/Studying" element={<Studying />} />
          <Route path="/Quiz" element={<Quiz />} />
          <Route path="/Collection" element={<Collection />} />
          <Route path="/Scoreboard" element={<Scoreboard />} />
          <Route path="/Learned" element={<Learned />} />
        </Routes>
      </BrowserRouter>
    </TokenProvider>
  );
}

export default App;
