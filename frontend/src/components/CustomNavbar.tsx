import React from 'react';
import { User } from '../models/user';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { logout } from '../network/userAPI';

interface Props {
  loggedInUser: User | null;
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogoutSuccessful: () => void;
}

const CustomNavbar = ({
  loggedInUser,
  onLoginClicked,
  onLogoutSuccessful,
  onSignUpClicked,
}: Props) => {
  async function handleLogout() {
    try {
      await logout();
      onLogoutSuccessful();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Navbar bg="primary" variant="dark" expand="md" sticky="top">
      <Container className="flex-row justify-content-between">
        <Navbar.Brand>MERN Notes</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse
          className="flex-row justify-content-end"
          id="main-navbar"
        >
          <Nav className="flex-row justify-content-center align-content-center">
            {loggedInUser ? (
              <div className="d-flex flex-row align-items-center justify-content-center">
                <Navbar.Text className="me-2">
                  Hello, @{loggedInUser?.username}
                </Navbar.Text>
                <Button onClick={handleLogout}>Log out</Button>
              </div>
            ) : (
              <div className="flex-row justify-content-center align-content-center">
                <Button onClick={onLoginClicked}>Log in</Button>
                <Button onClick={onSignUpClicked}>Sign up</Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
