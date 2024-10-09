import React, { useRef } from 'react'
import { 
  Routes, 
  Route, 
  BrowserRouter as Router,
  useLocation
} from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

import Home from './pages/Home/Home'
import About from './pages/About/About'
import Calendar from './pages/Calendar/Calendar'
import Donate from './pages/Donate/Donate';

import { AnimatePresence } from 'framer-motion'



function App() {
  const location = useLocation();

  return (
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
  );
}

export default App;