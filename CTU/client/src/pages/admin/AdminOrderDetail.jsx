import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function AdminOrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [technician, setTechnician] = useState('');
  const [status, setStatus] = useState('processing');
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/orders/${id}`)
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setOrder(d.data);
          setTechnician(d.data.technician || '');
          setStatus(d.data.status || 'processing');
        }
        setLoading(false);
      });
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
    let statusText = 'Chờ duyệt';
    if (status === 'processing') statusText = 'Đang điều phối lắp đặt';
    if (status === 'delivering') statusText = 'Đang giao & lắp';
    if (status === 'completed') statusText = 'Đã hoàn thành lắp đặt';

    fetch(`/api/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, statusText, technician })
    })
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setOrder(d.data);
          setSavedMsg(true);
          setTimeout(() => setSavedMsg(false), 3000);
        }
      });
  };

  if (loading) return <div className="py-20 text-center text-xs font-semibold">Đang tải đơn hàng...</div>;
  if (!order) return <div className="py-20 text-center">Không tìm thấy đơn hàng.</div>;

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto w-full">
      <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
        <Link to="/admin" className="hover:text-primary">Bảng điều khiển</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <Link to="/admin/orders" className="hover:text-primary">Quản lý đơn hàng</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-primary font-bold">Chi tiết đơn hàng #{order.id}</span>
      </div>

      <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
        <div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">
            Quản Trị Đơn Hàng #{order.id}
          </h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Khách hàng: <strong className="text-on-surface">{order.customerName}</strong> • Đặt ngày: {new Date(order.createdAt).toLocaleString('vi-VN')}
          </p>
        </div>
      </div>

      {savedMsg && (
        <div className="p-4 rounded-2xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-base">check_circle</span>
          Đã cập nhật trạng thái đơn hàng và phân bổ kỹ thuật viên thành công!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Items list */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider pb-2 border-b border-outline-variant/20">
              Thiết bị trong đơn hàng
            </h3>

            <div className="space-y-4">
              {order.items.map((it, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 pb-4 border-b border-outline-variant/20 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <img src={it.image} alt={it.name} className="w-14 h-14 rounded-2xl object-cover border border-outline-variant/30" />
                    <div>
                      <span className="text-[10px] font-bold text-primary font-mono">{it.sku}</span>
                      <h4 className="font-bold text-xs text-on-surface line-clamp-1">{it.name}</h4>
                      <span className="text-xs text-on-surface-variant">{it.price.toLocaleString('vi-VN')}đ × {it.quantity}</span>
                    </div>
                  </div>
                  <strong className="text-sm text-on-surface">{(it.price * it.quantity).toLocaleString('vi-VN')}đ</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Construction Note */}
          <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-2 text-xs">
            <h4 className="font-bold text-on-surface">Ghi chú kết cấu thi công trần:</h4>
            <p className="text-on-surface-variant p-3.5 rounded-xl bg-surface-container-low leading-relaxed">
              {order.note || 'Không có ghi chú thêm.'}
            </p>
          </div>
        </div>

        {/* Right: Dispatching controls */}
        <div className="lg:col-span-4 space-y-6">
          <form onSubmit={handleSave} className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider pb-2 border-b border-outline-variant/20">
              Điều phối thi công
            </h3>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Trạng thái đơn hàng</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="pending">Chờ xác nhận</option>
                <option value="processing">Đang điều phối lắp đặt</option>
                <option value="delivering">Đang giao & lắp tận nơi</option>
                <option value="completed">Đã hoàn thành lắp đặt</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Kỹ thuật viên phụ trách</label>
              <input
                type="text"
                value={technician}
                onChange={(e) => setTechnician(e.target.value)}
                placeholder="VD: Trần Quốc Bảo (KT-04 - 0988 123 456)"
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="text-xs space-y-2 pt-2 border-t border-outline-variant/20">
              <div>
                <span className="text-on-surface-variant">Lịch hẹn:</span>
                <strong className="block text-on-surface mt-0.5">{order.scheduledDate} ({order.scheduledSlot})</strong>
              </div>
              <div>
                <span className="text-on-surface-variant">Địa chỉ thi công:</span>
                <strong className="block text-on-surface mt-0.5 leading-relaxed">{order.address}</strong>
              </div>
              <div>
                <span className="text-on-surface-variant">Tổng thu tiền (COD):</span>
                <strong className="block text-lg font-black text-primary mt-0.5">{order.total.toLocaleString('vi-VN')}đ</strong>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold shadow-md transition-all mt-4"
            >
              Cập nhật điều phối
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
