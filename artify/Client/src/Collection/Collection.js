import ArtGallery from '../ArtGallery/ArtGallery';
import './Collection.css'
import Menu from '../Menu/Menu';
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
        primaryimage: 'https://images.metmuseum.org/CRDImages/as/original/DP251139.jpg',
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
  
function Collection() {
    return (
        <div>
            <Menu />
            <h2 id="title_collection">Your collection:</h2>
            <ArtGallery artObjects={artObjects} />
        </div>
    );
}
export default Collection
