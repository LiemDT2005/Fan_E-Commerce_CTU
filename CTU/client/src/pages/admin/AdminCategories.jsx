import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Layers, Pencil, Trash2, ArrowRight, X } from 'lucide-react';

const POPULAR_ICONS = [
  { label: 'Fan', icon: 'mode_fan' },
  { label: 'Slim', icon: 'toys_fan' },
  { label: 'Bedroom', icon: 'bed' },
  { label: 'Commercial', icon: 'apartment' },
  { label: 'Filter', icon: 'filter_alt' },
  { label: 'IoT / Sensor', icon: 'sensors' },
  { label: 'Parts', icon: 'hardware' },
  { label: 'Service', icon: 'home_repair_service' },
  { label: 'Thermostat', icon: 'device_thermostat' },
  { label: 'Lighting', icon: 'lightbulb' }
];

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    icon: 'mode_fan'
  });
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState('');

  const fetchCategories = () => {
    setLoading(true);
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // exclude 'all' for admin management cards
          setCategories(data.data.filter(c => c.id !== 'all'));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setModalMode('create');
    setEditingId(null);
    setFormData({ id: '', name: '', icon: 'mode_fan' });
    setModalError('');
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setModalMode('edit');
    setEditingId(cat.id);
    setFormData({ id: cat.id, name: cat.name, icon: cat.icon || 'mode_fan' });
    setModalError('');
    setIsModalOpen(true);
  };

  const handleNameChange = (val) => {
    const updated = { ...formData, name: val };
    if (modalMode === 'create' && (!formData.id || formData.id === slugify(formData.name))) {
      updated.id = slugify(val);
    }
    setFormData(updated);
  };

  const slugify = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setModalError('');

    try {
      if (modalMode === 'create') {
        const res = await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message || 'Failed to create category');
      } else {
        const res = await fetch(`/api/categories/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: formData.name, icon: formData.icon })
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message || 'Failed to update category');
      }

      setIsModalOpen(false);
      fetchCategories();
    } catch (err) {
      setModalError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name, count) => {
    if (count > 0) {
      const confirmMsg = `Category "${name}" currently has ${count} associated product(s). Are you sure you want to delete it?`;
      if (!window.confirm(confirmMsg)) return;
    } else {
      if (!window.confirm(`Delete category "${name}"?`)) return;
    }

    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Failed to delete category');
      fetchCategories();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto w-full">
      {/* Header & Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <span>Ecosystem Architecture</span>
            <span className="w-4 h-px bg-outline-variant"></span>
            <span className="text-on-surface-variant">Equipment Classification</span>
          </div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Categories Management</h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Configure product classifications, icons, and navigational structure across storefront.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Plus size={15} strokeWidth={1.75} />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      {loading ? (
        <div className="py-24 text-center text-xs font-semibold text-on-surface-variant">
          Loading categories...
        </div>
      ) : categories.length === 0 ? (
        <div className="py-20 text-center p-8 rounded-xl bg-surface-container-low border border-outline-variant/25">
          <Layers size={36} strokeWidth={1.5} className="text-outline mx-auto mb-2" />
          <p className="text-xs text-on-surface-variant">No categories found. Click "Add New Category" to create one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/25 flex flex-col justify-between transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="material-symbols-outlined text-xl text-primary">{c.icon || 'category'}</span>
                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEditModal(c)}
                      title="Edit Category"
                      className="p-1 rounded-md text-on-surface-variant hover:text-primary hover:bg-surface-container flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Pencil size={14} strokeWidth={1.75} />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id, c.name, c.count)}
                      title="Delete Category"
                      className="p-1 rounded-md text-on-surface-variant hover:text-error hover:bg-error/10 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} strokeWidth={1.75} />
                    </button>
                  </div>
                </div>

                <h3 className="font-semibold text-sm text-on-surface leading-tight">{c.name}</h3>
                <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-1">
                  <span>Slug:</span>
                  <span className="font-mono text-primary font-medium">{c.id}</span>
                </p>
              </div>

              <div className="pt-3.5 mt-5 border-t border-outline-variant/20 flex items-center justify-between">
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant">
                  {c.count} product{c.count !== 1 ? 's' : ''}
                </span>
                <Link
                  to={`/admin/products?category=${c.id}`}
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                >
                  <span>View items</span>
                  <ArrowRight size={13} strokeWidth={1.75} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Create or Edit Category */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <h2 className="text-lg font-bold text-on-surface">
                {modalMode === 'create' ? 'Create New Category' : 'Edit Category'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-7 h-7 rounded-md text-on-surface-variant hover:bg-surface-container flex items-center justify-center cursor-pointer"
              >
                <X size={16} strokeWidth={1.75} />
              </button>
            </div>

            {modalError && (
              <div className="p-3 rounded-xl bg-error/10 border border-error/20 text-error text-xs font-semibold">
                {modalError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Nordic Slim Ceiling Fans"
                  className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">
                  Slug / ID *
                </label>
                <input
                  type="text"
                  required
                  disabled={modalMode === 'edit'}
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: slugify(e.target.value) })}
                  placeholder="e.g. nordic-slim-fans"
                  className={`w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs font-mono text-on-surface focus:outline-none focus:ring-2 focus:ring-primary ${
                    modalMode === 'edit' ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                />
                <p className="text-[10px] text-on-surface-variant mt-1">Used in URL query parameters and product filtering.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">
                  Material Symbol Icon
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-xl">{formData.icon || 'category'}</span>
                  </div>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value.trim() })}
                    placeholder="mode_fan"
                    className="flex-1 h-10 px-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs font-mono text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="text-[11px] font-semibold text-on-surface-variant mb-1.5">Quick Presets:</div>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_ICONS.map((item) => (
                    <button
                      key={item.icon}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon: item.icon })}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 border transition-all ${
                        formData.icon === item.icon
                          ? 'bg-primary text-on-primary border-primary'
                          : 'bg-surface-container hover:bg-surface-container-high border-outline-variant/20 text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xs">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-outline-variant/30 text-xs font-bold text-on-surface hover:bg-surface-container"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold shadow-sm transition-all disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : modalMode === 'create' ? 'Create Category' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
