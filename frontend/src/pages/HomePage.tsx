import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container
      fluid
      className="mt-5 d-flex flex-column justify-content-center align-items-center text-center bg-light"
    >
      {/* Hero Section */}
      <Row className="w-100 mb-4">
        <Col lg={6} className="mx-auto">
          <h1 className="display-4 fw-bold text-primary">
            Your Personal Notes App
          </h1>
          <p className="lead text-muted">
            Capture your ideas, organize your thoughts, and stay productive.
          </p>
          <Link
            className="bg-primary p-2 rounded text-bg-dark text-xl-center text-decoration-none"
            to="/notes"
          >
            Start Taking Notes
          </Link>
        </Col>
      </Row>

      {/* Features Section */}
      <Row className="w-100 d-flex justify-content-center">
        <Col md={4} className="mb-3">
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="fw-bold text-primary">📝 Simple & Intuitive</h5>
              <p className="text-muted">
                Create, edit, and manage your notes effortlessly.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="fw-bold text-primary">🔄 Sync Anywhere</h5>
              <p className="text-muted">
                Access your notes on any device, anytime.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="fw-bold text-primary">🔒 Secure & Private</h5>
              <p className="text-muted">
                Your notes are protected and stored securely.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Footer */}
      <footer className="mt-5 text-muted">
        <p>&copy; {new Date().getFullYear()} Notes App. All rights reserved.</p>
      </footer>
    </Container>
  );
};

export default HomePage;
