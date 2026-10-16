import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaSignOutAlt,
  FaEnvelope,
  FaDonate,
  FaHandshake,
  FaHandsHelping,
  FaComments,
  FaClipboardList,
  FaChartLine,
  FaCheckCircle,
  FaSpinner,
  FaArchive,
  FaArrowRight,
} from 'react-icons/fa';
import { supabase, getStats } from '../../services/supabase';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // Get stats
      const statsResult = await getStats();
      if (statsResult.success) {
        setStats(statsResult.data);
      }

      // Get 5 most recent submissions
      const { data: recent } = await supabase
        .from('submissions')
        .select('id, type, name, email, status, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      if (recent) {
        setRecentSubmissions(recent);
      }

      setLoading(false);
    };

    loadDashboard();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  const typeConfig = {
    contact: { label: 'Contact', icon: FaEnvelope, color: 'text-navy', bg: 'bg-navy/10' },
    donation: { label: 'Donation', icon: FaDonate, color: 'text-orange', bg: 'bg-orange/10' },
    partnership: { label: 'Partnership', icon: FaHandshake, color: 'text-teal', bg: 'bg-teal/10' },
    volunteer: { label: 'Volunteer', icon: FaHandsHelping, color: 'text-teal', bg: 'bg-teal/10' },
    consultation: { label: 'Consultation', icon: FaComments, color: 'text-navy', bg: 'bg-navy/10' },
  };

  const statusConfig = {
    'New': { color: 'text-blue-700', bg: 'bg-blue-100' },
    'In Progress': { color: 'text-yellow-700', bg: 'bg-yellow-100' },
    'Resolved': { color: 'text-green-700', bg: 'bg-green-100' },
    'Archived': { color: 'text-gray-700', bg: 'bg-gray-100' },
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-softWhite py-10">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-navy">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {user?.email ? `Signed in as ${user.email}` : 'Loading user...'}
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/admin/submissions">
              <button className="btn-primary flex items-center gap-2">
                <FaClipboardList /> View All Submissions
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="btn-outline flex items-center gap-2"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <FaSpinner className="animate-spin text-teal text-4xl mx-auto mb-4" />
            <p className="text-gray-500">Loading dashboard...</p>
          </div>
        ) : (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard
                label="Total Submissions"
                value={stats?.total || 0}
                icon={FaChartLine}
                color="text-navy"
                bg="bg-navy/10"
              />
              <StatCard
                label="New"
                value={stats?.byStatus?.New || 0}
                icon={FaEnvelope}
                color="text-blue-600"
                bg="bg-blue-100"
              />
              <StatCard
                label="In Progress"
                value={stats?.byStatus?.['In Progress'] || 0}
                icon={FaSpinner}
                color="text-yellow-600"
                bg="bg-yellow-100"
              />
              <StatCard
                label="Resolved"
                value={stats?.byStatus?.Resolved || 0}
                icon={FaCheckCircle}
                color="text-green-600"
                bg="bg-green-100"
              />
            </div>

            {/* By Type */}
            <div className="mb-8">
              <h2 className="text-xl font-heading font-bold text-navy mb-4">
                Submissions by Type
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(typeConfig).map(([key, config]) => {
                  const Icon = config.icon;
                  const count = stats?.byType?.[key] || 0;
                  return (
                    <Link
                      key={key}
                      to={`/admin/submissions?type=${key}`}
                      className="card p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className={`${config.bg} ${config.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
                        <Icon />
                      </div>
                      <div className="text-2xl font-bold text-navy">{count}</div>
                      <div className="text-sm text-gray-500">{config.label}</div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Recent Submissions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading font-bold text-navy">
                  Recent Submissions
                </h2>
                <Link
                  to="/admin/submissions"
                  className="text-teal hover:text-orange transition-colors text-sm font-semibold flex items-center gap-1"
                >
                  View All <FaArrowRight className="text-xs" />
                </Link>
              </div>

              {recentSubmissions.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No submissions yet.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 text-left text-xs text-gray-500 uppercase">
                        <th className="py-3 px-2">Type</th>
                        <th className="py-3 px-2">Name</th>
                        <th className="py-3 px-2 hidden md:table-cell">Email</th>
                        <th className="py-3 px-2">Status</th>
                        <th className="py-3 px-2 hidden md:table-cell">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentSubmissions.map((sub) => {
                        const config = typeConfig[sub.type] || typeConfig.contact;
                        const Icon = config.icon;
                        const status = statusConfig[sub.status] || statusConfig['New'];
                        return (
                          <tr
                            key={sub.id}
                            className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                          >
                            <td className="py-3 px-2">
                              <div className="flex items-center gap-2">
                                <div className={`${config.bg} ${config.color} w-7 h-7 rounded-lg flex items-center justify-center text-xs`}>
                                  <Icon />
                                </div>
                                <span className="text-sm font-medium text-navy hidden sm:inline">
                                  {config.label}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-2 text-sm text-navy font-medium">
                              {sub.name}
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-600 hidden md:table-cell">
                              {sub.email}
                            </td>
                            <td className="py-3 px-2">
                              <span className={`${status.bg} ${status.color} px-2 py-1 rounded-full text-xs font-semibold`}>
                                {sub.status}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-500 hidden md:table-cell">
                              {formatDate(sub.created_at)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Reusable StatCard component
const StatCard = ({ label, value, icon: Icon, color, bg }) => (
  <motion.div
    className="bg-white rounded-2xl shadow-lg p-5"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className={`${bg} ${color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
      <Icon />
    </div>
    <div className="text-2xl md:text-3xl font-bold text-navy">{value}</div>
    <div className="text-xs md:text-sm text-gray-500 mt-1">{label}</div>
  </motion.div>
);

export default AdminDashboard;