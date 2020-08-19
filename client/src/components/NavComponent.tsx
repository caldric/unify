// React & Axios
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Components
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

interface Props {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavComponent: React.FC<Props> = ({
  user,
  setUser,
  loggedIn,
  setLoggedIn,
}) => {
  const logoutUser = async () => {
    // Make logout request to API
    const response = await axios({
      method: 'put',
      url: '/api/logout',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ email: user }),
    });
    const { data } = response;

    // Update states
    setUser(data.user);
    setLoggedIn(data.loggedIn);
  };

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
            <Nav.Link onClick={logoutUser}>Log Out</Nav.Link>
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
