import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";

import "./App.css";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  function handleLogout() {
    userHasAuthenticated(false);
  }
  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect bg="light">
        <Navbar.Brand>
          <Link to="/">Scratch</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ml-auto">
            {isAuthenticated ? (
              <Nav.Item onClick={handleLogout}>Logout</Nav.Item>
            ) : (
              // <> is a fragment component that can be thought of as a placeholder component.
              // We need this because in the case the user is not logged in, we want to render two links.
              // To do this we would need to wrap it inside a single component, like a div.
              // But by using the Fragment component it tells React that the two links are inside this component but we don’t want to render any extra HTML.
              <>
                <LinkContainer to="/signup">
                  <Nav.Link href="/signup">Signup</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link href="/login">Login</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  );
}

export default App;
