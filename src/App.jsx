import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import { useAnnouncement } from "./components/AnnouncementBar/useAnnouncement";

// Secondary pages are split into their own chunks so the home page doesn't
// download the calendar library, framer-motion, etc.
const About = lazy(() => import("./pages/About/About"));
const Calendar = lazy(() => import("./pages/ScheduleX/Calendar"));
const Media = lazy(() => import("./pages/Media/Media"));
const Visitors = lazy(() => import("./pages/Visitors/Visitors"));
const Donate = lazy(() => import("./pages/Donate/Donate"));
const Consecration = lazy(() => import("./pages/Consecration/Consecration"));

const defaultQueryClient = new QueryClient();

function App({ queryClient = defaultQueryClient }) {
  const location = useLocation();
  const announcement = useAnnouncement();
  // No need to advertise the event on its own page.
  const showAnnouncement =
    announcement.visible && location.pathname !== announcement.event.path;

  return (
    <QueryClientProvider client={queryClient}>
      <div className={showAnnouncement ? "app has-announcement" : "app"}>
        <Navbar announcement={showAnnouncement ? announcement : null} />
        <main>
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Routes location={location} key={location.key}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/media" element={<Media />} />
              <Route path="/media/:name/:id" element={<Media />} />
              <Route path="/visitors" element={<Visitors />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/consecration" element={<Consecration />} />
              {/* Legacy URL from when the shop page was being built. */}
              <Route path="/donateCopy" element={<Navigate to="/donate" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
