import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";

import "./App.css";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  //this is used to maintain the state of our authentication
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  // This hook takes a function and an array of variables. This will be called everytime the component is rendered.
  // The array tells react to only re-run our function if the passed in array of variables has changed.
  // 1. No array means it will run everytime our component is rendered.
  // 2. If you pass in some variables, on every render it will first check if those variables have changed before running.
  // 3. If you pass in an empty list of varibables it will only run on the first render.
  // In our case we only want to check the users authentication state when the app first loads.
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }

  function handleLogout() {
    userHasAuthenticated(false);
  }
  return (
    !isAuthenticating && (
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
    )
  );
}

export default App;
