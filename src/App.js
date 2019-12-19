import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";

import "./App.css";

function App() {
  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect bg="light">
        <Navbar.Brand>
          <Link to="/">Scratch</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ml-auto">
            <LinkContainer to="/signup">
              <Nav.Link href="/signup">Signup</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link href="/login">Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;
