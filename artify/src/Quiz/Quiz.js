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

function Quiz() {
  const [question, setQuestion] = useState(1);
  const [imgIndex, setImgIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [chosenAnswer, setChosenAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const navigate = useNavigate();

  const handleButtonClick = (chosenOption) => {
    if (quizComplete) {
      return;
    }

    setQuestion(question + 1);

    if (question % 3 === 1 && chosenOption === list[imgIndex].artist) {
      setCorrectAnswers(correctAnswers + 1);
    } else if (question % 3 === 2 && chosenOption === list[imgIndex].title) {
      setCorrectAnswers(correctAnswers + 1);
    } else if (question % 3 === 0 && chosenOption === list[imgIndex].year) {
      setCorrectAnswers(correctAnswers + 1);
    }

    if (question % 3 === 0 && question !== 12) {
      setImgIndex((imgIndex + 1) % list.length);
    }

    if (question === 12) {
      setQuizComplete(true);

      setTimeout(() => {
        navigate('/Filters');
      }, 3500);
    }

    setChosenAnswer(null);
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
