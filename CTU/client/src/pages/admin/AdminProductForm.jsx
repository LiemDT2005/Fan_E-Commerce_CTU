import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

export default function AdminProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sku: `FAN-${Date.now().toString().slice(-4)}`,
    name: '',
    category: 'quat-tran-thong-minh',
    categoryName: 'Quạt trần 3-in-1',
    price: 6990000,
    originalPrice: 7990000,
    badge: 'Mới ra mắt',
    stock: 25,
    status: 'active',
    image: 'https://lh3.googleusercontent.com/aida/ALJJyrAsiZaWI3R7fdCjyGjiRWTZQ1e93xWc9QEQ47Zoy5hlGrO487ZHGdDMX2aQ0wD7YzCYOCNLCFrqPdwQ0MLrStB0NPn5sMzLdCxDMm2Pk3lR-7tbMu82gpklcYK64RytVb-FuLsjBQWNBSKuaUWgCPkz476kJTVUy-zRk7Q0u5JIDP84IJAtan0RrqIA3D4tEt_nw_LetO36wFGsn5vQAcoedK_XrCLgOuw2GiKwd-Ve',
    description: '',
    motor: 'BLDC Không chổi than 45W',
    heatingPower: 'PTC 1500W',
    airflow: '14.200 m³/h',
    diameter: '1320 mm (52 inches)',
    roomArea: '20 - 35 m²',
    warranty: '5 năm động cơ chính hãng'
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetch(`/api/products/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            const p = data.data;
            setFormData({
              sku: p.sku || '',
              name: p.name || '',
              category: p.category || 'quat-tran-thong-minh',
              categoryName: p.categoryName || 'Quạt trần 3-in-1',
              price: p.price || 0,
              originalPrice: p.originalPrice || 0,
              badge: p.badge || '',
              stock: p.stock || 0,
              status: p.status || 'active',
              image: p.image || '',
              description: p.description || '',
              motor: p.specs?.motor || '',
              heatingPower: p.specs?.heatingPower || '',
              airflow: p.specs?.airflow || '',
              diameter: p.specs?.diameter || '',
              roomArea: p.specs?.roomArea || '',
              warranty: p.specs?.warranty || ''
            });
          }
        });
    }
  }, [id, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...formData,
      specs: {
        motor: formData.motor,
        heatingPower: formData.heatingPower,
        airflow: formData.airflow,
        diameter: formData.diameter,
        roomArea: formData.roomArea,
        warranty: formData.warranty
      }
    };

    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `/api/products/${id}` : '/api/products';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        setSubmitting(false);
        if (data.success) {
          navigate('/admin/products');
        } else {
          alert('Lỗi lưu thông tin sản phẩm.');
        }
      })
      .catch(err => {
        setSubmitting(false);
        console.error(err);
      });
  };

  return (
    <div className="max-w-[1000px] mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
        <Link to="/admin" className="hover:text-primary">Bảng điều khiển</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <Link to="/admin/products" className="hover:text-primary">Quản lý sản phẩm</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-primary font-bold">{isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</span>
      </div>

      <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
        <div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">
            {isEdit ? 'Chỉnh Sửa Thông Tin Thiết Bị' : 'Thêm Thiết Bị Vi Khí Hậu Mới'}
          </h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Nhập thông tin kỹ thuật, hình ảnh và phân bổ kho cho sản phẩm FANFUN
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Card */}
        <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider pb-2 border-b border-outline-variant/20">
            1. Thông tin chung
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Tên sản phẩm *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="VD: Quạt trần thông minh FANFUN Horizon 3-in-1"
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Mã SKU *</label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs font-mono font-bold text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Danh mục *</label>
              <select
                value={formData.category}
                onChange={(e) => {
                  const val = e.target.value;
                  let catName = 'Quạt trần 3-in-1';
                  if (val === 'loi-loc-phu-kien') catName = 'Lõi lọc & Phụ kiện';
                  if (val === 'thiet-bi-dieu-khien') catName = 'Điều khiển & IoT';
                  if (val === 'dich-vu-ky-thuat') catName = 'Dịch vụ kỹ thuật';
                  setFormData({ ...formData, category: val, categoryName: catName });
                }}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-semibold"
              >
                <option value="quat-tran-thong-minh">Quạt trần 3-in-1</option>
                <option value="loi-loc-phu-kien">Lõi lọc & Phụ kiện</option>
                <option value="thiet-bi-dieu-khien">Điều khiển & IoT</option>
                <option value="dich-vu-ky-thuat">Dịch vụ kỹ thuật</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Giá bán niêm yết (VNĐ) *</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Giá gốc chưa giảm (VNĐ)</label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Huy hiệu hiển thị</label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="VD: Bán chạy nhất, Mới ra mắt"
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Số lượng lưu kho</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Trạng thái mở bán</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-semibold"
              >
                <option value="active">Đang mở bán (Active)</option>
                <option value="inactive">Tạm ẩn (Inactive)</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Đường dẫn ảnh sản phẩm (URL)</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Mô tả sản phẩm</label>
              <textarea
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Specifications Card */}
        <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider pb-2 border-b border-outline-variant/20">
            2. Thông số kỹ thuật
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Động cơ</label>
              <input
                type="text"
                value={formData.motor}
                onChange={(e) => setFormData({ ...formData, motor: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Công suất sưởi</label>
              <input
                type="text"
                value={formData.heatingPower}
                onChange={(e) => setFormData({ ...formData, heatingPower: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Lưu lượng gió</label>
              <input
                type="text"
                value={formData.airflow}
                onChange={(e) => setFormData({ ...formData, airflow: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Đường kính cánh</label>
              <input
                type="text"
                value={formData.diameter}
                onChange={(e) => setFormData({ ...formData, diameter: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Diện tích phòng phù hợp</label>
              <input
                type="text"
                value={formData.roomArea}
                onChange={(e) => setFormData({ ...formData, roomArea: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Chính sách bảo hành</label>
              <input
                type="text"
                value={formData.warranty}
                onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Link
            to="/admin/products"
            className="px-6 py-3 rounded-xl bg-surface-container text-on-surface text-xs font-bold hover:bg-surface-container-high transition-colors"
          >
            Hủy bỏ
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 rounded-xl bg-primary hover:bg-primary-container disabled:opacity-50 text-on-primary text-xs font-bold shadow-md transition-all"
          >
            {submitting ? 'Đang lưu...' : 'Lưu sản phẩm vào hệ thống'}
          </button>
        </div>
      </form>
    </div>
  );
}
