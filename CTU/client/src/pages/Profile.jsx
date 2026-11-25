import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

export default function Profile() {
  const { user, login } = useAuth();
  const [name, setName] = useState(user?.name || 'Alex Nguyen');
  const [phone, setPhone] = useState(user?.phone || '+84 912 345 678');
  const [email, setEmail] = useState(user?.email || 'alex@example.com');
  const [address, setAddress] = useState(user?.address || 'Suite 1806, Landmark 3, Vinhomes Central Park, HCMC');
  const [homeArea, setHomeArea] = useState('95 m² (3 bedrooms + 1 living room)');
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    login({ ...user, name, phone, email, address });
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  return (
    <div className="max-w-[960px] mx-auto px-4 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant mb-6">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight size={14} strokeWidth={1.75} />
        <span className="text-primary font-semibold">Personal Profile</span>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-on-surface tracking-tight">Member Profile</h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Manage contact details, apartment specifications, and connected smart fans
          </p>
        </div>
        <span className="px-3.5 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-semibold">
          {user?.tier || 'VIP Gold'}
        </span>
      </div>

      {savedMsg && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 size={16} strokeWidth={1.75} />
          Profile updated successfully!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left card */}
        <div className="md:col-span-1 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/25 text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-primary text-on-primary text-3xl font-bold flex items-center justify-center mx-auto">
            {name ? name.charAt(0) : 'U'}
          </div>
          <div>
            <h3 className="font-semibold text-base text-on-surface">{name}</h3>
            <span className="text-xs text-on-surface-variant">{email}</span>
          </div>

          <div className="pt-4 border-t border-outline-variant/20 text-xs text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Active Connected Fans:</span>
              <strong className="text-on-surface">2 Smart Fans</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Last Filter Maintenance:</span>
              <strong className="text-emerald-700">1 month ago</strong>
            </div>
          </div>
        </div>

        {/* Right form */}
        <div className="md:col-span-2 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/25">
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/25 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/25 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/25 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1">Default Installation Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/25 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1">Apartment / Room Area</label>
              <input
                type="text"
                value={homeArea}
                onChange={(e) => setHomeArea(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/25 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold transition-all"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
