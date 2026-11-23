import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 21460000,
    totalOrders: 2,
    activeProducts: 6,
    totalCustomers: 3,
    pendingOrders: 1,
    completedOrders: 1
  });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) setStats(data.data);
      })
      .catch(console.error);

    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        if (data.success) setRecentOrders(data.data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto w-full">
      {/* Page Title & ERP sync */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <span>Bảng Điều Khiển Hệ Thống</span>
            <span className="w-4 h-px bg-outline-variant"></span>
            <span className="text-on-surface-variant">Tổng quan kinh doanh & Lắp đặt</span>
          </div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Tổng Quan Bán Hàng</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products/new"
            className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Thêm sản phẩm mới</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Tổng doanh thu</span>
            <div className="text-2xl font-black text-primary mt-1">
              {stats.totalRevenue.toLocaleString('vi-VN')}đ
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-sm">trending_up</span> +18.5% so với tháng trước
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">payments</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Đơn hàng cần xử lý</span>
            <div className="text-2xl font-black text-on-surface mt-1">
              {stats.pendingOrders}
            </div>
            <span className="text-[11px] text-amber-700 font-semibold flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-sm">schedule</span> Chờ điều phối khảo sát
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-surface-container text-on-surface flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">shopping_bag</span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Thiết bị đang mở bán</span>
            <div className="text-2xl font-black text-on-surface mt-1">
              {stats.activeProducts}
            </div>
            <span className="text-[11px] text-primary font-semibold flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-sm">inventory_2</span> 4 phân nhóm vi khí hậu
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-surface-container text-on-surface flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">shelves</span>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Khách hàng VIP</span>
            <div className="text-2xl font-black text-on-surface mt-1">
              {stats.totalCustomers}
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-sm">verified</span> Tỷ lệ hài lòng 99.2%
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-surface-container text-on-surface flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">group</span>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-on-surface">Đơn Hàng Gần Đây</h3>
            <p className="text-xs text-on-surface-variant mt-0.5">Tiến độ thi công và lịch hẹn của khách hàng</p>
          </div>
          <Link to="/admin/orders" className="text-xs font-bold text-primary hover:underline">
            Xem tất cả đơn hàng →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant uppercase font-bold text-[10px]">
              <tr>
                <th className="p-3.5 rounded-l-xl">Mã đơn</th>
                <th className="p-3.5">Khách hàng</th>
                <th className="p-3.5">Lịch hẹn lắp đặt</th>
                <th className="p-3.5">Kỹ thuật viên</th>
                <th className="p-3.5">Trạng thái</th>
                <th className="p-3.5">Tổng tiền</th>
                <th className="p-3.5 rounded-r-xl text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {recentOrders.map(o => (
                <tr key={o.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-primary">{o.id}</td>
                  <td className="p-3.5">
                    <strong className="block text-on-surface">{o.customerName}</strong>
                    <span className="text-[11px] text-on-surface-variant">{o.customerPhone}</span>
                  </td>
                  <td className="p-3.5 text-on-surface">
                    {o.scheduledDate} ({o.scheduledSlot})
                  </td>
                  <td className="p-3.5 text-on-surface">{o.technician || 'Chưa phân công'}</td>
                  <td className="p-3.5">
                    {o.status === 'completed' ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        Hoàn thành
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px]">
                        {o.statusText}
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 font-bold text-on-surface">{o.total.toLocaleString('vi-VN')}đ</td>
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
      </div>
    </div>
  );
}
