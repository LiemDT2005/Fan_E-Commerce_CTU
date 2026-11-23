import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchOrders = () => {
    setLoading(true);
    let url = '/api/orders';
    if (statusFilter !== 'all') url += `?status=${statusFilter}`;
    fetch(url)
      .then(r => r.json())
      .then(d => {
        if (d.success) setOrders(d.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleUpdateStatus = (id, newStatus, newStatusText) => {
    fetch(`/api/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, statusText: newStatusText })
    })
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus, statusText: newStatusText } : o));
        }
      });
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <span>Trung Tâm Điều Phối</span>
            <span className="w-4 h-px bg-outline-variant"></span>
            <span className="text-on-surface-variant">Lắp đặt & Giao vận</span>
          </div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Quản lý Đơn hàng</h1>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-surface-container-low p-1.5 rounded-2xl border border-outline-variant/30">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'pending', label: 'Chờ duyệt' },
            { id: 'processing', label: 'Đang điều phối' },
            { id: 'completed', label: 'Hoàn thành' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setStatusFilter(t.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                statusFilter === t.id
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs font-semibold">Đang tải danh sách đơn hàng...</div>
        ) : orders.length === 0 ? (
          <div className="py-20 text-center">
            <span className="material-symbols-outlined text-4xl text-outline mb-2">shopping_bag</span>
            <p className="text-xs text-on-surface-variant">Không có đơn hàng nào trong mục này.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low text-on-surface-variant uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Mã đơn</th>
                  <th className="p-3.5">Khách hàng & Liên hệ</th>
                  <th className="p-3.5">Lịch hẹn lắp đặt</th>
                  <th className="p-3.5">Thiết bị</th>
                  <th className="p-3.5">Tổng tiền</th>
                  <th className="p-3.5">Trạng thái</th>
                  <th className="p-3.5 rounded-r-xl text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-primary">{o.id}</td>
                    <td className="p-3.5">
                      <strong className="block text-on-surface">{o.customerName}</strong>
                      <span className="text-[11px] text-on-surface-variant">{o.customerPhone}</span>
                      <span className="text-[10px] text-outline block mt-0.5 line-clamp-1">{o.address}</span>
                    </td>
                    <td className="p-3.5">
                      <strong className="block text-on-surface">{o.scheduledDate}</strong>
                      <span className="text-[11px] text-on-surface-variant">{o.scheduledSlot}</span>
                    </td>
                    <td className="p-3.5 font-semibold text-on-surface">
                      {o.items.length} thiết bị
                    </td>
                    <td className="p-3.5 font-bold text-primary">{o.total.toLocaleString('vi-VN')}đ</td>
                    <td className="p-3.5">
                      <select
                        value={o.status}
                        onChange={(e) => {
                          const val = e.target.value;
                          let txt = 'Chờ xác nhận';
                          if (val === 'processing') txt = 'Đang điều phối lắp đặt';
                          if (val === 'delivering') txt = 'Đang giao & lắp';
                          if (val === 'completed') txt = 'Đã hoàn thành';
                          handleUpdateStatus(o.id, val, txt);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-[11px] font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="pending">Chờ xác nhận</option>
                        <option value="processing">Đang điều phối</option>
                        <option value="delivering">Đang giao & lắp</option>
                        <option value="completed">Đã hoàn thành</option>
                      </select>
                    </td>
                    <td className="p-3.5 text-right">
                      <Link
                        to={`/admin/orders/${o.id}`}
                        className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-xs font-semibold transition-colors"
                      >
                        Chi tiết
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
