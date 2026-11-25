import React, { useState, useEffect } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  Ticket,
  Calendar,
  Layers,
  X,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

const INITIAL_FORM = {
  code: '',
  title: '',
  discountAmount: '',
  minOrderValue: '',
  expiryDate: '31/12/2026',
  usageLimit: 100,
  status: 'active'
};

export default function AdminVouchers() {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchVouchers = () => {
    setLoading(true);
    fetch('/api/vouchers')
      .then(r => r.json())
      .then(d => {
        if (d.success) setVouchers(d.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const openCreateModal = () => {
    setModalMode('create');
    setFormData(INITIAL_FORM);
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const openEditModal = (v) => {
    setModalMode('edit');
    setFormData({
      code: v.code,
      title: v.title,
      discountAmount: v.discountAmount,
      minOrderValue: v.minOrderValue,
      expiryDate: v.expiryDate || '31/12/2026',
      usageLimit: v.usageLimit || 100,
      status: v.status || 'active'
    });
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      const isCreate = modalMode === 'create';
      const url = isCreate ? '/api/vouchers' : `/api/vouchers/${formData.code}`;
      const method = isCreate ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          discountAmount: Number(formData.discountAmount) || 0,
          minOrderValue: Number(formData.minOrderValue) || 0,
          usageLimit: Number(formData.usageLimit) || 100,
        })
      });

      const data = await res.json();
      setSubmitting(false);

      if (data.success) {
        setIsModalOpen(false);
        setSuccessMsg(isCreate ? `Tạo mã voucher "${data.data.code}" thành công!` : `Cập nhật voucher "${data.data.code}" thành công!`);
        setTimeout(() => setSuccessMsg(''), 4000);
        fetchVouchers();
      } else {
        setErrorMsg(data.message || 'Lỗi khi lưu voucher.');
      }
    } catch (err) {
      setSubmitting(false);
      setErrorMsg('Lỗi kết nối máy chủ.');
    }
  };

  const handleDelete = async (code) => {
    if (!window.confirm(`Bạn có chắc muốn xóa mã voucher "${code}" không?`)) return;

    try {
      const res = await fetch(`/api/vouchers/${code}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg(`Đã xóa voucher "${code}" thành công!`);
        setTimeout(() => setSuccessMsg(''), 4000);
        setVouchers(prev => prev.filter(v => v.code !== code));
      } else {
        alert(data.message || 'Lỗi khi xóa voucher.');
      }
    } catch (err) {
      alert('Lỗi kết nối khi xóa voucher.');
    }
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto w-full">
      {/* Header and Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-[0.12em] mb-1">
            <span>Marketing &amp; Promotional Policy</span>
            <span className="w-4 h-px bg-outline-variant/40"></span>
            <span className="text-on-surface-variant">Discounts &amp; Vouchers</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">Vouchers &amp; Promos Management</h1>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus size={15} strokeWidth={1.75} />
          <span>Thêm Voucher mới</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 size={16} strokeWidth={1.75} />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Grid of Vouchers */}
      {loading ? (
        <div className="py-20 text-center text-xs font-medium text-on-surface-variant">Đang tải danh sách voucher...</div>
      ) : vouchers.length === 0 ? (
        <div className="py-20 text-center p-8 rounded-xl bg-surface-container-low border border-outline-variant/25">
          <Ticket size={36} strokeWidth={1.5} className="text-outline mx-auto mb-2" />
          <p className="text-xs text-on-surface-variant">Chưa có voucher nào. Bấm "Thêm Voucher mới" để tạo mã khuyến mãi.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vouchers.map((v) => (
            <div
              key={v.code}
              className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/25 flex flex-col justify-between transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 mb-3">
                  <div className="flex items-center gap-2">
                    <Ticket size={16} strokeWidth={1.75} className="text-primary" />
                    <span className="font-mono text-base font-bold text-primary tracking-wider">{v.code}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                      v.status === 'active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}>
                      {v.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => openEditModal(v)}
                        title="Sửa voucher"
                        className="p-1 rounded-md text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
                      >
                        <Pencil size={14} strokeWidth={1.75} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(v.code)}
                        title="Xóa voucher"
                        className="p-1 rounded-md text-on-surface-variant hover:text-error hover:bg-error-container/20 transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} strokeWidth={1.75} />
                      </button>
                    </div>
                  </div>
                </div>

                <h3 className="font-semibold text-sm text-on-surface leading-snug">{v.title}</h3>

                <div className="text-xl font-bold text-primary my-2">
                  -{v.discountAmount.toLocaleString('en-US')} VND
                </div>

                <p className="text-xs text-on-surface-variant">
                  Đơn tối thiểu: <strong className="text-on-surface font-semibold">{v.minOrderValue.toLocaleString('en-US')} VND</strong>
                </p>
              </div>

              <div className="pt-3.5 mt-5 border-t border-outline-variant/20 flex items-center justify-between text-[11px] text-on-surface-variant">
                <span>Đã dùng: <strong className="text-on-surface font-semibold">{v.usedCount || 0} / {v.usageLimit}</strong></span>
                <span>HSD: <strong className="text-on-surface font-semibold">{v.expiryDate}</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Create/Edit Voucher */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl max-w-md w-full p-6 shadow-xl space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <h2 className="text-base font-bold text-on-surface">
                {modalMode === 'create' ? 'Tạo mã Voucher mới' : `Chỉnh sửa Voucher: ${formData.code}`}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-7 h-7 rounded-md text-on-surface-variant hover:bg-surface-container flex items-center justify-center cursor-pointer"
              >
                <X size={16} strokeWidth={1.75} />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-error text-xs font-semibold flex items-center gap-2">
                <AlertTriangle size={15} strokeWidth={1.75} />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-on-surface-variant mb-1">
                  Mã Voucher (Code) *
                </label>
                <input
                  type="text"
                  required
                  disabled={modalMode === 'edit'}
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. FANFUN2026, VIP100K"
                  className={`w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/35 text-xs font-mono font-semibold text-on-surface uppercase focus:outline-none focus:border-primary ${
                    modalMode === 'edit' ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-on-surface-variant mb-1">
                  Tên / Mô tả Voucher *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Giảm 200.000 VND cho đơn hàng từ 5 triệu"
                  className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/35 text-xs text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-on-surface-variant mb-1">
                    Số tiền giảm (VND) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="1000"
                    value={formData.discountAmount}
                    onChange={(e) => setFormData({ ...formData, discountAmount: e.target.value })}
                    placeholder="200000"
                    className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/35 text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-on-surface-variant mb-1">
                    Đơn tối thiểu (VND) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="1000"
                    value={formData.minOrderValue}
                    onChange={(e) => setFormData({ ...formData, minOrderValue: e.target.value })}
                    placeholder="5000000"
                    className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/35 text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-on-surface-variant mb-1">
                    Hạn sử dụng (HSD)
                  </label>
                  <input
                    type="text"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    placeholder="31/12/2026"
                    className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/35 text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-on-surface-variant mb-1">
                    Số lượt dùng tối đa
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                    placeholder="100"
                    className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/35 text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-on-surface-variant mb-1">
                  Trạng thái
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/35 text-xs text-on-surface focus:outline-none focus:border-primary"
                >
                  <option value="active">Active (Có hiệu lực)</option>
                  <option value="inactive">Inactive (Tạm khóa)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-medium text-on-surface transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? 'Đang lưu...' : modalMode === 'create' ? 'Tạo mới' : 'Cập nhật'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
