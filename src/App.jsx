import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import OurWork from './pages/OurWork';
import OurImpact from './pages/OurImpact';
import GetInvolved from './pages/GetInvolved';
import StoriesNews from './pages/StoriesNews';
import StoryDetail from './pages/StoryDetail';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import Programmes from './pages/Programmes';
import VolunteerForm from './pages/VolunteerForm';
import PartnershipForm from './pages/PartnershipForm';

function App() {
  return (
    <HelmetProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/our-work" element={<OurWork />} />
            <Route path="/our-impact" element={<OurImpact />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/stories-news" element={<StoriesNews />} />
            <Route path="/stories/:slug" element={<StoryDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/programmes/:id" element={<Programmes />} />
            <Route path="/volunteer" element={<VolunteerForm />} />
            <Route path="/partner" element={<PartnershipForm />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}

export default App;