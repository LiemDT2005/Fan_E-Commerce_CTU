require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const { Readable } = require('stream');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { PayOS } = require('@payos/node');

const { connectDB, isDBConnected } = require('./db/connection');
const { initPostgres, isPgConnected, getPool, formatProduct, formatOrder } = require('./db/postgres');
const { Product, Category, Order, Customer, Voucher } = require('./db/models');
let memoryData = require('./db/data');

const app = express();
const PORT = process.env.PORT || 5000;

// === PAYOS CONFIG ===
const payos = new PayOS({
  clientId: process.env.PAYOS_CLIENT_ID,
  apiKey: process.env.PAYOS_API_KEY,
  checksumKey: process.env.PAYOS_CHECKSUM_KEY
});

// === CLOUDINARY CONFIG ===
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dpfy23tda',
  api_key: process.env.CLOUDINARY_API_KEY || '953398772632599',
  api_secret: process.env.CLOUDINARY_API_SECRET || 't1DWOpDR-k9AOKH0W8xVDKsOVzY'
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// === ROOT & HEALTH CHECK ===
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'FANFUN Backend API is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  let dbType = 'in-memory';
  if (isPgConnected()) dbType = 'postgresql';
  else if (isDBConnected()) dbType = 'mongodb';

  res.json({
    status: 'ok',
    database: dbType,
    timestamp: new Date().toISOString()
  });
});

// === CLOUDINARY UPLOAD API ===
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please select a valid image file.' });
  }

  const uploadStream = cloudinary.uploader.upload_stream(
    {
      folder: 'fanfun_products',
      resource_type: 'auto'
    },
    (error, result) => {
      if (error) {
        console.error('Cloudinary upload error:', error);
        return res.status(500).json({ success: false, message: error.message });
      }
      res.json({
        success: true,
        url: result.secure_url,
        public_id: result.public_id
      });
    }
  );

  Readable.from(req.file.buffer).pipe(uploadStream);
});

// === PRODUCTS API ===
app.get('/api/products', async (req, res) => {
  try {
    const { category, search, sort, page, limit } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const isPaginated = !isNaN(pageNum) && pageNum > 0 && !isNaN(limitNum) && limitNum > 0;

    // 1. PostgreSQL
    if (isPgConnected()) {
      const pool = getPool();
      let conditions = [];
      let params = [];
      let idx = 1;

      if (category && category !== 'all') {
        conditions.push(`category = $${idx++}`);
        params.push(category);
      }
      if (search) {
        conditions.push(`(name ILIKE $${idx} OR sku ILIKE $${idx} OR description ILIKE $${idx})`);
        params.push(`%${search}%`);
        idx++;
      }

      let orderClause = 'ORDER BY created_at DESC';
      if (sort === 'price-asc') orderClause = 'ORDER BY price ASC';
      else if (sort === 'price-desc') orderClause = 'ORDER BY price DESC';
      else if (sort === 'rating') orderClause = 'ORDER BY rating DESC';

      const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
      
      // Get total count
      const countRes = await pool.query(`SELECT COUNT(*) as total FROM products ${where}`, params);
      const total = parseInt(countRes.rows[0]?.total || 0, 10);

      let paginationClause = '';
      let queryParams = [...params];
      if (isPaginated) {
        const offset = (pageNum - 1) * limitNum;
        paginationClause = `LIMIT $${idx++} OFFSET $${idx++}`;
        queryParams.push(limitNum, offset);
      }

      const { rows } = await pool.query(
        `SELECT * FROM products ${where} ${orderClause} ${paginationClause}`,
        queryParams
      );

      return res.json({
        success: true,
        total,
        page: isPaginated ? pageNum : 1,
        totalPages: isPaginated ? Math.ceil(total / limitNum) : 1,
        count: rows.length,
        data: rows.map(formatProduct)
      });
    }

    // 2. MongoDB
    if (isDBConnected()) {
      let query = {};
      if (category && category !== 'all') query.category = category;
      if (search) {
        const regex = new RegExp(search, 'i');
        query.$or = [{ name: regex }, { sku: regex }, { description: regex }];
      }
      let sortOptions = {};
      if (sort === 'price-asc') sortOptions.price = 1;
      else if (sort === 'price-desc') sortOptions.price = -1;
      else if (sort === 'rating') sortOptions.rating = -1;
      else sortOptions.createdAt = -1;

      const total = await Product.countDocuments(query);
      let queryBuilder = Product.find(query).sort(sortOptions);
      if (isPaginated) {
        queryBuilder = queryBuilder.skip((pageNum - 1) * limitNum).limit(limitNum);
      }
      const items = await queryBuilder;

      return res.json({
        success: true,
        total,
        page: isPaginated ? pageNum : 1,
        totalPages: isPaginated ? Math.ceil(total / limitNum) : 1,
        count: items.length,
        data: items
      });
    }

    // 3. In-memory fallback
    let result = [...memoryData.products];
    if (category && category !== 'all') result = result.filter(p => p.category === category);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);

    const total = result.length;
    let paginatedData = result;
    if (isPaginated) {
      const start = (pageNum - 1) * limitNum;
      paginatedData = result.slice(start, start + limitNum);
    }

    res.json({
      success: true,
      total,
      page: isPaginated ? pageNum : 1,
      totalPages: isPaginated ? Math.ceil(total / limitNum) : 1,
      count: paginatedData.length,
      data: paginatedData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    if (isPgConnected()) {
      const { rows } = await getPool().query('SELECT * FROM products WHERE id = $1', [req.params.id]);
      if (rows.length === 0) return res.status(404).json({ success: false, message: 'Product not found' });
      return res.json({ success: true, data: formatProduct(rows[0]) });
    }

    if (isDBConnected()) {
      const product = await Product.findOne({ id: req.params.id });
      if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
      return res.json({ success: true, data: product });
    }

    const product = memoryData.products.find(p => p.id === req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const newProductData = {
      id: req.body.id || `ff-${Date.now()}`,
      sku: req.body.sku || `FAN-${Date.now().toString().slice(-4)}`,
      name: req.body.name,
      category: req.body.category || 'smart-ceiling-fan',
      categoryName: req.body.categoryName || '3-in-1 Smart Fans',
      price: Number(req.body.price) || 0,
      originalPrice: Number(req.body.originalPrice) || Number(req.body.price) || 0,
      badge: req.body.badge || 'New',
      rating: 5.0,
      reviewCount: 0,
      stock: Number(req.body.stock) || 10,
      status: req.body.status || 'active',
      image: req.body.image || 'https://res.cloudinary.com/dpfy23tda/image/upload/v1795491622/fanfun_products/ff-apex-3in1.jpg',
      description: req.body.description || '',
      features: req.body.features || [],
      specs: req.body.specs || {}
    };

    if (isPgConnected()) {
      const query = `
        INSERT INTO products (id, sku, name, category, category_name, price, original_price, badge, rating, review_count, stock, status, image, description, features, specs)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        RETURNING *
      `;
      const { rows } = await getPool().query(query, [
        newProductData.id, newProductData.sku, newProductData.name, newProductData.category,
        newProductData.categoryName, newProductData.price, newProductData.originalPrice,
        newProductData.badge, newProductData.rating, newProductData.reviewCount,
        newProductData.stock, newProductData.status, newProductData.image,
        newProductData.description, JSON.stringify(newProductData.features), JSON.stringify(newProductData.specs)
      ]);
      return res.status(201).json({ success: true, data: formatProduct(rows[0]) });
    }

    if (isDBConnected()) {
      const created = await Product.create(newProductData);
      return res.status(201).json({ success: true, data: created });
    }

    memoryData.products.unshift(newProductData);
    res.status(201).json({ success: true, data: newProductData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    if (isPgConnected()) {
      const { rows: existing } = await getPool().query('SELECT * FROM products WHERE id = $1', [req.params.id]);
      if (existing.length === 0) return res.status(404).json({ success: false, message: 'Product not found' });

      const current = existing[0];
      const updated = {
        name: req.body.name !== undefined ? req.body.name : current.name,
        sku: req.body.sku !== undefined ? req.body.sku : current.sku,
        category: req.body.category !== undefined ? req.body.category : current.category,
        category_name: req.body.categoryName !== undefined ? req.body.categoryName : current.category_name,
        price: req.body.price !== undefined ? Number(req.body.price) : current.price,
        original_price: req.body.originalPrice !== undefined ? Number(req.body.originalPrice) : current.original_price,
        badge: req.body.badge !== undefined ? req.body.badge : current.badge,
        stock: req.body.stock !== undefined ? Number(req.body.stock) : current.stock,
        status: req.body.status !== undefined ? req.body.status : current.status,
        image: req.body.image !== undefined ? req.body.image : current.image,
        description: req.body.description !== undefined ? req.body.description : current.description,
        features: req.body.features !== undefined ? JSON.stringify(req.body.features) : current.features,
        specs: req.body.specs !== undefined ? JSON.stringify(req.body.specs) : current.specs
      };

      const query = `
        UPDATE products SET
          name = $1, sku = $2, category = $3, category_name = $4, price = $5, original_price = $6,
          badge = $7, stock = $8, status = $9, image = $10, description = $11, features = $12, specs = $13
        WHERE id = $14
        RETURNING *
      `;
      const { rows } = await getPool().query(query, [
        updated.name, updated.sku, updated.category, updated.category_name, updated.price,
        updated.original_price, updated.badge, updated.stock, updated.status, updated.image,
        updated.description, updated.features, updated.specs, req.params.id
      ]);
      return res.json({ success: true, data: formatProduct(rows[0]) });
    }

    if (isDBConnected()) {
      const updated = await Product.findOneAndUpdate({ id: req.params.id }, { $set: req.body }, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Product not found' });
      return res.json({ success: true, data: updated });
    }

    const idx = memoryData.products.findIndex(p => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Product not found' });
    memoryData.products[idx] = { ...memoryData.products[idx], ...req.body };
    res.json({ success: true, data: memoryData.products[idx] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    if (isPgConnected()) {
      const { rows } = await getPool().query('DELETE FROM products WHERE id = $1 RETURNING *', [req.params.id]);
      if (rows.length === 0) return res.status(404).json({ success: false, message: 'Product not found' });
      return res.json({ success: true, data: formatProduct(rows[0]) });
    }

    if (isDBConnected()) {
      const deleted = await Product.findOneAndDelete({ id: req.params.id });
      if (!deleted) return res.status(404).json({ success: false, message: 'Product not found' });
      return res.json({ success: true, data: deleted });
    }

    const idx = memoryData.products.findIndex(p => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Product not found' });
    const deleted = memoryData.products.splice(idx, 1);
    res.json({ success: true, data: deleted[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// === CATEGORIES API ===
app.get('/api/categories', async (req, res) => {
  try {
    if (isPgConnected()) {
      const pool = getPool();
      const { rows: cats } = await pool.query('SELECT * FROM categories ORDER BY name ASC');
      const { rows: prodRows } = await pool.query('SELECT category, COUNT(*) as count FROM products GROUP BY category');
      const { rows: totalRows } = await pool.query('SELECT COUNT(*) as total FROM products');

      const countMap = {};
      prodRows.forEach(r => { countMap[r.category] = parseInt(r.count, 10); });
      const totalCount = parseInt(totalRows[0]?.total || 0, 10);

      const computed = cats.map(c => ({
        id: c.id,
        name: c.name,
        icon: c.icon || 'category',
        count: countMap[c.id] || 0
      }));

      // Ensure 'all' is at the front
      const list = [
        { id: 'all', name: 'All Products', icon: 'apps', count: totalCount },
        ...computed.filter(c => c.id !== 'all')
      ];
      return res.json({ success: true, data: list });
    }

    if (isDBConnected()) {
      const cats = await Category.find();
      const totalCount = await Product.countDocuments();
      const computed = await Promise.all(cats.map(async (c) => {
        const count = await Product.countDocuments({ category: c.id });
        return {
          id: c.id,
          name: c.name,
          icon: c.icon || 'category',
          count
        };
      }));

      const list = [
        { id: 'all', name: 'All Products', icon: 'apps', count: totalCount },
        ...computed.filter(c => c.id !== 'all')
      ];
      return res.json({ success: true, data: list });
    }

    // In-memory fallback
    const totalCount = memoryData.products.length;
    const computed = memoryData.categories.map(c => {
      if (c.id === 'all') return { ...c, count: totalCount };
      const count = memoryData.products.filter(p => p.category === c.id).length;
      return { ...c, count };
    });

    res.json({ success: true, data: computed });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const { name, icon } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Category name is required.' });
    }

    const slug = (req.body.id || name)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newCat = {
      id: slug,
      name: name.trim(),
      icon: icon || 'category',
      count: 0
    };

    if (isPgConnected()) {
      const pool = getPool();
      const { rows: existing } = await pool.query('SELECT * FROM categories WHERE id = $1', [slug]);
      if (existing.length > 0) {
        return res.status(400).json({ success: false, message: 'Category with this slug already exists.' });
      }

      const { rows } = await pool.query(
        'INSERT INTO categories (id, name, icon, count) VALUES ($1, $2, $3, $4) RETURNING *',
        [newCat.id, newCat.name, newCat.icon, 0]
      );
      return res.status(201).json({ success: true, data: rows[0] });
    }

    if (isDBConnected()) {
      const existing = await Category.findOne({ id: slug });
      if (existing) {
        return res.status(400).json({ success: false, message: 'Category with this slug already exists.' });
      }
      const created = await Category.create(newCat);
      return res.status(201).json({ success: true, data: created });
    }

    // In-memory
    const existing = memoryData.categories.find(c => c.id === slug);
    if (existing) {
      return res.status(400).json({ success: false, message: 'Category with this slug already exists.' });
    }
    memoryData.categories.push(newCat);
    res.status(201).json({ success: true, data: newCat });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, icon } = req.body;

    if (id === 'all') {
      return res.status(400).json({ success: false, message: 'Default All category cannot be modified.' });
    }

    if (isPgConnected()) {
      const { rows } = await getPool().query(
        'UPDATE categories SET name = COALESCE($1, name), icon = COALESCE($2, icon) WHERE id = $3 RETURNING *',
        [name, icon, id]
      );
      if (rows.length === 0) return res.status(404).json({ success: false, message: 'Category not found.' });
      return res.json({ success: true, data: rows[0] });
    }

    if (isDBConnected()) {
      const updated = await Category.findOneAndUpdate({ id }, { $set: { name, icon } }, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Category not found.' });
      return res.json({ success: true, data: updated });
    }

    const cat = memoryData.categories.find(c => c.id === id);
    if (!cat) return res.status(404).json({ success: false, message: 'Category not found.' });
    if (name) cat.name = name;
    if (icon) cat.icon = icon;
    res.json({ success: true, data: cat });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id === 'all') {
      return res.status(400).json({ success: false, message: 'Default All category cannot be deleted.' });
    }

    if (isPgConnected()) {
      const { rows } = await getPool().query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);
      if (rows.length === 0) return res.status(404).json({ success: false, message: 'Category not found.' });
      return res.json({ success: true, data: rows[0] });
    }

    if (isDBConnected()) {
      const deleted = await Category.findOneAndDelete({ id });
      if (!deleted) return res.status(404).json({ success: false, message: 'Category not found.' });
      return res.json({ success: true, data: deleted });
    }

    const idx = memoryData.categories.findIndex(c => c.id === id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Category not found.' });
    const deleted = memoryData.categories.splice(idx, 1);
    res.json({ success: true, data: deleted[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// === ORDERS API ===
app.get('/api/orders', async (req, res) => {
  try {
    const { status, search } = req.query;

    if (isPgConnected()) {
      let conditions = [];
      let params = [];
      let idx = 1;

      if (status && status !== 'all') {
        conditions.push(`status = $${idx++}`);
        params.push(status);
      }
      if (search) {
        conditions.push(`(id ILIKE $${idx} OR customer_name ILIKE $${idx} OR customer_phone ILIKE $${idx})`);
        params.push(`%${search}%`);
        idx++;
      }

      const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
      const { rows } = await getPool().query(`SELECT * FROM orders ${where} ORDER BY created_at DESC`, params);
      return res.json({ success: true, count: rows.length, data: rows.map(formatOrder) });
    }

    if (isDBConnected()) {
      let query = {};
      if (status && status !== 'all') query.status = status;
      if (search) {
        const regex = new RegExp(search, 'i');
        query.$or = [{ id: regex }, { customerName: regex }, { customerPhone: regex }];
      }
      const list = await Order.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: list.length, data: list });
    }

    let result = [...memoryData.orders];
    if (status && status !== 'all') result = result.filter(o => o.status === status);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(o =>
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.includes(q)
      );
    }
    res.json({ success: true, count: result.length, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    if (isPgConnected()) {
      const { rows } = await getPool().query('SELECT * FROM orders WHERE id = $1', [req.params.id]);
      if (rows.length === 0) return res.status(404).json({ success: false, message: 'Order not found' });
      return res.json({ success: true, data: formatOrder(rows[0]) });
    }

    if (isDBConnected()) {
      const order = await Order.findOne({ id: req.params.id });
      if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
      return res.json({ success: true, data: order });
    }

    const order = memoryData.orders.find(o => o.id === req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const orderCode = Date.now();
    const newOrder = {
      id: `FF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      orderCode: orderCode,
      customerName: req.body.customerName || 'Customer',
      customerPhone: req.body.customerPhone || '',
      customerEmail: req.body.customerEmail || '',
      address: req.body.address || '',
      status: 'pending',
      statusText: 'Pending confirmation & survey dispatch',
      paymentMethod: req.body.paymentMethod || 'cod',
      paymentStatus: 'unpaid',
      checkoutUrl: '',
      createdAt: new Date().toISOString(),
      scheduledDate: req.body.scheduledDate || 'Within 24-48 business hours',
      scheduledSlot: req.body.scheduledSlot || 'Business hours',
      technician: 'Awaiting technician assignment',
      note: req.body.note || '',
      items: req.body.items || [],
      subtotal: req.body.subtotal || 0,
      discount: req.body.discount || 0,
      voucherCode: req.body.voucherCode || '',
      shippingFee: 0,
      total: req.body.total || 0
    };

    // Save order to database first
    let savedOrder = newOrder;

    if (isPgConnected()) {
      const query = `
        INSERT INTO orders (id, order_code, customer_name, customer_phone, customer_email, address, status, status_text, payment_method, payment_status, checkout_url, scheduled_date, scheduled_slot, technician, note, items, subtotal, discount, voucher_code, shipping_fee, total)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
        RETURNING *
      `;
      const { rows } = await getPool().query(query, [
        newOrder.id, newOrder.orderCode, newOrder.customerName, newOrder.customerPhone, newOrder.customerEmail,
        newOrder.address, newOrder.status, newOrder.statusText, newOrder.paymentMethod,
        newOrder.paymentStatus, newOrder.checkoutUrl, newOrder.scheduledDate, newOrder.scheduledSlot,
        newOrder.technician, newOrder.note, JSON.stringify(newOrder.items), newOrder.subtotal,
        newOrder.discount, newOrder.voucherCode, newOrder.shippingFee, newOrder.total
      ]);
      savedOrder = formatOrder(rows[0]);
    } else if (isDBConnected()) {
      const created = await Order.create(newOrder);
      savedOrder = created.toObject ? created.toObject() : created;
    } else {
      memoryData.orders.unshift(newOrder);
      savedOrder = newOrder;
    }

    // If payment method is PayOS, create payment link
    if (newOrder.paymentMethod === 'payos') {
      try {
        const baseUrl = req.body.returnBaseUrl || `${req.protocol}://${req.get('host')}`;

        const paymentData = {
          orderCode: orderCode,
          amount: Math.round(newOrder.total),
          description: `FANFUN ${newOrder.id}`.substring(0, 25),
          cancelUrl: `${baseUrl}/payment/cancel?orderId=${newOrder.id}`,
          returnUrl: `${baseUrl}/payment/success?orderId=${newOrder.id}`,
        };

        const paymentLink = await payos.paymentRequests.create(paymentData);

        // Update checkout URL in DB
        if (isPgConnected()) {
          await getPool().query(
            'UPDATE orders SET checkout_url = $1 WHERE id = $2',
            [paymentLink.checkoutUrl, newOrder.id]
          );
        } else if (isDBConnected()) {
          await Order.findOneAndUpdate({ id: newOrder.id }, { checkoutUrl: paymentLink.checkoutUrl });
        } else {
          const memOrder = memoryData.orders.find(o => o.id === newOrder.id);
          if (memOrder) memOrder.checkoutUrl = paymentLink.checkoutUrl;
        }

        savedOrder.checkoutUrl = paymentLink.checkoutUrl;
      } catch (payErr) {
        console.error('PayOS create payment link error:', payErr);
        return res.status(500).json({
          success: false,
          message: 'Order created but failed to generate payment link. Please try again.',
          data: savedOrder
        });
      }
    }

    res.status(201).json({ success: true, data: savedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const { status, statusText, technician, paymentStatus } = req.body;

    if (isPgConnected()) {
      const { rows: existing } = await getPool().query('SELECT * FROM orders WHERE id = $1', [req.params.id]);
      if (existing.length === 0) return res.status(404).json({ success: false, message: 'Order not found' });

      const newStatus = status || existing[0].status;
      const newStatusText = statusText || existing[0].status_text;
      const newTechnician = technician || existing[0].technician;
      const newPaymentStatus = paymentStatus || existing[0].payment_status;

      const { rows } = await getPool().query(
        'UPDATE orders SET status = $1, status_text = $2, technician = $3, payment_status = $4 WHERE id = $5 RETURNING *',
        [newStatus, newStatusText, newTechnician, newPaymentStatus, req.params.id]
      );
      return res.json({ success: true, data: formatOrder(rows[0]) });
    }

    if (isDBConnected()) {
      const update = {};
      if (status) update.status = status;
      if (statusText) update.statusText = statusText;
      if (technician) update.technician = technician;
      if (paymentStatus) update.paymentStatus = paymentStatus;

      const updated = await Order.findOneAndUpdate({ id: req.params.id }, { $set: update }, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Order not found' });
      return res.json({ success: true, data: updated });
    }

    const order = memoryData.orders.find(o => o.id === req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (status) order.status = status;
    if (statusText) order.statusText = statusText;
    if (technician) order.technician = technician;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// === PAYOS PAYMENT API ===
async function markOrderPaidByOrderCode(orderCode) {
  if (isPgConnected()) {
    const { rows } = await getPool().query(
      'UPDATE orders SET payment_status = $1 WHERE order_code = $2 RETURNING *',
      ['paid', orderCode]
    );
    return rows.length > 0 ? formatOrder(rows[0]) : null;
  } else if (isDBConnected()) {
    return await Order.findOneAndUpdate({ orderCode }, { paymentStatus: 'paid' }, { new: true });
  } else {
    const order = memoryData.orders.find(o => o.orderCode === orderCode);
    if (order) order.paymentStatus = 'paid';
    return order || null;
  }
}

app.post('/api/payment/payos-webhook', async (req, res) => {
  try {
    console.log('📥 PayOS Webhook received:', JSON.stringify(req.body));
    const webhookData = await payos.webhooks.verify(req.body);
    console.log('✅ Webhook verified:', webhookData);

    if (webhookData.code === '00') {
      await markOrderPaidByOrderCode(webhookData.orderCode);
      console.log(`💰 Order with orderCode ${webhookData.orderCode} marked as PAID`);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('PayOS webhook error:', error);
    // Always return 200 to acknowledge receipt
    res.json({ success: true });
  }
});

// Verify payment directly with PayOS (useful on localhost where webhooks cannot reach)
app.get('/api/payment/verify/:orderId', async (req, res) => {
  try {
    let order = null;
    if (isPgConnected()) {
      const { rows } = await getPool().query('SELECT * FROM orders WHERE id = $1', [req.params.orderId]);
      if (rows.length > 0) order = formatOrder(rows[0]);
    } else if (isDBConnected()) {
      order = await Order.findOne({ id: req.params.orderId });
    } else {
      order = memoryData.orders.find(o => o.id === req.params.orderId);
    }

    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    if (order.paymentMethod === 'payos' && order.paymentStatus !== 'paid' && order.orderCode) {
      try {
        const paymentInfo = await payos.paymentRequests.get(Number(order.orderCode));
        if (paymentInfo && paymentInfo.status === 'PAID') {
          const updated = await markOrderPaidByOrderCode(Number(order.orderCode));
          if (updated) order = updated;
        }
      } catch (err) {
        console.error('PayOS verify error:', err.message);
      }
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/payment/payos/:orderCode', async (req, res) => {
  try {
    const orderCode = Number(req.params.orderCode);
    const paymentInfo = await payos.paymentRequests.get(orderCode);
    res.json({ success: true, data: paymentInfo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/orders/:id/cancel-payment', async (req, res) => {
  try {
    let order = null;

    if (isPgConnected()) {
      const { rows } = await getPool().query('SELECT * FROM orders WHERE id = $1', [req.params.id]);
      if (rows.length > 0) order = formatOrder(rows[0]);
    } else if (isDBConnected()) {
      order = await Order.findOne({ id: req.params.id });
    } else {
      order = memoryData.orders.find(o => o.id === req.params.id);
    }

    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    // Cancel PayOS payment link if exists
    if (order.orderCode && order.paymentMethod === 'payos') {
      try {
        await payos.paymentRequests.cancel(Number(order.orderCode), 'Customer cancelled');
      } catch (cancelErr) {
        console.log('PayOS cancel note:', cancelErr.message);
      }
    }

    // Update order status to cancelled
    if (isPgConnected()) {
      const { rows } = await getPool().query(
        'UPDATE orders SET status = $1, status_text = $2 WHERE id = $3 RETURNING *',
        ['cancelled', 'Order cancelled by customer', req.params.id]
      );
      return res.json({ success: true, data: formatOrder(rows[0]) });
    } else if (isDBConnected()) {
      const updated = await Order.findOneAndUpdate(
        { id: req.params.id },
        { status: 'cancelled', statusText: 'Order cancelled by customer' },
        { new: true }
      );
      return res.json({ success: true, data: updated });
    } else {
      order.status = 'cancelled';
      order.statusText = 'Order cancelled by customer';
      return res.json({ success: true, data: order });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// === VOUCHERS API ===
app.get('/api/vouchers', async (req, res) => {
  try {
    if (isPgConnected()) {
      const { rows } = await getPool().query('SELECT * FROM vouchers ORDER BY code ASC');
      return res.json({
        success: true,
        data: rows.map(r => ({
          code: r.code,
          title: r.title,
          discountAmount: Number(r.discount_amount),
          minOrderValue: Number(r.min_order_value),
          expiryDate: r.expiry_date,
          usageLimit: Number(r.usage_limit),
          usedCount: Number(r.used_count),
          status: r.status
        }))
      });
    }

    if (isDBConnected()) {
      const v = await Voucher.find().sort({ code: 1 });
      return res.json({ success: true, data: v });
    }
    res.json({ success: true, data: memoryData.vouchers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/vouchers', async (req, res) => {
  try {
    const { code, title, discountAmount, minOrderValue, expiryDate, usageLimit, status } = req.body;
    if (!code || !title) {
      return res.status(400).json({ success: false, message: 'Voucher code and title are required.' });
    }

    const cleanCode = code.trim().toUpperCase();
    const newVoucher = {
      code: cleanCode,
      title: title.trim(),
      discountAmount: Number(discountAmount) || 0,
      minOrderValue: Number(minOrderValue) || 0,
      expiryDate: expiryDate || '31/12/2026',
      usageLimit: Number(usageLimit) || 100,
      usedCount: 0,
      status: status || 'active'
    };

    if (isPgConnected()) {
      const pool = getPool();
      const existing = await pool.query('SELECT code FROM vouchers WHERE UPPER(code) = $1', [cleanCode]);
      if (existing.rows.length > 0) {
        return res.status(400).json({ success: false, message: `Voucher code "${cleanCode}" already exists.` });
      }

      await pool.query(
        `INSERT INTO vouchers (code, title, discount_amount, min_order_value, expiry_date, usage_limit, used_count, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [newVoucher.code, newVoucher.title, newVoucher.discountAmount, newVoucher.minOrderValue, newVoucher.expiryDate, newVoucher.usageLimit, 0, newVoucher.status]
      );
      return res.status(201).json({ success: true, data: newVoucher });
    }

    if (isDBConnected()) {
      const existing = await Voucher.findOne({ code: cleanCode });
      if (existing) {
        return res.status(400).json({ success: false, message: `Voucher code "${cleanCode}" already exists.` });
      }
      const created = await Voucher.create(newVoucher);
      return res.status(201).json({ success: true, data: created });
    }

    // In-memory
    const existing = memoryData.vouchers.find(v => v.code.toUpperCase() === cleanCode);
    if (existing) {
      return res.status(400).json({ success: false, message: `Voucher code "${cleanCode}" already exists.` });
    }
    memoryData.vouchers.push(newVoucher);
    res.status(201).json({ success: true, data: newVoucher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/vouchers/:code', async (req, res) => {
  try {
    const targetCode = req.params.code.toUpperCase();
    const { title, discountAmount, minOrderValue, expiryDate, usageLimit, status } = req.body;

    if (isPgConnected()) {
      const pool = getPool();
      const { rows } = await pool.query(
        `UPDATE vouchers SET
          title = COALESCE($1, title),
          discount_amount = COALESCE($2, discount_amount),
          min_order_value = COALESCE($3, min_order_value),
          expiry_date = COALESCE($4, expiry_date),
          usage_limit = COALESCE($5, usage_limit),
          status = COALESCE($6, status)
         WHERE UPPER(code) = $7
         RETURNING *`,
        [
          title ? title.trim() : null,
          discountAmount !== undefined ? Number(discountAmount) : null,
          minOrderValue !== undefined ? Number(minOrderValue) : null,
          expiryDate || null,
          usageLimit !== undefined ? Number(usageLimit) : null,
          status || null,
          targetCode
        ]
      );
      if (rows.length === 0) return res.status(404).json({ success: false, message: 'Voucher not found' });
      const r = rows[0];
      return res.json({
        success: true,
        data: {
          code: r.code,
          title: r.title,
          discountAmount: Number(r.discount_amount),
          minOrderValue: Number(r.min_order_value),
          expiryDate: r.expiry_date,
          usageLimit: Number(r.usage_limit),
          usedCount: Number(r.used_count),
          status: r.status
        }
      });
    }

    if (isDBConnected()) {
      const updated = await Voucher.findOneAndUpdate(
        { code: targetCode },
        {
          ...(title && { title: title.trim() }),
          ...(discountAmount !== undefined && { discountAmount: Number(discountAmount) }),
          ...(minOrderValue !== undefined && { minOrderValue: Number(minOrderValue) }),
          ...(expiryDate && { expiryDate }),
          ...(usageLimit !== undefined && { usageLimit: Number(usageLimit) }),
          ...(status && { status })
        },
        { new: true }
      );
      if (!updated) return res.status(404).json({ success: false, message: 'Voucher not found' });
      return res.json({ success: true, data: updated });
    }

    // In-memory
    const v = memoryData.vouchers.find(x => x.code.toUpperCase() === targetCode);
    if (!v) return res.status(404).json({ success: false, message: 'Voucher not found' });
    if (title) v.title = title.trim();
    if (discountAmount !== undefined) v.discountAmount = Number(discountAmount);
    if (minOrderValue !== undefined) v.minOrderValue = Number(minOrderValue);
    if (expiryDate) v.expiryDate = expiryDate;
    if (usageLimit !== undefined) v.usageLimit = Number(usageLimit);
    if (status) v.status = status;
    res.json({ success: true, data: v });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/vouchers/:code', async (req, res) => {
  try {
    const targetCode = req.params.code.toUpperCase();

    if (isPgConnected()) {
      const { rowCount } = await getPool().query('DELETE FROM vouchers WHERE UPPER(code) = $1', [targetCode]);
      if (rowCount === 0) return res.status(404).json({ success: false, message: 'Voucher not found' });
      return res.json({ success: true, message: 'Voucher deleted successfully.' });
    }

    if (isDBConnected()) {
      const deleted = await Voucher.findOneAndDelete({ code: targetCode });
      if (!deleted) return res.status(404).json({ success: false, message: 'Voucher not found' });
      return res.json({ success: true, message: 'Voucher deleted successfully.' });
    }

    const idx = memoryData.vouchers.findIndex(x => x.code.toUpperCase() === targetCode);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Voucher not found' });
    memoryData.vouchers.splice(idx, 1);
    res.json({ success: true, message: 'Voucher deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/vouchers/apply', async (req, res) => {
  try {
    const { code, subtotal } = req.body;
    let voucher;

    if (isPgConnected()) {
      const { rows } = await getPool().query(
        'SELECT * FROM vouchers WHERE UPPER(code) = UPPER($1) AND status = $2',
        [code || '', 'active']
      );
      if (rows.length > 0) {
        voucher = {
          code: rows[0].code,
          title: rows[0].title,
          discountAmount: Number(rows[0].discount_amount),
          minOrderValue: Number(rows[0].min_order_value)
        };
      }
    } else if (isDBConnected()) {
      voucher = await Voucher.findOne({
        code: (code || '').toUpperCase(),
        status: 'active'
      });
    } else {
      voucher = memoryData.vouchers.find(
        v => v.code.toUpperCase() === (code || '').toUpperCase() && v.status === 'active'
      );
    }

    if (!voucher) {
      return res.status(400).json({ success: false, message: 'Coupon code is invalid or has expired.' });
    }
    if (subtotal < voucher.minOrderValue) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount of ${voucher.minOrderValue.toLocaleString('en-US')} VND required to apply this voucher.`
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
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// === CUSTOMERS API ===
app.get('/api/customers', async (req, res) => {
  try {
    if (isPgConnected()) {
      const { rows } = await getPool().query('SELECT * FROM customers');
      return res.json({
        success: true,
        data: rows.map(r => ({
          id: r.id,
          name: r.name,
          phone: r.phone,
          email: r.email,
          tier: r.tier,
          totalOrders: Number(r.total_orders),
          totalSpent: Number(r.total_spent),
          city: r.city,
          createdAt: r.created_at
        }))
      });
    }

    if (isDBConnected()) {
      const list = await Customer.find();
      return res.json({ success: true, data: list });
    }
    res.json({ success: true, data: memoryData.customers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// === STATS API FOR ADMIN ===
app.get('/api/stats', async (req, res) => {
  try {
    if (isPgConnected()) {
      const pool = getPool();
      const { rows: orderRows } = await pool.query('SELECT total, status FROM orders');
      const { rows: prodRows } = await pool.query("SELECT COUNT(*) FROM products WHERE status = 'active'");
      const { rows: custRows } = await pool.query('SELECT COUNT(*) FROM customers');

      const totalRevenue = orderRows.reduce((sum, o) => sum + Number(o.total || 0), 0);
      const totalOrders = orderRows.length;
      const activeProducts = parseInt(prodRows[0].count, 10);
      const totalCustomers = parseInt(custRows[0].count, 10);

      return res.json({
        success: true,
        data: {
          totalRevenue,
          totalOrders,
          activeProducts,
          totalCustomers,
          pendingOrders: orderRows.filter(o => o.status === 'pending' || o.status === 'processing').length,
          completedOrders: orderRows.filter(o => o.status === 'completed').length
        }
      });
    }

    if (isDBConnected()) {
      const allOrders = await Order.find();
      const totalRevenue = allOrders.reduce((sum, o) => sum + (o.total || 0), 0);
      const totalOrders = allOrders.length;
      const activeProducts = await Product.countDocuments({ status: 'active' });
      const totalCustomers = await Customer.countDocuments();

      return res.json({
        success: true,
        data: {
          totalRevenue,
          totalOrders,
          activeProducts,
          totalCustomers,
          pendingOrders: allOrders.filter(o => o.status === 'pending' || o.status === 'processing').length,
          completedOrders: allOrders.filter(o => o.status === 'completed').length
        }
      });
    }

    const totalRevenue = memoryData.orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const totalOrders = memoryData.orders.length;
    const activeProducts = memoryData.products.filter(p => p.status === 'active').length;
    const totalCustomers = memoryData.customers.length;

    res.json({
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        activeProducts,
        totalCustomers,
        pendingOrders: memoryData.orders.filter(o => o.status === 'pending' || o.status === 'processing').length,
        completedOrders: memoryData.orders.filter(o => o.status === 'completed').length
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// === SERVE STATIC REACT BUILD IN PRODUCTION ===
const clientDist = path.join(__dirname, '../../client/dist');
if (fs.existsSync(clientDist)) {
  console.log('📦 Serving production frontend build from:', clientDist);
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(clientDist, 'index.html'));
    }
  });
}

// === BOOTSTRAP SERVER ===
async function startServer() {
  // Check PostgreSQL first
  const pgConnected = await initPostgres();
  if (!pgConnected) {
    // If no Postgres, check MongoDB
    await connectDB();
  }

  app.listen(PORT, () => {
    console.log(`>>> 🚀 FANFUN Server is running at http://localhost:${PORT}`);
  });
}

startServer();
