import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavComponent: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" className="fixed-top" id="navbar">
      <Nav className="container-fluid">
        <Navbar.Brand as={Link} to="/">
          Unify
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/test">
            Test
          </Nav.Link>
        </Nav>
      </Nav>
    </Navbar>
  );
};

export default NavComponent;
