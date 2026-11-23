import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user, login } = useAuth();
  const [name, setName] = useState(user?.name || 'Nguyễn Văn An');
  const [phone, setPhone] = useState(user?.phone || '0912 345 678');
  const [email, setEmail] = useState(user?.email || 'nguyenvanan@gmail.com');
  const [address, setAddress] = useState(user?.address || 'Căn hộ 1806, Tòa Landmark 3, Vinhomes Central Park, TP.HCM');
  const [homeArea, setHomeArea] = useState('95 m² (3 phòng ngủ + 1 phòng khách)');
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
        <Link to="/" className="hover:text-primary">Trang chủ</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-primary font-bold">Hồ sơ cá nhân</span>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Hồ Sơ Thành Viên</h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Quản lý thông tin liên hệ, căn hộ và thiết bị quạt thông minh đã kết nối
          </p>
        </div>
        <span className="px-3.5 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold shadow-sm">
          {user?.tier || 'VIP Gold'}
        </span>
      </div>

      {savedMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-base">check_circle</span>
          Đã cập nhật thông tin thành công!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left card */}
        <div className="md:col-span-1 p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-primary text-on-primary text-3xl font-bold flex items-center justify-center mx-auto shadow-md">
            {name ? name.charAt(0) : 'U'}
          </div>
          <div>
            <h3 className="font-bold text-base text-on-surface">{name}</h3>
            <span className="text-xs text-on-surface-variant">{email}</span>
          </div>

          <div className="pt-4 border-t border-outline-variant/20 text-xs text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Thiết bị đang hoạt động:</span>
              <strong className="text-on-surface">2 Quạt 3-in-1</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Lần vệ sinh lõi lọc gần nhất:</span>
              <strong className="text-emerald-700">1 tháng trước</strong>
            </div>
          </div>
        </div>

        {/* Right form */}
        <div className="md:col-span-2 p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30">
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Họ và tên</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Số điện thoại</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Địa chỉ lắp đặt mặc định</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Quy mô nhà / căn hộ</label>
              <input
                type="text"
                value={homeArea}
                onChange={(e) => setHomeArea(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold shadow-md transition-all"
              >
                Lưu thay đổi hồ sơ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
