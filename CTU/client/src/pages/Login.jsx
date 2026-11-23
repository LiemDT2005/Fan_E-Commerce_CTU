import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('nguyenvanan@gmail.com');
  const [password, setPassword] = useState('123456');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login({
      id: "cust-01",
      name: "Nguyễn Văn An",
      email: email,
      phone: "0912 345 678",
      tier: "VIP Gold",
      address: "Căn hộ 1806, Tòa Landmark 3, Vinhomes Central Park, TP.HCM",
      isAdmin: true
    });
    navigate('/');
  };

  return (
    <div className="max-w-[480px] mx-auto px-4 py-16">
      <div className="p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center mx-auto mb-3 shadow-md">
            <span className="material-symbols-outlined text-2xl">mode_fan</span>
          </div>
          <h1 className="text-2xl font-extrabold text-on-surface">Đăng Nhập FANFUN</h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Đăng nhập để theo dõi đơn hàng, lịch khảo sát và quản lý quạt thông minh
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant mb-1">Email hoặc Số điện thoại</label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-on-surface-variant">Mật khẩu</label>
              <Link to="/change-password" className="text-[11px] text-primary hover:underline">Quên mật khẩu?</Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold shadow-md transition-all mt-2"
          >
            Đăng nhập ngay
          </button>
        </form>

        <div className="text-center text-xs text-on-surface-variant pt-2 border-t border-outline-variant/20">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="text-primary font-bold hover:underline">
            Đăng ký tài khoản mới
          </Link>
        </div>
      </div>
    </div>
  );
}
