import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { XCircle, CheckCircle2, ArrowRight, ShoppingBag, AlertTriangle } from 'lucide-react';

export default function PaymentCancel() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || '';
  const navigate = useNavigate();

  const [cancelling, setCancelling] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [cancelError, setCancelError] = useState('');

  // Handle direct cancellation of the order
  const handleCancelOrder = async () => {
    if (!orderId) return;
    if (!window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) return;

    setCancelling(true);
    setCancelError('');

    try {
      const res = await fetch(`/api/orders/${orderId}/cancel-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      setCancelling(false);

      if (data.success) {
        setIsCancelled(true);
      } else {
        setCancelError(data.message || 'Không thể hủy đơn hàng. Vui lòng thử lại.');
      }
    } catch (err) {
      setCancelling(false);
      setCancelError('Lỗi kết nối máy chủ. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className="max-w-[720px] mx-auto px-4 py-16 text-center">
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 ${
        isCancelled ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600'
      }`}>
        {isCancelled ? (
          <CheckCircle2 size={32} strokeWidth={1.75} />
        ) : (
          <XCircle size={32} strokeWidth={1.75} />
        )}
      </div>

      <span className={`text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${
        isCancelled ? 'bg-amber-100 text-amber-900' : 'bg-red-100 text-red-800'
      }`}>
        {isCancelled ? 'Đơn hàng đã được hủy' : 'Thanh toán chưa hoàn tất'}
      </span>

      <h1 className="text-2xl sm:text-3xl font-bold text-on-surface mt-3 tracking-tight">
        {isCancelled ? 'Đơn hàng đã hủy thành công' : 'Thanh toán bị gián đoạn hoặc đã bị hủy'}
      </h1>

      <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed max-w-lg mx-auto">
        {isCancelled
          ? `Đơn hàng #${orderId} của bạn đã được hủy theo yêu cầu. Bạn có thể quay lại cửa hàng để tiếp tục chọn sản phẩm.`
          : 'Quá trình quét mã hoặc thanh toán ngân hàng chưa thành công. Bạn có thể chọn thử thanh toán lại hoặc hủy đơn hàng ngay bên dưới.'}
      </p>

      {cancelError && (
        <div className="my-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center justify-center gap-2">
          <AlertTriangle size={15} strokeWidth={1.75} />
          <span>{cancelError}</span>
        </div>
      )}

      {orderId && (
        <div className="my-8 p-6 rounded-xl bg-surface-container-low border border-outline-variant/25 text-left space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
            <div>
              <div className="text-[11px] text-on-surface-variant uppercase font-semibold">Mã đơn hàng</div>
              <div className="text-base font-bold text-primary font-mono">{orderId}</div>
            </div>
            <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
              isCancelled
                ? 'bg-red-100 text-red-800'
                : 'bg-amber-100 text-amber-900'
            }`}>
              {isCancelled ? 'Đã hủy' : 'Chưa thanh toán'}
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-surface-container-lowest text-xs text-on-surface-variant leading-relaxed">
            {isCancelled ? (
              <span>Đơn hàng đã đóng. Nếu bạn vẫn muốn sở hữu sản phẩm, bạn có thể đặt lại đơn hàng mới bất kỳ lúc nào.</span>
            ) : (
              <span>
                💡 <strong>Gợi ý:</strong> Nếu gặp trục trặc khi quét QR chuyển khoản, bạn có thể mở <strong>Chi tiết đơn hàng</strong> để thanh toán lại, hoặc bấm <strong>Hủy đơn hàng</strong> nếu không muốn đặt nữa.
              </span>
            )}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
        {!isCancelled && orderId && (
          <>
            <Link
              to={`/orders/${orderId}`}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-primary text-on-primary font-semibold text-xs hover:bg-primary-container transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <span>Xem chi tiết &amp; Thanh toán lại</span>
              <ArrowRight size={14} strokeWidth={1.75} />
            </Link>

            <button
              type="button"
              onClick={handleCancelOrder}
              disabled={cancelling}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-red-300 hover:bg-red-50 text-red-700 font-semibold text-xs transition-colors disabled:opacity-50 cursor-pointer"
            >
              {cancelling ? 'Đang hủy đơn...' : 'Hủy đơn hàng này'}
            </button>
          </>
        )}

        <Link
          to="/products"
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-medium text-xs transition-colors inline-flex items-center justify-center gap-1.5"
        >
          <ShoppingBag size={14} strokeWidth={1.75} />
          <span>Tiếp tục mua sắm</span>
        </Link>
      </div>
    </div>
  );
}
