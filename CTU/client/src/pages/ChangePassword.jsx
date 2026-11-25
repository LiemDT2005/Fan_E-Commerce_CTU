import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function ChangePassword() {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg('');
    setErr('');

    if (newPass.length < 6) {
      setErr('New password must be at least 6 characters.');
      return;
    }
    if (newPass !== confirmPass) {
      setErr('Password confirmation does not match.');
      return;
    }

    setMsg('Password updated successfully!');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  return (
    <div className="max-w-[540px] mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant mb-6">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight size={14} strokeWidth={1.75} />
        <span className="text-primary font-semibold">Change Password</span>
      </div>

      <div className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/25 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Change Password</h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Update your password to keep your account and connected devices secure.
          </p>
        </div>

        {err && <div className="p-3.5 rounded-xl bg-error-container text-on-error-container text-xs font-semibold">{err}</div>}
        {msg && <div className="p-3.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold">{msg}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1">Current Password *</label>
            <input
              type="password"
              required
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/25 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1">New Password *</label>
            <input
              type="password"
              required
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/25 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1">Confirm New Password *</label>
            <input
              type="password"
              required
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/25 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold transition-all mt-4"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
