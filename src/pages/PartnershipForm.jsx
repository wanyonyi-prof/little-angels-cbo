import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { sendPartnershipNotification } from '../services/emailService';

const PartnershipForm = () => {
  const [formData, setFormData] = useState({
    organization: '',
    contactPerson: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const result = await sendPartnershipNotification(formData);
    
    if (result.success) {
      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you for your interest in partnering with us! We will contact you soon.' 
      });
      setFormData({
        organization: '',
        contactPerson: '',
        email: '',
        phone: '',
        interest: '',
        message: '',
      });
    } else {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Something went wrong. Please try again or contact us directly.' 
      });
    }
    
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const interests = [
    'Corporate Partnership',
    'NGO/Organization Partnership',
    'Government Partnership',
    'School/Educational Partnership',
    'Healthcare Partnership',
    'Community Partnership',
    'International Partnership',
    'Other',
  ];

  return (
    <div className="py-20">
      <div className="container-custom max-w-4xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section-title">Partner With Us</h1>
          <p className="section-subtitle mx-auto">
            Join us in building partnerships that create lasting change for vulnerable children, families, and communities.
          </p>
        </motion.div>

        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
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
                Organization Name *
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300"
                placeholder="Your organization name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Person *
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300"
                  placeholder="Full name"
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
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300"
                placeholder="0712 345 678"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Partnership Interest *
              </label>
              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300"
              >
                <option value="">Select type of partnership</option>
                {interests.map((interest) => (
                  <option key={interest} value={interest}>{interest}</option>
                ))}
              </select>
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
                placeholder="Tell us about your organization and how you'd like to partner with us"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-primary w-full text-lg py-4 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Partnership Inquiry'}
            </button>

            <p className="text-xs text-gray-500 text-center">
              We'll review your inquiry and get back to you within 5-7 business days.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PartnershipForm;