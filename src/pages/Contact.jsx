import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaClock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { submitForm } from '../services/supabase';
import { sendContactNotification } from '../services/emailService';
import { isSpam, checkRateLimit, createHoneypot } from '../utils/spamProtection';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    ...createHoneypot(),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    // Spam check
    if (isSpam(formData)) {
      console.warn('Spam detected');
      setSubmitStatus({ type: 'error', message: 'Submission blocked.' });
      return;
    }

    // Rate limit check
    const rateCheck = checkRateLimit(3);
    if (!rateCheck.allowed) {
      setSubmitStatus({ type: 'error', message: rateCheck.message });
      return;
    }

    setIsSubmitting(true);

    // 1. Save to Supabase
    const result = await submitForm({
      type: 'contact',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    });

    if (result.success) {
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message! We will get back to you soon.',
      });

      // 2. Send email notification (non-blocking — failure doesn't affect submission)
      sendContactNotification(formData).catch((err) =>
        console.warn('Email notification failed (submission still saved):', err)
      );

      // 3. Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        ...createHoneypot(),
      });
    } else {
      setSubmitStatus({
        type: 'error',
        message: result.message || 'Something went wrong. Please try again.',
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
                  <p className="font-medium text-navy">Nairobi, Kenya</p>
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
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-heading font-bold text-navy mb-6">Send Us a Message</h2>

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
                {/* Honeypot — hidden from humans */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  tabIndex="-1"
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
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
                    Message *
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
                  className={`btn-primary w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
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