import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { addToCart } = useCart();
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFeaturedProducts(data.data.slice(0, 4));
        }
      })
      .catch(console.error);
  }, []);

  const handleQuickAdd = (p) => {
    addToCart(p, 1);
    setToastMsg(`Đã thêm "${p.name}" vào giỏ hàng!`);
    setTimeout(() => setToastMsg(''), 3000);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in text-sm font-semibold">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          {toastMsg}
        </div>
      )}

      {/* 1. HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-surface-container-low py-12 lg:py-20 border-b border-outline-variant/30">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-32 w-[32rem] h-[32rem] bg-surface-container-high/80 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 flex flex-col items-start space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold uppercase tracking-wider shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span>Thế hệ mới • Công nghệ 3-in-1 đột phá</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-on-surface leading-[1.15]">
                FANFUN – Thoải mái quanh năm, thông minh mỗi ngày
              </h1>

              <p className="text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed">
                Giải pháp điều hòa vi khí hậu toàn diện: Làm mát luồng gió tự nhiên, sưởi ấm gốm PTC dịu êm và làm sạch không khí tích hợp trong một thiết bị trần tinh tế.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/products"
                  className="px-8 py-3.5 rounded-full bg-primary text-on-primary text-sm font-bold hover:bg-primary-container transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <span>Khám phá sản phẩm</span>
                  <span className="material-symbols-outlined text-[18px]">east</span>
                </Link>

                <a
                  href="#tech-section"
                  className="px-7 py-3.5 rounded-full bg-surface-container-lowest text-on-surface text-sm font-semibold hover:bg-surface-container transition-all shadow-sm flex items-center gap-2 border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined text-[20px] text-primary">play_circle</span>
                  <span>Tìm hiểu công nghệ 3-in-1</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 w-full">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/20">
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-[18px]">volume_mute</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-on-surface leading-tight">BLDC 28dB</span>
                    <span className="text-[10px] text-on-surface-variant">Siêu tĩnh âm</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/20">
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-on-surface leading-tight">Bảo hành 5 năm</span>
                    <span className="text-[10px] text-on-surface-variant">Tận nhà chu đáo</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/20">
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-[18px]">home_repair_service</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-on-surface leading-tight">Lắp đặt 0đ</span>
                    <span className="text-[10px] text-on-surface-variant">Hà Nội & TP.HCM</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/20">
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-[18px]">cell_wifi</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-on-surface leading-tight">Wi-Fi Smart</span>
                    <span className="text-[10px] text-on-surface-variant">App tiếng Việt</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Image with Microclimate Widget */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-[16/11] border border-outline-variant/30">
                <img
                  src="https://lh3.googleusercontent.com/aida/ALJJyrAsiZaWI3R7fdCjyGjiRWTZQ1e93xWc9QEQ47Zoy5hlGrO487ZHGdDMX2aQ0wD7YzCYOCNLCFrqPdwQ0MLrStB0NPn5sMzLdCxDMm2Pk3lR-7tbMu82gpklcYK64RytVb-FuLsjBQWNBSKuaUWgCPkz476kJTVUy-zRk7Q0u5JIDP84IJAtan0RrqIA3D4tEt_nw_LetO36wFGsn5vQAcoedK_XrCLgOuw2GiKwd-Ve"
                  alt="FANFUN 3-in-1 Living"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/70 via-transparent to-transparent"></div>

                {/* Floating Widget */}
                <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-surface-container-lowest/90 p-4 rounded-2xl shadow-xl flex items-center justify-between border border-outline-variant/30">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[24px]">air</span>
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-on-surface-variant">Trạng thái phòng khách</div>
                      <div className="text-sm font-bold text-on-surface flex items-center gap-2">
                        <span>24.5°C</span>
                        <span className="text-primary font-medium">• Gió tự nhiên cấp 3</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span> AQI 12 Tốt
                    </span>
                    <span className="text-[10px] text-on-surface-variant mt-1 font-semibold">HEPA H13 Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE-IN-ONE TECHNOLOGY HIGHLIGHT */}
      <section id="tech-section" className="py-20 bg-surface">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Công nghệ đột phá</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface mt-2 tracking-tight">
              Tất cả trong một: Làm mát • Sưởi ấm • Lọc khí
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mt-3">
              Thay thế 3 thiết bị cồng kềnh trên sàn nhà bằng một giải pháp thông minh lắp đặt trên cao, giải phóng không gian sống.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mode 1 */}
            <div className="p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30 hover:border-primary/50 transition-all hover:shadow-xl group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-3xl">wind_power</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-2">1. Gió Tự Nhiên NatureBreeze</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">
                Động cơ biến tần BLDC 9 cấp độ với thuật toán mô phỏng làn gió thổi thoang thoảng ven hồ, êm ái dưới 28dB, không gây đau đầu khi dùng ban đêm.
              </p>
              <div className="text-xs font-semibold text-primary flex items-center gap-1">
                <span>Lưu lượng 14.200 m³/h</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>

            {/* Mode 2 */}
            <div className="p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30 hover:border-primary/50 transition-all hover:shadow-xl group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-3xl">mode_heat</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-2">2. Sưởi Gốm Dịu Ấm PTC 1500W</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">
                Công nghệ sưởi gốm bán dẫn không đốt cháy oxy, giữ ẩm tự nhiên cho da và đường hô hấp. Luồng khí nóng từ trần lan tỏa đều khắp sàn nhà.
              </p>
              <div className="text-xs font-semibold text-primary flex items-center gap-1">
                <span>Ấm tức thì trong 3 giây</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>

            {/* Mode 3 */}
            <div className="p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30 hover:border-primary/50 transition-all hover:shadow-xl group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-3xl">filter_vintage</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-2">3. Lọc Khí HEPA H13 Đa Tầng</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">
                Lớp lọc HEPA H13 chuẩn y tế loại bỏ 99.97% bụi mịn PM2.5 kết hợp than hoạt tính khử mùi khói thuốc và bộ phát Ion Plasma kháng khuẩn liên tục.
              </p>
              <div className="text-xs font-semibold text-primary flex items-center gap-1">
                <span>Hiển thị chỉ số AQI thực</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section className="py-20 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-primary font-bold">Hệ thống sản phẩm</span>
              <h2 className="text-3xl font-extrabold text-on-surface mt-1 tracking-tight">Sản phẩm tiêu biểu</h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-container"
            >
              <span>Xem tất cả thiết bị</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
              <div
                key={p.id}
                className="rounded-3xl bg-surface-container-lowest border border-outline-variant/30 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all group"
              >
                <div>
                  <div className="relative aspect-square overflow-hidden bg-surface-container">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {p.badge && (
                      <span className="absolute top-3 left-3 bg-primary text-on-primary text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">{p.categoryName}</span>
                    <Link to={`/products/${p.id}`}>
                      <h4 className="font-bold text-sm text-on-surface mt-1 line-clamp-2 hover:text-primary transition-colors">
                        {p.name}
                      </h4>
                    </Link>

                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-base font-extrabold text-primary">
                        {p.price.toLocaleString('vi-VN')}đ
                      </span>
                      {p.originalPrice > p.price && (
                        <span className="text-xs text-on-surface-variant line-through">
                          {p.originalPrice.toLocaleString('vi-VN')}đ
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleQuickAdd(p)}
                    className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                    <span>Thêm vào giỏ</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INSTALLATION & VIP PROMISE */}
      <section className="py-20 bg-surface">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="rounded-3xl bg-primary text-on-primary p-8 sm:p-14 relative overflow-hidden shadow-2xl">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-2xl"></div>

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold mb-4">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Dịch vụ tiêu chuẩn 5 sao
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Khảo sát tận nhà 0đ & Lắp đặt trong 24 giờ
              </h2>
              <p className="text-sm sm:text-base text-on-primary/90 leading-relaxed mb-8">
                Đội ngũ kỹ thuật viên FANFUN mang theo máy đo laser kiểm tra độ chịu lực của trần thạch cao, đo đạc khoảng cách gió tối ưu và lắp đặt hoàn thiện không bụi bẩn.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="px-8 py-3.5 rounded-full bg-surface text-on-surface font-bold text-sm hover:bg-surface-container transition-all shadow-lg"
                >
                  Đặt lịch khảo sát ngay
                </Link>
                <a
                  href="tel:19006868"
                  className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-on-primary font-bold text-sm transition-all flex items-center gap-2 border border-white/30"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  Hotline 1900 6868
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
