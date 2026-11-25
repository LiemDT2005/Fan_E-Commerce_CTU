import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Headset, FileText, Wrench, UserCheck, HardHat, ShieldCheck, User, Phone, QrCode, Truck } from 'lucide-react';

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [cancelMessage, setCancelMessage] = useState('');

  const handleCancelOrder = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) return;
    setCancelling(true);
    setCancelMessage('');
    try {
      const res = await fetch(`/api/orders/${id}/cancel-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      setCancelling(false);
      if (data.success) {
        setOrder(prev => ({ ...prev, status: 'cancelled', statusText: 'Order cancelled by customer' }));
        setCancelMessage('Đơn hàng đã được hủy thành công.');
      } else {
        alert(data.message || 'Không thể hủy đơn hàng.');
      }
    } catch (err) {
      setCancelling(false);
      alert('Lỗi kết nối khi hủy đơn hàng.');
    }
  };

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
    return <div className="py-32 text-center text-sm font-medium">Loading order details...</div>;
  }

  if (!order) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-xl font-bold">Order ID Not Found</h2>
        <Link to="/orders" className="mt-4 inline-block px-6 py-2 bg-primary text-on-primary rounded-xl text-xs font-semibold">
          Back to Orders
        </Link>
      </div>
    );
  }

  const timelineSteps = [
    { step: 1, title: 'Order Received', time: 'Initial Review', done: true, icon: FileText },
    { step: 2, title: 'Ceiling Verification', time: 'Approved', done: true, icon: Wrench },
    { step: 3, title: 'Technician Assigned', time: 'Dispatched', done: true, icon: UserCheck },
    { step: 4, title: 'Survey & Installation', time: order.scheduledDate || 'Within 48h', done: order.status === 'completed', active: order.status === 'processing', icon: HardHat },
    { step: 5, title: 'Handover & Warranty Active', time: '5-Yr Warranty', done: order.status === 'completed', icon: ShieldCheck },
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant mb-6">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight size={14} strokeWidth={1.75} />
        <Link to="/orders" className="hover:text-primary">My Orders</Link>
        <ChevronRight size={14} strokeWidth={1.75} />
        <span className="text-primary font-semibold">Order #{order.id}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-primary-fixed/40 px-3 py-1 rounded-full">
            Order Details
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-on-surface mt-2 tracking-tight">
            Order ID: #{order.id}
          </h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Placed on: {new Date(order.createdAt).toLocaleString('en-US')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:19006868"
            className="px-5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface flex items-center gap-2 transition-colors"
          >
            <Headset size={16} strokeWidth={1.75} className="text-primary" />
            <span>Technical Support</span>
          </a>
        </div>
      </div>

      {/* 5-STEP INSTALLATION & DELIVERY TIMELINE */}
      <div className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/25 mb-8">
        <h3 className="text-sm font-semibold text-on-surface uppercase tracking-wider mb-8">
          Standard Survey & Installation Progress
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {timelineSteps.map((st, i) => {
            const IconComponent = st.icon;
            return (
              <div key={i} className="flex flex-col items-center text-center relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all ${
                  st.done
                    ? 'bg-primary text-on-primary'
                    : st.active
                    ? 'bg-amber-500 text-white animate-pulse'
                    : 'bg-surface-container text-on-surface-variant'
                }`}>
                  <IconComponent size={24} strokeWidth={1.75} />
                </div>
                <div className="text-xs font-semibold text-on-surface">{st.title}</div>
                <div className="text-[11px] text-on-surface-variant mt-0.5">{st.time}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Items Table */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/25 space-y-4">
            <h3 className="text-base font-semibold text-on-surface pb-3 border-b border-outline-variant/20">
              Ordered Appliances & Equipment
            </h3>

            <div className="space-y-4">
              {order.items.map((it, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 pb-4 border-b border-outline-variant/20 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <img src={it.image} alt={it.name} className="w-16 h-16 rounded-xl object-cover border border-outline-variant/25" />
                    <div>
                      <span className="text-[10px] font-semibold text-primary uppercase">{it.sku}</span>
                      <h4 className="font-semibold text-sm text-on-surface line-clamp-1">{it.name}</h4>
                      <div className="text-xs text-on-surface-variant mt-0.5">
                        {it.price.toLocaleString('en-US')} VND × {it.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-sm text-on-surface">
                    {(it.price * it.quantity).toLocaleString('en-US')} VND
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technician card */}
          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/25 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center">
                <User size={24} strokeWidth={1.75} />
              </div>
              <div>
                <span className="text-[11px] text-on-surface-variant uppercase font-semibold">Assigned Technician</span>
                <div className="font-semibold text-sm text-on-surface">{order.technician}</div>
                <div className="text-xs text-primary font-semibold mt-0.5">Schedule: {order.scheduledSlot} - {order.scheduledDate}</div>
              </div>
            </div>
            <a
              href="tel:0988123456"
              className="px-4 py-2 rounded-xl bg-primary-fixed text-on-primary-fixed text-xs font-semibold flex items-center gap-1.5 hover:bg-primary hover:text-on-primary transition-colors"
            >
              <Phone size={14} strokeWidth={1.75} />
              <span>Call Tech</span>
            </a>
          </div>
        </div>

        {/* Right: Customer & Invoice details */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/25 space-y-4 text-xs">
            <h3 className="text-sm font-semibold text-on-surface uppercase tracking-wider pb-2 border-b border-outline-variant/20">
              Delivery Information
            </h3>

            <div>
              <span className="text-on-surface-variant block">Recipient:</span>
              <strong className="text-on-surface block mt-0.5 text-sm">{order.customerName}</strong>
            </div>

            <div>
              <span className="text-on-surface-variant block">Phone Number:</span>
              <strong className="text-on-surface block mt-0.5">{order.customerPhone}</strong>
            </div>

            <div>
              <span className="text-on-surface-variant block">Installation Address:</span>
              <strong className="text-on-surface block mt-0.5 leading-relaxed">{order.address}</strong>
            </div>

            {order.note && (
              <div className="p-3 rounded-xl bg-surface-container-lowest">
                <span className="text-on-surface-variant block font-semibold">Ceiling Notes:</span>
                <span className="text-on-surface mt-0.5 block">{order.note}</span>
              </div>
            )}
          </div>

          {/* Payment calculation */}
          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/25 space-y-3 text-xs">
            <h3 className="text-sm font-semibold text-on-surface uppercase tracking-wider pb-2 border-b border-outline-variant/20">
              Payment Summary
            </h3>

            <div className="flex justify-between items-center">
              <span className="text-on-surface-variant">Payment Method:</span>
              <span className="font-semibold text-on-surface flex items-center gap-1.5">
                {order.paymentMethod === 'payos' ? (
                  <>
                    <QrCode size={14} strokeWidth={1.75} className="text-blue-600" />
                    QR Bank Transfer
                  </>
                ) : (
                  <>
                    <Truck size={14} strokeWidth={1.75} className="text-amber-600" />
                    COD
                  </>
                )}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-on-surface-variant">Payment Status:</span>
              <span className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold ${
                order.paymentStatus === 'paid'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {order.paymentStatus === 'paid' ? '✅ Paid' : '⏳ Unpaid'}
              </span>
            </div>

            <div className="flex justify-between text-on-surface-variant pt-2 border-t border-outline-variant/10">
              <span>Items Subtotal:</span>
              <span className="font-semibold text-on-surface">{order.subtotal?.toLocaleString('en-US')} VND</span>
            </div>
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>Survey & Installation:</span>
              <span>Free ($0)</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-primary font-semibold">
                <span>Coupon Discount:</span>
                <span>-{order.discount?.toLocaleString('en-US')} VND</span>
              </div>
            )}
            <div className="pt-3 border-t border-outline-variant/20 flex justify-between items-baseline">
              <span className="text-sm font-semibold text-on-surface">Total:</span>
              <span className="text-xl font-bold text-primary">{order.total?.toLocaleString('en-US')} VND</span>
            </div>

            {order.paymentMethod === 'payos' && order.paymentStatus === 'unpaid' && order.checkoutUrl && order.status !== 'cancelled' && (
              <a
                href={order.checkoutUrl}
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors mt-2"
              >
                <QrCode size={15} strokeWidth={1.75} />
                <span>Hoàn tất thanh toán QR</span>
              </a>
            )}

            {order.status !== 'cancelled' && order.status !== 'completed' && order.paymentStatus === 'unpaid' && (
              <button
                type="button"
                onClick={handleCancelOrder}
                disabled={cancelling}
                className="w-full py-2.5 rounded-lg border border-red-300 hover:bg-red-50 text-red-700 font-semibold text-xs transition-colors mt-2 cursor-pointer disabled:opacity-50"
              >
                {cancelling ? 'Đang hủy đơn...' : 'Hủy đơn hàng'}
              </button>
            )}

            {order.status === 'cancelled' && (
              <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs font-medium text-center mt-2">
                Đơn hàng này đã bị hủy.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
