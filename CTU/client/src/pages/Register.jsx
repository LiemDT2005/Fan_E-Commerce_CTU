import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    login({
      id: `cust-${Date.now()}`,
      name: name || 'Khách hàng mới',
      phone: phone,
      email: email,
      tier: 'Member',
      address: 'Hà Nội',
      isAdmin: false
    });
    navigate('/');
  };

  return (
    <div className="max-w-[480px] mx-auto px-4 py-16">
      <div className="p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center mx-auto mb-3 shadow-md">
            <span className="material-symbols-outlined text-2xl">person_add</span>
          </div>
          <h1 className="text-2xl font-extrabold text-on-surface">Đăng Ký Tài Khoản</h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Trở thành thành viên FANFUN để nhận gói bảo hành 5 năm và voucher 500.000đ
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant mb-1">Họ và tên *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nguyễn Văn A"
              className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant mb-1">Số điện thoại *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0912 345 678"
              className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant mb-1">Email *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant mb-1">Mật khẩu *</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tối thiểu 6 ký tự"
              className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold shadow-md transition-all mt-2"
          >
            Đăng ký tài khoản
          </button>
        </form>

        <div className="text-center text-xs text-on-surface-variant pt-2 border-t border-outline-variant/20">
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
