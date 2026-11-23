import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const [toastMsg, setToastMsg] = useState('');

  const currentCategory = searchParams.get('category') || 'all';
  const currentSearch = searchParams.get('search') || '';
  const currentSort = searchParams.get('sort') || '';

  useEffect(() => {
    setLoading(true);
    let url = `/api/products?category=${currentCategory}`;
    if (currentSearch) url += `&search=${encodeURIComponent(currentSearch)}`;
    if (currentSort) url += `&sort=${currentSort}`;

    Promise.all([
      fetch(url).then(r => r.json()),
      fetch('/api/categories').then(r => r.json())
    ]).then(([prodData, catData]) => {
      if (prodData.success) setProducts(prodData.data);
      if (catData.success) setCategories(catData.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [currentCategory, currentSearch, currentSort]);

  const handleCategoryChange = (catId) => {
    const next = new URLSearchParams(searchParams);
    if (catId === 'all') next.delete('category');
    else next.set('category', catId);
    setSearchParams(next);
  };

  const handleSortChange = (sortVal) => {
    const next = new URLSearchParams(searchParams);
    if (!sortVal) next.delete('sort');
    else next.set('sort', sortVal);
    setSearchParams(next);
  };

  const handleAdd = (p) => {
    addToCart(p, 1);
    setToastMsg(`Đã thêm "${p.name}" vào giỏ hàng!`);
    setTimeout(() => setToastMsg(''), 3000);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-8">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in text-sm font-semibold">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          {toastMsg}
        </div>
      )}

      {/* Header Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant mb-6">
        <Link to="/" className="hover:text-primary">Trang chủ</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-primary font-bold">Danh mục sản phẩm & Hệ sinh thái</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Hệ Sinh Thái Vi Khí Hậu FANFUN</h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Khám phá các dòng quạt trần thông minh 3-in-1, lõi lọc HEPA và phụ kiện IoT chính hãng
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-on-surface-variant font-medium">Sắp xếp:</span>
          <select
            value={currentSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-4 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Mới nhất</option>
            <option value="price-asc">Giá: Thấp đến Cao</option>
            <option value="price-desc">Giá: Cao đến Thấp</option>
            <option value="rating">Đánh giá cao nhất</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30">
            <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-primary">category</span>
              Danh mục thiết bị
            </h3>

            <div className="flex flex-col gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                    currentCategory === cat.id
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">{cat.icon || 'apps'}</span>
                    {cat.name}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    currentCategory === cat.id ? 'bg-white/20 text-white' : 'bg-surface-container text-on-surface-variant'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick perks card */}
          <div className="p-6 rounded-3xl bg-primary-fixed/30 border border-primary-fixed/50">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-base">support_agent</span>
              Tư vấn kỹ thuật tận tâm
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Bạn chưa rõ độ cao trần nhà mình phù hợp với dòng quạt nào? Liên hệ ngay để kỹ sư FANFUN hỗ trợ đo đạc miễn phí.
            </p>
            <a
              href="tel:19006868"
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
            >
              <span>Gọi 1900 6868</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="py-20 text-center text-on-surface-variant text-sm font-medium">
              Đang tải danh sách thiết bị...
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 text-center bg-surface-container-low rounded-3xl p-8 border border-outline-variant/30">
              <span className="material-symbols-outlined text-5xl text-outline mb-2">search_off</span>
              <h4 className="text-base font-bold text-on-surface">Không tìm thấy sản phẩm phù hợp</h4>
              <p className="text-xs text-on-surface-variant mt-1 mb-4">Vui lòng thử lại với từ khóa hoặc bộ lọc khác.</p>
              <button
                onClick={() => { setSearchParams({}); }}
                className="px-6 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
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
                      <div className="flex items-center justify-between text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
                        <span>{p.categoryName}</span>
                        <span className="flex items-center gap-1 text-amber-600 font-bold">
                          <span className="material-symbols-outlined text-sm fill">star</span>
                          {p.rating}
                        </span>
                      </div>

                      <Link to={`/products/${p.id}`}>
                        <h3 className="font-bold text-sm text-on-surface mt-1 line-clamp-2 hover:text-primary transition-colors">
                          {p.name}
                        </h3>
                      </Link>

                      <p className="text-xs text-on-surface-variant mt-2 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>

                      <div className="flex items-center gap-2 mt-4">
                        <span className="text-lg font-extrabold text-primary">
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

                  <div className="p-5 pt-0 flex gap-2">
                    <Link
                      to={`/products/${p.id}`}
                      className="flex-1 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-all text-center"
                    >
                      Chi tiết
                    </Link>
                    <button
                      onClick={() => handleAdd(p)}
                      className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                      <span>Mua</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
