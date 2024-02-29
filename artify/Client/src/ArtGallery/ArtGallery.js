import React, { useState } from 'react';
import { Card, Row, Col, Modal, Button } from 'react-bootstrap';
import './ArtGallery.css';

const placeholderImage = '/path/to/placeholder.jpg'; // Path to your placeholder image

const ArtGallery = ({ artObjects }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  const handleImageError = () => {
    alert("error in loading images");
    setSelectedImage(null); // Reset selected image if it fails to load
  };

  return (
    <div>
      <Row xs={1} md={3} className="g-4 art-gallery-row">
        {artObjects.map((artwork, index) => (
          <Col key={index}>
            <Card className="mb-4 special" style={{ width: '25rem' }}>
              <Card.Img
                variant="top"
                src={artwork[7]} // Primary image URL
                onError={handleImageError} // Handle image loading errors
                className="card-img special_img"
                onClick={() => openModal(artwork[7])} // Open modal on image click
              />
              <Card.Body>
                <Card.Title>{artwork[1]}</Card.Title> {/* Title */}
                <Card.Text>
                  <strong>Artist:</strong> {artwork[8]} {/* Artist */}
                </Card.Text>
                <Card.Text>
                  <strong>Year:</strong> {artwork[4]} {/* Year */}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for displaying enlarged image */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Body>
          {selectedImage && (
            <img src={selectedImage} alt="Enlarged" className="enlarged-img" />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ArtGallery;
