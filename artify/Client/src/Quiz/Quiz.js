import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Quiz.css';
import Menu from '../Menu/Menu';
import { useToken } from '../TokenContext';



function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateShuffledIndices() {
  const indices = [];
  const counts = [0, 0, 0, 0]; // Counter to track occurrences

  // Push each index 3 times but not on the same modulo 3 positions
  for (let i = 0; i < 12; i++) {
    let index;
    do {
      index = Math.floor(Math.random() * 4); // Random index
    } while (counts[index] >= 3 || (i >= 3 && indices[i - 3] === index) || (i >= 6 && indices[i - 6] === index) || (i >= 9 && indices[i - 9] === index));
    indices.push(index);
    counts[index]++;
  }

  return indices;
}








 var generated = generateShuffledIndices();




function Quiz() {
  const localArtists = ["Henri Matisse", "René François Ghislain Magritte", "Andy Warhol", "Salvador Dali", "Edvard Munch", "Johannes Vermeer", "Claude Monet"]
  const localYears = ["2020", "1983", "1576", "1899", "1921", "1945", "1753", "1880", "1900", "1901", "2001", "1920"]
  const localTitles = ["Mona Lisa", "Guernica", "The Naked Maja", "Wanderer above the Sea of Fog", "The Raft of the Medusa", "Nude Descending a Staircase"]
  const { token, userScore, updateUserScore } = useToken();
  const location = useLocation();
  const quizData = location.state.quizData;

  const jsonObjects = [];

// Loop through each inner array
for (let i = 0; i < quizData.length; i++) {
  const innerArray = quizData[i];
  
  // Construct a JSON object for each inner array
  const jsonObject = {
    image: innerArray[7],
    artist: innerArray[8],
    title: innerArray[1],
    year: innerArray[4],
    objectID: innerArray[0]
  };
  
  // Push the JSON object into the array of JSON objects
  jsonObjects.push(jsonObject);
}
const list = jsonObjects;
const len = list.length
var imgIndices
if (len === 4) {
  imgIndices = generated;
}
else if (len === 3) {
  imgIndices = [0, 2, 0, 1, 1, 2, 2, 0, 1]
}
else if (len === 2) {
  imgIndices = [0, 0, 1, 1, 1, 0]
}
else {
  imgIndices = [0, 0, 0]
}
  var imgIndex = imgIndices[len*3-1]
  const [question, setQuestion] = useState(1);
  if (question <= len*3) {
    imgIndex = imgIndices[question-1]
  }
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [chosenAnswer, setChosenAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);
  const [artworksLearned, setArtworksLearned] = useState([]);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);  
  const [count3, setCount3] = useState(0);  
  const [count4, setCount4] = useState(0);
  
  
  const navigate = useNavigate();

  const getDistinctOptions = (options, localOptions) => {
    const distinctOptions = [];
    options.forEach(option => {
      if (!distinctOptions.includes(option)) {
        distinctOptions.push(option);
      } else {
        // If option is not distinct, replace it with a random value from localOptions
        const randomIndex = Math.floor(Math.random() * localOptions.length);
        distinctOptions.push(localOptions[randomIndex]);
        localOptions.splice(randomIndex, 1); // Remove the used value from localOptions
      }
    });
    
    // If distinctOptions has less than 4 options, add random options from localOptions until there are 4
    while (distinctOptions.length < 4 && localOptions.length > 0) {
      const randomIndex = Math.floor(Math.random() * localOptions.length);
      distinctOptions.push(localOptions[randomIndex]);
      localOptions.splice(randomIndex, 1); // Remove the used value from localOptions
    }
    
    // If distinctOptions still has less than 4 options, repeat options from the beginning to fill
    while (distinctOptions.length < 4) {
      distinctOptions.push(distinctOptions[distinctOptions.length - 4]);
    }
    
    return distinctOptions;
  };

  const addArtwork = (newArtwork) => {
    setArtworksLearned((prevArtworks) => {
      // Check if the newArtwork is not already in the array
      if (!prevArtworks.some(artwork => artwork === newArtwork)) {
        return [...prevArtworks, newArtwork];
      }
      // If the artwork is already in the array, return the existing array
      return prevArtworks;
    });
  };

  useEffect(() => {
    const checkAndUpdateArtworkLearned = () => {
      if (count1 === 3 && !artworksLearned.includes(list[0].objectID)) {
        setArtworksLearned(prevArtworks => [...prevArtworks, list[0].objectID]);
      }
      if (count2 === 3 && !artworksLearned.includes(list[1].objectID)) {
        setArtworksLearned(prevArtworks => [...prevArtworks, list[1].objectID]);
      }
      if (count3 === 3 && !artworksLearned.includes(list[2].objectID)) {
        setArtworksLearned(prevArtworks => [...prevArtworks, list[2].objectID]);
      }
      if (count4 === 3 && !artworksLearned.includes(list[3].objectID)) {
        setArtworksLearned(prevArtworks => [...prevArtworks, list[3].objectID]);
      }
    };
  
    checkAndUpdateArtworkLearned();
  }, [count1, count2, count3, count4, artworksLearned, list]);

  const handleCheat = () => {
    const allArtworkIds = list.map(item => item.objectID);
    setArtworksLearned(allArtworkIds);
    setCorrectAnswers(list.length * 3);
    setQuizComplete(true);
  };

  const handleButtonClick = (chosenOption) => {
    if (quizComplete) {
      return;
    }
    if (question < len*3) {
      setQuestion(question + 1);
    } 
  
    const updateCounts = () => {
      if (imgIndex === 0) {
        setCount1(prevCount => prevCount + 1);
      }
      if (imgIndex === 1) {
        setCount2(prevCount => prevCount + 1);
      }
      if (imgIndex === 2) {
        setCount3(prevCount => prevCount + 1);
      }
      if (imgIndex === 3) {
        setCount4(prevCount => prevCount + 1);
      }
    };
  
    
  
    // Update correctAnswers and counts based on chosenOption and question number...
  
    
    if (question % 3 === 1 && chosenOption === list[imgIndex].artist) {
      setCorrectAnswers(correctAnswers + 1);
      updateCounts();
    } else if (question % 3 === 2 && chosenOption === list[imgIndex].title) {
      setCorrectAnswers(correctAnswers + 1);
      updateCounts();
    } else if (question % 3 === 0 && chosenOption === list[imgIndex].year) {
      setCorrectAnswers(correctAnswers + 1);
      updateCounts();
    }
    setChosenAnswer(null);


    

    if (question === len*3) {

      setTimeout(() => {
        setQuizComplete(true);
      }, 200);
    }

    
    
  };

  let questionText = '';
  let answerOptions = [];

  if (question % 3 === 1) {
    questionText = "Who's the artist?";
    answerOptions = getDistinctOptions(shuffleArray(list.map(item => item.artist)), localArtists);
  } else if (question % 3 === 2) {
    questionText = "What's the title?";
    answerOptions = getDistinctOptions(shuffleArray(list.map(item => item.title)), localTitles);
  } else {
    questionText = "What's the year?";
    answerOptions = getDistinctOptions(shuffleArray(list.map(item => item.year)), localYears);
  }

  const img = list[imgIndex].image;
  useEffect(() => {
    if (quizComplete) {
      // Construct the request payload
      const payload = {
        learned_artwork_ids: artworksLearned,
        experience_points: artworksLearned.length * 10 + correctAnswers * 5
      };
      updateUserScore(payload.experience_points + userScore);
      // Make the POST request
      fetch('http://localhost:5000/api/artworks/update_test_results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to update test results');
          }
          // Proceed with navigation after the request is successful
          setTimeout(() => {
            navigate('/Filters');
          }, 3500);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [quizComplete]); // Add quizComplete as a dependency
  return (
    <div>
      {quizComplete ? (

        <div className="centered-message">
          <div className="quizCompleteOptions">
            <p>Quiz completed! You got {correctAnswers} out of {len*3} correct answers.</p>
            <p>Returns to filter page.</p>
          </div>
        </div>
      ) : (
        <div>
          <Menu />
          <button id="cheat" onClick={handleCheat}>cheat button</button>
          <h2 id="title_collection" className="question">Question {question}/{len*3}</h2>
          <span id="questionText">{questionText}</span>
          
          <div>
          {img === "https://t4.ftcdn.net/jpg/04/70/29/97/240_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg" && (
            <h3>{list[imgIndex].title}</h3>
          )}
          <img id="quizImage" src={img} alt="quiz" />
        </div>
          <div id="answerContainer">
            {answerOptions.map((answer, index) => (
              <button
                key={index}
                className={`answerButton ${chosenAnswer === answer ? 'chosen' : ''}`}
                onClick={() => {
                  setChosenAnswer(answer);
                  handleButtonClick(answer);
                }}
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
