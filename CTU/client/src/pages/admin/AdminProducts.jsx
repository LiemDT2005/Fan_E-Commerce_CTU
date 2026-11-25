import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  Plus,
  Sliders,
  Package,
  Store,
  Warehouse,
  Star,
  Search,
  Pencil,
  Trash2,
} from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 10;
  const navigate = useNavigate();

  const fetchProducts = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory) params.set('category', selectedCategory);
    params.set('page', page);
    params.set('limit', limit);

    fetch(`/api/products?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProducts(data.data);
          setTotalProducts(data.total || data.count || data.data.length);
          setTotalPages(data.totalPages || Math.ceil((data.total || data.data.length) / limit) || 1);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [page, selectedCategory]);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCategories([{ id: '', name: 'All Categories' }, ...data.data]);
        }
      });
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  const handleToggleStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === 'active' ? 'draft' : 'active';
    fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: nextStatus })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProducts(prev => prev.map(p => p.id === id ? { ...p, status: nextStatus } : p));
        }
      });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to permanently delete "${name}"?`)) {
      fetch(`/api/products/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setProducts(prev => prev.filter(p => p.id !== id));
          }
        });
    }
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto w-full">
      {/* Top Breadcrumb & Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
          <Link to="/admin" className="hover:text-primary transition-colors">Dashboard</Link>
          <ChevronRight size={13} strokeWidth={1.75} />
          <span>Inventory &amp; Equipment</span>
          <ChevronRight size={13} strokeWidth={1.75} />
          <span className="text-primary font-semibold">Products Management</span>
          <span className="mx-1 text-outline-variant/60">/</span>
          <span className="font-mono text-[10px] text-outline uppercase tracking-wider">CAT-SKU-SYS-2026</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container text-xs text-on-surface-variant">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
            <span>Server Sync: Active</span>
          </div>
          <button
            type="button"
            onClick={fetchProducts}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-medium text-on-surface transition-colors"
          >
            <RefreshCw size={13} strokeWidth={1.75} />
            <span>ERP Sync</span>
          </button>
        </div>
      </div>

      {/* Page Header & Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
        <div className="flex flex-col gap-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-[0.12em] text-primary font-semibold">FANFUN Smart Equipment Catalog</span>
            <span className="w-4 h-px bg-outline-variant/40"></span>
            <span className="text-xs text-on-surface-variant">Microclimate Ecosystem</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">Products Management</h1>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Manage 3-in-1 smart ceiling fans, replacement HEPA filters, and genuine FANFUN microclimate accessories nationwide.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold transition-colors"
          >
            <Plus size={15} strokeWidth={1.75} />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Quick KPI Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/25 flex items-start justify-between">
          <div>
            <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">Total Products</span>
            <div className="text-xl sm:text-2xl font-bold text-on-surface mt-1">{products.length}</div>
            <span className="text-[11px] text-primary flex items-center gap-1 mt-1 font-medium">
              <Sliders size={12} strokeWidth={1.75} /> 4 Main Groups
            </span>
          </div>
          <Package size={20} strokeWidth={1.75} className="text-primary mt-0.5 flex-shrink-0" />
        </div>

        <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/25 flex items-start justify-between">
          <div>
            <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">Active Listing</span>
            <div className="text-xl sm:text-2xl font-bold text-on-surface mt-1">
              {products.filter(p => p.status === 'active').length}
            </div>
            <span className="text-[11px] text-emerald-800 font-medium flex items-center gap-1 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Live on Storefront
            </span>
          </div>
          <Store size={20} strokeWidth={1.75} className="text-emerald-800 mt-0.5 flex-shrink-0" />
        </div>

        <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/25 flex items-start justify-between">
          <div>
            <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">Available Stock</span>
            <div className="text-xl sm:text-2xl font-bold text-on-surface mt-1">
              {products.reduce((acc, p) => acc + (p.stock || 0), 0)}
            </div>
            <span className="text-[11px] text-on-surface-variant mt-1 block">Hanoi &amp; HCMC Hubs</span>
          </div>
          <Warehouse size={20} strokeWidth={1.75} className="text-on-surface-variant mt-0.5 flex-shrink-0" />
        </div>

        <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/25 flex items-start justify-between">
          <div>
            <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">Average Rating</span>
            <div className="text-xl sm:text-2xl font-bold text-amber-700 mt-1">4.9 ★</div>
            <span className="text-[11px] text-on-surface-variant mt-1 block">From 500+ reviews</span>
          </div>
          <Star size={20} strokeWidth={1.75} className="text-amber-600 fill-amber-600 mt-0.5 flex-shrink-0" />
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/25 flex flex-col sm:flex-row items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
          <Search size={15} strokeWidth={1.75} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or SKU..."
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-container-lowest border border-outline-variant/35 text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
          />
        </form>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/35 text-xs font-medium text-on-surface focus:outline-none focus:border-primary"
          >
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="p-5 sm:p-6 rounded-xl bg-surface-container-low border border-outline-variant/25 overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs font-medium text-on-surface-variant">Loading product inventory...</div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <Package size={36} strokeWidth={1.5} className="text-outline mx-auto mb-2" />
            <p className="text-xs text-on-surface-variant">No products found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container text-on-surface-variant uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="p-3 rounded-l-lg">Product</th>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 rounded-r-lg text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/15">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-surface-container/40 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-11 h-11 rounded-lg object-cover border border-outline-variant/25 flex-shrink-0" />
                        <div>
                          <strong className="block text-on-surface font-semibold line-clamp-1">{p.name}</strong>
                          <span className="text-[11px] text-on-surface-variant">{p.rating} ★ ({p.reviewCount} reviews)</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 font-mono text-[11px] font-semibold text-primary">{p.sku}</td>
                    <td className="p-3 text-on-surface-variant font-medium">{p.categoryName}</td>
                    <td className="p-3">
                      <strong className="text-on-surface font-semibold">{p.price.toLocaleString('en-US')} VND</strong>
                      {p.originalPrice > p.price && (
                        <span className="text-[10px] text-on-surface-variant/70 line-through block">
                          {p.originalPrice.toLocaleString('en-US')} VND
                        </span>
                      )}
                    </td>
                    <td className="p-3 font-medium text-on-surface">{p.stock} units</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleToggleStatus(p.id, p.status)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-colors cursor-pointer ${
                          p.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                        }`}
                      >
                        {p.status === 'active' ? '● Active' : '○ Inactive'}
                      </button>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/admin/products/${p.id}/edit`}
                          className="p-1.5 rounded-md text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
                          title="Edit product"
                        >
                          <Pencil size={15} strokeWidth={1.75} />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-1.5 rounded-md text-on-surface-variant hover:text-error hover:bg-error-container/20 transition-colors cursor-pointer"
                          title="Delete product"
                        >
                          <Trash2 size={15} strokeWidth={1.75} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-4 mt-3 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-on-surface-variant">
                  Showing <span className="font-semibold text-on-surface">{(page - 1) * limit + 1}</span>–
                  <span className="font-semibold text-on-surface">{Math.min(page * limit, totalProducts)}</span> of{' '}
                  <span className="font-semibold text-on-surface">{totalProducts}</span> products
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="h-8 px-2.5 rounded-lg border border-outline-variant/30 text-xs font-medium text-on-surface hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft size={13} strokeWidth={1.75} />
                    <span>Prev</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                      <button
                        key={pg}
                        onClick={() => setPage(pg)}
                        className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          pg === page
                            ? 'bg-primary text-on-primary'
                            : 'hover:bg-surface-container text-on-surface-variant border border-outline-variant/20'
                        }`}
                      >
                        {pg}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="h-8 px-2.5 rounded-lg border border-outline-variant/30 text-xs font-medium text-on-surface hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight size={13} strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
