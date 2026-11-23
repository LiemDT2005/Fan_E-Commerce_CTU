import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    setLoading(true);
    let url = '/api/orders';
    if (filterStatus !== 'all') url += `?status=${filterStatus}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.success) setOrders(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [filterStatus]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">Đã hoàn thành</span>;
      case 'processing':
        return <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">Đang điều phối lắp đặt</span>;
      case 'delivering':
        return <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">Đang giao & lắp đặt</span>;
      default:
        return <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-bold">Chờ xác nhận</span>;
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant mb-6">
        <Link to="/" className="hover:text-primary">Trang chủ</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-primary font-bold">Đơn hàng của tôi</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Lịch Sử Đơn Hàng & Lắp Đặt</h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Theo dõi tiến trình khảo sát, giao hàng và thông tin kỹ thuật viên cho từng đơn hàng
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-outline-variant/30 gap-6 mb-8 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'Tất cả đơn hàng' },
          { id: 'processing', label: 'Đang điều phối & Lắp đặt' },
          { id: 'completed', label: 'Đã hoàn thành' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterStatus(tab.id)}
            className={`pb-3 text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
              filterStatus === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-20 text-center text-sm font-medium">Đang tải lịch sử đơn hàng...</div>
      ) : orders.length === 0 ? (
        <div className="py-20 text-center bg-surface-container-low rounded-3xl p-8 border border-outline-variant/30">
          <span className="material-symbols-outlined text-5xl text-outline mb-2">inventory</span>
          <h4 className="text-base font-bold text-on-surface">Chưa có đơn hàng nào</h4>
          <p className="text-xs text-on-surface-variant mt-1 mb-4">Bạn chưa thực hiện đơn đặt hàng nào trong mục này.</p>
          <Link to="/products" className="px-6 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold inline-block">
            Khám phá sản phẩm
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((o) => (
            <div
              key={o.id}
              className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-4 hover:shadow-lg transition-all"
            >
              {/* Order header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-primary text-sm">{o.id}</span>
                  <span className="text-outline-variant">•</span>
                  <span className="text-xs text-on-surface-variant">Ngày đặt: {new Date(o.createdAt).toLocaleDateString('vi-VN')}</span>
                </div>
                {getStatusBadge(o.status)}
              </div>

              {/* Items summary */}
              <div className="space-y-3">
                {o.items.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <img src={it.image} alt={it.name} className="w-12 h-12 rounded-xl object-cover border border-outline-variant/30" />
                      <div>
                        <div className="font-bold text-on-surface line-clamp-1">{it.name}</div>
                        <div className="text-[11px] text-on-surface-variant">Số lượng: x{it.quantity}</div>
                      </div>
                    </div>
                    <div className="font-bold text-on-surface">
                      {(it.price * it.quantity).toLocaleString('vi-VN')}đ
                    </div>
                  </div>
                ))}
              </div>

              {/* Order footer */}
              <div className="pt-4 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs">
                  <span className="text-on-surface-variant">Kỹ thuật viên phụ trách: </span>
                  <strong className="text-on-surface">{o.technician || 'Đang phân công'}</strong>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[11px] text-on-surface-variant block">Tổng thanh toán:</span>
                    <strong className="text-lg font-black text-primary">{o.total.toLocaleString('vi-VN')}đ</strong>
                  </div>
                  <Link
                    to={`/orders/${o.id}`}
                    className="px-5 py-2.5 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface font-bold text-xs transition-all flex items-center gap-1.5"
                  >
                    <span>Chi tiết</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
