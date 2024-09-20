import React from 'react'
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  useLocation
} from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import AboutMore from './pages/AboutMore'
import Bulletin from './pages/Bulletin';
import { useEffect } from 'react'
import { scroller } from 'react-scroll'

function App() {

  return (
    <div>
      <Navbar />
      <ScrollToSection />
      <Routes>
        <Route path='/about' element={<AboutMore />} />
        <Route path='/' element={
            <>
              <Home />
              <About />
              <Bulletin />
            </>
          }
        />
      </Routes>
    </div>
    
  );
}

const ScrollToSection = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    
    if (hash) {
      scroller.scrollTo(hash, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });
    }
  }, [location]);

  return null;
};


export default App;