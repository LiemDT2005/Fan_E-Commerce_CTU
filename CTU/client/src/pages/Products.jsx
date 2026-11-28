import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  SearchX,
  Headphones,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');

  const { addToCart } = useCart();

  const currentCategory = searchParams.get('category') || 'all';
  const currentSearch = searchParams.get('search') || '';
  const currentSort = searchParams.get('sort') || '';
  const currentPage = parseInt(searchParams.get('page'), 10) || 1;
  const limit = parseInt(searchParams.get('limit'), 10) || 6;

  // Load products & categories
  useEffect(() => {
    setLoading(true);

    const queryParams = new URLSearchParams();
    if (currentCategory && currentCategory !== 'all') queryParams.set('category', currentCategory);
    if (currentSearch) queryParams.set('search', currentSearch);
    if (currentSort) queryParams.set('sort', currentSort);
    queryParams.set('page', currentPage.toString());
    queryParams.set('limit', limit.toString());

    const productsUrl = `/api/products?${queryParams.toString()}`;

    Promise.all([
      fetch(productsUrl).then((r) => r.json()),
      fetch('/api/categories').then((r) => r.json()),
    ])
      .then(([prodRes, catRes]) => {
        if (prodRes.success) {
          setProducts(prodRes.data);
          const total = prodRes.total !== undefined ? prodRes.total : prodRes.count || prodRes.data.length;
          setTotalProducts(total);
          setTotalPages(prodRes.totalPages || Math.ceil(total / limit) || 1);
        }
        if (catRes.success) setCategories(catRes.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching catalog data:', err);
        setLoading(false);
      });
  }, [currentCategory, currentSearch, currentSort, currentPage, limit]);

  const handleCategoryChange = (catId) => {
    const nextParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', catId);
    }
    nextParams.delete('page');
    setSearchParams(nextParams);
  };

  const handleSortChange = (sortVal) => {
    const nextParams = new URLSearchParams(searchParams);
    if (!sortVal) nextParams.delete('sort');
    else nextParams.set('sort', sortVal);
    nextParams.delete('page');
    setSearchParams(nextParams);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', newPage.toString());
    setSearchParams(nextParams);
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const handleAdd = (p) => {
    addToCart(p, 1);
    setToastMsg(`Added "${p.name}" to cart.`);
    setTimeout(() => setToastMsg(''), 3000);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-10">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#241914] text-[#f5ebe0] px-4 py-3 rounded-lg shadow-lg flex items-center gap-2.5 text-xs font-medium">
          <CheckCircle2 size={16} strokeWidth={1.75} className="text-[#e6a68a] flex-shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-6">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight size={14} strokeWidth={1.75} />
        <span className="text-on-surface font-medium">Catalog &amp; Ecosystem</span>
      </div>

      {/* Page Title & Sort Selector */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-6 border-b border-outline-variant/25">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
            FANFUN Microclimate Ecosystem
          </h1>
          <p className="text-sm text-on-surface-variant mt-1.5">
            Explore 3-in-1 smart ceiling fans, replacement HEPA filters, and genuine IoT accessories.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs text-on-surface-variant font-medium">Sort by:</span>
          <select
            value={currentSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-3.5 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-xs font-medium text-on-surface focus:outline-none focus:border-primary"
          >
            <option value="">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Horizontal Category Filter Strip (Mobile / Tablet) */}
      <div className="flex lg:hidden items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-outline-variant/20">
        {categories.map((cat) => {
          const isActive = currentCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryChange(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 cursor-pointer border ${
                isActive
                  ? 'bg-primary text-on-primary border-primary'
                  : 'bg-surface-container-low border-outline-variant/25 text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[11px] font-mono ${isActive ? 'opacity-80' : 'opacity-60'}`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Sidebar + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-10">
        {/* Category Sidebar (Desktop) */}
        <aside className="hidden lg:block lg:col-span-1 space-y-8">
          <div>
            <div className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-[0.12em] mb-3 px-2">
              Categories
            </div>

            <nav className="flex flex-col space-y-1">
              {categories.map((cat) => {
                const isActive = currentCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-colors text-left cursor-pointer ${
                      isActive
                        ? 'bg-surface-container text-primary font-semibold'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low font-medium'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] opacity-60 font-mono">{cat.count}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Technical Support Note */}
          <div className="pt-6 border-t border-outline-variant/25 px-2 space-y-2.5">
            <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
              <Headphones size={15} strokeWidth={1.75} />
              <span>Free Ceiling Survey</span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Unsure which model fits your ceiling height and room size? Contact our engineers for a complimentary on-site survey.
            </p>
            <a
              href="tel:0918074079"
              className="pt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              <span>Call 091 8074079</span>
              <ArrowRight size={14} strokeWidth={1.75} />
            </a>
          </div>
        </aside>

        {/* Products Grid & Pagination */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="py-20 text-center text-on-surface-variant text-sm font-medium">
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 text-center border border-outline-variant/25 rounded-xl p-8 bg-surface-container-low/40">
              <SearchX size={40} strokeWidth={1.5} className="text-outline mx-auto mb-3" />
              <h4 className="text-base font-semibold text-on-surface">No matching products found</h4>
              <p className="text-xs text-on-surface-variant mt-1 mb-5">
                Please try another keyword or reset the category filter.
              </p>
              <button
                type="button"
                onClick={() => setSearchParams({})}
                className="px-5 py-2.5 rounded-lg bg-primary text-on-primary text-xs font-semibold cursor-pointer hover:bg-primary-container transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAdd={handleAdd}
                    showDescription
                    showRating
                    showDetailsButton
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pt-8 mt-10 border-t border-outline-variant/25 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-on-surface-variant">
                    Showing <span className="font-semibold text-on-surface">{(currentPage - 1) * limit + 1}</span>–
                    <span className="font-semibold text-on-surface">{Math.min(currentPage * limit, totalProducts)}</span> of{' '}
                    <span className="font-semibold text-on-surface">{totalProducts}</span> products
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage <= 1}
                      className="h-9 px-3 rounded-lg border border-outline-variant/35 text-xs font-medium text-on-surface hover:bg-surface-container-low disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft size={14} strokeWidth={1.75} />
                      <span className="hidden sm:inline">Prev</span>
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => {
                        const isActive = pg === currentPage;
                        return (
                          <button
                            key={pg}
                            type="button"
                            onClick={() => handlePageChange(pg)}
                            className={`w-9 h-9 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                              isActive
                                ? 'bg-primary text-on-primary'
                                : 'hover:bg-surface-container-low text-on-surface-variant hover:text-on-surface border border-outline-variant/25'
                            }`}
                          >
                            {pg}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= totalPages}
                      className="h-9 px-3 rounded-lg border border-outline-variant/35 text-xs font-medium text-on-surface hover:bg-surface-container-low disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight size={14} strokeWidth={1.75} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
