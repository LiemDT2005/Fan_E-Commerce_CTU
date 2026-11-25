import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

export default function Register() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || '/';

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    login({
      id: `cust-${Date.now()}`,
      name: name.trim() || 'New Customer',
      phone: phone.trim(),
      email: email.trim(),
      tier: 'Member',
      address: 'Hanoi',
      isAdmin: false
    });
    navigate(redirectTo, { replace: true });
  };

  return (
    <AuthLayout>
      {/* Heading */}
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
          Create an Account
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant">
          Join FANFUN Member Club for a 5-year warranty and a $20 welcome voucher.
        </p>
      </div>

      {/* Error Notice */}
      {error && (
        <div className="px-4 py-3 rounded-xl bg-error/10 border border-error/20 text-error text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-on-surface-variant mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => { setName(e.target.value); setError(''); }}
            placeholder="John Doe"
            className="w-full h-12 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-on-surface-variant mb-1.5">
            Phone Number
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => { setPhone(e.target.value); setError(''); }}
            placeholder="+84 912 345 678"
            className="w-full h-12 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-on-surface-variant mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(''); }}
            placeholder="name@fanfun.vn"
            className="w-full h-12 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-on-surface-variant mb-1.5">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            placeholder="At least 6 characters"
            className="w-full h-12 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <button
          type="submit"
          className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-on-primary text-sm font-bold shadow-sm hover:shadow transition-all mt-2"
        >
          Create Account
        </button>
      </form>

      {/* Bottom Switcher */}
      <div className="text-center text-xs text-on-surface-variant pt-2 border-t border-outline-variant/20">
        Already have an account?{' '}
        <Link to="/login" className="text-primary font-bold hover:underline">
          Sign in now
        </Link>
      </div>
    </AuthLayout>
  );
}
