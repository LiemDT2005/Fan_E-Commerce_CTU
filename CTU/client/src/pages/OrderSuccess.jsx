import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'FF-2025-8869';

  return (
    <div className="max-w-[720px] mx-auto px-4 py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
        <Check size={36} strokeWidth={1.75} />
      </div>

      <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-primary-fixed/40 px-3.5 py-1 rounded-full">
        Order Placed Successfully
      </span>

      <h1 className="text-3xl sm:text-4xl font-bold text-on-surface mt-4 tracking-tight">
        Thank You for Choosing FANFUN!
      </h1>

      <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
        Your order has been received and routed to our technical dispatch center.
      </p>

      {/* Order info card */}
      <div className="my-8 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/25 text-left space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
          <div>
            <div className="text-[11px] text-on-surface-variant uppercase font-semibold">Order ID</div>
            <div className="text-lg font-bold text-primary font-mono">{orderId}</div>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
            Pending Dispatch & Survey
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-on-surface-variant block font-medium">Estimated Survey Arrival:</span>
            <strong className="text-on-surface block mt-0.5">Within 24 hours (Tech calls 30 mins prior)</strong>
          </div>
          <div>
            <span className="text-on-surface-variant block font-medium">Payment Method:</span>
            <strong className="text-on-surface block mt-0.5">Payment Upon Installation (COD)</strong>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface-container-lowest text-xs text-on-surface-variant leading-relaxed">
          💡 <strong className="text-on-surface">Notice:</strong> FANFUN certified technicians will present official ID badges and conduct a complimentary structural ceiling inspection report.
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to={`/orders/${orderId}`}
          className="px-8 py-3.5 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:bg-primary-container transition-all"
        >
          Track Order Progress
        </Link>
        <Link
          to="/products"
          className="px-8 py-3.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-sm transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
