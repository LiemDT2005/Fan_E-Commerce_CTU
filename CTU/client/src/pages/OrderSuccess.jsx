import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'FF-2025-8869';

  return (
    <div className="max-w-[720px] mx-auto px-4 py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
        <span className="material-symbols-outlined text-4xl">check</span>
      </div>

      <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary-fixed/40 px-3.5 py-1 rounded-full">
        Đặt hàng thành công
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface mt-4 tracking-tight">
        Cảm Ơn Bạn Đã Chọn FANFUN!
      </h1>

      <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
        Đơn hàng của bạn đã được tiếp nhận và chuyển đến trung tâm điều phối kỹ thuật.
      </p>

      {/* Order info card */}
      <div className="my-8 p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 text-left space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
          <div>
            <div className="text-[11px] text-on-surface-variant uppercase font-semibold">Mã đơn hàng</div>
            <div className="text-lg font-bold text-primary font-mono">{orderId}</div>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
            Chờ xác nhận & điều phối
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-on-surface-variant block font-medium">Thời gian khảo sát dự kiến:</span>
            <strong className="text-on-surface block mt-0.5">Trong 24 giờ tới (Kỹ thuật viên sẽ gọi trước 30p)</strong>
          </div>
          <div>
            <span className="text-on-surface-variant block font-medium">Phương thức thanh toán:</span>
            <strong className="text-on-surface block mt-0.5">Thanh toán khi hoàn tất lắp đặt (COD)</strong>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-lowest text-xs text-on-surface-variant leading-relaxed">
          💡 <strong className="text-on-surface">Lưu ý:</strong> Kỹ thuật viên FANFUN khi đến sẽ xuất trình thẻ nhân viên chính hãng và biên bản khảo sát kết cấu trần nhà miễn phí.
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to={`/orders/${orderId}`}
          className="px-8 py-3.5 rounded-full bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary-container transition-all"
        >
          Theo dõi tiến độ đơn hàng
        </Link>
        <Link
          to="/products"
          className="px-8 py-3.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-sm transition-all"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    </div>
  );
}
