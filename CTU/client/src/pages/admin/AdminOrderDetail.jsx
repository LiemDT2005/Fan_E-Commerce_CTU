import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2, QrCode, Truck } from 'lucide-react';

export default function AdminOrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [technician, setTechnician] = useState('');
  const [status, setStatus] = useState('processing');
  const [paymentStatus, setPaymentStatus] = useState('unpaid');
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
          setPaymentStatus(d.data.paymentStatus || 'unpaid');
        }
        setLoading(false);
      });
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
    let statusText = 'Pending Confirmation';
    if (status === 'processing') statusText = 'In Progress & Dispatching';
    if (status === 'delivering') statusText = 'Out for Installation';
    if (status === 'completed') statusText = 'Completed';
    if (status === 'cancelled') statusText = 'Order Cancelled';

    fetch(`/api/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, statusText, technician, paymentStatus })
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

  if (loading) return <div className="py-20 text-center text-xs font-semibold">Loading order...</div>;
  if (!order) return <div className="py-20 text-center">Order not found.</div>;

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto w-full">
      <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
        <Link to="/admin" className="hover:text-primary transition-colors">Dashboard</Link>
        <ChevronRight size={13} strokeWidth={1.75} />
        <Link to="/admin/orders" className="hover:text-primary transition-colors">Orders</Link>
        <ChevronRight size={13} strokeWidth={1.75} />
        <span className="text-primary font-semibold">Order #{order.id} Details</span>
      </div>

      <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
        <div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">
            Order Management #{order.id}
          </h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Customer: <strong className="text-on-surface">{order.customerName}</strong> • Ordered: {new Date(order.createdAt).toLocaleString('en-US')}
          </p>
        </div>
      </div>

      {savedMsg && (
        <div className="p-4 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 size={16} strokeWidth={1.75} />
          Order status and technician assignment updated successfully!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Items list */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider pb-2 border-b border-outline-variant/20">
              Ordered Equipment
            </h3>

            <div className="space-y-4">
              {order.items.map((it, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 pb-4 border-b border-outline-variant/20 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <img src={it.image} alt={it.name} className="w-14 h-14 rounded-2xl object-cover border border-outline-variant/30" />
                    <div>
                      <span className="text-[10px] font-bold text-primary font-mono">{it.sku}</span>
                      <h4 className="font-bold text-xs text-on-surface line-clamp-1">{it.name}</h4>
                      <span className="text-xs text-on-surface-variant">{it.price.toLocaleString('en-US')} VND × {it.quantity}</span>
                    </div>
                  </div>
                  <strong className="text-sm text-on-surface">{(it.price * it.quantity).toLocaleString('en-US')} VND</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Construction Note */}
          <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-2 text-xs">
            <h4 className="font-bold text-on-surface">Ceiling Structural Instructions:</h4>
            <p className="text-on-surface-variant p-3.5 rounded-xl bg-surface-container-low leading-relaxed">
              {order.note || 'No specific instructions provided.'}
            </p>
          </div>
        </div>

        {/* Right: Dispatching controls */}
        <div className="lg:col-span-4 space-y-6">
          <form onSubmit={handleSave} className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider pb-2 border-b border-outline-variant/20">
              Technical Dispatch
            </h3>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Order Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="pending">Pending Confirmation</option>
                <option value="processing">In Progress & Dispatching</option>
                <option value="delivering">Out for Installation</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Payment Status</label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="unpaid">⏳ Unpaid</option>
                <option value="paid">✅ Paid</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Assigned Technician</label>
              <input
                type="text"
                value={technician}
                onChange={(e) => setTechnician(e.target.value)}
                placeholder="e.g. David Tran (Tech Lead - +84 988 123 456)"
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="text-xs space-y-2 pt-2 border-t border-outline-variant/20">
              <div>
                <span className="text-on-surface-variant">Scheduled Slot:</span>
                <strong className="block text-on-surface mt-0.5">{order.scheduledDate} ({order.scheduledSlot})</strong>
              </div>
              <div>
                <span className="text-on-surface-variant">Installation Address:</span>
                <strong className="block text-on-surface mt-0.5 leading-relaxed">{order.address}</strong>
              </div>
              <div>
                <span className="text-on-surface-variant">Payment Method:</span>
                <strong className="block text-on-surface mt-0.5 flex items-center gap-1.5">
                  {order.paymentMethod === 'payos' ? (
                    <>
                      <QrCode size={14} strokeWidth={1.75} className="text-blue-600" />
                      QR Bank Transfer (PayOS)
                    </>
                  ) : (
                    <>
                      <Truck size={14} strokeWidth={1.75} className="text-amber-700" />
                      Cash on Delivery (COD)
                    </>
                  )}
                </strong>
              </div>
              <div>
                <span className="text-on-surface-variant">Payment Status:</span>
                <strong className="block mt-0.5">
                  <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                    order.paymentStatus === 'paid'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {order.paymentStatus === 'paid' ? '✅ Paid' : '⏳ Unpaid'}
                  </span>
                </strong>
              </div>
              <div>
                <span className="text-on-surface-variant">Total Collection{order.paymentMethod === 'cod' ? ' (COD)' : ''}:</span>
                <strong className="block text-lg font-black text-primary mt-0.5">{order.total.toLocaleString('en-US')} VND</strong>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold shadow-md transition-all mt-4"
            >
              Update Dispatch Status
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
