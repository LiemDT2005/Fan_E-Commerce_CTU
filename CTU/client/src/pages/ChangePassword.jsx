import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
      setErr('Mật khẩu mới phải có tối thiểu 6 ký tự.');
      return;
    }
    if (newPass !== confirmPass) {
      setErr('Mật khẩu xác nhận không khớp.');
      return;
    }

    setMsg('Đã đổi mật khẩu thành công!');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  return (
    <div className="max-w-[540px] mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant mb-6">
        <Link to="/" className="hover:text-primary">Trang chủ</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-primary font-bold">Đổi mật khẩu</span>
      </div>

      <div className="p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-on-surface">Đổi Mật Khẩu</h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Cập nhật mật khẩu để bảo vệ tài khoản và thiết bị thông minh kết nối của bạn.
          </p>
        </div>

        {err && <div className="p-3.5 rounded-xl bg-error-container text-on-error-container text-xs font-bold">{err}</div>}
        {msg && <div className="p-3.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold">{msg}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant mb-1">Mật khẩu hiện tại *</label>
            <input
              type="password"
              required
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant mb-1">Mật khẩu mới *</label>
            <input
              type="password"
              required
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant mb-1">Xác nhận mật khẩu mới *</label>
            <input
              type="password"
              required
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold shadow-md transition-all mt-4"
          >
            Cập nhật mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
}
