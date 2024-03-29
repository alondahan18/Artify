import './Studying.css'
import Menu from '../Menu/Menu';
import ArtGallery from '../ArtGallery/ArtGallery';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import shuffle from 'lodash.shuffle'; // Import the lodash shuffle function


function Studying() {
  const location = useLocation()
  const filteredChoices = location.state.filteredChoices;
  
  const navigate = useNavigate();

  const startQuiz = () => {
    // Shuffle the first 10 elements of filteredChoices array if it's longer than 10
    const shuffledChoices = filteredChoices.length > 10 ? 
      shuffle(filteredChoices.slice(0, 10)).concat(filteredChoices.slice(10)) : 
      shuffle(filteredChoices);

    // Filter out inner arrays where array[7] equals a specific URL

    // Take the first 4 arrays or all if less than 4
    const quizData = shuffledChoices.slice(0, 4);

    // Navigate to the Quiz page with quizData
    if (quizData.length === 0) {
      alert("No artworks to be quizzed on, go back to home page (can't be quizzed on none image artworks)")
    }
    else {
      navigate('/Quiz', { state: { quizData } });
    }
  };

  return (
    <div>
      <Menu />
      <h2 id="title_studying">Start learning...</h2>

      {/* Container for scrolling cards */}
      <div className="cards-container">
        <ArtGallery artObjects={filteredChoices} />
      </div>

      {/* Start quiz button */}
      <div className="quiz-button-container">
        <button className="start-quiz-button" onClick={startQuiz}>Start Quiz</button>
      </div>
    </div>
  );
}

export default Studying;
