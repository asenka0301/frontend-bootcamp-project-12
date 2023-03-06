import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function Nav() {
  return (
    <Navbar className="shadow-sm" bg="white" expand="lg" variant="white">
      <Container>
        <Navbar.Brand href="/">
          Hexlet Chat
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Nav;
