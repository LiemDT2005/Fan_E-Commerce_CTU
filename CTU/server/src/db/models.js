const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  sku: { type: String, default: '' },
  name: { type: String, required: true },
  category: { type: String, default: 'smart-ceiling-fan' },
  categoryName: { type: String, default: '3-in-1 Smart Fans' },
  price: { type: Number, default: 0 },
  originalPrice: { type: Number, default: 0 },
  badge: { type: String, default: 'New' },
  rating: { type: Number, default: 5.0 },
  reviewCount: { type: Number, default: 0 },
  stock: { type: Number, default: 10 },
  status: { type: String, default: 'active' },
  image: { type: String, default: '' },
  description: { type: String, default: '' },
  features: { type: [String], default: [] },
  specs: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { timestamps: true });

const CategorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  icon: { type: String, default: 'category' },
  count: { type: Number, default: 0 }
});

const OrderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  orderCode: { type: Number, unique: true, sparse: true },
  customerName: { type: String, required: true },
  customerPhone: { type: String, default: '' },
  customerEmail: { type: String, default: '' },
  address: { type: String, default: '' },
  status: { type: String, default: 'pending' },
  statusText: { type: String, default: 'Pending confirmation & survey dispatch' },
  paymentMethod: { type: String, default: 'cod' },
  paymentStatus: { type: String, default: 'unpaid' },
  checkoutUrl: { type: String, default: '' },
  createdAt: { type: String, default: () => new Date().toISOString() },
  scheduledDate: { type: String, default: 'Within 24-48 business hours' },
  scheduledSlot: { type: String, default: 'Business hours' },
  technician: { type: String, default: 'Awaiting technician assignment' },
  note: { type: String, default: '' },
  items: { type: Array, default: [] },
  subtotal: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  voucherCode: { type: String, default: '' },
  shippingFee: { type: Number, default: 0 },
  total: { type: Number, default: 0 }
}, { timestamps: true });

const CustomerSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  tier: { type: String, default: 'Member' },
  totalOrders: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  city: { type: String, default: '' },
  createdAt: { type: String, default: () => new Date().toISOString().split('T')[0] }
});

const VoucherSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  discountAmount: { type: Number, default: 0 },
  minOrderValue: { type: Number, default: 0 },
  expiryDate: { type: String, default: '31/12/2026' },
  usageLimit: { type: Number, default: 100 },
  usedCount: { type: Number, default: 0 },
  status: { type: String, default: 'active' }
});

module.exports = {
  Product: mongoose.model('Product', ProductSchema),
  Category: mongoose.model('Category', CategorySchema),
  Order: mongoose.model('Order', OrderSchema),
  Customer: mongoose.model('Customer', CustomerSchema),
  Voucher: mongoose.model('Voucher', VoucherSchema)
};
