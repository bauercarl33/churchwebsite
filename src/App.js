import React, { useRef } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  useLocation
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Calendar from './pages/Calendar/Calendar'
import Donate from './pages/Donate/Donate';
import Footer from "./components/Footer/Footer";
import Media from "./pages/Media/Media";
import Visitors from "./pages/Visitors/Visitors";

const queryClient = new QueryClient();

function App() {
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <div className='app'>
          <Navbar />
          <Routes location={location} key={location.key}>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/calendar' element={<Calendar />} />
            <Route exact path='/media' element={<Media />} />
            <Route path='/media/:name/:id' element={<Media />} />
            <Route exact path='/visitors' element={<Visitors />} />
            <Route exact path='/donate' element={<Donate />} />
          </Routes>
          <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
