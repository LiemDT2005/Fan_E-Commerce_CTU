import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/orders/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setOrder(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="py-32 text-center text-sm font-medium">Đang tải thông tin đơn hàng...</div>;
  }

  if (!order) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-xl font-bold">Không tìm thấy mã đơn hàng</h2>
        <Link to="/orders" className="mt-4 inline-block px-6 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold">
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant mb-6">
        <Link to="/" className="hover:text-primary">Trang chủ</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <Link to="/orders" className="hover:text-primary">Đơn hàng của tôi</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-primary font-bold">Đơn hàng #{order.id}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary-fixed/40 px-3 py-1 rounded-full">
            Chi tiết đơn hàng
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface mt-2 tracking-tight">
            Mã đơn hàng: #{order.id}
          </h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Đặt ngày: {new Date(order.createdAt).toLocaleString('vi-VN')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:19006868"
            className="px-5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface flex items-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-base text-primary">support_agent</span>
            <span>Hỗ trợ kỹ thuật</span>
          </a>
        </div>
      </div>

      {/* 5-STEP INSTALLATION & DELIVERY TIMELINE */}
      <div className="p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30 mb-8">
        <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider mb-8">
          Tiến trình khảo sát & Lắp đặt tiêu chuẩn
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {[
            { step: 1, title: 'Đã tiếp nhận', time: '14/11 - 09:15', done: true, icon: 'receipt_long' },
            { step: 2, title: 'Xác nhận kết cấu trần', time: '14/11 - 10:30', done: true, icon: 'engineering' },
            { step: 3, title: 'Điều phối kỹ thuật viên', time: '14/11 - 14:00', done: true, icon: 'person_pin_circle' },
            { step: 4, title: 'Tiến hành khảo sát & lắp', time: order.scheduledDate || '16/11/2026', done: order.status === 'completed', active: order.status === 'processing', icon: 'home_repair_service' },
            { step: 5, title: 'Bàn giao & Kích hoạt BH', time: 'Kích hoạt 5 năm', done: order.status === 'completed', icon: 'verified' },
          ].map((st, i) => (
            <div key={i} className="flex flex-col items-center text-center relative z-10">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 shadow-sm transition-all ${
                st.done
                  ? 'bg-primary text-on-primary'
                  : st.active
                  ? 'bg-amber-500 text-white animate-pulse'
                  : 'bg-surface-container text-on-surface-variant'
              }`}>
                <span className="material-symbols-outlined text-2xl">{st.icon}</span>
              </div>
              <div className="text-xs font-bold text-on-surface">{st.title}</div>
              <div className="text-[11px] text-on-surface-variant mt-0.5">{st.time}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Items Table */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-4">
            <h3 className="text-base font-bold text-on-surface pb-3 border-b border-outline-variant/20">
              Danh sách thiết bị lắp đặt
            </h3>

            <div className="space-y-4">
              {order.items.map((it, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 pb-4 border-b border-outline-variant/20 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <img src={it.image} alt={it.name} className="w-16 h-16 rounded-2xl object-cover border border-outline-variant/30" />
                    <div>
                      <span className="text-[10px] font-bold text-primary uppercase">{it.sku}</span>
                      <h4 className="font-bold text-sm text-on-surface line-clamp-1">{it.name}</h4>
                      <div className="text-xs text-on-surface-variant mt-0.5">
                        {it.price.toLocaleString('vi-VN')}đ × {it.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="font-extrabold text-sm text-on-surface">
                    {(it.price * it.quantity).toLocaleString('vi-VN')}đ
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technician card */}
          <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-2xl">badge</span>
              </div>
              <div>
                <span className="text-[11px] text-on-surface-variant uppercase font-semibold">Kỹ thuật viên phụ trách</span>
                <div className="font-bold text-sm text-on-surface">{order.technician}</div>
                <div className="text-xs text-primary font-semibold mt-0.5">Thời gian hẹn: {order.scheduledSlot} - {order.scheduledDate}</div>
              </div>
            </div>
            <a
              href="tel:0988123456"
              className="px-4 py-2 rounded-xl bg-primary-fixed text-on-primary-fixed text-xs font-bold flex items-center gap-1.5 hover:bg-primary hover:text-on-primary transition-colors"
            >
              <span className="material-symbols-outlined text-sm">call</span>
              <span>Gọi thợ</span>
            </a>
          </div>
        </div>

        {/* Right: Customer & Invoice details */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider pb-2 border-b border-outline-variant/20">
              Thông tin nhận hàng
            </h3>

            <div>
              <span className="text-on-surface-variant block">Người nhận:</span>
              <strong className="text-on-surface block mt-0.5 text-sm">{order.customerName}</strong>
            </div>

            <div>
              <span className="text-on-surface-variant block">Số điện thoại:</span>
              <strong className="text-on-surface block mt-0.5">{order.customerPhone}</strong>
            </div>

            <div>
              <span className="text-on-surface-variant block">Địa chỉ thi công:</span>
              <strong className="text-on-surface block mt-0.5 leading-relaxed">{order.address}</strong>
            </div>

            {order.note && (
              <div className="p-3 rounded-xl bg-surface-container-lowest">
                <span className="text-on-surface-variant block font-semibold">Ghi chú trần nhà:</span>
                <span className="text-on-surface mt-0.5 block">{order.note}</span>
              </div>
            )}
          </div>

          {/* Payment calculation */}
          <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-3 text-xs">
            <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider pb-2 border-b border-outline-variant/20">
              Chi tiết thanh toán
            </h3>

            <div className="flex justify-between text-on-surface-variant">
              <span>Tạm tính hàng:</span>
              <span className="font-bold text-on-surface">{order.subtotal?.toLocaleString('vi-VN')}đ</span>
            </div>
            <div className="flex justify-between text-emerald-700 font-bold">
              <span>Khảo sát & Lắp đặt:</span>
              <span>Miễn phí 0đ</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-primary font-bold">
                <span>Voucher giảm giá:</span>
                <span>-{order.discount?.toLocaleString('vi-VN')}đ</span>
              </div>
            )}
            <div className="pt-3 border-t border-outline-variant/20 flex justify-between items-baseline">
              <span className="text-sm font-bold text-on-surface">Tổng cộng:</span>
              <span className="text-xl font-black text-primary">{order.total?.toLocaleString('vi-VN')}đ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
