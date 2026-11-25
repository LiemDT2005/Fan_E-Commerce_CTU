import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  TrendingUp,
  CreditCard,
  Clock,
  ShoppingBag,
  Package,
  Layers,
  Users,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

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
          <div className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-[0.12em] mb-1">
            <span>Operations Dashboard</span>
            <span className="w-4 h-px bg-outline-variant/40"></span>
            <span className="text-on-surface-variant">Retail KPI &amp; Survey Overview</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">Business Overview</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products/new"
            className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus size={15} strokeWidth={1.75} />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/25 flex items-start justify-between">
          <div>
            <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">Total Revenue</span>
            <div className="text-xl sm:text-2xl font-bold text-primary mt-1">
              {stats.totalRevenue.toLocaleString('en-US')} VND
            </div>
            <span className="text-[11px] text-emerald-800 font-medium flex items-center gap-1 mt-1.5">
              <TrendingUp size={13} strokeWidth={1.75} /> +18.5% from last month
            </span>
          </div>
          <CreditCard size={20} strokeWidth={1.75} className="text-primary mt-0.5 flex-shrink-0" />
        </div>

        {/* Stat 2 */}
        <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/25 flex items-start justify-between">
          <div>
            <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">Pending Orders</span>
            <div className="text-xl sm:text-2xl font-bold text-on-surface mt-1">
              {stats.pendingOrders}
            </div>
            <span className="text-[11px] text-amber-800 font-medium flex items-center gap-1 mt-1.5">
              <Clock size={13} strokeWidth={1.75} /> Pending Survey / Dispatch
            </span>
          </div>
          <ShoppingBag size={20} strokeWidth={1.75} className="text-on-surface-variant mt-0.5 flex-shrink-0" />
        </div>

        {/* Stat 3 */}
        <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/25 flex items-start justify-between">
          <div>
            <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">Active Catalog</span>
            <div className="text-xl sm:text-2xl font-bold text-on-surface mt-1">
              {stats.activeProducts}
            </div>
            <span className="text-[11px] text-primary font-medium flex items-center gap-1 mt-1.5">
              <Package size={13} strokeWidth={1.75} /> 4 Microclimate Groups
            </span>
          </div>
          <Layers size={20} strokeWidth={1.75} className="text-on-surface-variant mt-0.5 flex-shrink-0" />
        </div>

        {/* Stat 4 */}
        <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/25 flex items-start justify-between">
          <div>
            <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">VIP Customers</span>
            <div className="text-xl sm:text-2xl font-bold text-on-surface mt-1">
              {stats.totalCustomers}
            </div>
            <span className="text-[11px] text-emerald-800 font-medium flex items-center gap-1 mt-1.5">
              <ShieldCheck size={13} strokeWidth={1.75} /> 99.2% Satisfaction Rate
            </span>
          </div>
          <Users size={20} strokeWidth={1.75} className="text-on-surface-variant mt-0.5 flex-shrink-0" />
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="p-6 rounded-xl bg-surface-container-low border border-outline-variant/25 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-on-surface">Recent Orders</h3>
            <p className="text-xs text-on-surface-variant mt-0.5">Installation scheduling and customer dispatch tracking</p>
          </div>
          <Link to="/admin/orders" className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1">
            <span>View All Orders</span>
            <ArrowRight size={13} strokeWidth={1.75} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container text-on-surface-variant uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="p-3 rounded-l-lg">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Installation Slot</th>
                <th className="p-3">Technician</th>
                <th className="p-3">Status</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3 rounded-r-lg text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/15">
              {recentOrders.map(o => (
                <tr key={o.id} className="hover:bg-surface-container/40 transition-colors">
                  <td className="p-3 font-mono font-semibold text-primary">{o.id}</td>
                  <td className="p-3">
                    <strong className="block text-on-surface font-semibold">{o.customerName}</strong>
                    <span className="text-[11px] text-on-surface-variant">{o.customerPhone}</span>
                  </td>
                  <td className="p-3 text-on-surface">
                    {o.scheduledDate} ({o.scheduledSlot})
                  </td>
                  <td className="p-3 text-on-surface">{o.technician || 'Pending Assignment'}</td>
                  <td className="p-3">
                    {o.status === 'completed' ? (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                        Completed
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-semibold text-[10px]">
                        {o.statusText}
                      </span>
                    )}
                  </td>
                  <td className="p-3 font-semibold text-on-surface">{o.total.toLocaleString('en-US')} VND</td>
                  <td className="p-3 text-right">
                    <Link
                      to={`/admin/orders/${o.id}`}
                      className="px-2.5 py-1.5 rounded-md bg-surface-container hover:bg-primary hover:text-on-primary text-xs font-medium transition-colors"
                    >
                      Details
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
