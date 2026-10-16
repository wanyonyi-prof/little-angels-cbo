import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Layout
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Public pages
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
import Consultation from './pages/Consultation';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminSubmissions from './pages/admin/AdminSubmissions';

function App() {
  return (
    <HelmetProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          {/* ==================== ADMIN ROUTES (NO LAYOUT) ==================== */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/submissions"
            element={
              <ProtectedRoute>
                <AdminSubmissions />
              </ProtectedRoute>
            }
          />

          {/* ==================== PUBLIC ROUTES (WITH LAYOUT) ==================== */}
          <Route
            path="/*"
            element={
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
                  <Route path="/consultation" element={<Consultation />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;