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











const imgIndices = generateShuffledIndices();


function Quiz() {
  const { token, userScore, updateUserScore } = useToken();
  const location = useLocation();
  const quizData = location.state.quizData;

  const jsonObjects = [];

// Loop through each inner array
for (let i = 0; i < quizData.length; i++) {
  const innerArray = quizData[i];
  
  // Construct a JSON object for each inner array
  const jsonObject = {
    image: innerArray[10],
    artist: innerArray[11],
    title: innerArray[1],
    year: innerArray[6],
    objectID: innerArray[0]
  };
  
  // Push the JSON object into the array of JSON objects
  jsonObjects.push(jsonObject);
}
const list = jsonObjects;
console.log(list)
  var imgIndex = imgIndices[11]
  const [question, setQuestion] = useState(1);
  if (question <= 12) {
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

  const handleButtonClick = (chosenOption) => {
    if (quizComplete) {
      return;
    }
    if (question < 12) {
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


    

    if (question === 12) {

      setTimeout(() => {
        setQuizComplete(true);
      }, 200);
    }

    
    
  };

  let questionText = '';
  let answerOptions = [];

  if (question % 3 === 1) {
    questionText = "Who's the artist?";
    answerOptions = shuffleArray(list.map(item => item.artist));
  } else if (question % 3 === 2) {
    questionText = "What's the title?";
    answerOptions = shuffleArray(list.map(item => item.title));
  } else {
    questionText = "What's the year?";
    answerOptions = shuffleArray(list.map(item => item.year));
  }

  const img = list[imgIndex].image;
  useEffect(() => {
    if (quizComplete) {
      // Construct the request payload
      const payload = {
        learned_artwork_ids: artworksLearned,
        experience_points: artworksLearned.length * 5
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
            <p>Quiz completed! You got {correctAnswers} out of 12 correct answers.</p>
            <p>Returns to filter page.</p>
          </div>
        </div>
      ) : (
        <div>
          <Menu />
          <h2 id="title_collection" className="question">Question {question}/12</h2>
          <span id="questionText">{questionText}</span>
          <img id="quizImage" src={img} alt="quiz" />
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
