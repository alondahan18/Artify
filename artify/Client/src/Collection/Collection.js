import ArtGallery from '../ArtGallery/ArtGallery';
import './Collection.css'
import Menu from '../Menu/Menu';
import { useLocation } from 'react-router-dom';

  
function Collection() {
  const location = useLocation()
  const collectionData = location.state.collectionData;
  const arrayOfArrays = [];
  collectionData.learned_artworks.forEach(jsonObj => {
    // Extract values of each JSON object into an array
    const valuesArray = Object.values(jsonObj);
    
    // Push the values array into the array of arrays
    arrayOfArrays.push(valuesArray);
  });
  
  const rearrangedArrays = arrayOfArrays.map(innerArray => {
    const [index0, index1, index2, index3, index4, index5, index6, index7, index8] = innerArray;
    return [index5, index8, index6, index3, index4, index2, index1, index7, index0];
  });
  
    return (
        <div>
            <Menu />
            <h2 id="title_collection">Your collection:</h2>
            <ArtGallery artObjects={rearrangedArrays} />
        </div>
    );
}
export default Collection
