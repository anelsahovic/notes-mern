import React from 'react';
import { Alert, Button, Container } from 'react-bootstrap';

interface Props {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}

const HideNotes = ({ onLoginClicked, onSignUpClicked }: Props) => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <Alert variant="primary" className="text-center p-4 mt-5">
        <h4 className="mb-3">Access Denied</h4>
        <p>You need to log in to see notes.</p>
        <Button variant="outline-dark" onClick={onLoginClicked} className="m-2">
          Log In
        </Button>
        <Button variant="dark" onClick={onSignUpClicked}>
          Sign Up
        </Button>
      </Alert>
    </Container>
  );
};

export default HideNotes;
