import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function Nav() {
  return (
    <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand href="/">
          Hexlet Chat
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Nav;
