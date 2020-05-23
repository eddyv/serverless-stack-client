import React from "react";
import "./App.css";
import "./components/NavBar/NavBar";
import NavBar from "./components/NavBar/NavBar";
import Routes from "./Routes";

function App() {
  return (
    <div className="App container">
      <NavBar />
      <Routes />
    </div>
  );
}

export default App;
