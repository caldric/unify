import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

interface Props {
  loggedIn: boolean;
}

const NavComponent: React.FC<Props> = ({ loggedIn }) => {
  return (
    <Navbar bg="dark" variant="dark" className="fixed-top" id="navbar">
      <Nav className="container-fluid">
        <Navbar.Brand as={Link} to="/">
          Unify
        </Navbar.Brand>
        <Nav className="ml-auto">
          {!loggedIn ? (
            <Nav.Link as={Link} to="/login">
              Log In
            </Nav.Link>
          ) : (
            <Nav.Link as={Link} to="/logout">
              Log Out
            </Nav.Link>
          )}
          <Nav.Link as={Link} to="/shopping-list">
            Shopping List
          </Nav.Link>
        </Nav>
      </Nav>
    </Navbar>
  );
};

export default NavComponent;
