import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/team', label: 'Our Team' },
    { to: '/our-work', label: 'Our Work' },
    { to: '/our-impact', label: 'Our Impact' },
    { to: '/get-involved', label: 'Get Involved' },
    { to: '/consultation', label: 'Consultation' },
    { to: '/stories-news', label: 'Stories & News' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/contact', label: 'Contact Us' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy shadow-lg w-full overflow-hidden">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <img
              src="/logo.png"
              alt="Little Angels CBO"
              className="h-8 md:h-10 lg:h-12 w-auto"
            />
            <span className="font-heading text-xs sm:text-sm md:text-base lg:text-xl font-bold text-white truncate">
              Little Angels CBO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'text-orange bg-white/10'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/donate">
              <button className="btn-primary ml-4 text-xs xl:text-sm px-4 xl:px-6 py-2">
                DONATE NOW
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white text-2xl p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-navy rounded-b-2xl overflow-hidden shadow-xl"
            >
              <div className="flex flex-col py-4 px-4 space-y-1 max-h-[80vh] overflow-y-auto">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                        isActive
                          ? 'text-orange bg-white/10'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <Link to="/donate" onClick={() => setIsOpen(false)} className="mt-2">
                  <button className="btn-primary w-full text-center">
                    DONATE NOW
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;