const { Pool } = require('pg');
const initialData = require('./data');

let pool = null;
let isConnected = false;

async function initPostgres() {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URI;
  if (!connectionString) {
    return false;
  }

  try {
    const isSslRequired = connectionString.includes('render.com') || 
                          connectionString.includes('neon.tech') || 
                          connectionString.includes('supabase.co');

    pool = new Pool({
      connectionString,
      ssl: isSslRequired ? { rejectUnauthorized: false } : false,
      connectionTimeoutMillis: 3000
    });

    // Test connection
    const client = await pool.connect();
    console.log('🐘 PostgreSQL connected successfully!');
    client.release();

    // Create tables
    await createTables();

    // Seed data if empty
    await seedData();

    isConnected = true;
    return true;
  } catch (err) {
    console.error('⚠️ PostgreSQL connection failed:', err.message);
    isConnected = false;
    return false;
  }
}

async function createTables() {
  const query = `
    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(100) PRIMARY KEY,
      sku VARCHAR(100),
      name VARCHAR(255) NOT NULL,
      category VARCHAR(100),
      category_name VARCHAR(100),
      price NUMERIC DEFAULT 0,
      original_price NUMERIC DEFAULT 0,
      badge VARCHAR(50),
      rating NUMERIC DEFAULT 5.0,
      review_count INT DEFAULT 0,
      stock INT DEFAULT 10,
      status VARCHAR(50) DEFAULT 'active',
      image TEXT,
      description TEXT,
      features JSONB DEFAULT '[]'::jsonb,
      specs JSONB DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS categories (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      icon VARCHAR(100) DEFAULT 'category',
      count INT DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS orders (
      id VARCHAR(100) PRIMARY KEY,
      order_code BIGINT UNIQUE,
      customer_name VARCHAR(255) NOT NULL,
      customer_phone VARCHAR(50),
      customer_email VARCHAR(100),
      address TEXT,
      status VARCHAR(50) DEFAULT 'pending',
      status_text VARCHAR(255),
      payment_method VARCHAR(50) DEFAULT 'cod',
      payment_status VARCHAR(50) DEFAULT 'unpaid',
      checkout_url TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      scheduled_date VARCHAR(100),
      scheduled_slot VARCHAR(100),
      technician VARCHAR(100),
      note TEXT,
      items JSONB DEFAULT '[]'::jsonb,
      subtotal NUMERIC DEFAULT 0,
      discount NUMERIC DEFAULT 0,
      voucher_code VARCHAR(100),
      shipping_fee NUMERIC DEFAULT 0,
      total NUMERIC DEFAULT 0
    );

    ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_code BIGINT UNIQUE;
    ALTER TABLE orders ADD COLUMN IF NOT EXISTS checkout_url TEXT;

    CREATE TABLE IF NOT EXISTS customers (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      email VARCHAR(100),
      tier VARCHAR(50) DEFAULT 'Member',
      total_orders INT DEFAULT 0,
      total_spent NUMERIC DEFAULT 0,
      city VARCHAR(100),
      created_at VARCHAR(50)
    );

    CREATE TABLE IF NOT EXISTS vouchers (
      code VARCHAR(100) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      discount_amount NUMERIC DEFAULT 0,
      min_order_value NUMERIC DEFAULT 0,
      expiry_date VARCHAR(50),
      usage_limit INT DEFAULT 100,
      used_count INT DEFAULT 0,
      status VARCHAR(50) DEFAULT 'active'
    );
  `;
  await pool.query(query);
}

async function seedData() {
  console.log('🌱 Syncing and seeding initial data into PostgreSQL...');

  // 1. Upsert Categories
  for (const c of initialData.categories) {
    await pool.query(
      `INSERT INTO categories (id, name, icon, count)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (id) DO UPDATE SET
         name = EXCLUDED.name,
         icon = EXCLUDED.icon`,
      [c.id, c.name, c.icon, c.count]
    );
  }

  // 2. Upsert Products
  for (const p of initialData.products) {
    await pool.query(
      `INSERT INTO products (id, sku, name, category, category_name, price, original_price, badge, rating, review_count, stock, status, image, description, features, specs)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
       ON CONFLICT (id) DO UPDATE SET
         sku = EXCLUDED.sku,
         name = EXCLUDED.name,
         category = EXCLUDED.category,
         category_name = EXCLUDED.category_name,
         price = EXCLUDED.price,
         original_price = EXCLUDED.original_price,
         badge = EXCLUDED.badge,
         image = EXCLUDED.image,
         description = EXCLUDED.description,
         features = EXCLUDED.features,
         specs = EXCLUDED.specs`,
      [p.id, p.sku, p.name, p.category, p.categoryName, p.price, p.originalPrice, p.badge, p.rating, p.reviewCount, p.stock, p.status, p.image, p.description, JSON.stringify(p.features || []), JSON.stringify(p.specs || {})]
    );
  }

  // 3. Auto-fix any legacy Google LH3 temporary URLs
  await pool.query(`
    UPDATE products SET image = 'https://res.cloudinary.com/dpfy23tda/image/upload/v1795491622/fanfun_products/ff-apex-3in1.jpg' WHERE id = 'ff-apex-3in1' AND image LIKE '%googleusercontent%';
    UPDATE products SET image = 'https://res.cloudinary.com/dpfy23tda/image/upload/v1795491624/fanfun_products/ff-slim-pro.jpg' WHERE id = 'ff-slim-pro' AND image LIKE '%googleusercontent%';
    UPDATE products SET image = 'https://res.cloudinary.com/dpfy23tda/image/upload/v1795491625/fanfun_products/ff-prime-pure.jpg' WHERE id = 'ff-prime-pure' AND image LIKE '%googleusercontent%';
    UPDATE products SET image = 'https://res.cloudinary.com/dpfy23tda/image/upload/v1795491625/fanfun_products/ff-filter-hepa-h13.jpg' WHERE id = 'ff-filter-hepa-h13' AND image LIKE '%googleusercontent%';
    UPDATE products SET image = 'https://res.cloudinary.com/dpfy23tda/image/upload/v1795491626/fanfun_products/ff-smart-switch-pro.jpg' WHERE id = 'ff-smart-switch-pro' AND image LIKE '%googleusercontent%';
    UPDATE products SET image = 'https://res.cloudinary.com/dpfy23tda/image/upload/v1795491627/fanfun_products/ff-service-install-vip.jpg' WHERE id = 'ff-service-install-vip' AND image LIKE '%googleusercontent%';
  `);

  // 4. Initial orders, customers, vouchers if table is empty
  const { rows: orderRows } = await pool.query('SELECT COUNT(*) FROM orders');
  if (parseInt(orderRows[0].count, 10) === 0) {
    for (const o of initialData.orders) {
      await pool.query(
        `INSERT INTO orders (id, customer_name, customer_phone, customer_email, address, status, status_text, payment_method, payment_status, scheduled_date, scheduled_slot, technician, note, items, subtotal, discount, voucher_code, shipping_fee, total)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
         ON CONFLICT (id) DO NOTHING`,
        [o.id, o.customerName, o.customerPhone, o.customerEmail, o.address, o.status, o.statusText, o.paymentMethod, o.paymentStatus, o.scheduledDate, o.scheduledSlot, o.technician, o.note, JSON.stringify(o.items || []), o.subtotal, o.discount, o.voucherCode, o.shippingFee, o.total]
      );
    }
  }

  const { rows: custRows } = await pool.query('SELECT COUNT(*) FROM customers');
  if (parseInt(custRows[0].count, 10) === 0) {
    for (const u of initialData.customers) {
      await pool.query(
        `INSERT INTO customers (id, name, phone, email, tier, total_orders, total_spent, city, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (id) DO NOTHING`,
        [u.id, u.name, u.phone, u.email, u.tier, u.totalOrders, u.totalSpent, u.city, u.createdAt]
      );
    }
  }

  const { rows: voucherRows } = await pool.query('SELECT COUNT(*) FROM vouchers');
  if (parseInt(voucherRows[0].count, 10) === 0) {
    for (const v of initialData.vouchers) {
      await pool.query(
        `INSERT INTO vouchers (code, title, discount_amount, min_order_value, expiry_date, usage_limit, used_count, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (code) DO NOTHING`,
        [v.code, v.title, v.discountAmount, v.minOrderValue, v.expiryDate, v.usageLimit, v.usedCount, v.status]
      );
    }
  }
  console.log('✅ PostgreSQL syncing completed successfully!');
}

function isPgConnected() {
  return isConnected && pool !== null;
}

function getPool() {
  return pool;
}

// Format database product row to frontend format
function formatProduct(row) {
  if (!row) return null;
  return {
    id: row.id,
    sku: row.sku,
    name: row.name,
    category: row.category,
    categoryName: row.category_name,
    price: Number(row.price),
    originalPrice: Number(row.original_price),
    badge: row.badge,
    rating: Number(row.rating),
    reviewCount: Number(row.review_count),
    stock: Number(row.stock),
    status: row.status,
    image: row.image,
    description: row.description,
    features: row.features || [],
    specs: row.specs || {}
  };
}

// Format database order row to frontend format
function formatOrder(row) {
  if (!row) return null;
  return {
    id: row.id,
    orderCode: row.order_code ? Number(row.order_code) : null,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    customerEmail: row.customer_email,
    address: row.address,
    status: row.status,
    statusText: row.status_text,
    paymentMethod: row.payment_method,
    paymentStatus: row.payment_status,
    checkoutUrl: row.checkout_url || null,
    createdAt: row.created_at,
    scheduledDate: row.scheduled_date,
    scheduledSlot: row.scheduled_slot,
    technician: row.technician,
    note: row.note,
    items: row.items || [],
    subtotal: Number(row.subtotal),
    discount: Number(row.discount),
    voucherCode: row.voucher_code,
    shippingFee: Number(row.shipping_fee),
    total: Number(row.total)
  };
}

module.exports = {
  initPostgres,
  isPgConnected,
  getPool,
  formatProduct,
  formatOrder
};
