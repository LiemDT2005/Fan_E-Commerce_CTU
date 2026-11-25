import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Check, Clock, RefreshCw } from 'lucide-react';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || '';
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [polling, setPolling] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    const fetchOrder = () => {
      fetch(`/api/payment/verify/${orderId}`)
        .then(r => r.json())
        .then(d => {
          if (d.success) {
            setOrder(d.data);
            if (d.data.paymentStatus === 'paid') {
              setPolling(false);
            }
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };

    fetchOrder();

    // Poll every 3 seconds to check if payment webhook or PayOS API confirms payment
    const interval = setInterval(() => {
      if (!polling) {
        clearInterval(interval);
        return;
      }
      fetch(`/api/payment/verify/${orderId}`)
        .then(r => r.json())
        .then(d => {
          if (d.success) {
            setOrder(d.data);
            if (d.data.paymentStatus === 'paid') {
              setPolling(false);
              clearInterval(interval);
            }
          }
        });
    }, 3000);

    // Stop polling after 2 minutes
    const timeout = setTimeout(() => {
      setPolling(false);
      clearInterval(interval);
    }, 120000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [orderId]);

  if (loading) {
    return <div className="py-32 text-center text-sm font-medium">Verifying payment...</div>;
  }

  const isPaid = order?.paymentStatus === 'paid';

  return (
    <div className="max-w-[720px] mx-auto px-4 py-16 text-center">
      <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
        isPaid ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
      }`}>
        {isPaid ? <Check size={36} strokeWidth={1.75} /> : <Clock size={36} strokeWidth={1.75} />}
      </div>

      <span className={`text-xs font-semibold uppercase tracking-widest px-3.5 py-1 rounded-full ${
        isPaid ? 'text-primary bg-primary-fixed/40' : 'text-amber-800 bg-amber-100'
      }`}>
        {isPaid ? 'Payment Confirmed' : 'Verifying Payment...'}
      </span>

      <h1 className="text-3xl sm:text-4xl font-bold text-on-surface mt-4 tracking-tight">
        {isPaid ? 'Thank You for Your Payment!' : 'Payment Processing'}
      </h1>

      <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
        {isPaid
          ? 'Your payment has been verified and your order is confirmed. Our team will process it shortly.'
          : 'We are verifying your payment. This may take a few moments. Please do not close this page.'
        }
      </p>

      {/* Order info card */}
      <div className="my-8 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/25 text-left space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
          <div>
            <div className="text-[11px] text-on-surface-variant uppercase font-semibold">Order ID</div>
            <div className="text-lg font-bold text-primary font-mono">{orderId}</div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isPaid ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
          }`}>
            {isPaid ? '✅ Paid via QR Transfer' : '⏳ Waiting for Confirmation'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-on-surface-variant block font-medium">Payment Method:</span>
            <strong className="text-on-surface block mt-0.5">QR Code Bank Transfer (PayOS)</strong>
          </div>
          <div>
            <span className="text-on-surface-variant block font-medium">Amount:</span>
            <strong className="text-on-surface block mt-0.5">
              {order?.total?.toLocaleString('en-US')} VND
            </strong>
          </div>
        </div>

        {!isPaid && polling && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/50 text-xs text-amber-800 leading-relaxed flex items-start gap-2">
            <RefreshCw size={16} strokeWidth={1.75} className="text-amber-600 mt-0.5 animate-spin" />
            <span>
              <strong>Checking payment status...</strong> If you have already completed the transfer, please wait a moment for the system to verify.
            </span>
          </div>
        )}

        {isPaid && (
          <div className="p-4 rounded-xl bg-surface-container-lowest text-xs text-on-surface-variant leading-relaxed">
            💡 <strong className="text-on-surface">Notice:</strong> FANFUN certified technicians will present official ID badges and conduct a complimentary structural ceiling inspection report.
          </div>
        )}
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
