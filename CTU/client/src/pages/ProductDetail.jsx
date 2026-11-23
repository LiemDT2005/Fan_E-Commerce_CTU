import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Walnut Wood');
  const [activeTab, setActiveTab] = useState('specs'); // 'specs', 'tech', 'install'
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setProduct(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="py-32 text-center text-sm font-medium">Đang tải thông tin sản phẩm...</div>;
  }

  if (!product) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-xl font-bold">Không tìm thấy sản phẩm</h2>
        <Link to="/products" className="mt-4 inline-block px-6 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold">
          Quay lại danh mục
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setToastMsg(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
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

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant mb-8">
        <Link to="/" className="hover:text-primary">Trang chủ</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <Link to="/products" className="hover:text-primary">Sản phẩm & Hệ sinh thái</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-primary font-bold line-clamp-1">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        {/* Left: Product Images */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-3xl overflow-hidden bg-surface-container-low border border-outline-variant/30 aspect-square relative shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-primary text-on-primary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                {product.badge}
              </span>
            )}
          </div>

          {/* Quick installation badge */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between text-xs text-on-surface">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">verified</span>
              <span>Đạt tiêu chuẩn an toàn điện IEC 60335</span>
            </div>
            <span className="text-primary font-bold">Khảo sát trần 0đ</span>
          </div>
        </div>

        {/* Right: Product Info & Purchase Form */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary-fixed/40 px-3 py-1 rounded-full">
              {product.categoryName} • Mã SKU: {product.sku}
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface mt-3 tracking-tight">
              {product.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3 mt-3 text-xs">
              <div className="flex items-center text-amber-600 font-bold gap-1">
                <span className="material-symbols-outlined text-base fill">star</span>
                <span>{product.rating}</span>
              </div>
              <span className="text-outline-variant">•</span>
              <span className="text-on-surface-variant">{product.reviewCount} lượt đánh giá thực tế</span>
              <span className="text-outline-variant">•</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span> Còn hàng ({product.stock} thiết bị)
              </span>
            </div>

            {/* Price Box */}
            <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 my-6 flex items-baseline gap-4">
              <span className="text-3xl font-black text-primary">
                {product.price.toLocaleString('vi-VN')}đ
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-on-surface-variant line-through">
                  {product.originalPrice.toLocaleString('vi-VN')}đ
                </span>
              )}
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-bold ml-auto">
                Tiết kiệm {((product.originalPrice - product.price) / 1000).toLocaleString('vi-VN')}K
              </span>
            </div>

            {/* Short Description */}
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Color selection */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                Màu sắc & Chất liệu hoàn thiện: <span className="text-primary">{selectedColor}</span>
              </label>
              <div className="flex gap-3">
                {['Walnut Wood (Gỗ Óc Chó)', 'Matte Black (Đen Nhám)', 'Pure White (Trắng Tinh Khôi)'].map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColor(c.split(' ')[0])}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      selectedColor === c.split(' ')[0]
                        ? 'border-primary bg-primary-fixed/30 text-primary'
                        : 'border-outline-variant/30 hover:border-outline text-on-surface-variant'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-bold text-on-surface uppercase tracking-wider">Số lượng:</span>
              <div className="flex items-center rounded-xl bg-surface-container-low border border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center text-on-surface hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-base">remove</span>
                </button>
                <span className="w-10 text-center font-bold text-xs">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 flex items-center justify-center text-on-surface hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-base">add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-outline-variant/20">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-4 rounded-2xl bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-sm transition-all flex items-center justify-center gap-2 border border-outline-variant/30 shadow-sm"
            >
              <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
              <span>Thêm vào giỏ hàng</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 py-4 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <span className="material-symbols-outlined text-xl">shopping_cart_checkout</span>
              <span>Đặt hàng & Khảo sát ngay</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications & Technology */}
      <div className="p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30">
        <div className="flex border-b border-outline-variant/30 gap-8 mb-6">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-sm font-bold transition-all border-b-2 ${
              activeTab === 'specs'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Thông số kỹ thuật chi tiết
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`pb-3 text-sm font-bold transition-all border-b-2 ${
              activeTab === 'features'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Tính năng nổi bật
          </button>
        </div>

        {activeTab === 'specs' && product.specs && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="flex justify-between p-3.5 rounded-xl bg-surface-container-lowest text-xs">
                <span className="text-on-surface-variant font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                <span className="font-bold text-on-surface text-right">{val}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'features' && (
          <ul className="space-y-3">
            {(product.features || []).map((feat, idx) => (
              <li key={idx} className="flex items-center gap-3 text-xs text-on-surface bg-surface-container-lowest p-3 rounded-xl">
                <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
