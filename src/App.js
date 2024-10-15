import React, { useRef } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
<<<<<<< HEAD
  useLocation,
} from "react-router-dom";
=======
  useLocation
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Calendar from './pages/Calendar/Calendar'
import Donate from './pages/Donate/Donate';

import { AnimatePresence } from 'framer-motion'
>>>>>>> frontend_udpate

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Bulletin from "./pages/Bulletin/Bulletin";
import Donate from "./pages/Donate/Donate";
import AdminPage from "./pages/admin";
import Footer from "./components/Footer/Footer";

<<<<<<< HEAD
import { AnimatePresence } from "framer-motion";
=======
const queryClient = new QueryClient();
>>>>>>> frontend_udpate

function App() {
  const location = useLocation();

  return (
<<<<<<< HEAD
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
=======
    <QueryClientProvider client={queryClient}>
      <div className='app'>
          <Navbar />
          <Routes location={location} key={location.key}>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/calendar' element={<Calendar />} />
            <Route exact path='/donate' element={<Donate />} />
          </Routes>
          <Footer />
      </div>
    </QueryClientProvider>
>>>>>>> frontend_udpate
  );
}

export default App;
