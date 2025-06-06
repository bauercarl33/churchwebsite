import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Donate from "./pages/Donate/Donate";
import Footer from "./components/Footer/Footer";
import Media from "./pages/Media/Media";
import Visitors from "./pages/Visitors/Visitors";
import Calendar from "./pages/ScheduleX/Calendar";
import DonateCopy from "./pages/DonateCopy/Donate";

const queryClient = new QueryClient();

function App() {
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Navbar />
        <Routes location={location} key={location.key}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/calendar" element={<Calendar />} />
          <Route exact path="/media" element={<Media />} />
          <Route path="/media/:name/:id" element={<Media />} />
          <Route exact path="/visitors" element={<Visitors />} />
          <Route exact path="/donate" element={<DonateCopy />} />
          <Route exact path="/donateCopy" element={<DonateCopy />} />
        </Routes>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
