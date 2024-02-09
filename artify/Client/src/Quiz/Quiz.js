import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';
import Menu from '../Menu/Menu';

const list = [
  { image: "/images/artists.jpg", artist: "artist1", title: "title1", year: "year1" },
  { image: "/images/gender.png", artist: "artist2", title: "title2", year: "year2" },
  { image: "/images/time_range.jpg", artist: "artist3", title: "title3", year: "year3" },
  { image: "/images/period.jpg", artist: "artist4", title: "title4", year: "year4" }
];

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
  console.log(artworksLearned);
  
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

  const handleButtonClick = (chosenOption) => {
    if (quizComplete) {
      return;
    }

    setQuestion(question + 1);
  
    const updateCounts = () => {
      if (imgIndex === 0) {
        setCount1(count1 + 1);
      }
      if (imgIndex === 1) {
        setCount2(count2 + 1);
      }
      if (imgIndex === 2) {
        setCount3(count3 + 1);
      }
      if (imgIndex === 3) {
        setCount4(count4 + 1);
      }
    };
    
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

    

    if (question === 12) {
      setQuizComplete(true);

      setTimeout(() => {
        navigate('/Filters');
      }, 3500);
    }

    setChosenAnswer(null);
    if (count1 === 3) {
      addArtwork(list[0].title);
    }
    if (count2 === 3) {
      addArtwork(list[1].title);
    }
    if (count3 === 3) {
      addArtwork(list[2].title);
    }
    if (count4 === 3) {
      addArtwork(list[3].title);
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
