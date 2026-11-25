import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function AdminProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sku: `FAN-${Date.now().toString().slice(-4)}`,
    name: '',
    category: 'smart-ceiling-fan',
    categoryName: '3-in-1 Smart Fans',
    price: 6990000,
    originalPrice: 7990000,
    badge: 'New Arrival',
    stock: 25,
    status: 'active',
    image: 'https://res.cloudinary.com/dpfy23tda/image/upload/v1795491622/fanfun_products/ff-apex-3in1.jpg',
    description: '',
    motor: 'BLDC Inverter 45W',
    heatingPower: 'Ceramic PTC 1500W',
    airflow: '14,200 m³/h',
    diameter: '1320 mm (52 inches)',
    roomArea: '20 - 35 m²',
    warranty: '5-Year Official Warranty'
  });

  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCategoriesList(data.data.filter(c => c.id !== 'all'));
        }
      })
      .catch(console.error);
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Maximum image size is 5MB');
      return;
    }

    setUploadingImage(true);
    const data = new FormData();
    data.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      });
      const result = await res.json();
      if (result.success && result.url) {
        setFormData(prev => ({ ...prev, image: result.url }));
      } else {
        alert(result.message || 'Failed to upload image');
      }
    } catch (err) {
      alert('Error uploading image: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

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
              category: p.category || 'smart-ceiling-fan',
              categoryName: p.categoryName || '3-in-1 Smart Fans',
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
          alert('Error saving product information.');
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
      <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
        <Link to="/admin" className="hover:text-primary transition-colors">Dashboard</Link>
        <ChevronRight size={13} strokeWidth={1.75} />
        <Link to="/admin/products" className="hover:text-primary transition-colors">Products</Link>
        <ChevronRight size={13} strokeWidth={1.75} />
        <span className="text-primary font-semibold">{isEdit ? 'Edit Product' : 'Add New Product'}</span>
      </div>

      <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
        <div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">
            {isEdit ? 'Edit Equipment Information' : 'Add New Microclimate Equipment'}
          </h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Specify technical parameters, imagery, and stock allocation for FANFUN catalog
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Card */}
        <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider pb-2 border-b border-outline-variant/20">
            1. General Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Product Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. FANFUN Horizon 3-in-1 Smart Ceiling Fan"
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">SKU Code *</label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs font-mono font-bold text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => {
                  const val = e.target.value;
                  const found = categoriesList.find(c => c.id === val);
                  setFormData({
                    ...formData,
                    category: val,
                    categoryName: found ? found.name : val
                  });
                }}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-semibold"
              >
                {categoriesList.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Retail Price (VND) *</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Original Price (VND)</label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Badge Label</label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="e.g. Best Seller, New Arrival"
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Inventory Stock</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Listing Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-semibold"
              >
                <option value="active">Active (Visible)</option>
                <option value="inactive">Inactive (Hidden)</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-bold text-on-surface-variant mb-1">
                Product Image (Cloudinary & URL)
              </label>
              
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-2">
                {formData.image && (
                  <div className="w-16 h-16 rounded-xl border border-outline-variant/30 overflow-hidden bg-surface-container flex-shrink-0">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                
                <div className="flex-1 w-full space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition shadow-sm">
                      <span>{uploadingImage ? '⏳ Uploading to Cloudinary...' : '☁️ Upload Local Image'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>
                    <span className="text-[11px] text-on-surface-variant/70">
                      Up to 5MB (.jpg, .png, .webp)
                    </span>
                  </div>

                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Or paste direct image URL here..."
                    className="w-full h-10 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Product Description</label>
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
            2. Technical Specifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Motor Type</label>
              <input
                type="text"
                value={formData.motor}
                onChange={(e) => setFormData({ ...formData, motor: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Heating Power</label>
              <input
                type="text"
                value={formData.heatingPower}
                onChange={(e) => setFormData({ ...formData, heatingPower: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Airflow Output</label>
              <input
                type="text"
                value={formData.airflow}
                onChange={(e) => setFormData({ ...formData, airflow: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Blade Diameter</label>
              <input
                type="text"
                value={formData.diameter}
                onChange={(e) => setFormData({ ...formData, diameter: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Room Area Suitability</label>
              <input
                type="text"
                value={formData.roomArea}
                onChange={(e) => setFormData({ ...formData, roomArea: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Warranty Policy</label>
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
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 rounded-xl bg-primary hover:bg-primary-container disabled:opacity-50 text-on-primary text-xs font-bold shadow-md transition-all"
          >
            {submitting ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
