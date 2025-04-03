import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Container
      fluid
      className="mt-5 d-flex flex-column justify-content-center align-items-center text-center bg-light"
    >
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="fw-bold text-dark">Page Not Found</h2>
      <p className="text-muted">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-3 text-decoration-none text-white bg-primary px-4 py-2 rounded"
      >
        Go Back Home
      </Link>
    </Container>
  );
};

export default NotFoundPage;
