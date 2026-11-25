import React, { useState, useEffect } from 'react';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/customers')
      .then(r => r.json())
      .then(d => {
        if (d.success) setCustomers(d.data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto w-full">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
          <span>Customer Relationship Management (CRM)</span>
          <span className="w-4 h-px bg-outline-variant"></span>
          <span className="text-on-surface-variant">Profiles & Lifetime Value</span>
        </div>
        <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Customers Management</h1>
      </div>

      <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs font-semibold">Loading customer database...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low text-on-surface-variant uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Customer Name</th>
                  <th className="p-3.5">Phone Number</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">City / Region</th>
                  <th className="p-3.5">Loyalty Tier</th>
                  <th className="p-3.5">Orders Placed</th>
                  <th className="p-3.5 rounded-r-xl text-right">Lifetime Spent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-3.5 font-bold text-on-surface">{c.name}</td>
                    <td className="p-3.5 font-mono">{c.phone}</td>
                    <td className="p-3.5 text-on-surface-variant">{c.email}</td>
                    <td className="p-3.5 font-semibold text-on-surface">{c.city}</td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-bold text-[10px]">
                        {c.tier}
                      </span>
                    </td>
                    <td className="p-3.5 font-semibold text-on-surface">{c.totalOrders} order(s)</td>
                    <td className="p-3.5 text-right font-black text-primary">
                      {c.totalSpent.toLocaleString('en-US')} VND
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
