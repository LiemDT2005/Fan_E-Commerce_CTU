import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 5;

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
    setPage(1);
    fetchOrders();
  }, [statusFilter]);

  const totalPages = Math.ceil(orders.length / pageSize) || 1;
  const paginatedOrders = orders.slice((page - 1) * pageSize, page * pageSize);

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
            <span>Dispatch Center</span>
            <span className="w-4 h-px bg-outline-variant"></span>
            <span className="text-on-surface-variant">Installation & Logistics</span>
          </div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Orders Management</h1>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-surface-container-low p-1.5 rounded-2xl border border-outline-variant/30">
          {[
            { id: 'all', label: 'All' },
            { id: 'pending', label: 'Pending Review' },
            { id: 'processing', label: 'In Progress' },
            { id: 'completed', label: 'Completed' },
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
          <div className="py-20 text-center text-xs font-semibold">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="py-20 text-center">
            <ShoppingBag size={36} strokeWidth={1.5} className="text-outline mx-auto mb-2" />
            <p className="text-xs text-on-surface-variant">No orders found in this category.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low text-on-surface-variant uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Order ID</th>
                  <th className="p-3.5">Customer & Contact</th>
                  <th className="p-3.5">Installation Slot</th>
                  <th className="p-3.5">Equipment</th>
                  <th className="p-3.5">Payment</th>
                  <th className="p-3.5">Total Amount</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 rounded-r-xl text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {paginatedOrders.map((o) => (
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
                      {o.items.length} units
                    </td>
                    <td className="p-3.5">
                      <span className="block font-bold text-on-surface text-[11px]">
                        {o.paymentMethod === 'payos' ? 'QR (PayOS)' : 'COD'}
                      </span>
                      <span className={`inline-block mt-0.5 px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        o.paymentStatus === 'paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {o.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-primary">{o.total.toLocaleString('en-US')} VND</td>
                    <td className="p-3.5">
                      <select
                        value={o.status}
                        onChange={(e) => {
                          const val = e.target.value;
                          let txt = 'Pending Confirmation';
                          if (val === 'processing') txt = 'In Progress & Dispatching';
                          if (val === 'delivering') txt = 'Out for Installation';
                          if (val === 'completed') txt = 'Completed';
                          if (val === 'cancelled') txt = 'Order Cancelled';
                          handleUpdateStatus(o.id, val, txt);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-[11px] font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="pending">Pending Confirmation</option>
                        <option value="processing">In Progress & Dispatching</option>
                        <option value="delivering">Out for Installation</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-3.5 text-right">
                      <Link
                        to={`/admin/orders/${o.id}`}
                        className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-xs font-semibold transition-colors"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-5 mt-4 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-on-surface-variant font-medium">
                  Showing <span className="font-bold text-on-surface">{(page - 1) * pageSize + 1}</span>–
                  <span className="font-bold text-on-surface">{Math.min(page * pageSize, orders.length)}</span> of{' '}
                  <span className="font-bold text-on-surface">{orders.length}</span> orders
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="h-8 px-2.5 rounded-lg border border-outline-variant/30 text-xs font-medium text-on-surface hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft size={13} strokeWidth={1.75} />
                    <span>Prev</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                      <button
                        key={pg}
                        onClick={() => setPage(pg)}
                        className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          pg === page
                            ? 'bg-primary text-on-primary'
                            : 'hover:bg-surface-container text-on-surface-variant border border-outline-variant/20'
                        }`}
                      >
                        {pg}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="h-8 px-2.5 rounded-lg border border-outline-variant/30 text-xs font-medium text-on-surface hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight size={13} strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
