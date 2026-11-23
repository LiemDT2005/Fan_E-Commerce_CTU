import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const fetchProducts = () => {
    setLoading(true);
    let url = '/api/products';
    const params = [];
    if (selectedCategory !== 'all') params.push(`category=${selectedCategory}`);
    if (searchTerm) params.push(`search=${encodeURIComponent(searchTerm)}`);
    if (params.length > 0) url += `?${params.join('&')}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.success) setProducts(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleToggleStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === 'active' ? 'inactive' : 'active';
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
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${name}" khỏi kho không?`)) {
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
        <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
          <Link to="/admin" className="hover:text-primary">Bảng điều khiển</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span>Kho hàng & Thiết bị</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary font-bold">Quản lý Sản phẩm</span>
          <span className="mx-2 text-outline-variant">/</span>
          <span className="font-mono text-[10px] text-outline uppercase tracking-wider">CAT-SKU-SYS-2026</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-xs text-on-surface-variant">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
            <span>Đồng bộ máy chủ: Vừa xong</span>
          </div>
          <button className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-variant text-xs font-semibold text-on-surface transition-all">
            <span className="material-symbols-outlined text-base">cloud_sync</span>
            <span>Đồng bộ ERP</span>
          </button>
        </div>
      </div>

      {/* Page Header & Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
        <div className="flex flex-col gap-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Kho Thiết Bị Thông Minh FANFUN</span>
            <span className="w-6 h-px bg-outline-variant"></span>
            <span className="text-xs text-on-surface-variant">Hệ Sinh Thái Vi Khí Hậu</span>
          </div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Quản lý Sản phẩm</h1>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Quản lý danh mục thiết bị quạt trần thông minh 3-in-1, lõi lọc định kỳ và các phụ kiện vi khí hậu chính hãng FANFUN trên toàn quốc.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-xl">add</span>
            <span>Thêm sản phẩm mới</span>
          </Link>
        </div>
      </div>

      {/* Quick KPI Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Tổng sản phẩm</span>
            <div className="text-2xl font-black text-on-surface mt-1">{products.length}</div>
            <span className="text-[11px] text-primary flex items-center gap-1 mt-1 font-semibold">
              <span className="material-symbols-outlined text-[14px]">tune</span> 4 phân nhóm chính
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl">inventory_2</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Đang mở bán</span>
            <div className="text-2xl font-black text-on-surface mt-1">
              {products.filter(p => p.status === 'active').length}
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Trực tuyến trên Storefront
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-emerald-700">
            <span className="material-symbols-outlined text-2xl">storefront</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Tồn kho khả dụng</span>
            <div className="text-2xl font-black text-on-surface mt-1">
              {products.reduce((acc, p) => acc + (p.stock || 0), 0)}
            </div>
            <span className="text-[11px] text-on-surface-variant mt-1 block">Kho Hà Nội & TP.HCM</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined text-2xl">warehouse</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Đánh giá trung bình</span>
            <div className="text-2xl font-black text-amber-600 mt-1">4.9 ★</div>
            <span className="text-[11px] text-on-surface-variant mt-1 block">Từ 500+ khách hàng thực tế</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl fill">star</span>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-96">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">search</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên sản phẩm hoặc mã SKU..."
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-surface-container-low text-xs text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </form>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Tất cả danh mục</option>
            <option value="quat-tran-thong-minh">Quạt trần 3-in-1</option>
            <option value="loi-loc-phu-kien">Lõi lọc & Phụ kiện</option>
            <option value="thiet-bi-dieu-khien">Điều khiển & IoT</option>
            <option value="dich-vu-ky-thuat">Dịch vụ kỹ thuật</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs font-semibold">Đang tải danh sách sản phẩm...</div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <span className="material-symbols-outlined text-4xl text-outline mb-2">inventory_2</span>
            <p className="text-xs text-on-surface-variant">Không tìm thấy sản phẩm nào.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low text-on-surface-variant uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Sản phẩm</th>
                  <th className="p-3.5">Mã SKU</th>
                  <th className="p-3.5">Phân nhóm</th>
                  <th className="p-3.5">Giá bán</th>
                  <th className="p-3.5">Kho</th>
                  <th className="p-3.5">Trạng thái</th>
                  <th className="p-3.5 rounded-r-xl text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover border border-outline-variant/30 flex-shrink-0" />
                        <div>
                          <strong className="block text-on-surface line-clamp-1">{p.name}</strong>
                          <span className="text-[11px] text-on-surface-variant">{p.rating} ★ ({p.reviewCount} đánh giá)</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 font-mono text-[11px] font-bold text-primary">{p.sku}</td>
                    <td className="p-3.5 text-on-surface-variant font-medium">{p.categoryName}</td>
                    <td className="p-3.5">
                      <strong className="text-on-surface">{p.price.toLocaleString('vi-VN')}đ</strong>
                      {p.originalPrice > p.price && (
                        <span className="text-[10px] text-on-surface-variant line-through block">
                          {p.originalPrice.toLocaleString('vi-VN')}đ
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 font-semibold text-on-surface">{p.stock} cái</td>
                    <td className="p-3.5">
                      <button
                        onClick={() => handleToggleStatus(p.id, p.status)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                          p.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                        }`}
                      >
                        {p.status === 'active' ? '● Mở bán' : '○ Tạm ẩn'}
                      </button>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/products/${p.id}/edit`}
                          className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
                          title="Chỉnh sửa sản phẩm"
                        >
                          <span className="material-symbols-outlined text-base">edit</span>
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/30 transition-colors"
                          title="Xóa sản phẩm"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
