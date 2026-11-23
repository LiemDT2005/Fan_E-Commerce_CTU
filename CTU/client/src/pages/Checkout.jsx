import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Checkout() {
  const { cartItems, subtotal, discount, total, appliedVoucher, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: user ? user.name : 'Nguyễn Văn An',
    customerPhone: user ? user.phone : '0912 345 678',
    customerEmail: user ? user.email : 'nguyenvanan@gmail.com',
    city: 'TP. Hồ Chí Minh',
    address: 'Căn hộ 1806, Tòa Landmark 3, Vinhomes Central Park, 208 Nguyễn Hữu Cảnh',
    scheduledDate: '18/11/2026',
    scheduledSlot: '14:00 - 16:00 (Buổi chiều)',
    ceilingType: 'Trần thạch cao (Cao 2.8m)',
    note: 'Cần kỹ thuật viên đem theo thang nhôm và máy hút bụi khoan.',
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
      total
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
          navigate(`/order-success?orderId=${data.data.id}`);
        } else {
          alert('Có lỗi xảy ra khi tạo đơn hàng!');
        }
      })
      .catch(err => {
        setSubmitting(false);
        console.error(err);
        alert('Không thể kết nối đến máy chủ.');
      });
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant mb-6">
        <Link to="/cart" className="hover:text-primary">Giỏ hàng</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-primary font-bold">Thanh toán & Đặt lịch khảo sát</span>
      </div>

      <h1 className="text-3xl font-extrabold text-on-surface tracking-tight mb-8">Thanh Toán & Đặt Lịch Lắp Đặt</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Info & Survey Scheduling */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Customer details */}
          <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-4">
            <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">contact_mail</span>
              1. Thông tin người nhận hàng
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Họ và tên *</label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Số điện thoại liên hệ *</label>
                <input
                  type="tel"
                  required
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Email nhận thông báo bảo hành *</label>
                <input
                  type="email"
                  required
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Tỉnh / Thành phố *</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-semibold"
                >
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh (Hỗ trợ khảo sát 0đ)</option>
                  <option value="Hà Nội">Hà Nội (Hỗ trợ khảo sát 0đ)</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Cần Thơ">Cần Thơ</option>
                  <option value="Hải Phòng">Hải Phòng</option>
                  <option value="Tỉnh thành khác">Tỉnh thành khác</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Địa chỉ chi tiết (Số nhà, tòa nhà) *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Scheduling & Ceiling specs */}
          <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-4">
            <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">event_available</span>
              2. Đặt lịch khảo sát kỹ thuật & Lắp đặt tận nhà
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Ngày mong muốn kỹ thuật viên đến</label>
                <input
                  type="text"
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                  placeholder="VD: 18/11/2026"
                  className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Khung giờ thuận tiện nhất</label>
                <select
                  value={formData.scheduledSlot}
                  onChange={(e) => setFormData({ ...formData, scheduledSlot: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="09:00 - 11:00 (Buổi sáng)">09:00 - 11:00 (Buổi sáng)</option>
                  <option value="14:00 - 16:00 (Buổi chiều)">14:00 - 16:00 (Buổi chiều)</option>
                  <option value="18:00 - 20:00 (Buổi tối)">18:00 - 20:00 (Buổi tối)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Loại trần nhà</label>
                <input
                  type="text"
                  value={formData.ceilingType}
                  onChange={(e) => setFormData({ ...formData, ceilingType: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Ghi chú cho kỹ thuật viên</label>
                <textarea
                  rows="2"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-4">
            <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">payments</span>
              3. Phương thức thanh toán
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'cod', title: 'Thanh toán khi hoàn tất lắp đặt (COD)', desc: 'Kiểm tra chạy thử quạt êm ái mới thanh toán' },
                { id: 'bank_transfer', title: 'Chuyển khoản ngân hàng 24/7', desc: 'Nhận mã QR thanh toán nhanh qua ứng dụng ngân hàng' },
                { id: 'vnpay', title: 'VNPAY-QR / Thẻ ATM nội địa', desc: 'Chiết khấu trực tiếp 50.000đ khi quét VNPAY' },
                { id: 'installment', title: 'Trả góp 0% lãi suất', desc: 'Qua thẻ tín dụng kỳ hạn 3 - 6 - 12 tháng' },
              ].map(method => (
                <label
                  key={method.id}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all ${
                    formData.paymentMethod === method.id
                      ? 'border-primary bg-primary-fixed/20 shadow-sm'
                      : 'border-outline-variant/30 bg-surface-container-lowest hover:border-outline'
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
                  <div>
                    <strong className="block text-xs font-bold text-on-surface leading-tight">{method.title}</strong>
                    <span className="text-[11px] text-on-surface-variant block mt-0.5">{method.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-4">
            <h3 className="text-base font-bold text-on-surface pb-3 border-b border-outline-variant/20">
              Đơn hàng ({cartItems.length} sản phẩm)
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-3 text-xs">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover border border-outline-variant/30" />
                  <div className="flex-1">
                    <div className="font-bold text-on-surface line-clamp-1">{item.name}</div>
                    <div className="text-on-surface-variant">x{item.quantity} • {item.price.toLocaleString('vi-VN')}đ</div>
                  </div>
                  <span className="font-bold">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-outline-variant/20 space-y-2 text-xs">
              <div className="flex justify-between text-on-surface-variant">
                <span>Tạm tính:</span>
                <span className="font-bold text-on-surface">{subtotal.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Khảo sát & Lắp đặt:</span>
                <span>Miễn phí 0đ</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-primary font-bold">
                  <span>Voucher giảm giá:</span>
                  <span>-{discount.toLocaleString('vi-VN')}đ</span>
                </div>
              )}
              <div className="pt-3 border-t border-outline-variant/20 flex justify-between items-baseline">
                <span className="text-sm font-bold text-on-surface">Tổng số tiền:</span>
                <span className="text-2xl font-black text-primary">{total.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-2xl bg-primary hover:bg-primary-container disabled:opacity-50 text-on-primary font-bold text-sm transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-4"
            >
              {submitting ? (
                <span>Đang xử lý đơn hàng...</span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                  <span>Hoàn tất đặt lịch & Đơn hàng</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
