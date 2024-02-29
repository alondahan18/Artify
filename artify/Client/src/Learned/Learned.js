import ArtGallery from '../ArtGallery/ArtGallery';
import Menu from '../Menu/Menu';
import { useLocation } from 'react-router-dom';

  
function Learned() {
  const location = useLocation()
  const collectionData = location.state.learnedData;
  console.log(collectionData);
  const arrayOfArrays = [];
  collectionData.all_learned_artworks.forEach(jsonObj => {
    // Extract values of each JSON object into an array
    const valuesArray = Object.values(jsonObj);
    
    // Push the values array into the array of arrays
    arrayOfArrays.push(valuesArray);
  });
  
  const rearrangedArrays = arrayOfArrays.map(innerArray => {
    const [index0, index1, index2, index3, index4, index5, index6, index7, index8] = innerArray;
    return [index5, index8, index6, index3, index4, index2, index1, index7, index0];
  });
  
  console.log(rearrangedArrays); // Output the rearranged arrays
    return (
        <div>
            <Menu />
            <h2 id="title_collection">Our community collection:</h2>
            <ArtGallery artObjects={rearrangedArrays} />
        </div>
    );
}
export default Learned
