import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { submitForm } from '../services/supabase';
import { sendVolunteerNotification } from '../services/emailService';
import { isSpam, checkRateLimit, createHoneypot } from '../utils/spamProtection';

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    skills: '',
    interest: '',
    availability: '',
    motivation: '',
    ...createHoneypot(),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (isSpam(formData)) {
      setSubmitStatus({ type: 'error', message: 'Submission blocked.' });
      return;
    }

    const rateCheck = checkRateLimit(3);
    if (!rateCheck.allowed) {
      setSubmitStatus({ type: 'error', message: rateCheck.message });
      return;
    }

    setIsSubmitting(true);

    const result = await submitForm({
      type: 'volunteer',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      country: formData.location,
      category: formData.interest,
      message: formData.motivation,
      metadata: {
        skills: formData.skills,
        availability: formData.availability,
      },
    });

    if (result.success) {
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your interest in volunteering! We will contact you soon.',
      });

      sendVolunteerNotification(formData).catch((err) =>
        console.warn('Email notification failed:', err)
      );

      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        skills: '',
        interest: '',
        availability: '',
        motivation: '',
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

  const interests = [
    'Vulnerable Children Support',
    'Food Programmes',
    'Clothing Support',
    "Children's Homes Outreach",
    'Supporting the Sick',
    'Community Outreach',
    'Administration',
    'Fundraising',
    'Events',
  ];

  return (
    <div className="py-20">
      <div className="container-custom max-w-4xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section-title">Volunteer With Us</h1>
          <p className="section-subtitle mx-auto">
            Join our team of dedicated volunteers and make a meaningful difference in the lives of vulnerable children and families.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
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
            <input
              type="hidden"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              tabIndex="-1"
              autoComplete="off"
              style={{ display: 'none' }}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300"
                  placeholder="City, County"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills & Qualifications *
              </label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300"
                placeholder="List your skills, qualifications, and experience"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Area of Interest *
              </label>
              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300"
              >
                <option value="">Select an area</option>
                {interests.map((interest) => (
                  <option key={interest} value={interest}>{interest}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability *
              </label>
              <textarea
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                required
                rows="2"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300"
                placeholder="Tell us when you're available (days, times, frequency)"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Why do you want to volunteer with us? *
              </label>
              <textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300"
                placeholder="Share your motivation and what you hope to contribute"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-primary w-full text-lg py-4 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>

            <p className="text-xs text-gray-500 text-center">
              We'll review your application and get back to you within 5-7 business days.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default VolunteerForm;