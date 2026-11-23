import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.success) setCategories(data.data.filter(c => c.id !== 'all'));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <span>Cấu Trúc Hệ Sinh Thái</span>
            <span className="w-4 h-px bg-outline-variant"></span>
            <span className="text-on-surface-variant">Phân cấp thiết bị</span>
          </div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Quản lý Danh mục</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((c) => (
          <div key={c.id} className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">{c.icon || 'folder'}</span>
              </div>
              <h3 className="font-bold text-base text-on-surface">{c.name}</h3>
              <p className="text-xs text-on-surface-variant mt-1">Mã định danh: <span className="font-mono text-primary">{c.id}</span></p>
            </div>

            <div className="pt-4 mt-6 border-t border-outline-variant/20 flex items-center justify-between">
              <span className="text-xs font-semibold text-on-surface-variant">{c.count} sản phẩm đang mở bán</span>
              <Link to={`/admin/products?category=${c.id}`} className="text-xs font-bold text-primary hover:underline">
                Xem thiết bị →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
