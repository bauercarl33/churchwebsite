import React, { useRef } from 'react'
import { 
  Routes, 
  Route, 
  BrowserRouter as Router,
  useLocation
} from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import AboutMore from './pages/AboutMore'
import Bulletin from './pages/Bulletin';
import { AnimatePresence } from 'framer-motion'

function App() {
  const location = useLocation();

  return (
    <div className='app'>
        <Navbar />
        {/* <AnimatePresence mode='wait' initial={false}> */}
        <Routes location={location} key={location.key}>
          <Route
            path='/'
            element={
              <>
                <Home />
                <About  />
                <Bulletin />
              </>
            }
          />
          <Route exact path='/about' element={<AboutMore />} />
        </Routes>
        {/* </AnimatePresence> */}
    </div>
  );
}

export default App;