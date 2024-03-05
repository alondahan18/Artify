import React, { createContext, useState, useContext, useEffect } from 'react';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [userScore, setUserScore] = useState(null);
  const [filtersData, setFiltersData] = useState(null);
  const [filtersFetched, setFiltersFetched] = useState(false); // State to track if filters data has been fetched

  const handleSetToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    setUserScore(null);
  };

  const updateUserScore = (newScore) => {
    setUserScore(newScore);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user/score', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUserScore(data.score);
        } else {
          console.error('Failed to fetch user score:', response.statusText);
        }
      } catch (error) {
        alert(error.message);
        console.error('Error fetching user score:', error);
      }
    };

    fetchData();

    // Fetch filters data only if it hasn't been fetched already
    if (!filtersFetched) {
      const fetchFiltersData = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/artworks/filters', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            setFiltersData(data);
            setFiltersFetched(true); // Mark filters data as fetched
          } else {
            console.error('Failed to fetch filters:', response.statusText);
          }
        } catch (error) {
          alert(error.message);
          console.error('Error fetching filters:', error.message);
        }
      };

      fetchFiltersData();
    }
  }, [token, filtersFetched]); // Include filtersFetched in the dependencies array

  return (
    <TokenContext.Provider value={{ token, setToken: handleSetToken, userScore, updateUserScore, filtersData }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
