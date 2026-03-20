import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || 'atlas_advisory';

let cachedDb = null;

async function connectDB() {
  if (cachedDb) return cachedDb;
  const client = await MongoClient.connect(MONGO_URL);
  cachedDb = client.db(DB_NAME);
  return cachedDb;
}

// Security: Input sanitization
function sanitizeInput(input) {
  if (typeof input === 'string') {
    return input.replace(/[<>"'&]/g, (char) => {
      const entities = { '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '&': '&amp;' };
      return entities[char];
    });
  }
  return input;
}

// Security: Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Auth Middleware
function verifyToken(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return null;
  
  const token = authHeader.replace('Bearer ', '');
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function GET(request) {
  const db = await connectDB();
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/', '');

  try {
    // GET /api/listings - Get all scrap listings
    if (path === 'listings') {
      const category = url.searchParams.get('category');
      const search = url.searchParams.get('search');
      const location = url.searchParams.get('location');
      
      let query = { status: 'active' };
      if (category && category !== 'all') query.category = sanitizeInput(category);
      if (location) query.location = new RegExp(sanitizeInput(location), 'i');
      if (search) query.title = new RegExp(sanitizeInput(search), 'i');
      
      const listings = await db.collection('listings')
        .find(query)
        .sort({ createdAt: -1 })
        .limit(50)
        .toArray();
      
      return Response.json({ listings });
    }

    // GET /api/listings/:id - Get single listing
    if (path.startsWith('listings/')) {
      const id = sanitizeInput(path.split('/')[1]);
      const listing = await db.collection('listings').findOne({ _id: id });
      if (!listing) return Response.json({ error: 'Not found' }, { status: 404 });
      return Response.json({ listing });
    }

    // GET /api/import-requests - Get import requests
    if (path === 'import-requests') {
      const user = verifyToken(request);
      if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
      
      let query = {};
      if (user.role !== 'admin') {
        query.userId = user.userId;
      }
      const requests = await db.collection('importRequests')
        .find(query)
        .sort({ createdAt: -1 })
        .limit(100)
        .toArray();
      return Response.json({ requests });
    }

    // GET /api/drt-assets - Get DRT/NCLT assets
    if (path === 'drt-assets') {
      const category = url.searchParams.get('category');
      let query = { status: 'active' };
      if (category && category !== 'all') query.category = sanitizeInput(category);
      
      const assets = await db.collection('drtAssets')
        .find(query)
        .sort({ createdAt: -1 })
        .limit(100)
        .toArray();
      return Response.json({ assets });
    }

    // GET /api/admin/users - Get all users
    if (path === 'admin/users') {
      const user = verifyToken(request);
      if (!user || user.role !== 'admin') {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const users = await db.collection('users')
        .find({})
        .project({ password: 0 })
        .sort({ createdAt: -1 })
        .limit(1000)
        .toArray();
      return Response.json({ users });
    }

    // GET /api/admin/stats - Get dashboard stats
    if (path === 'admin/stats') {
      const user = verifyToken(request);
      if (!user || user.role !== 'admin') {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const totalUsers = await db.collection('users').countDocuments();
      const totalListings = await db.collection('listings').countDocuments();
      const activeListings = await db.collection('listings').countDocuments({ status: 'active' });
      const totalImportRequests = await db.collection('importRequests').countDocuments();
      const memberships = await db.collection('memberships').countDocuments({ status: 'active' });
      
      return Response.json({
        stats: {
          totalUsers,
          totalListings,
          activeListings,
          totalImportRequests,
          memberships
        }
      });
    }

    // GET /api/admin/settings - Get admin settings
    if (path === 'admin/settings') {
      const user = verifyToken(request);
      if (!user || user.role !== 'admin') {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      let settings = await db.collection('settings').findOne({ type: 'general' });
      if (!settings) {
        settings = { 
          type: 'general',
          razorpayEnabled: false,
          cloudinaryEnabled: false
        };
      }
      // Don't send secrets to frontend
      delete settings.razorpayKeySecret;
      delete settings.cloudinaryApiSecret;
      return Response.json({ settings });
    }

    // GET /api/profile - Get user profile
    if (path === 'profile') {
      const user = verifyToken(request);
      if (!user) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const profile = await db.collection('users').findOne({ _id: user.userId });
      if (!profile) {
        return Response.json({ error: 'User not found' }, { status: 404 });
      }
      
      delete profile.password;
      return Response.json({ user: profile });
    }

    return Response.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('GET error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  const db = await connectDB();
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/', '');

  try {
    const body = await request.json();

    // POST /api/auth/register - Register new user
    if (path === 'auth/register') {
      const { name, email, phone, password, role, companyName, city, capacity } = body;
      
      // Security: Validate inputs
      if (!name || !email || !password) {
        return Response.json({ error: 'Missing required fields' }, { status: 400 });
      }
      
      if (!isValidEmail(email)) {
        return Response.json({ error: 'Invalid email format' }, { status: 400 });
      }
      
      if (password.length < 6) {
        return Response.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
      }
      
      // Check if user exists
      const existing = await db.collection('users').findOne({ email: sanitizeInput(email.toLowerCase()) });
      if (existing) {
        return Response.json({ error: 'Email already registered' }, { status: 400 });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);
      
      // Create user
      const user = {
        _id: uuidv4(),
        name: sanitizeInput(name),
        email: sanitizeInput(email.toLowerCase()),
        phone: sanitizeInput(phone || ''),
        password: hashedPassword,
        role: ['buyer', 'seller', 'admin'].includes(role) ? role : 'buyer',
        companyName: sanitizeInput(companyName || ''),
        city: sanitizeInput(city || ''),
        capacity: sanitizeInput(capacity || ''),
        membershipStatus: 'inactive',
        createdAt: new Date().toISOString()
      };
      
      await db.collection('users').insertOne(user);
      
      // Generate token
      const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '30d' });
      
      delete user.password;
      return Response.json({ user, token });
    }

    // POST /api/auth/login - Login user
    if (path === 'auth/login') {
      const { email, password } = body;
      
      if (!email || !password) {
        return Response.json({ error: 'Missing credentials' }, { status: 400 });
      }
      
      const user = await db.collection('users').findOne({ email: sanitizeInput(email.toLowerCase()) });
      if (!user) {
        return Response.json({ error: 'Invalid credentials' }, { status: 401 });
      }
      
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return Response.json({ error: 'Invalid credentials' }, { status: 401 });
      }
      
      const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '30d' });
      
      delete user.password;
      return Response.json({ user, token });
    }

    // POST /api/auth/forgot-password - Request password reset
    if (path === 'auth/forgot-password') {
      const { email } = body;
      
      if (!email || !isValidEmail(email)) {
        return Response.json({ error: 'Invalid email' }, { status: 400 });
      }
      
      const user = await db.collection('users').findOne({ email: sanitizeInput(email.toLowerCase()) });
      if (!user) {
        // Security: Don't reveal if email exists
        return Response.json({ message: 'If email exists, reset link will be sent' });
      }
      
      // Generate reset token
      const resetToken = uuidv4();
      const resetExpiry = new Date(Date.now() + 3600000); // 1 hour
      
      await db.collection('users').updateOne(
        { _id: user._id },
        { $set: { resetToken, resetExpiry: resetExpiry.toISOString() } }
      );
      
      // In production, send email here
      console.log('Password reset token:', resetToken);
      
      return Response.json({ message: 'If email exists, reset link will be sent', resetToken });
    }

    // POST /api/auth/reset-password - Reset password with token
    if (path === 'auth/reset-password') {
      const { token, newPassword } = body;
      
      if (!token || !newPassword) {
        return Response.json({ error: 'Missing required fields' }, { status: 400 });
      }
      
      if (newPassword.length < 6) {
        return Response.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
      }
      
      const user = await db.collection('users').findOne({ 
        resetToken: token,
        resetExpiry: { $gte: new Date().toISOString() }
      });
      
      if (!user) {
        return Response.json({ error: 'Invalid or expired token' }, { status: 400 });
      }
      
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      
      await db.collection('users').updateOne(
        { _id: user._id },
        { 
          $set: { password: hashedPassword },
          $unset: { resetToken: '', resetExpiry: '' }
        }
      );
      
      return Response.json({ message: 'Password reset successful' });
    }

    // POST /api/auth/change-password - Change password
    if (path === 'auth/change-password') {
      const user = verifyToken(request);
      if (!user) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const { currentPassword, newPassword } = body;
      
      if (!currentPassword || !newPassword) {
        return Response.json({ error: 'Missing required fields' }, { status: 400 });
      }
      
      if (newPassword.length < 6) {
        return Response.json({ error: 'New password must be at least 6 characters' }, { status: 400 });
      }
      
      const userDoc = await db.collection('users').findOne({ _id: user.userId });
      if (!userDoc) {
        return Response.json({ error: 'User not found' }, { status: 404 });
      }
      
      const validPassword = await bcrypt.compare(currentPassword, userDoc.password);
      if (!validPassword) {
        return Response.json({ error: 'Current password is incorrect' }, { status: 401 });
      }
      
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      
      await db.collection('users').updateOne(
        { _id: user.userId },
        { $set: { password: hashedPassword } }
      );
      
      return Response.json({ message: 'Password changed successfully' });
    }

    // POST /api/listings - Create new listing
    if (path === 'listings') {
      const user = verifyToken(request);
      if (!user) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const listing = {
        _id: uuidv4(),
        userId: user.userId,
        title: sanitizeInput(body.title),
        category: sanitizeInput(body.category),
        scrapType: sanitizeInput(body.scrapType),
        quantity: sanitizeInput(body.quantity),
        capacity: sanitizeInput(body.capacity || ''),
        price: sanitizeInput(body.price),
        location: sanitizeInput(body.location),
        description: sanitizeInput(body.description),
        images: Array.isArray(body.images) ? body.images.map(img => sanitizeInput(img)) : [],
        status: 'active',
        createdAt: new Date().toISOString()
      };
      
      await db.collection('listings').insertOne(listing);
      return Response.json({ listing });
    }

    // POST /api/import-requests - Create import request
    if (path === 'import-requests') {
      const user = verifyToken(request);
      if (!user) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const importRequest = {
        _id: uuidv4(),
        userId: user.userId,
        materialType: sanitizeInput(body.materialType),
        quantity: sanitizeInput(body.quantity),
        country: sanitizeInput(body.country),
        port: sanitizeInput(body.port || ''),
        description: sanitizeInput(body.description),
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      await db.collection('importRequests').insertOne(importRequest);
      return Response.json({ request: importRequest });
    }

    // POST /api/inquiries - Create inquiry
    if (path === 'inquiries') {
      const user = verifyToken(request);
      if (!user) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const inquiry = {
        _id: uuidv4(),
        userId: user.userId,
        listingId: sanitizeInput(body.listingId),
        message: sanitizeInput(body.message),
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      await db.collection('inquiries').insertOne(inquiry);
      return Response.json({ inquiry });
    }

    // POST /api/admin/memberships/activate - Activate membership
    if (path === 'admin/memberships/activate') {
      const admin = verifyToken(request);
      if (!admin || admin.role !== 'admin') {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const { userId, duration } = body;
      
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + (duration || 365));
      
      const membership = {
        _id: uuidv4(),
        userId: sanitizeInput(userId),
        planName: '₹5000 Annual Plan',
        status: 'active',
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        activatedBy: admin.userId,
        createdAt: new Date().toISOString()
      };
      
      await db.collection('memberships').insertOne(membership);
      
      await db.collection('users').updateOne(
        { _id: userId },
        { $set: { membershipStatus: 'active', membershipEndDate: endDate.toISOString() } }
      );
      
      return Response.json({ membership });
    }

    // POST /api/admin/settings - Update admin settings
    if (path === 'admin/settings') {
      const user = verifyToken(request);
      if (!user || user.role !== 'admin') {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const settings = {
        type: 'general',
        razorpayEnabled: body.razorpayEnabled || false,
        razorpayKeyId: sanitizeInput(body.razorpayKeyId || ''),
        razorpayKeySecret: body.razorpayKeySecret || '',
        cloudinaryEnabled: body.cloudinaryEnabled || false,
        cloudinaryCloudName: sanitizeInput(body.cloudinaryCloudName || ''),
        cloudinaryApiKey: sanitizeInput(body.cloudinaryApiKey || ''),
        cloudinaryApiSecret: body.cloudinaryApiSecret || '',
        updatedAt: new Date().toISOString()
      };
      
      await db.collection('settings').updateOne(
        { type: 'general' },
        { $set: settings },
        { upsert: true }
      );
      
      return Response.json({ message: 'Settings updated' });
    }

    return Response.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('POST error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request) {
  const db = await connectDB();
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/', '');

  try {
    const user = verifyToken(request);
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // PUT /api/listings/:id - Update listing
    if (path.startsWith('listings/')) {
      const id = sanitizeInput(path.split('/')[1]);
      const listing = await db.collection('listings').findOne({ _id: id });
      
      if (!listing) {
        return Response.json({ error: 'Not found' }, { status: 404 });
      }
      
      if (listing.userId !== user.userId && user.role !== 'admin') {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      
      const updateData = {
        title: sanitizeInput(body.title),
        category: sanitizeInput(body.category),
        scrapType: sanitizeInput(body.scrapType),
        quantity: sanitizeInput(body.quantity),
        capacity: sanitizeInput(body.capacity || ''),
        price: sanitizeInput(body.price),
        location: sanitizeInput(body.location),
        description: sanitizeInput(body.description),
        images: Array.isArray(body.images) ? body.images.map(img => sanitizeInput(img)) : listing.images,
        updatedAt: new Date().toISOString()
      };
      
      await db.collection('listings').updateOne({ _id: id }, { $set: updateData });
      
      const updated = await db.collection('listings').findOne({ _id: id });
      return Response.json({ listing: updated });
    }

    // PUT /api/import-requests/:id - Update import request status
    if (path.startsWith('import-requests/')) {
      const id = sanitizeInput(path.split('/')[1]);
      
      if (user.role !== 'admin') {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      
      await db.collection('importRequests').updateOne(
        { _id: id },
        { $set: { 
          status: sanitizeInput(body.status), 
          quote: sanitizeInput(body.quote || ''), 
          updatedAt: new Date().toISOString() 
        } }
      );
      
      const updated = await db.collection('importRequests').findOne({ _id: id });
      return Response.json({ request: updated });
    }

    return Response.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('PUT error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const db = await connectDB();
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/', '');

  try {
    const user = verifyToken(request);
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // DELETE /api/listings/:id - Delete listing
    if (path.startsWith('listings/')) {
      const id = sanitizeInput(path.split('/')[1]);
      const listing = await db.collection('listings').findOne({ _id: id });
      
      if (!listing) {
        return Response.json({ error: 'Not found' }, { status: 404 });
      }
      
      if (listing.userId !== user.userId && user.role !== 'admin') {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      
      await db.collection('listings').deleteOne({ _id: id });
      return Response.json({ message: 'Deleted' });
    }

    return Response.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('DELETE error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}