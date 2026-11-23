import React, { useState, useEffect } from 'react';

export default function AdminVouchers() {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/vouchers')
      .then(r => r.json())
      .then(d => {
        if (d.success) setVouchers(d.data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto w-full">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
          <span>Chính Sách Khuyến Mãi</span>
          <span className="w-4 h-px bg-outline-variant"></span>
          <span className="text-on-surface-variant">Chiết khấu & Voucher</span>
        </div>
        <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Quản lý Khuyến mãi & Voucher</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vouchers.map((v) => (
          <div key={v.code} className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 mb-3">
                <span className="font-mono text-base font-black text-primary tracking-wider">{v.code}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Đang hoạt động
                </span>
              </div>
              <h3 className="font-bold text-sm text-on-surface">{v.title}</h3>
              <div className="text-2xl font-black text-primary my-2">
                -{v.discountAmount.toLocaleString('vi-VN')}đ
              </div>
              <p className="text-xs text-on-surface-variant">
                Đơn hàng tối thiểu: <strong>{v.minOrderValue.toLocaleString('vi-VN')}đ</strong>
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
              <span>Đã dùng: <strong>{v.usedCount} / {v.usageLimit}</strong></span>
              <span>HSD: <strong>{v.expiryDate}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
