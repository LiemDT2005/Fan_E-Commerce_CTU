const mongoose = require('mongoose');
const initialData = require('./data');
const { Product, Category, Order, Customer, Voucher } = require('./models');

let isConnected = false;

async function seedDatabase() {
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('🌱 Seeding initial data into MongoDB...');
      await Product.insertMany(initialData.products);
      await Category.insertMany(initialData.categories);
      await Order.insertMany(initialData.orders);
      await Customer.insertMany(initialData.customers);
      await Voucher.insertMany(initialData.vouchers);
      console.log('✅ Seeding completed successfully!');
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('ℹ️ MONGODB_URI not provided. Running in in-memory mode.');
    return false;
  }

  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    isConnected = true;
    console.log('🍃 MongoDB connected successfully:', uri.replace(/:[^:@]+@/, ':***@'));
    await seedDatabase();
    return true;
  } catch (error) {
    console.error('⚠️ MongoDB connection failed:', error.message);
    console.log('ℹ️ Falling back to in-memory data mode.');
    isConnected = false;
    return false;
  }
}

function isDBConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}

module.exports = {
  connectDB,
  isDBConnected
};
