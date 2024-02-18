import './Filters.css';
import Menu from '../Menu/Menu';
import { Card, Container, Row, Col, ListGroup, Form } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useToken } from '../TokenContext';
import { useNavigate } from 'react-router-dom';





function Filters() {
    const navigate = useNavigate();
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [selectedNations, setSelectedNations] = useState([]);
    const [selectedPeriods, setSelectedPeriods] = useState([]);
    const [selectedCultures, setSelectedCultures] = useState([]);
    const [selectedMediums, setSelectedMediums] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedGender, setSelectedGender] = useState([]);
    const [minYear, setMinYear] = useState('');
    const [maxYear, setMaxYear] = useState('');
    const [selectedDimensions, setSelectedDimensions] = useState([]);
    const [selectedSpecial, setSelectedSpecial] = useState('None');
    console.log(selectedArtists)
    const {token, filtersData} = useToken();
    console.log(token)


    const applyFilters = async () => {
      const requestData = {
          artist_names: selectedArtists,
          artist_nationalities: selectedNations,
          artwork_culture: selectedCultures,
          artwork_classification: selectedTypes,
          artwork_period: selectedPeriods,
          artwork_medium: selectedMediums,
          get_oldest_artworks: selectedSpecial === "Earliest Artworks",
          get_different_countries: selectedSpecial === "Artistic Cross-Cultural Influences"
      };

      try {
          const response = await fetch('http://localhost:5000/api/artworks/filter_results', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(requestData)
          });

          if (response.ok) {
              const filteredChoices = await response.json();
              // Do something with filteredChoices
              navigate('/Studying', {state: {filteredChoices: filteredChoices}})
          } else {
              console.error('Failed to apply filters');
          }
      } catch (error) {
          console.error('Error applying filters:', error);
      }
  };
    
    const handleSpecialFilterChange = (event) => {
      setSelectedSpecial(event.target.value);
  };
  console.log(selectedSpecial)

    const toggleDimension = (dimension) => {
    const isSelected = selectedDimensions.includes(dimension);
    setSelectedDimensions(
        isSelected
        ? selectedDimensions.filter((d) => d !== dimension)
        : [...selectedDimensions, dimension]
    );
    };


    const handleMinYearChange = (event) => {
    setMinYear(event.target.value);
    };

    const handleMaxYearChange = (event) => {
    setMaxYear(event.target.value);
    };



    const toggleGender = (gender) => {
      setSelectedGender((prevSelectedGender) => {
          if (prevSelectedGender.includes(gender)) {
              return prevSelectedGender.filter((g) => g !== gender);
          } else {
              return [...prevSelectedGender, gender];
          }
      });
  };
      

    const toggleArtist = (artist) => {
        setSelectedArtists((prevArtists) => {
          if (prevArtists.includes(artist)) {
            return prevArtists.filter((a) => a !== artist);
          } else {
            return [...prevArtists, artist];
          }
        });
      };
      
      const toggleNation = (nation) => {
        setSelectedNations((prevNations) => {
          if (prevNations.includes(nation)) {
            return prevNations.filter((n) => n !== nation);
          } else {
            return [...prevNations, nation];
          }
        });
      };
      
      const togglePeriod = (period) => {
        setSelectedPeriods((prevPeriods) => {
          if (prevPeriods.includes(period)) {
            return prevPeriods.filter((p) => p !== period);
          } else {
            return [...prevPeriods, period];
          }
        });
      };
      
      const toggleCulture = (culture) => {
        setSelectedCultures((prevCultures) => {
          if (prevCultures.includes(culture)) {
            return prevCultures.filter((c) => c !== culture);
          } else {
            return [...prevCultures, culture];
          }
        });
      };
      
      const toggleMedium = (medium) => {
        setSelectedMediums((prevMediums) => {
          if (prevMediums.includes(medium)) {
            return prevMediums.filter((m) => m !== medium);
          } else {
            return [...prevMediums, medium];
          }
        });
      };
      
      const toggleType = (type) => {
        setSelectedTypes((prevTypes) => {
          if (prevTypes.includes(type)) {
            return prevTypes.filter((t) => t !== type);
          } else {
            return [...prevTypes, type];
          }
        });
      };
      

 

    const artistOptions = filtersData ? filtersData.artist_names : [];

  const nationOptions = filtersData ? filtersData.artist_nationalities : [];
  const typeOptions = filtersData ? filtersData.artwork_classification : [];
  const mediumOptions = filtersData ? filtersData.artwork_medium : [];
  const periodOptions = filtersData ? filtersData.artwork_period : [];
  const cultureOptions = filtersData ? filtersData.artwork_culture : [];
  return (
    <div>
      <Menu />
      <h2 id="title_collection">What is your learning focus?</h2>

      {/* Filter cards using Bootstrap */}
      <Container fluid className="filter-container">
        <Row xs={1} md={3} className="filter-row" noGutters>
          {/* Filter 1 - Artists */}
          <Col>
            <Card className="filter-card" style={{ width: '25rem' }}>
            <Card.Img
              variant="top"
              src="/images/artists2.jpg"
              className="card-img"
            />
            <Card.Body>
            <Card.Title>Choose Artists</Card.Title>
            <ListGroup className="artist-list" variant="flush">
                {artistOptions.map((artist, index) => (
                <ListGroup.Item
                key={index}
                action
                onClick={() => toggleArtist(artist)}
                className={selectedArtists.includes(artist) ? 'selected' : ''}
              >
                    {artist}
                </ListGroup.Item>
                ))}
            </ListGroup>
            </Card.Body>
            </Card>
          </Col>

          {/* Filter 2 - Nationalities */}
          <Col>
            <Card className="filter-card" style={{ width: '25rem' }}>
            <Card.Img
              variant="top"
              src="/images/nationalities.jpg"
              className="card-img"
            />
            <Card.Body>
            <Card.Title>Choose Nationalities</Card.Title>
            <ListGroup className="artist-list" variant="flush">
                {nationOptions.map((nation, index) => (
                <ListGroup.Item key={index} action onClick={() => toggleNation(nation)} className={selectedNations.includes(nation) ? 'selected' : ''}>
                    {nation}
                </ListGroup.Item>
                ))}
            </ListGroup>
            </Card.Body>
            </Card>
          </Col>

          
          {/* Filter 3 - Genders */}
          <Col>
            <Card className="filter-card" style={{ width: '25rem' }}>
            <Card.Img
              variant="top"
              src="/images/gender.png"
              className="card-img"
            />
            <Card.Body>
                                <Card.Title>Choose Gender</Card.Title>
                                <Form.Check
                                    inline
                                    label="Male"
                                    type="checkbox"
                                    id="male-checkbox"
                                    checked={selectedGender.includes("Male")}
                                    onChange={() => toggleGender("Male")}
                                />
                                <Form.Check
                                    inline
                                    label="Female"
                                    type="checkbox"
                                    id="female-checkbox"
                                    checked={selectedGender.includes("Female")}
                                    onChange={() => toggleGender("Female")}
                                />
                            </Card.Body>

            </Card>
          </Col>

          {/* Filter 4 - Time range */}
          <Col>
            <Card className="filter-card" style={{ width: '25rem' }}>
            <Card.Img
              variant="top"
              src="/images/time_range2.jpg"
              className="card-img"
            />
            <Card.Body>
            <Card.Title>Choose Time Range</Card.Title>
            <Form.Group>
                <Form.Label>Min Year</Form.Label>
                <Form.Control
                type="number"
                placeholder="Enter min year"
                value={minYear}
                onChange={handleMinYearChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Max Year</Form.Label>
                <Form.Control
                type="number"
                placeholder="Enter max year"
                value={maxYear}
                onChange={handleMaxYearChange}
                />
            </Form.Group>
            </Card.Body>
            </Card>
          </Col>

          {/* Filter 5 - Time period */}
          <Col>
            <Card className="filter-card" style={{ width: '25rem' }}>
            <Card.Img
              variant="top"
              src="/images/period2.jpg"
              className="card-img"
            />
            <Card.Body>
            <Card.Title>Choose Period of time</Card.Title>
            <ListGroup className="artist-list" variant="flush">
                {periodOptions.map((period, index) => (
                <ListGroup.Item key={index} action onClick={() => togglePeriod(period)} className={selectedPeriods.includes(period) ? 'selected' : ''}>
                    {period}
                </ListGroup.Item>
                ))}
            </ListGroup>
            </Card.Body>
            </Card>
          </Col>

          {/* Filter 6 - Dimensions */}
          <Col>
            <Card className="filter-card" style={{ width: '25rem' }}>
            <Card.Img
              variant="top"
              src="/images/dimensions3.jpg"
              className="card-img"
            />
             <Card.Body>
            <Card.Title>Choose Dimensions</Card.Title>
            <Form.Check
                type="checkbox"
                label="Small"
                checked={selectedDimensions.includes('Small')}
                onChange={() => toggleDimension('Small')}
            />
            <Form.Check
                type="checkbox"
                label="Medium"
                checked={selectedDimensions.includes('Medium')}
                onChange={() => toggleDimension('Medium')}
            />
            <Form.Check
                type="checkbox"
                label="Large"
                checked={selectedDimensions.includes('Large')}
                onChange={() => toggleDimension('Large')}
            />
            </Card.Body>
            </Card>
          </Col>

          {/* Filter 7 - Culture */}
          <Col>
            <Card className="filter-card" style={{ width: '25rem' }}>
            <Card.Img
              variant="top"
              src="/images/culture2.jpg"
              className="card-img"
            />
            <Card.Body>
            <Card.Title>Choose Cultures</Card.Title>
            <ListGroup className="artist-list" variant="flush">
                {cultureOptions.map((culture, index) => (
                <ListGroup.Item key={index} action onClick={() => toggleCulture(culture)} className={selectedCultures.includes(culture) ? 'selected' : ''}>
                    {culture}
                </ListGroup.Item>
                ))}
            </ListGroup>
            </Card.Body>
            </Card>
          </Col>

          {/* Filter 8 - Type of art */}
          <Col>
            <Card className="filter-card" style={{ width: '25rem' }}>
            <Card.Img
              variant="top"
              src="/images/Type2.jpg"
              className="card-img"
            />
            <Card.Body>
            <Card.Title>Choose Types of art</Card.Title>
            <ListGroup className="artist-list" variant="flush">
                {typeOptions.map((type, index) => (
                <ListGroup.Item key={index} action onClick={() => toggleType(type)} className={selectedTypes.includes(type) ? 'selected' : ''}>
                    {type}
                </ListGroup.Item>
                ))}
            </ListGroup>
            </Card.Body>
            </Card>
          </Col>

          {/* Filter 9 - Medium */}
          <Col>
            <Card className="filter-card" style={{ width: '25rem' }}>
            <Card.Img
              variant="top"
              src="/images/mediums.jpg"
              className="card-img"
            />
            <Card.Body>
            <Card.Title>Choose Mediums</Card.Title>
            <ListGroup className="artist-list" variant="flush">
                {mediumOptions.map((medium, index) => (
                <ListGroup.Item key={index} action onClick={() => toggleMedium(medium)} className={selectedMediums.includes(medium) ? 'selected' : ''}>
                    {medium}
                </ListGroup.Item>
                ))}
            </ListGroup>
            </Card.Body>
            </Card>
          </Col>

          <Col>
    <Card className="filter-card" style={{ width: '25rem' }}>
        <Card.Img
            variant="top"
            src="/images/special.jpg"
            className="card-img"
        />
        <Card.Body>
            <Card.Title>Choose Special Filter</Card.Title>
            <Form.Group>
                                    <Form.Check
                                        type="radio"
                                        label="Earliest Artworks"
                                        name="specialFilter"
                                        value="Earliest Artworks"
                                        checked={selectedSpecial === "Earliest Artworks"}
                                        onChange={handleSpecialFilterChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Artistic Cross-Cultural Influences"
                                        name="specialFilter"
                                        value="Artistic Cross-Cultural Influences"
                                        checked={selectedSpecial === "Artistic Cross-Cultural Influences"}
                                        onChange={handleSpecialFilterChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="None"
                                        name="specialFilter"
                                        value="None"
                                        checked={selectedSpecial === "None"}
                                        onChange={handleSpecialFilterChange}
                                    />
                                </Form.Group>
        </Card.Body>
    </Card>
</Col>


        </Row>
      </Container>
      <div className="quiz-button-container">
          <button className="start-filter-button" onClick={applyFilters}>Apply filters</button>
        </div>
    </div>
  );
}

export default Filters;
