import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ChevronRight,
  UserCircle2,
  CalendarCheck,
  CreditCard,
  Truck,
  QrCode,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const INPUT_CLASS =
  'w-full h-10 px-4 rounded-lg bg-surface-container-lowest border border-outline-variant/35 text-xs text-on-surface focus:outline-none focus:border-primary transition-colors';

export default function Checkout() {
  const { cartItems, subtotal, discount, total, appliedVoucher, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: user ? user.name : 'Huynh Nam Phuong',
    customerPhone: user ? user.phone : '+84 912 345 678',
    customerEmail: user ? user.email : 'alex@example.com',
    city: 'Ho Chi Minh City',
    address: 'Suite 1806, Landmark 3, Vinhomes Central Park, 208 Nguyen Huu Canh',
    scheduledDate: '28/11/2026',
    scheduledSlot: '14:00 - 16:00 (Afternoon)',
    ceilingType: 'Drywall / Gypsum ceiling (Height 2.8m)',
    note: 'Please bring an aluminum ladder and dust-extractor hammer drill.',
    paymentMethod: 'cod'
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...formData,
      address: `${formData.address}, ${formData.city}`,
      items: cartItems,
      subtotal,
      discount,
      voucherCode: appliedVoucher?.code || '',
      total,
      returnBaseUrl: window.location.origin
    };

    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        setSubmitting(false);
        if (data.success) {
          clearCart();
          if (data.data.paymentMethod === 'payos' && data.data.checkoutUrl) {
            // Redirect to PayOS checkout page
            window.location.href = data.data.checkoutUrl;
          } else {
            // COD - go to order success page
            navigate(`/order-success?orderId=${data.data.id}`);
          }
        } else {
          alert(data.message || 'An error occurred while creating your order!');
        }
      })
      .catch(err => {
        setSubmitting(false);
        console.error(err);
        alert('Could not connect to the server.');
      });
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const PAYMENT_METHODS = [
    {
      id: 'cod',
      title: 'Cash on Delivery (COD)',
      desc: 'Pay when the technician completes the installation',
      Icon: Truck,
      iconColor: 'text-amber-700',
      badgeText: null
    },
    {
      id: 'payos',
      title: 'QR Code Bank Transfer',
      desc: 'Scan QR code to pay instantly via any banking app',
      Icon: QrCode,
      iconColor: 'text-blue-600',
      badgeText: 'Recommended'
    },
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-10">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-6">
        <Link to="/cart" className="hover:text-primary transition-colors">Cart</Link>
        <ChevronRight size={14} strokeWidth={1.75} />
        <span className="text-on-surface font-medium">Checkout &amp; Schedule Survey</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight mb-8">Checkout &amp; Survey Booking</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Form: Info & Survey Scheduling */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Customer details */}
          <div className="p-6 rounded-xl bg-surface-container-low border border-outline-variant/25 space-y-4">
            <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2">
              <UserCircle2 size={18} strokeWidth={1.75} className="text-primary" />
              1. Customer &amp; Delivery Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-on-surface-variant mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className={INPUT_CLASS}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-on-surface-variant mb-1.5">Contact Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  className={INPUT_CLASS}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-on-surface-variant mb-1.5">Email for Warranty Updates *</label>
                <input
                  type="email"
                  required
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  className={INPUT_CLASS}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-on-surface-variant mb-1.5">Province / City *</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={INPUT_CLASS + ' font-medium'}
                >
                  <option value="Ho Chi Minh City">Ho Chi Minh City (Free Survey Supported)</option>
                  <option value="Hanoi">Hanoi (Free Survey Supported)</option>
                  <option value="Da Nang">Da Nang</option>
                  <option value="Can Tho">Can Tho</option>
                  <option value="Hai Phong">Hai Phong</option>
                  <option value="Other Provinces">Other Provinces</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-on-surface-variant mb-1.5">Detailed Street Address *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={INPUT_CLASS}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Scheduling & Ceiling specs */}
          <div className="p-6 rounded-xl bg-surface-container-low border border-outline-variant/25 space-y-4">
            <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2">
              <CalendarCheck size={18} strokeWidth={1.75} className="text-primary" />
              2. Technical Survey &amp; Home Installation Schedule
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-on-surface-variant mb-1.5">Preferred Arrival Date</label>
                <input
                  type="text"
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                  placeholder="e.g. 28/11/2026"
                  className={INPUT_CLASS}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-on-surface-variant mb-1.5">Preferred Time Window</label>
                <select
                  value={formData.scheduledSlot}
                  onChange={(e) => setFormData({ ...formData, scheduledSlot: e.target.value })}
                  className={INPUT_CLASS}
                >
                  <option value="09:00 - 11:00 (Morning)">09:00 - 11:00 (Morning)</option>
                  <option value="14:00 - 16:00 (Afternoon)">14:00 - 16:00 (Afternoon)</option>
                  <option value="18:00 - 20:00 (Evening)">18:00 - 20:00 (Evening)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-on-surface-variant mb-1.5">Ceiling Type &amp; Height</label>
                <input
                  type="text"
                  value={formData.ceilingType}
                  onChange={(e) => setFormData({ ...formData, ceilingType: e.target.value })}
                  className={INPUT_CLASS}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-on-surface-variant mb-1.5">Instructions for Technician</label>
                <textarea
                  rows="2"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full p-4 rounded-lg bg-surface-container-lowest border border-outline-variant/35 text-xs text-on-surface focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="p-6 rounded-xl bg-surface-container-low border border-outline-variant/25 space-y-4">
            <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2">
              <CreditCard size={18} strokeWidth={1.75} className="text-primary" />
              3. Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PAYMENT_METHODS.map(method => {
                const Icon = method.Icon;
                return (
                  <label
                    key={method.id}
                    className={`p-4 rounded-xl border cursor-pointer flex items-start gap-3 transition-colors ${
                      formData.paymentMethod === method.id
                        ? 'border-primary bg-primary/5'
                        : 'border-outline-variant/35 bg-surface-container-lowest hover:border-outline'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={formData.paymentMethod === method.id}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="mt-0.5 text-primary focus:ring-primary"
                    />
                    <div className="flex items-start gap-3 flex-1">
                      <Icon size={20} strokeWidth={1.75} className={`${method.iconColor} mt-0.5 flex-shrink-0`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <strong className="block text-xs font-semibold text-on-surface leading-tight">{method.title}</strong>
                          {method.badgeText && (
                            <span className="px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[9px] font-semibold uppercase tracking-wide">
                              {method.badgeText}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-on-surface-variant block mt-0.5">{method.desc}</span>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>

            {formData.paymentMethod === 'payos' && (
              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200/40 flex items-start gap-3">
                <Info size={16} strokeWidth={1.75} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-blue-800 leading-relaxed">
                  <strong>How it works:</strong> After placing the order, you will be redirected to a secure payment page with a <strong>VietQR code</strong>.
                  Open your banking app (MBBank, Vietcombank, TPBank, etc.), scan the QR code to complete payment.
                  Your order will be <strong>automatically confirmed</strong> once payment is received.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-4 space-y-5">
          <div className="p-6 rounded-xl bg-surface-container-low border border-outline-variant/25 space-y-4">
            <h3 className="text-sm font-semibold text-on-surface pb-3 border-b border-outline-variant/20">
              Order ({cartItems.length} items)
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-3 text-xs">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-outline-variant/25" />
                  <div className="flex-1">
                    <div className="font-semibold text-on-surface line-clamp-1">{item.name}</div>
                    <div className="text-on-surface-variant">x{item.quantity} · {item.price.toLocaleString('en-US')} VND</div>
                  </div>
                  <span className="font-semibold">{(item.price * item.quantity).toLocaleString('en-US')} VND</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-outline-variant/20 space-y-2.5 text-xs">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal:</span>
                <span className="font-semibold text-on-surface">{subtotal.toLocaleString('en-US')} VND</span>
              </div>
              <div className="flex justify-between text-emerald-800 font-medium">
                <span>Survey &amp; Installation:</span>
                <span>Free</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-primary font-semibold">
                  <span>Coupon Discount:</span>
                  <span>-{discount.toLocaleString('en-US')} VND</span>
                </div>
              )}
              <div className="pt-3 border-t border-outline-variant/20 flex justify-between items-baseline">
                <span className="text-sm font-semibold text-on-surface">Total Amount:</span>
                <span className="text-xl font-bold text-primary">{total.toLocaleString('en-US')} VND</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-lg bg-primary hover:bg-primary-container disabled:opacity-50 text-on-primary font-semibold text-sm transition-colors flex items-center justify-center gap-2 mt-3"
            >
              {submitting ? (
                <span>Processing Order...</span>
              ) : formData.paymentMethod === 'payos' ? (
                <>
                  <QrCode size={16} strokeWidth={1.75} />
                  <span>Proceed to QR Payment</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} strokeWidth={1.75} />
                  <span>Complete Booking &amp; Order</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
