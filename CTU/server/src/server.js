const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
let { products, categories, orders, customers, vouchers } = require('./db/data');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// === PRODUCTS API ===
app.get('/api/products', (req, res) => {
  const { category, search, sort } = req.query;
  let result = [...products];

  if (category && category !== 'all') {
    result = result.filter(p => p.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.sku.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q)
    );
  }

  if (sort === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  }

  res.json({ success: true, count: result.length, data: result });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
  }
  res.json({ success: true, data: product });
});

app.post('/api/products', (req, res) => {
  const newProduct = {
    id: req.body.id || `ff-${Date.now()}`,
    sku: req.body.sku || `FAN-${Date.now().toString().slice(-4)}`,
    name: req.body.name,
    category: req.body.category || 'quat-tran-thong-minh',
    categoryName: req.body.categoryName || 'Quạt trần 3-in-1',
    price: Number(req.body.price) || 0,
    originalPrice: Number(req.body.originalPrice) || Number(req.body.price) || 0,
    badge: req.body.badge || 'Mới',
    rating: 5.0,
    reviewCount: 0,
    stock: Number(req.body.stock) || 10,
    status: req.body.status || 'active',
    image: req.body.image || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef',
    description: req.body.description || '',
    features: req.body.features || [],
    specs: req.body.specs || {}
  };
  products.unshift(newProduct);
  res.status(201).json({ success: true, data: newProduct });
});

app.put('/api/products/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
  }
  products[idx] = { ...products[idx], ...req.body };
  res.json({ success: true, data: products[idx] });
});

app.delete('/api/products/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
  }
  const deleted = products.splice(idx, 1);
  res.json({ success: true, data: deleted[0] });
});

// === CATEGORIES API ===
app.get('/api/categories', (req, res) => {
  res.json({ success: true, data: categories });
});

// === ORDERS API ===
app.get('/api/orders', (req, res) => {
  const { status, search } = req.query;
  let result = [...orders];

  if (status && status !== 'all') {
    result = result.filter(o => o.status === status);
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(o => 
      o.id.toLowerCase().includes(q) || 
      o.customerName.toLowerCase().includes(q) || 
      o.customerPhone.includes(q)
    );
  }

  res.json({ success: true, count: result.length, data: result });
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
  }
  res.json({ success: true, data: order });
});

app.post('/api/orders', (req, res) => {
  const newOrder = {
    id: `FF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName: req.body.customerName || 'Khách hàng',
    customerPhone: req.body.customerPhone || '',
    customerEmail: req.body.customerEmail || '',
    address: req.body.address || '',
    status: 'pending',
    statusText: 'Chờ xác nhận & điều phối khảo sát',
    paymentMethod: req.body.paymentMethod || 'cod',
    paymentStatus: req.body.paymentMethod === 'cod' ? 'unpaid' : 'paid',
    createdAt: new Date().toISOString(),
    scheduledDate: req.body.scheduledDate || 'Trong 24-48 giờ tới',
    scheduledSlot: req.body.scheduledSlot || 'Giờ hành chính',
    technician: 'Chờ phân bổ kỹ thuật viên',
    note: req.body.note || '',
    items: req.body.items || [],
    subtotal: req.body.subtotal || 0,
    discount: req.body.discount || 0,
    voucherCode: req.body.voucherCode || '',
    shippingFee: 0,
    total: req.body.total || 0
  };

  orders.unshift(newOrder);
  res.status(201).json({ success: true, data: newOrder });
});

app.put('/api/orders/:id/status', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
  }
  const { status, statusText, technician } = req.body;
  if (status) order.status = status;
  if (statusText) order.statusText = statusText;
  if (technician) order.technician = technician;
  res.json({ success: true, data: order });
});

// === VOUCHERS API ===
app.get('/api/vouchers', (req, res) => {
  res.json({ success: true, data: vouchers });
});

app.post('/api/vouchers/apply', (req, res) => {
  const { code, subtotal } = req.body;
  const voucher = vouchers.find(v => v.code.toUpperCase() === (code || '').toUpperCase() && v.status === 'active');
  if (!voucher) {
    return res.status(400).json({ success: false, message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn.' });
  }
  if (subtotal < voucher.minOrderValue) {
    return res.status(400).json({ 
      success: false, 
      message: `Đơn hàng tối thiểu cần đạt ${voucher.minOrderValue.toLocaleString('vi-VN')}đ để áp dụng voucher này.` 
    });
  }
  res.json({
    success: true,
    data: {
      code: voucher.code,
      title: voucher.title,
      discountAmount: voucher.discountAmount
    }
  });
});

// === CUSTOMERS API ===
app.get('/api/customers', (req, res) => {
  res.json({ success: true, data: customers });
});

// === STATS API FOR ADMIN ===
app.get('/api/stats', (req, res) => {
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrders = orders.length;
  const activeProducts = products.filter(p => p.status === 'active').length;
  const totalCustomers = customers.length;

  res.json({
    success: true,
    data: {
      totalRevenue,
      totalOrders,
      activeProducts,
      totalCustomers,
      pendingOrders: orders.filter(o => o.status === 'pending' || o.status === 'processing').length,
      completedOrders: orders.filter(o => o.status === 'completed').length
    }
  });
});

app.listen(PORT, () => {
  console.log(`>>> FANFUN Server is running at http://localhost:${PORT}`);
});
