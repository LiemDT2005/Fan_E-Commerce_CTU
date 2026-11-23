import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface-container-high border-t border-outline-variant/30 text-on-surface pt-16 pb-8">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-outline-variant/30">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-[24px]">mode_fan</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-on-surface">FANFUN</span>
                <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Smart Living</span>
              </div>
            </Link>
            <p className="text-sm text-on-surface-variant max-w-sm leading-relaxed">
              Tiên phong giải pháp vi khí hậu thông minh tại Việt Nam. Kết hợp hoàn hảo giữa công nghệ làm mát tự nhiên, sưởi ấm gốm an toàn và lọc bụi mịn HEPA H13 trong từng sản phẩm.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest text-xs font-semibold text-primary shadow-sm">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Bảo hành 5 năm
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest text-xs font-semibold text-primary shadow-sm">
                <span className="material-symbols-outlined text-[16px]">home_repair_service</span>
                Khảo sát tận nhà 0đ
              </div>
            </div>
          </div>

          {/* Col 2: Hệ sinh thái sản phẩm */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-sm text-on-surface uppercase tracking-wider">Hệ sinh thái</h4>
            <ul className="flex flex-col gap-2 text-xs text-on-surface-variant font-medium">
              <li><Link to="/products?category=quat-tran-thong-minh" className="hover:text-primary transition-colors">Quạt trần 3-in-1 Living</Link></li>
              <li><Link to="/products?category=quat-tran-thong-minh" className="hover:text-primary transition-colors">Quạt trần Slim Pro Bắc Âu</Link></li>
              <li><Link to="/products?category=loi-loc-phu-kien" className="hover:text-primary transition-colors">Lõi lọc HEPA H13 thay thế</Link></li>
              <li><Link to="/products?category=thiet-bi-dieu-khien" className="hover:text-primary transition-colors">Bộ điều khiển thông minh IoT</Link></li>
              <li><Link to="/products?category=dich-vu-ky-thuat" className="hover:text-primary transition-colors">Dịch vụ khảo sát kỹ thuật</Link></li>
            </ul>
          </div>

          {/* Col 3: Hỗ trợ khách hàng */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-sm text-on-surface uppercase tracking-wider">Chăm sóc khách hàng</h4>
            <ul className="flex flex-col gap-2 text-xs text-on-surface-variant font-medium">
              <li><Link to="/orders" className="hover:text-primary transition-colors">Tra cứu tiến độ đơn hàng</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Chính sách bảo hành 5 năm</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Quy trình khảo sát & lắp đặt</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Hướng dẫn kết nối App Wi-Fi</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Câu hỏi thường gặp (FAQ)</a></li>
            </ul>
          </div>

          {/* Col 4: Showroom & Hotline */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-sm text-on-surface uppercase tracking-wider">Hệ thống Showroom</h4>
            <div className="flex flex-col gap-2 text-xs text-on-surface-variant leading-relaxed">
              <div>
                <strong className="text-on-surface block">📍 Hà Nội:</strong>
                Tầng 2, TTTM Vincom Center Metropolis, 29 Liễu Giai, Ba Đình
              </div>
              <div className="mt-1">
                <strong className="text-on-surface block">📍 TP. Hồ Chí Minh:</strong>
                Số 188 Nguyễn Văn Trỗi, Phường 8, Quận Phú Nhuận
              </div>
              <div className="mt-2 text-primary font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">call</span>
                Tổng đài tư vấn: 1900 6868
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
          <div>
            © {new Date().getFullYear()} FANFUN Smart Living Co., Ltd. Tất cả quyền được bảo lưu.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary">Điều khoản dịch vụ</a>
            <a href="#" className="hover:text-primary">Chính sách bảo mật</a>
            <Link to="/admin/products" className="text-primary hover:underline">Cổng quản trị viên</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
