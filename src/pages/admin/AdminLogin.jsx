import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaEnvelope, FaEye, FaEyeSlash, FaCheckCircle, FaExclamationCircle, FaArrowLeft } from 'react-icons/fa';
import { supabase } from '../../services/supabase';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/admin', { replace: true });
      }
    };
    checkSession();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (error) {
        setSubmitStatus({
          type: 'error',
          message: error.message || 'Invalid email or password.',
        });
        setIsSubmitting(false);
        return;
      }

      if (data?.session) {
        setSubmitStatus({
          type: 'success',
          message: 'Login successful. Redirecting...',
        });
        // Small delay so the success message is visible
        setTimeout(() => {
          navigate('/admin', { replace: true });
        }, 600);
      } else {
        setSubmitStatus({
          type: 'error',
          message: 'Login failed. Please try again.',
        });
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again.',
      });
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy to-teal flex items-center justify-center px-4 py-12">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <img
            src="/logo.png"
            alt="Little Angels CBO"
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-3xl font-heading font-bold text-white mb-2">
            Admin Portal
          </h1>
          <p className="text-gray-300 text-sm">
            Little Angels CBO — Secure Access
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex items-center justify-center w-12 h-12 bg-teal/10 rounded-full mx-auto mb-4">
            <FaLock className="text-teal text-xl" />
          </div>

          <h2 className="text-xl font-heading font-bold text-navy text-center mb-6">
            Sign In
          </h2>

          {/* Status Message */}
          {submitStatus && (
            <div
              className={`mb-5 p-3 rounded-xl flex items-start space-x-3 text-sm ${
                submitStatus.type === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}
            >
              {submitStatus.type === 'success' ? (
                <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
              ) : (
                <FaExclamationCircle className="text-red-500 mt-0.5 flex-shrink-0" />
              )}
              <span>{submitStatus.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-primary w-full text-base py-3 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            Authorized personnel only. All login attempts are logged.
          </p>
        </div>

        {/* Back to Website */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-orange transition-colors text-sm"
          >
            <FaArrowLeft />
            Back to Website
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;