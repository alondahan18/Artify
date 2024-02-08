import './Studying.css'
import Menu from '../Menu/Menu';
import ArtGallery from '../ArtGallery/ArtGallery';
import { Link } from 'react-router-dom';
const artObjects = [
    {
      primaryimage: 'https://images.metmuseum.org/CRDImages/ep/original/DT1567.jpg',
      artist: 'Artist 1',
      title: 'Artwork 1',
      year: 2022,
      dynasty: 'Dynasty 1',
    },
    {
      primaryimage: 'https://images.metmuseum.org/CRDImages/ep/original/DT1567.jpg',
      artist: 'Artist 2',
      title: 'Artwork 2',
      year: 2021,
      dynasty: 'Dynasty 2',
    },
    {
        primaryimage: 'https://images.metmuseum.org/CRDImages/ep/original/DT1567.jpg',
        artist: 'Artist 3',
        title: 'Artwork 3',
        year: 2021,
        dynasty: 'Dynasty 3',
      },
      {
        primaryimage: 'https://images.metmuseum.org/CRDImages/ep/original/DT1567.jpg',
        artist: 'Artist 4',
        title: 'Artwork 4',
        year: 2021,
        dynasty: 'Dynasty 4',
      },
      {
        primaryimage: 'https://images.metmuseum.org/CRDImages/ep/original/DT1567.jpg',
        artist: 'Artist 5',
        title: 'Artwork 5',
        year: 2021,
        dynasty: 'Dynasty 5',
      }
    // Add more objects as needed
  ];
  function Studying() {
    return (
      <div>
        <Menu />
        <h2 id="title_studying">Start learning...</h2>
  
        {/* Container for scrolling cards */}
        <div className="cards-container">
          <ArtGallery artObjects={artObjects} />
        </div>
  
        {/* Start quiz button */}
        <div className="quiz-button-container">
          <Link to='/Quiz'><button className="start-quiz-button">Start Quiz</button></Link>
        </div>
      </div>
    );
  }
  
  export default Studying;
