import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
          setVoucherSuccess(`Đã áp dụng mã "${data.data.code}" giảm ${data.data.discountAmount.toLocaleString('vi-VN')}đ!`);
          setVoucherInput('');
        } else {
          setVoucherError(data.message || 'Mã giảm giá không hợp lệ.');
        }
      })
      .catch(() => setVoucherError('Lỗi kiểm tra mã giảm giá.'));
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-surface-container-low text-primary flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-4xl">shopping_cart</span>
        </div>
        <h2 className="text-2xl font-extrabold text-on-surface">Giỏ hàng của bạn đang trống</h2>
        <p className="text-sm text-on-surface-variant mt-2 mb-8">
          Hãy khám phá các mẫu quạt trần 3-in-1 thông minh và phụ kiện để hoàn thiện không gian sống.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary-container transition-all"
        >
          <span>Khám phá sản phẩm ngay</span>
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant mb-6">
        <Link to="/" className="hover:text-primary">Trang chủ</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-primary font-bold">Giỏ hàng của bạn</span>
      </div>

      <h1 className="text-3xl font-extrabold text-on-surface tracking-tight mb-8">Giỏ Hàng Của Bạn</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-outline-variant/20 last:border-0 last:pb-0"
              >
                {/* Product info */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-surface-container flex-shrink-0 border border-outline-variant/30">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.sku}</span>
                    <h3 className="font-bold text-sm text-on-surface line-clamp-1">{item.name}</h3>
                    <div className="text-sm font-extrabold text-primary mt-1">
                      {item.price.toLocaleString('vi-VN')}đ
                    </div>
                  </div>
                </div>

                {/* Quantity and Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  <div className="flex items-center rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center text-on-surface hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <span className="w-8 text-center font-bold text-xs">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center text-on-surface hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>

                  <div className="text-right min-w-[100px]">
                    <div className="font-bold text-sm text-on-surface">
                      {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-on-surface-variant hover:text-error transition-colors"
                    title="Xóa khỏi giỏ hàng"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Installation Guarantee Banner */}
          <div className="p-5 rounded-2xl bg-primary-fixed/30 border border-primary-fixed/50 flex items-center gap-4 text-xs text-on-surface">
            <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-2xl">home_repair_service</span>
            </div>
            <div>
              <strong className="block text-primary text-sm font-bold">Miễn phí khảo sát & Lắp đặt tiêu chuẩn 0đ</strong>
              <span>Được tự động áp dụng tại bước Thanh toán cho toàn bộ đơn hàng quạt trần tại Hà Nội & TP.HCM.</span>
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-4">
            <h3 className="text-base font-bold text-on-surface pb-3 border-b border-outline-variant/20">
              Tóm tắt đơn hàng
            </h3>

            {/* Calculations */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-on-surface-variant">
                <span>Tạm tính hàng hóa:</span>
                <span className="font-bold text-on-surface">{subtotal.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Khảo sát & Lắp đặt:</span>
                <span className="text-emerald-700 font-bold">Miễn phí (0đ)</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Vận chuyển:</span>
                <span className="text-emerald-700 font-bold">Miễn phí (0đ)</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-primary font-bold">
                  <span>Ưu đãi voucher ({appliedVoucher?.code}):</span>
                  <span>-{discount.toLocaleString('vi-VN')}đ</span>
                </div>
              )}
              <div className="pt-3 border-t border-outline-variant/20 flex justify-between items-baseline">
                <span className="text-sm font-bold text-on-surface">Tổng thanh toán:</span>
                <span className="text-2xl font-black text-primary">{total.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>

            {/* Voucher input form */}
            <form onSubmit={handleApplyVoucher} className="pt-4 border-t border-outline-variant/20">
              <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                Mã giảm giá / Voucher
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={voucherInput}
                  onChange={(e) => setVoucherInput(e.target.value.toUpperCase())}
                  placeholder="VD: FANFUN2026"
                  className="flex-1 h-10 px-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs uppercase font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="px-4 h-10 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface transition-colors"
                >
                  Áp dụng
                </button>
              </div>
              {voucherError && <p className="text-[11px] text-error mt-1.5">{voucherError}</p>}
              {voucherSuccess && <p className="text-[11px] text-emerald-700 font-semibold mt-1.5">{voucherSuccess}</p>}
            </form>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-bold text-sm transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-4"
            >
              <span>Tiến hành thanh toán</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
