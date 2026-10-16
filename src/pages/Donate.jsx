import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaHandsHelping,
  FaUtensils,
  FaBook,
  FaHeartbeat,
  FaHome,
  FaDonate,
  FaCheckCircle,
  FaExclamationCircle,
} from 'react-icons/fa';
import { submitForm } from '../services/supabase';
import { sendDonationNotification } from '../services/emailService';
import { isSpam, checkRateLimit, createHoneypot } from '../utils/spamProtection';

const Donate = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'Kenya',
    currency: 'KES',
    amount: '',
    category: 'General Donation',
    message: '',
    anonymous: false,
    ...createHoneypot(),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const categories = [
    { value: 'children', label: 'Support Vulnerable Children', icon: FaHandsHelping },
    { value: 'meals', label: 'Provide Meals', icon: FaUtensils },
    { value: 'education', label: 'Support Education', icon: FaBook },
    { value: 'medical', label: 'Support Medical Care', icon: FaHeartbeat },
    { value: 'homes', label: "Support Children's Homes", icon: FaHome },
    { value: 'general', label: 'General Donation', icon: FaDonate },
  ];

  const currencies = [
    { value: 'KES', label: 'KES - Kenyan Shilling' },
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    // Spam check
    if (isSpam(formData)) {
      setSubmitStatus({ type: 'error', message: 'Submission blocked.' });
      return;
    }

    // Rate limit
    const rateCheck = checkRateLimit(3);
    if (!rateCheck.allowed) {
      setSubmitStatus({ type: 'error', message: rateCheck.message });
      return;
    }

    setIsSubmitting(true);

    // 1. Save to Supabase
    const result = await submitForm({
      type: 'donation',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      currency: formData.currency,
      amount: formData.amount,
      category: formData.category,
      message: formData.message,
      metadata: { anonymous: formData.anonymous },
    });

    if (result.success) {
      setSubmitStatus({
        type: 'success',
        message:
          'Thank you for your generous donation! Our team will contact you shortly with payment details.',
      });

      // 2. Email notification (non-blocking)
      sendDonationNotification(formData).catch((err) =>
        console.warn('Email notification failed:', err)
      );

      // 3. Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: 'Kenya',
        currency: 'KES',
        amount: '',
        category: 'General Donation',
        message: '',
        anonymous: false,
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
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
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
          <h1 className="section-title">Your Kindness Can Change a Life</h1>
          <p className="section-subtitle mx-auto">
            Every donation, no matter the size, makes a difference in the lives of vulnerable children, families, and communities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-heading font-bold text-navy mb-6">Make a Donation</h2>

              {submitStatus && (
                <div
                  className={`mb-6 p-4 rounded-xl flex items-start space-x-3 ${
                    submitStatus.type === 'success'
                      ? 'bg-green-50 border border-green-200 text-green-700'
                      : 'bg-red-50 border border-red-200 text-red-700'
                  }`}
                >
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
                  tabIndex="-1"
                  autoComplete="off"
                  style={{ display: 'none' }}
                />

                {/* Donation Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What would you like to support?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      const isSelected = formData.category === category.value;
                      return (
                        <button
                          key={category.value}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, category: category.value })
                          }
                          className={`p-3 rounded-xl border-2 transition-all duration-300 text-center ${
                            isSelected
                              ? 'border-teal bg-teal/10 text-teal'
                              : 'border-gray-200 hover:border-teal hover:bg-teal/5'
                          }`}
                        >
                          <Icon className="mx-auto text-xl mb-1" />
                          <span className="text-xs font-medium block">
                            {category.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Donation Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Donation Amount *
                  </label>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        min="1"
                        step="1"
                        placeholder="Enter amount"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div className="w-48">
                      <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300 bg-white"
                      >
                        {currencies.map((currency) => (
                          <option key={currency.value} value={currency.value}>
                            {currency.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Enter any amount you wish to donate
                  </p>
                </div>

                {/* Personal Information */}
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
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300"
                    >
                      <option value="Kenya">Kenya</option>
                      <option value="Uganda">Uganda</option>
                      <option value="Tanzania">Tanzania</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300"
                    placeholder="Any special message or dedication?"
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="anonymous"
                    checked={formData.anonymous}
                    onChange={handleChange}
                    className="w-4 h-4 text-teal border-gray-300 rounded focus:ring-teal"
                  />
                  <label className="ml-2 text-sm text-gray-600">
                    Make this donation anonymous
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-primary w-full text-lg py-4 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Processing...' : 'Proceed to Donate'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By donating, you agree to our terms and conditions. Your information is secure and will not be shared.
                </p>
              </form>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-gradient-to-br from-navy to-teal rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-heading font-bold mb-4">Why Donate?</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <FaHandsHelping className="text-orange mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Direct Impact</p>
                    <p className="text-sm text-gray-200">
                      Your donation goes directly to supporting vulnerable children and families.
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <FaHeartbeat className="text-orange mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Transparency</p>
                    <p className="text-sm text-gray-200">
                      We provide regular updates on how your donations are used.
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <FaDonate className="text-orange mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Tax Deductible</p>
                    <p className="text-sm text-gray-200">
                      Your donation is tax deductible in Kenya.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
              <h4 className="font-heading font-bold text-navy mb-3">Bank Details</h4>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Bank:</strong> To be provided by the organization
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Account Name:</strong> Little Angels CBO
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Account Number:</strong> [To be provided]
              </p>
              <p className="text-xs text-gray-500 mt-4">
                * Payment details will be provided by the organization. Please wait for confirmation email.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Donate;