import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

// Pre-configured demo accounts for quick testing & presentation
const DEMO_ACCOUNTS = [
  {
    roleName: "Administrator (Admin)",
    email: "admin@fanfun.vn",
    password: "admin123",
    userData: {
      id: "admin-01",
      name: "Alex Nguyen (Administrator)",
      email: "admin@fanfun.vn",
      phone: "+84 912 345 678",
      tier: "Executive Board",
      address: "FANFUN HQ, Suite 1806 Landmark 3, Vinhomes Central Park, HCMC",
      isAdmin: true
    }
  },
  {
    roleName: "VIP Diamond Customer",
    email: "bichngoc.tran@gmail.com",
    password: "123456",
    userData: {
      id: "cust-02",
      name: "Bich Ngoc Tran",
      email: "bichngoc.tran@gmail.com",
      phone: "+84 988 123 456",
      tier: "VIP Diamond",
      address: "Villa 12, Ciputra Urban Area, Tay Ho, Hanoi",
      isAdmin: false
    }
  },
  {
    roleName: "Standard Member",
    email: "long.le@homedecor.vn",
    password: "123456",
    userData: {
      id: "cust-03",
      name: "Hoang Long Le",
      email: "long.le@homedecor.vn",
      phone: "+84 933 666 888",
      tier: "Member",
      address: "Floor 5, HAGL Apartment, Hai Chau Dist, Da Nang",
      isAdmin: false
    }
  }
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || '/';

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const matched = DEMO_ACCOUNTS.find(
      acc => acc.email.toLowerCase() === email.toLowerCase()
    );

    if (!matched) {
      setError('Email address not registered in the system.');
      return;
    }

    if (matched.password !== password) {
      setError('Invalid password. Please try again.');
      return;
    }

    login(matched.userData);
    navigate(matched.userData.isAdmin ? '/admin' : redirectTo, { replace: true });
  };

  const selectDemoAccount = (acc) => {
    setEmail(acc.email);
    setPassword(acc.password);
    login(acc.userData);
    navigate(acc.userData.isAdmin ? '/admin' : '/', { replace: true });
  };

  return (
    <AuthLayout>
      {/* Heading */}
      <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              Sign In
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              Enter your credentials to access orders, survey scheduling, and device controls.
            </p>
          </div>

          {/* 1-Click Demo Accounts (No Icons in Buttons) */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                Demo Accounts (1-Click Fill)
              </span>
              <span className="text-[10px] text-primary font-semibold">For grading & preview</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => selectDemoAccount(acc)}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl bg-surface-container-lowest hover:bg-primary-fixed/30 border border-outline-variant/20 hover:border-primary/30 flex items-center justify-between transition-all group"
                >
                  <div className="min-w-0 pr-2">
                    <div className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors truncate">
                      {acc.roleName}
                    </div>
                    <div className="text-[11px] text-on-surface-variant font-mono truncate">
                      {acc.email}
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-primary flex-shrink-0 px-2.5 py-1 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-on-primary transition-all">
                    Fill & Sign In
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Error Notice */}
          {error && (
            <div className="px-4 py-3 rounded-xl bg-error/10 border border-error/20 text-error text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1.5">
                Email Address
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="name@fanfun.vn"
                className="w-full h-12 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-on-surface-variant">
                  Password
                </label>
                <Link to="/change-password" className="text-xs text-primary font-medium hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="••••••••"
                className="w-full h-12 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            {/* Submit Button (NO icon before button) */}
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-on-primary text-sm font-bold shadow-sm hover:shadow transition-all mt-2"
            >
              Sign In
            </button>
          </form>

          {/* Bottom Switcher */}
          <div className="text-center text-xs text-on-surface-variant pt-2 border-t border-outline-variant/20">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-bold hover:underline">
              Register new account
            </Link>
          </div>
    </AuthLayout>
  );
}
