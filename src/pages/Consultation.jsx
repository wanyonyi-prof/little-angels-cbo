import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaCalendarAlt, FaUser, FaComments, FaClipboardList } from 'react-icons/fa';
import { submitForm } from '../services/supabase';
import { isSpam, checkRateLimit, createHoneypot } from '../utils/spamProtection';

const Consultation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    consultationType: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
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
      type: 'consultation',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      organization: formData.organization,
      category: formData.consultationType,
      message: formData.message,
      metadata: {
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
      },
    });

    if (result.success) {
      setSubmitStatus({
        type: 'success',
        message: 'Thank you! We have received your consultation request and will contact you within 2-3 business days.',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        consultationType: '',
        preferredDate: '',
        preferredTime: '',
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

  const consultationTypes = [
    'Partnership Consultation',
    'Programme Consultation',
    'Volunteer Consultation',
    'Donation Consultation',
    'Community Programme Advice',
    'NGO Setup / Registration Advice',
    'Other',
  ];

  const features = [
    { icon: FaUser, title: 'One-on-One Session', description: 'Speak directly with our team about your needs.' },
    { icon: FaComments, title: 'Expert Advice', description: 'Get guidance on community programmes and partnerships.' },
    { icon: FaClipboardList, title: 'Custom Recommendations', description: 'Receive tailored recommendations for your situation.' },
    { icon: FaCalendarAlt, title: 'Flexible Scheduling', description: 'Choose a time that works best for you.' },
  ];

  return (
    <div className="py-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section-title">Request a Consultation</h1>
          <p className="section-subtitle mx-auto">
            Book a free consultation with our team. Whether you're looking to partner, volunteer, or learn more about our work, we're here to help.
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="card p-5 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-teal text-3xl mb-3 flex justify-center">
                  <Icon />
                </div>
                <h3 className="text-base font-heading font-bold text-navy mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Form */}
        <motion.div
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8"
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

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  Organization (Optional)
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300"
                  placeholder="Your organization"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Consultation Type *
              </label>
              <select
                name="consultationType"
                value={formData.consultationType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300"
              >
                <option value="">Select a consultation type</option>
                {consultationTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time
                </label>
                <input
                  type="time"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What would you like to discuss? *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300"
                placeholder="Tell us what you'd like to discuss..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-primary w-full text-lg py-4 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Submitting...' : 'Request Consultation'}
            </button>

            <p className="text-xs text-gray-500 text-center">
              We'll contact you within 2-3 business days to confirm your consultation.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Consultation;