import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Star,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Walnut Wood');
  const [activeTab, setActiveTab] = useState('specs'); // 'specs', 'features'
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
    return <div className="py-32 text-center text-sm font-medium">Loading product specifications...</div>;
  }

  if (!product) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-xl font-bold">Product Not Found</h2>
        <Link to="/products" className="mt-4 inline-block px-6 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setToastMsg(`Added ${quantity} item(s) to cart!`);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-10">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#241914] text-[#f5ebe0] px-4 py-3 rounded-lg shadow-lg flex items-center gap-2.5 text-xs font-medium">
          <CheckCircle2 size={16} strokeWidth={1.75} className="text-[#e6a68a] flex-shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-8">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight size={14} strokeWidth={1.75} />
        <Link to="/products" className="hover:text-primary transition-colors">Products &amp; Ecosystem</Link>
        <ChevronRight size={14} strokeWidth={1.75} />
        <span className="text-on-surface font-medium line-clamp-1">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
        {/* Left: Product Images */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/25 aspect-square relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-3.5 left-3.5 bg-[#241914]/85 backdrop-blur-sm text-[#f9efe4] text-[11px] font-medium px-3 py-1 rounded-md uppercase tracking-wider">
                {product.badge}
              </span>
            )}
          </div>

          {/* Quick installation note */}
          <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/25 flex items-center justify-between text-xs text-on-surface">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} strokeWidth={1.75} className="text-primary flex-shrink-0" />
              <span>Certified under IEC 60335 Electrical Safety Standards</span>
            </div>
            <span className="text-primary font-semibold">Free Survey</span>
          </div>
        </div>

        {/* Right: Product Info & Purchase Form */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-semibold text-primary uppercase tracking-[0.12em]">
              {product.categoryName} &nbsp;·&nbsp; SKU: {product.sku}
            </span>

            <h1 className="text-2xl sm:text-3xl font-bold text-on-surface mt-2 tracking-tight">
              {product.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3 mt-3 text-xs">
              <div className="flex items-center text-amber-700 font-semibold gap-1">
                <Star size={14} strokeWidth={1.75} className="fill-amber-600 text-amber-600" />
                <span>{product.rating}</span>
              </div>
              <span className="text-outline-variant">·</span>
              <span className="text-on-surface-variant">{product.reviewCount} customer reviews</span>
              <span className="text-outline-variant">·</span>
              <span className="text-emerald-800 font-medium">
                In Stock ({product.stock} units)
              </span>
            </div>

            {/* Price Box */}
            <div className="py-5 my-6 border-y border-outline-variant/25 flex items-baseline gap-4">
              <span className="text-2xl sm:text-3xl font-bold text-primary">
                {product.price.toLocaleString('en-US')} VND
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-on-surface-variant line-through">
                  {product.originalPrice.toLocaleString('en-US')} VND
                </span>
              )}
              {product.originalPrice > product.price && (
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-primary/10 text-primary font-semibold ml-auto">
                  Save {((product.originalPrice - product.price) / 1000).toLocaleString('en-US')}K
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Color selection */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-on-surface uppercase tracking-wider mb-2">
                Color & Material Finish: <span className="text-primary">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {['Walnut Wood', 'Matte Black', 'Pure White'].map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors ${
                      selectedColor === c
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-outline-variant/35 hover:border-outline text-on-surface-variant'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-semibold text-on-surface uppercase tracking-wider">Quantity:</span>
              <div className="flex items-center rounded-lg bg-surface-container-low border border-outline-variant/35">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center text-on-surface hover:text-primary transition-colors"
                >
                  <Minus size={14} strokeWidth={1.75} />
                </button>
                <span className="w-10 text-center font-semibold text-xs">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 flex items-center justify-center text-on-surface hover:text-primary transition-colors"
                >
                  <Plus size={14} strokeWidth={1.75} />
                </button>
              </div>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-outline-variant/25">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 py-3.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-sm transition-colors flex items-center justify-center gap-2 border border-outline-variant/40"
            >
              <ShoppingBag size={17} strokeWidth={1.75} />
              <span>Add to Cart</span>
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="flex-1 py-3.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Order &amp; Book Survey</span>
              <ArrowRight size={17} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications & Technology */}
      <div className="p-6 sm:p-8 rounded-xl bg-surface-container-low border border-outline-variant/25">
        <div className="flex border-b border-outline-variant/25 gap-8 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
              activeTab === 'specs'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Technical Specifications
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('features')}
            className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
              activeTab === 'features'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Key Highlights
          </button>
        </div>

        {activeTab === 'specs' && product.specs && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="flex justify-between p-3.5 rounded-lg bg-surface-container-lowest text-xs border border-outline-variant/20">
                <span className="text-on-surface-variant font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                <span className="font-semibold text-on-surface text-right">{val}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'features' && (
          <ul className="space-y-2.5">
            {(product.features || []).map((feat, idx) => (
              <li key={idx} className="flex items-center gap-3 text-xs text-on-surface bg-surface-container-lowest p-3.5 rounded-lg border border-outline-variant/20">
                <CheckCircle2 size={16} strokeWidth={1.75} className="text-primary flex-shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
