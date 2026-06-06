import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import CircleWipe from './components/layout/CircleWipe';
import useScrollToTop from './hooks/useScrollToTop';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import DonationModal from './components/layout/DonationModal';

// Pages
import Home from './pages/Home';
import Causes from './pages/Causes';
import About from './pages/About';
import Volunteers from './pages/Volunteers';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import Events from './pages/Events';
import Contact from './pages/Contact';

function ScrollHandler() {
  useScrollToTop();
  return null;
}

function App() {
  const location = useLocation();

  return (
    <HelmetProvider>
      <ScrollHandler />
      <CircleWipe />
      <div className="min-h-screen w-full flex flex-col relative">
        <Navbar />
        <main className="flex-grow w-full relative z-10">
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/causes" element={<Causes />} />
              <Route path="/about" element={<About />} />
              <Route path="/volunteers" element={<Volunteers />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <DonationModal />
      </div>
    </HelmetProvider>
  );
}

export default App;
