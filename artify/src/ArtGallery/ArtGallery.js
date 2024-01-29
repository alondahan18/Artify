import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import './ArtGallery.css';

const ArtGallery = ({ artObjects }) => {
  return (
    <Row xs={1} md={3} className="g-4 art-gallery-row">
      {artObjects.map((artObject, index) => (
        <Col key={index}>
          <Card className="mb-4" style={{ width: '25rem' }}>
            <Card.Img
              variant="top"
              src={artObject.primaryimage}
              className="card-img"
            />
            <Card.Body>
              <Card.Title>{artObject.title}</Card.Title>
              <Card.Text>
                <strong>Artist:</strong> {artObject.artist}
              </Card.Text>
              <Card.Text>
                <strong>Year:</strong> {artObject.year}
              </Card.Text>
              <Card.Text>
                <strong>Dynasty:</strong> {artObject.dynasty}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ArtGallery;
