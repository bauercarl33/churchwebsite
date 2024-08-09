import logo from "./logo.svg";
import "./App.css";

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import Home from "./pages/homepage";

function App() {
  return (
    <Router>
      <div>
        <h3>Tabs Tabs Tabs Tabs</h3>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <p>footer footer footer</p>
      </div>
    </Router>
  );
}

export default App;
