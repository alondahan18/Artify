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
    const [index0, index1, index2, index3, index4, index5, index6, index7, index8, index9, index10, index11] = innerArray;
    return [index7, index11, index8, index2, index3, index9, index5, index6, index4, index1, index10, index0];
  });
  
  console.log(rearrangedArrays); // Output the rearranged arrays
    return (
        <div>
            <Menu />
            <h2 id="title_collection">Your collection:</h2>
            <ArtGallery artObjects={rearrangedArrays} />
        </div>
    );
}
export default Collection
