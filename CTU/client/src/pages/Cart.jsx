import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  ArrowRight,
  ChevronRight,
  Minus,
  Plus,
  Trash2,
  Wrench,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    shippingFee,
    total,
    appliedVoucher,
    setAppliedVoucher
  } = useCart();

  const [voucherInput, setVoucherInput] = useState('');
  const [voucherError, setVoucherError] = useState('');
  const [voucherSuccess, setVoucherSuccess] = useState('');
  const navigate = useNavigate();

  const handleApplyVoucher = (e) => {
    e.preventDefault();
    setVoucherError('');
    setVoucherSuccess('');

    fetch('/api/vouchers/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: voucherInput, subtotal })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAppliedVoucher(data.data);
          setVoucherSuccess(`Applied coupon "${data.data.code}" - Saved ${data.data.discountAmount.toLocaleString('en-US')} VND!`);
          setVoucherInput('');
        } else {
          setVoucherError(data.message || 'Invalid coupon code.');
        }
      })
      .catch(() => setVoucherError('Error validating coupon.'));
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-24 text-center">
        <ShoppingBag size={40} strokeWidth={1.5} className="text-outline mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-on-surface">Your Shopping Cart is Empty</h2>
        <p className="text-sm text-on-surface-variant mt-2 mb-8">
          Explore our smart 3-in-1 ceiling fans and accessories to elevate your living space.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary font-semibold text-sm hover:bg-primary-container transition-colors"
        >
          <span>Explore Products Now</span>
          <ArrowRight size={16} strokeWidth={1.75} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-6">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight size={14} strokeWidth={1.75} />
        <span className="text-on-surface font-medium">Shopping Cart</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-xl bg-surface-container-low border border-outline-variant/25 divide-y divide-outline-variant/20">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5"
              >
                {/* Product info */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-container flex-shrink-0 border border-outline-variant/25">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-primary uppercase tracking-[0.12em]">{item.sku}</span>
                    <h3 className="font-semibold text-sm text-on-surface line-clamp-1">{item.name}</h3>
                    <div className="text-sm font-bold text-primary mt-0.5">
                      {item.price.toLocaleString('en-US')} VND
                    </div>
                  </div>
                </div>

                {/* Quantity and Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto">
                  <div className="flex items-center rounded-lg bg-surface-container-lowest border border-outline-variant/35">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center text-on-surface hover:text-primary transition-colors"
                    >
                      <Minus size={14} strokeWidth={1.75} />
                    </button>
                    <span className="w-8 text-center font-semibold text-xs">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center text-on-surface hover:text-primary transition-colors"
                    >
                      <Plus size={14} strokeWidth={1.75} />
                    </button>
                  </div>

                  <div className="text-right min-w-[100px]">
                    <div className="font-semibold text-sm text-on-surface">
                      {(item.price * item.quantity).toLocaleString('en-US')} VND
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-on-surface-variant hover:text-error transition-colors"
                    title="Remove from cart"
                  >
                    <Trash2 size={16} strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Installation Guarantee Banner */}
          <div className="py-4 px-5 rounded-xl border border-outline-variant/25 flex items-center gap-3.5 text-xs text-on-surface">
            <Wrench size={18} strokeWidth={1.75} className="text-primary flex-shrink-0" />
            <div>
              <strong className="block text-primary text-sm font-semibold">Free Ceiling Survey &amp; Standard Installation</strong>
              <span className="text-on-surface-variant">Automatically applied at Checkout for all ceiling fan orders in Hanoi &amp; Ho Chi Minh City.</span>
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4 space-y-5">
          <div className="p-6 rounded-xl bg-surface-container-low border border-outline-variant/25 space-y-4">
            <h3 className="text-sm font-semibold text-on-surface pb-3 border-b border-outline-variant/20">
              Order Summary
            </h3>

            {/* Calculations */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal:</span>
                <span className="font-semibold text-on-surface">{subtotal.toLocaleString('en-US')} VND</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Survey &amp; Installation:</span>
                <span className="text-emerald-800 font-semibold">Free</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Shipping:</span>
                <span className="text-emerald-800 font-semibold">Free</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-primary font-semibold">
                  <span>Coupon Discount ({appliedVoucher?.code}):</span>
                  <span>-{discount.toLocaleString('en-US')} VND</span>
                </div>
              )}
              <div className="pt-3 border-t border-outline-variant/20 flex justify-between items-baseline">
                <span className="text-sm font-semibold text-on-surface">Total:</span>
                <span className="text-xl font-bold text-primary">{total.toLocaleString('en-US')} VND</span>
              </div>
            </div>

            {/* Voucher input form */}
            <form onSubmit={handleApplyVoucher} className="pt-4 border-t border-outline-variant/20">
              <label className="block text-[11px] font-semibold text-on-surface-variant uppercase tracking-[0.12em] mb-2">
                Coupon Code / Promo Voucher
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={voucherInput}
                  onChange={(e) => setVoucherInput(e.target.value.toUpperCase())}
                  placeholder="e.g. FANFUN2026"
                  className="flex-1 h-9 px-3 rounded-lg bg-surface-container-lowest border border-outline-variant/35 text-xs uppercase font-semibold text-on-surface focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="px-4 h-9 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface transition-colors"
                >
                  Apply
                </button>
              </div>
              {voucherError && <p className="text-[11px] text-error mt-1.5">{voucherError}</p>}
              {voucherSuccess && <p className="text-[11px] text-emerald-800 font-medium mt-1.5">{voucherSuccess}</p>}
            </form>

            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm transition-colors flex items-center justify-center gap-2 mt-3"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
