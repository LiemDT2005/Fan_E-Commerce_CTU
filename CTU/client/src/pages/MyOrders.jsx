import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Package } from 'lucide-react';

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
        return <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">Completed</span>;
      case 'processing':
        return <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">Dispatching & Surveying</span>;
      case 'delivering':
        return <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">Out for Installation</span>;
      case 'cancelled':
        return <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-semibold">Cancelled</span>;
      default:
        return <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-semibold">Pending Confirmation</span>;
    }
  };

  const getPaymentBadge = (o) => {
    if (o.paymentStatus === 'paid') {
      return <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-semibold">✅ Paid ({o.paymentMethod === 'payos' ? 'QR' : 'COD'})</span>;
    }
    return <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[11px] font-semibold">⏳ Unpaid ({o.paymentMethod === 'payos' ? 'QR' : 'COD'})</span>;
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant mb-6">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight size={14} strokeWidth={1.75} />
        <span className="text-primary font-semibold">My Orders</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-on-surface tracking-tight">Orders & Installation History</h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Track survey progress, dispatch updates, and technician contact details
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-outline-variant/25 gap-6 mb-8 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Orders' },
          { id: 'processing', label: 'In Progress & Installation' },
          { id: 'completed', label: 'Completed' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterStatus(tab.id)}
            className={`pb-3 text-xs font-semibold whitespace-nowrap transition-all border-b-2 ${
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
        <div className="py-20 text-center text-sm font-medium">Loading orders history...</div>
      ) : orders.length === 0 ? (
        <div className="py-20 text-center bg-surface-container-low rounded-2xl p-8 border border-outline-variant/25">
          <Package size={48} strokeWidth={1.75} className="text-outline mx-auto mb-2" />
          <h4 className="text-base font-semibold text-on-surface">No orders found</h4>
          <p className="text-xs text-on-surface-variant mt-1 mb-4">You have not placed any orders under this category yet.</p>
          <Link to="/products" className="px-6 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-semibold inline-block">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((o) => (
            <div
              key={o.id}
              className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/25 space-y-4 hover:shadow-md transition-all"
            >
              {/* Order header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-primary text-sm">{o.id}</span>
                  <span className="text-outline-variant">•</span>
                  <span className="text-xs text-on-surface-variant">Order Date: {new Date(o.createdAt).toLocaleDateString('en-US')}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getPaymentBadge(o)}
                  {getStatusBadge(o.status)}
                </div>
              </div>

              {/* Items summary */}
              <div className="space-y-3">
                {o.items.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <img src={it.image} alt={it.name} className="w-12 h-12 rounded-xl object-cover border border-outline-variant/25" />
                      <div>
                        <div className="font-semibold text-on-surface line-clamp-1">{it.name}</div>
                        <div className="text-[11px] text-on-surface-variant">Qty: x{it.quantity}</div>
                      </div>
                    </div>
                    <div className="font-semibold text-on-surface">
                      {(it.price * it.quantity).toLocaleString('en-US')} VND
                    </div>
                  </div>
                ))}
              </div>

              {/* Order footer */}
              <div className="pt-4 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs">
                  <span className="text-on-surface-variant">Assigned Technician: </span>
                  <strong className="text-on-surface">{o.technician || 'Pending Assignment'}</strong>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[11px] text-on-surface-variant block">Total:</span>
                    <strong className="text-lg font-bold text-primary">{o.total.toLocaleString('en-US')} VND</strong>
                  </div>
                  <Link
                    to={`/orders/${o.id}`}
                    className="px-5 py-2.5 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface font-semibold text-xs transition-all flex items-center gap-1.5"
                  >
                    <span>View Details</span>
                    <ArrowRight size={14} strokeWidth={1.75} />
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
