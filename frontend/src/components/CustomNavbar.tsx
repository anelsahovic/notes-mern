import React from 'react';
import { User } from '../models/user';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { logout } from '../network/userAPI';
import { Link } from 'react-router-dom';

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
      <Container className="">
        <Navbar.Brand as={Link} to="/">
          MERN Notes
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse
          className="flex-row justify-content-between"
          id="main-navbar"
        >
          <Nav className="d-flex justify-content-center align-items-center">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/notes">
              Notes
            </Nav.Link>
          </Nav>

          <Nav>
            <hr className="text-bg-dark hide-mobile" />
            {loggedInUser ? (
              <div className="d-flex flex-column flex-md-row align-items-center justify-content-center">
                <Navbar.Text className="me-2">
                  Hello, @{loggedInUser?.username}
                </Navbar.Text>
                <Button onClick={handleLogout}>Log out</Button>
              </div>
            ) : (
              <div className="d-flex flex-column gap-2  flex-md-row justify-content-center align-content-center">
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
