import React, { useRef } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Bulletin from "./pages/Bulletin/Bulletin";
import Donate from "./pages/Donate/Donate";
import AdminPage from "./pages/admin";
import Footer from "./components/Footer/Footer";

import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <Navbar />
      {/* <AnimatePresence mode='wait' initial={false}> */}
      <Routes location={location} key={location.key}>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/donate" element={<Donate />} />
        <Route exact path="/admin" element={<AdminPage />} />
      </Routes>
      <Footer />
      {/* </AnimatePresence> */}
    </div>
  );
}

export default App;
