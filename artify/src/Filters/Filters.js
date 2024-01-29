import './Filters.css';
import Menu from '../Menu/Menu';
import { Card, Container, Row, Col, ListGroup, Form } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';




function Filters() {
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [selectedNations, setSelectedNations] = useState([]);
    const [selectedPeriods, setSelectedPeriods] = useState([]);
    const [selectedCultures, setSelectedCultures] = useState([]);
    const [selectedMediums, setSelectedMediums] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedGender, setSelectedGender] = useState(0);
    const [minYear, setMinYear] = useState('');
    const [maxYear, setMaxYear] = useState('');
    const [selectedDimensions, setSelectedDimensions] = useState([]);
    console.log(selectedDimensions)

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



    const toggleGender = () => {
        // If selectedGender is 0, toggle to 1 (Female), otherwise toggle to 0 (Male)
        setSelectedGender(selectedGender === 0 ? 1 : 0);
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
      

 

  const artistOptions = ['Artist 1', 'Artist 2', 'Artist 3', 'Artist 3', 'Artist 3', 'Artist 3', 'Artist 3', 'Artist 3', 'Artist 3', 'Artist 3', 'Artist 3','Artist 3','Artist 3', 'Artist 3', 'Artist 3', 'Artist 3', 'Artist 3'];
  const nationOptions = ['Artist 1', 'Artist 2', 'Artist 3', 'Artist 3', 'Artist 3', 'Artist 3', 'Artist 3', 'Artist 3', 'Artist 3', 'Artist 3', 'Artist 3','Artist 3','Artist 3', 'Artist 3', 'Artist 3', 'Artist 3', 'Artist 3'];

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
              src="/images/artists.jpg"
              className="card-img"
            />
            <Card.Body>
            <Card.Title>Choose Artists</Card.Title>
            <ListGroup className="artist-list" variant="flush">
                {artistOptions.map((artist, index) => (
                <ListGroup.Item key={index} action onClick={() => toggleArtist(artist)}>
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
                <ListGroup.Item key={index} action onClick={() => toggleNation(nation)}>
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
                checked={selectedGender === 0}
                onChange={toggleGender}
                />
                <Form.Check
                inline
                label="Female"
                type="checkbox"
                id="female-checkbox"
                checked={selectedGender === 1}
                onChange={toggleGender}
                />
            </Card.Body>

            </Card>
          </Col>

          {/* Filter 4 - Time range */}
          <Col>
            <Card className="filter-card" style={{ width: '25rem' }}>
            <Card.Img
              variant="top"
              src="/images/time_range.jpg"
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
              src="/images/period.jpg"
              className="card-img"
            />
            <Card.Body>
            <Card.Title>Choose Period of time</Card.Title>
            <ListGroup className="artist-list" variant="flush">
                {nationOptions.map((period, index) => (
                <ListGroup.Item key={index} action onClick={() => togglePeriod(period)}>
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
              src="/images/dimensions.jpg"
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
              src="/images/culture.jpg"
              className="card-img"
            />
            <Card.Body>
            <Card.Title>Choose Cultures</Card.Title>
            <ListGroup className="artist-list" variant="flush">
                {nationOptions.map((culture, index) => (
                <ListGroup.Item key={index} action onClick={() => toggleCulture(culture)}>
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
              src="/images/Type.jpg"
              className="card-img"
            />
            <Card.Body>
            <Card.Title>Choose Types of art</Card.Title>
            <ListGroup className="artist-list" variant="flush">
                {nationOptions.map((type, index) => (
                <ListGroup.Item key={index} action onClick={() => toggleType(type)}>
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
                {nationOptions.map((medium, index) => (
                <ListGroup.Item key={index} action onClick={() => toggleMedium(medium)}>
                    {medium}
                </ListGroup.Item>
                ))}
            </ListGroup>
            </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
      <div className="quiz-button-container">
          <Link to='/Studying'><button className="start-filter-button">Apply filters</button></Link>
        </div>
    </div>
  );
}

export default Filters;
