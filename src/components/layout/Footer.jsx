import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const Footer = () => {
  const quickLinks = [
    { to: '/about', label: 'About Us' },
    { to: '/team', label: 'Our Team' },
    { to: '/our-work', label: 'Our Work' },
    { to: '/our-impact', label: 'Our Impact' },
    { to: '/consultation', label: 'Book Consultation' },
    { to: '/stories-news', label: 'Stories & News' },
  ];

  const programmes = [
    { to: '/programmes/children', label: 'Vulnerable Children Support' },
    { to: '/programmes/food', label: 'Food and Meal Support' },
    { to: '/programmes/clothing', label: 'Clothing Support' },
    { to: '/programmes/homes', label: "Children's Homes Outreach" },
    { to: '/programmes/sick', label: 'Supporting the Sick' },
    { to: '/programmes/community', label: 'Community Outreach' },
  ];

  return (
    <footer className="bg-navy text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/logo.png"
                alt="Little Angels CBO"
                className="h-12 w-auto"
              />
              <span className="font-heading text-xl font-bold">
                Little Angels CBO
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Touching Lives. Restoring Hope. Building Futures. We are committed
              to supporting vulnerable children, families, and communities
              across Kenya.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="text-gray-300 hover:text-orange transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-orange transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-orange transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-orange transition-colors"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-orange transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/donate"
                  className="text-orange hover:text-orange/80 transition-colors text-sm font-semibold"
                >
                  Donate Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Programmes */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">
              Our Programmes
            </h3>
            <ul className="space-y-2">
              {programmes.slice(0, 5).map((programme) => (
                <li key={programme.to}>
                  <Link
                    to={programme.to}
                    className="text-gray-300 hover:text-orange transition-colors text-sm"
                  >
                    {programme.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaPhone className="text-orange mt-1" />
                <span className="text-sm text-gray-300">0727 202197</span>
              </li>
              <li className="flex items-start space-x-3">
                <FaEnvelope className="text-orange mt-1" />
                <span className="text-sm text-gray-300">
                  litt89765@gmail.com
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-orange mt-1" />
                <span className="text-sm text-gray-300">Nairobi, Kenya</span>
              </li>
            </ul>
            <Link to="/donate">
              <button className="btn-primary w-full mt-4 text-sm">
                Support Our Work
              </button>
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2026 Little Angels CBO. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;