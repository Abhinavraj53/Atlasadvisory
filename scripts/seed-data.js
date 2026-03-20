// Seed data script for Atlas Advisory
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'atlas_advisory';

async function seedData() {
  const client = await MongoClient.connect(MONGO_URL);
  const db = client.db(DB_NAME);

  console.log('🌱 Starting seed data creation...\n');

  // Create sample listings
  const listings = [
    {
      _id: uuidv4(),
      userId: 'admin-user-id',
      title: 'Premium MS Steel Scrap - Grade A',
      category: 'Ferrous',
      scrapType: 'MS Steel',
      quantity: '500 Tons',
      capacity: '2000 Tons/month',
      price: '45000',
      location: 'Mumbai, Maharashtra',
      description: 'High-quality MS steel scrap, Grade A. Clean, sorted, and ready for immediate pickup. Perfect for steel mills and foundries.',
      images: [],
      status: 'active',
      createdAt: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      userId: 'admin-user-id',
      title: 'Aluminum Scrap - 6063 Extrusion',
      category: 'Non-Ferrous',
      scrapType: 'Aluminum',
      quantity: '100 Tons',
      capacity: '500 Tons/month',
      price: '185000',
      location: 'Delhi, NCR',
      description: 'Clean aluminum 6063 extrusion scrap. Ideal for remelting. Available for immediate delivery.',
      images: [],
      status: 'active',
      createdAt: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      userId: 'admin-user-id',
      title: 'Copper Wire Scrap - Millberry Grade',
      category: 'Non-Ferrous',
      scrapType: 'Copper',
      quantity: '50 Tons',
      capacity: '200 Tons/month',
      price: '720000',
      location: 'Bangalore, Karnataka',
      description: 'Pure copper wire scrap, Millberry grade. 99.9% purity. Best rates in the market.',
      images: [],
      status: 'active',
      createdAt: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      userId: 'admin-user-id',
      title: 'HDPE Plastic Scrap - Industrial Grade',
      category: 'Plastic',
      scrapType: 'HDPE',
      quantity: '200 Tons',
      capacity: '800 Tons/month',
      price: '45000',
      location: 'Pune, Maharashtra',
      description: 'Clean HDPE plastic scrap from industrial sources. Sorted and baled. Ready for recycling.',
      images: [],
      status: 'active',
      createdAt: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      userId: 'admin-user-id',
      title: 'OCC Paper Waste - Premium Quality',
      category: 'Paper',
      scrapType: 'OCC',
      quantity: '300 Tons',
      capacity: '1000 Tons/month',
      price: '12000',
      location: 'Chennai, Tamil Nadu',
      description: 'Old corrugated cardboard (OCC) waste. High quality, clean, and dry. Perfect for paper mills.',
      images: [],
      status: 'active',
      createdAt: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      userId: 'admin-user-id',
      title: 'E-Waste - Computer Boards & Components',
      category: 'E-Waste',
      scrapType: 'Electronic',
      quantity: '25 Tons',
      capacity: '100 Tons/month',
      price: '180000',
      location: 'Hyderabad, Telangana',
      description: 'E-waste including computer motherboards, RAM, and other electronic components. Properly sorted and categorized.',
      images: [],
      status: 'active',
      createdAt: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      userId: 'admin-user-id',
      title: 'Cast Iron Scrap - Heavy Melting',
      category: 'Ferrous',
      scrapType: 'Cast Iron',
      quantity: '800 Tons',
      capacity: '3000 Tons/month',
      price: '38000',
      location: 'Kolkata, West Bengal',
      description: 'Heavy melting scrap (HMS) cast iron. Industrial grade. Bulk quantities available.',
      images: [],
      status: 'active',
      createdAt: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      userId: 'admin-user-id',
      title: 'Brass Scrap - Mixed Grade',
      category: 'Non-Ferrous',
      scrapType: 'Brass',
      quantity: '75 Tons',
      capacity: '300 Tons/month',
      price: '420000',
      location: 'Ahmedabad, Gujarat',
      description: 'Mixed brass scrap from various sources. Good quality. Suitable for brass foundries.',
      images: [],
      status: 'active',
      createdAt: new Date().toISOString()
    }
  ];

  // Create DRT/NCLT assets
  const drtAssets = [
    {
      _id: uuidv4(),
      title: 'Commercial Complex - Prime Location',
      category: 'Commercial',
      assetType: 'Building',
      location: 'Mumbai, Andheri West',
      reservePrice: '12500000',
      description: 'Prime commercial property in Andheri West. 15,000 sq ft built-up area. Ground + 4 floors. Suitable for offices or retail.',
      images: [],
      status: 'active',
      createdAt: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      title: 'Manufacturing Plant - Complete Setup',
      category: 'Industrial',
      assetType: 'Factory',
      location: 'Pune, Chakan',
      reservePrice: '28000000',
      description: 'Fully equipped manufacturing facility. 50,000 sq ft. Includes machinery, tools, and infrastructure. Ready to operate.',
      images: [],
      status: 'active',
      createdAt: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      title: 'Residential Apartments - 24 Units',
      category: 'Residential',
      assetType: 'Apartments',
      location: 'Bangalore, Whitefield',
      reservePrice: '18500000',
      description: '24 residential units in a gated community. Mix of 2BHK and 3BHK. Good location with amenities.',
      images: [],
      status: 'active',
      createdAt: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      title: 'Heavy Machinery Package - CNC & Lathe',
      category: 'Machinery',
      assetType: 'Equipment',
      location: 'Delhi, Okhla',
      reservePrice: '5500000',
      description: 'Industrial machinery package including CNC machines, lathes, milling machines. Well maintained.',
      images: [],
      status: 'active',
      createdAt: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      title: 'Warehouse Facility - 80,000 sq ft',
      category: 'Commercial',
      assetType: 'Warehouse',
      location: 'Gurgaon, IMT Manesar',
      reservePrice: '15000000',
      description: 'Large warehouse facility with loading docks. Good connectivity to highways. Suitable for logistics.',
      images: [],
      status: 'active',
      createdAt: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      title: 'Steel Processing Unit - Operational',
      category: 'Industrial',
      assetType: 'Plant',
      location: 'Jamshedpur, Jharkhand',
      reservePrice: '42000000',
      description: 'Complete steel processing unit with all equipment. Currently operational. High capacity production.',
      images: [],
      status: 'active',
      createdAt: new Date().toISOString()
    }
  ];

  // Create sample import requests
  const importRequests = [
    {
      _id: uuidv4(),
      userId: 'admin-user-id',
      materialType: 'Aluminum Scrap',
      quantity: '500',
      country: 'USA',
      port: 'Mumbai',
      description: 'Need high-quality aluminum scrap for recycling facility.',
      status: 'pending',
      createdAt: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      userId: 'admin-user-id',
      materialType: 'Copper Scrap',
      quantity: '200',
      country: 'UAE',
      port: 'Chennai',
      description: 'Copper wire scrap required for manufacturing.',
      status: 'pending',
      createdAt: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      userId: 'admin-user-id',
      materialType: 'Stainless Steel Scrap',
      quantity: '1000',
      country: 'UK',
      port: 'Mumbai',
      description: 'Bulk stainless steel scrap order for steel mill.',
      status: 'pending',
      createdAt: new Date().toISOString()
    }
  ];

  // Insert data
  try {
    // Clear existing data
    await db.collection('listings').deleteMany({});
    await db.collection('drtAssets').deleteMany({});
    await db.collection('importRequests').deleteMany({});

    // Insert new data
    if (listings.length > 0) {
      await db.collection('listings').insertMany(listings);
      console.log(`✅ Created ${listings.length} sample listings`);
    }

    if (drtAssets.length > 0) {
      await db.collection('drtAssets').insertMany(drtAssets);
      console.log(`✅ Created ${drtAssets.length} DRT/NCLT assets`);
    }

    if (importRequests.length > 0) {
      await db.collection('importRequests').insertMany(importRequests);
      console.log(`✅ Created ${importRequests.length} import requests`);
    }

    console.log('\n🎉 Seed data created successfully!\n');
  } catch (error) {
    console.error('❌ Error creating seed data:', error);
  }

  await client.close();
}

seedData().catch(console.error);