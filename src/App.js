import "./App.css";

import React from "react";
import {
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Bulletin from "./pages/Bulletin";

import './css/app.css'


function App() {

  const location = useLocation();

  return (
    <>
      <Navbar />
      <Routes location={location} key={location.pathname}>
        <Route index element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/bulletin" element={<Bulletin />} />
      </Routes>
    </>
  );
}

export default App;
