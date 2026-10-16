import React, { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  FaArrowLeft,
  FaSearch,
  FaDownload,
  FaEnvelope,
  FaDonate,
  FaHandshake,
  FaHandsHelping,
  FaComments,
  FaTimes,
  FaTrash,
  FaSave,
  FaFilter,
} from 'react-icons/fa';
import {
  getSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
} from '../../services/supabase';

const AdminSubmissions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState(searchParams.get('type') || 'all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [actionMessage, setActionMessage] = useState(null);

  const loadSubmissions = async () => {
    setLoading(true);
    const result = await getSubmissions();
    if (result.success) {
      setSubmissions(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  // Filter + search logic
  const filtered = useMemo(() => {
    return submissions.filter((sub) => {
      if (filterType !== 'all' && sub.type !== filterType) return false;
      if (filterStatus !== 'all' && sub.status !== filterStatus) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          (sub.name || '').toLowerCase().includes(q) ||
          (sub.email || '').toLowerCase().includes(q) ||
          (sub.message || '').toLowerCase().includes(q) ||
          (sub.organization || '').toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [submissions, filterType, filterStatus, searchTerm]);

  // Type config
  const typeConfig = {
    contact: { label: 'Contact', icon: FaEnvelope, color: 'text-navy', bg: 'bg-navy/10' },
    donation: { label: 'Donation', icon: FaDonate, color: 'text-orange', bg: 'bg-orange/10' },
    partnership: { label: 'Partnership', icon: FaHandshake, color: 'text-teal', bg: 'bg-teal/10' },
    volunteer: { label: 'Volunteer', icon: FaHandsHelping, color: 'text-teal', bg: 'bg-teal/10' },
    consultation: { label: 'Consultation', icon: FaComments, color: 'text-navy', bg: 'bg-navy/10' },
  };

  const statusOptions = ['New', 'In Progress', 'Resolved', 'Archived'];

  const statusConfig = {
    'New': { color: 'text-blue-700', bg: 'bg-blue-100' },
    'In Progress': { color: 'text-yellow-700', bg: 'bg-yellow-100' },
    'Resolved': { color: 'text-green-700', bg: 'bg-green-100' },
    'Archived': { color: 'text-gray-700', bg: 'bg-gray-100' },
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const openDetail = (sub) => {
    setSelected(sub);
    setAdminNotes(sub.admin_notes || '');
    setActionMessage(null);
  };

  const closeDetail = () => {
    setSelected(null);
    setAdminNotes('');
    setActionMessage(null);
  };

  const handleStatusChange = async (newStatus) => {
    if (!selected) return;
    setStatusUpdating(true);
    const result = await updateSubmissionStatus(selected.id, newStatus, adminNotes);
    if (result.success) {
      // Update local state
      setSubmissions((prev) =>
        prev.map((s) =>
          s.id === selected.id ? { ...s, status: newStatus, admin_notes: adminNotes } : s
        )
      );
      setSelected({ ...selected, status: newStatus, admin_notes: adminNotes });
      setActionMessage({ type: 'success', text: 'Status updated successfully.' });
    } else {
      setActionMessage({ type: 'error', text: result.message || 'Update failed.' });
    }
    setStatusUpdating(false);
  };

  const handleSaveNotes = async () => {
    if (!selected) return;
    setStatusUpdating(true);
    const result = await updateSubmissionStatus(selected.id, selected.status, adminNotes);
    if (result.success) {
      setSubmissions((prev) =>
        prev.map((s) =>
          s.id === selected.id ? { ...s, admin_notes: adminNotes } : s
        )
      );
      setActionMessage({ type: 'success', text: 'Notes saved.' });
    } else {
      setActionMessage({ type: 'error', text: result.message || 'Save failed.' });
    }
    setStatusUpdating(false);
  };

  const handleDelete = async () => {
    if (!selected) return;
    if (!window.confirm('Are you sure you want to delete this submission? This cannot be undone.')) {
      return;
    }
    const result = await deleteSubmission(selected.id);
    if (result.success) {
      setSubmissions((prev) => prev.filter((s) => s.id !== selected.id));
      closeDetail();
    } else {
      setActionMessage({ type: 'error', text: result.message || 'Delete failed.' });
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Type',
      'Name',
      'Email',
      'Phone',
      'Country',
      'Organization',
      'Category',
      'Currency',
      'Amount',
      'Subject',
      'Message',
      'Status',
      'Admin Notes',
      'Created At',
    ];

    const rows = filtered.map((s) => [
      s.id,
      s.type,
      s.name,
      s.email,
      s.phone || '',
      s.country || '',
      s.organization || '',
      s.category || '',
      s.currency || '',
      s.amount ?? '',
      s.subject || '',
      (s.message || '').replace(/\n/g, ' '),
      s.status,
      (s.admin_notes || '').replace(/\n/g, ' '),
      s.created_at,
    ]);

    const csvContent =
      [headers, ...rows]
        .map((row) =>
          row
            .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
            .join(',')
        )
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `little-angels-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFilterTypeChange = (value) => {
    setFilterType(value);
    if (value === 'all') {
      searchParams.delete('type');
    } else {
      searchParams.set('type', value);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-softWhite py-10">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 text-teal hover:text-orange transition-colors text-sm mb-2"
            >
              <FaArrowLeft /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-heading font-bold text-navy">
              All Submissions
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {filtered.length} of {submissions.length} submissions
            </p>
          </div>
          <button
            onClick={handleExportCSV}
            className="btn-primary flex items-center gap-2 self-start md:self-auto"
          >
            <FaDownload /> Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, message..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent transition-all"
              />
            </div>

            {/* Filter Type */}
            <select
              value={filterType}
              onChange={(e) => handleFilterTypeChange(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent bg-white"
            >
              <option value="all">All Types</option>
              <option value="contact">Contact</option>
              <option value="donation">Donation</option>
              <option value="partnership">Partnership</option>
              <option value="volunteer">Volunteer</option>
              <option value="consultation">Consultation</option>
            </select>

            {/* Filter Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent bg-white"
            >
              <option value="all">All Statuses</option>
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="text-center py-20 text-gray-500">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No submissions match your filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase">
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4 hidden md:table-cell">Email</th>
                    <th className="py-3 px-4 hidden lg:table-cell">Details</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 hidden md:table-cell">Date</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((sub) => {
                    const config = typeConfig[sub.type] || typeConfig.contact;
                    const Icon = config.icon;
                    const status = statusConfig[sub.status] || statusConfig['New'];
                    return (
                      <tr
                        key={sub.id}
                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className={`${config.bg} ${config.color} w-8 h-8 rounded-lg flex items-center justify-center text-xs`}>
                              <Icon />
                            </div>
                            <span className="text-sm font-medium text-navy hidden sm:inline">
                              {config.label}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-navy font-medium">
                          {sub.name}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 hidden md:table-cell">
                          {sub.email}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 hidden lg:table-cell max-w-xs truncate">
                          {sub.amount ? `${sub.currency || ''} ${sub.amount}` : sub.subject || sub.category || '—'}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`${status.bg} ${status.color} px-2 py-1 rounded-full text-xs font-semibold`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-500 hidden md:table-cell whitespace-nowrap">
                          {formatDate(sub.created_at)}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => openDetail(sub)}
                            className="text-teal hover:text-orange transition-colors text-sm font-semibold"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={closeDetail}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {(() => {
                  const config = typeConfig[selected.type] || typeConfig.contact;
                  const Icon = config.icon;
                  return (
                    <div className={`${config.bg} ${config.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                      <Icon />
                    </div>
                  );
                })()}
                <div>
                  <h3 className="font-heading font-bold text-navy text-lg">
                    {selected.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {typeConfig[selected.type]?.label || selected.type} • {formatDate(selected.created_at)}
                  </p>
                </div>
              </div>
              <button
                onClick={closeDetail}
                className="text-gray-400 hover:text-red-500 transition-colors text-xl"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              {/* Action message */}
              {actionMessage && (
                <div
                  className={`p-3 rounded-xl text-sm ${
                    actionMessage.type === 'success'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {actionMessage.text}
                </div>
              )}

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <InfoField label="Email" value={selected.email} />
                <InfoField label="Phone" value={selected.phone} />
                <InfoField label="Country" value={selected.country} />
                <InfoField label="Organization" value={selected.organization} />
                <InfoField label="Category" value={selected.category} />
                {selected.amount && (
                  <InfoField
                    label="Amount"
                    value={`${selected.currency || ''} ${selected.amount}`}
                  />
                )}
                {selected.subject && (
                  <InfoField label="Subject" value={selected.subject} className="md:col-span-2" />
                )}
              </div>

              {/* Message */}
              {selected.message && (
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Message</p>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-xl whitespace-pre-wrap">
                    {selected.message}
                  </p>
                </div>
              )}

              {/* Metadata */}
              {selected.metadata && Object.keys(selected.metadata).length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Additional Info</p>
                  <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-xl">
                    {Object.entries(selected.metadata).map(([k, v]) => (
                      <div key={k}>
                        <strong className="capitalize">{k}:</strong> {String(v)}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Status */}
              <div>
                <p className="text-xs text-gray-500 uppercase mb-2">Status</p>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(s)}
                      disabled={statusUpdating}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        selected.status === s
                          ? `${statusConfig[s].bg} ${statusConfig[s].color} ring-2 ring-offset-1 ring-teal`
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      } ${statusUpdating ? 'opacity-60' : ''}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Admin Notes */}
              <div>
                <p className="text-xs text-gray-500 uppercase mb-2">Admin Notes</p>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-teal focus:border-transparent"
                  placeholder="Add internal notes about this submission..."
                />
                <button
                  onClick={handleSaveNotes}
                  disabled={statusUpdating}
                  className="mt-2 text-teal hover:text-orange transition-colors text-sm font-semibold flex items-center gap-1"
                >
                  <FaSave /> Save Notes
                </button>
              </div>

              {/* Danger Zone */}
              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={handleDelete}
                  className="text-red-500 hover:text-red-700 transition-colors text-sm font-semibold flex items-center gap-2"
                >
                  <FaTrash /> Delete Submission
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Small helper component
const InfoField = ({ label, value, className = '' }) => {
  if (!value) return null;
  return (
    <div className={className}>
      <p className="text-xs text-gray-500 uppercase mb-1">{label}</p>
      <p className="text-sm text-gray-700 break-words">{value}</p>
    </div>
  );
};

export default AdminSubmissions;