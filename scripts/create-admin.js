// Script to create an admin user
// Run this with: node scripts/create-admin.js

const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'atlas_advisory';

async function createAdminUser() {
  const client = await MongoClient.connect(MONGO_URL);
  const db = client.db(DB_NAME);

  // Check if admin already exists
  const existing = await db.collection('users').findOne({ email: 'admin@atlasadvisory.com' });
  
  if (existing) {
    console.log('Admin user already exists!');
    console.log('Email: admin@atlasadvisory.com');
    await client.close();
    return;
  }

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const adminUser = {
    _id: uuidv4(),
    name: 'Admin User',
    email: 'admin@atlasadvisory.com',
    phone: '+919876543210',
    password: hashedPassword,
    role: 'admin',
    companyName: 'Atlas Advisory',
    city: 'Mumbai',
    capacity: '',
    membershipStatus: 'active',
    createdAt: new Date().toISOString()
  };

  await db.collection('users').insertOne(adminUser);

  console.log('\n✅ Admin user created successfully!');
  console.log('\nLogin Credentials:');
  console.log('Email: admin@atlasadvisory.com');
  console.log('Password: admin123');
  console.log('\n⚠️  Please change this password after first login!\n');

  await client.close();
}

createAdminUser().catch(console.error);