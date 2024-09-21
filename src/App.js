import React from 'react'
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
import AnimatedRedirect from './pages/AnimatedRedirect';
import ScrollToSection from './components/ScrollToSection'
import { AnimatePresence } from 'framer-motion'

function App() {
  const location = useLocation();
  // return (
  //   <Router>
  //     <Navbar />
  //     <ScrollToSection />
  //     <Routes>
  //       <Route path='/about' element={<AboutMore />} />
  //       <Route path='/' element={
  //           <>
  //             <Home />
  //             <About />
  //             <Bulletin />
  //           </>
  //         }
  //       />
  //     </Routes>
  //   </Router>
    
  // );
  return (
    <div className='app'>
      <Navbar />
      <ScrollToSection />
      {/* <AnimatePresence initial={false} mode='wait'> */}
        <Routes location={location} key={location.key}>
          <Route
            path='/'
            element={
              <>
                <Home />
                <About />
                <Bulletin />
              </>
            }
          />
          {/* <Route path='/about' element={<AboutMore />} /> */}
          <Route path='/about' element={<AnimatedRedirect />} />
        </Routes>
      {/* </AnimatePresence> */}
    </div>
    
      // <div className='app'>
      //   <Navbar />
      //   <ScrollToSection />
      //   <Routes>
      //     <Route path='/' element={
      //         <>
      //           <Home />
      //           <About />
      //           <Bulletin />
      //         </>
      //       }
      //     />
      //   </Routes>
      //   <AnimatePresence initial={false} mode='wait'>
      //     <Routes location={location} key={location.key}>
      //       <Route path='/about' element={<AboutMore />} />
      //     </Routes>
      //   </AnimatePresence>
      // </div>
  );
}

export default App;