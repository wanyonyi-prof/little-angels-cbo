import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaClock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { sendContactNotification } from '../services/emailService';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const result = await sendContactNotification(formData);
    
    if (result.success) {
      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you for your message. We will get back to you soon!' 
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Something went wrong. Please try again or call us directly.' 
      });
    }
    
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="py-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section-title">Contact Us</h1>
          <p className="section-subtitle mx-auto">
            We'd love to hear from you. Reach out with questions, partnership inquiries, or to learn more about our work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
              <h2 className="text-2xl font-heading font-bold text-navy mb-6">Get in Touch</h2>
              
              <div className="flex items-start space-x-4">
                <div className="bg-teal/10 p-3 rounded-xl text-teal">
                  <FaPhone size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-navy">0727 202197</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-navy">+254 759 169748</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange/10 p-3 rounded-xl text-orange">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-navy">litt89765@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-navy/10 p-3 rounded-xl text-navy">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-navy">Mombasa, Kenya</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-teal/10 p-3 rounded-xl text-teal">
                  <FaClock size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Office Hours</p>
                  <p className="font-medium text-navy">Mon-Fri: 8:00 AM - 5:00 PM</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-3">Follow Us</p>
                <div className="flex space-x-3">
                  <a href="#" className="bg-gray-100 hover:bg-teal hover:text-white p-3 rounded-full transition-all duration-300">
                    <FaFacebook size={18} />
                  </a>
                  <a href="#" className="bg-gray-100 hover:bg-teal hover:text-white p-3 rounded-full transition-all duration-300">
                    <FaTwitter size={18} />
                  </a>
                  <a href="#" className="bg-gray-100 hover:bg-teal hover:text-white p-3 rounded-full transition-all duration-300">
                    <FaInstagram size={18} />
                  </a>
                  <a href="#" className="bg-gray-100 hover:bg-teal hover:text-white p-3 rounded-full transition-all duration-300">
                    <FaYoutube size={18} />
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <p className="text-sm font-medium text-navy">Founder</p>
                <p className="text-sm text-gray-600">Amal Said Ndoro</p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-6 bg-gray-200 rounded-2xl overflow-hidden h-48">
              <div className="w-full h-full bg-gradient-to-br from-teal/20 to-navy/20 flex items-center justify-center">
                <p className="text-gray-500 text-sm">Google Map Placeholder</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-heading font-bold text-navy mb-6">Send Us a Message</h2>
              
              {/* Status Message */}
              {submitStatus && (
                <div className={`mb-6 p-4 rounded-xl flex items-start space-x-3 ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 border border-green-200 text-green-700' 
                    : 'bg-red-50 border border-red-200 text-red-700'
                }`}>
                  {submitStatus.type === 'success' ? (
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  ) : (
                    <FaExclamationCircle className="text-red-500 mt-1 flex-shrink-0" />
                  )}
                  <span>{submitStatus.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300"
                    placeholder="Enter subject"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-primary w-full ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;