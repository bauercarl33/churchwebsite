import React from 'react'
import { 
  Routes, 
  Route 
} from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import AboutMore from './pages/AboutMore'
import Bulletin from './pages/Bulletin';
import ScrollToSection from './components/ScrollToSection'

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

export default App;