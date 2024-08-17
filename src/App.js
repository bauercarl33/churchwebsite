import logo from "./logo.svg";
import "./App.css";

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import Home from "./pages/homepage";
import AboutUsPage from "./pages/aboutus";
import BulletinPage from "./pages/bulletin";
import CalendarPage from "./pages/calendars";
import FAQpage from "./pages/faq";
import PhotoAlbumPage from "./pages/photoalbum";
import AdminPage from "./pages/admin";

import FolderTabs from "./comp/FolderTabs";

function App() {
  return (
    <Router>
      <div>
        <FolderTabs />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/bulletin" element={<BulletinPage />} />
        </Routes>
        <Routes>
          <Route path="/calendars" element={<CalendarPage />} />
        </Routes>
        <Routes>
          <Route path="/photo-album" element={<PhotoAlbumPage />} />
        </Routes>
        <Routes>
          <Route path="/about-us" element={<AboutUsPage />} />
        </Routes>
        <Routes>
          <Route path="/frequently-asked-questions" element={<FAQpage />} />
        </Routes>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <p>footer footer footer</p>
      </div>
    </Router>
  );
}

export default App;
