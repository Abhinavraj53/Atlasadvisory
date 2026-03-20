# Atlas Advisory - Premium B2B Scrap Marketplace

A stunning, multi-page storytelling website for Rareus Private Limited's client Atlas Advisory. Built with Next.js 14, featuring Apple-style animations and a comprehensive admin panel.

## 🌟 Features

### Public Pages
- **Homepage** - Apple-style storytelling with cinematic hero, animated counters, smooth scrolling
- **Marketplace** - Browse scrap listings with filters and search
- **Import Services** - Global sourcing request submission
- **DRT/NCLT Assets** - Asset liquidation listings
- **User Dashboard** - Profile management and listing creation

### Admin Panel
- **Dashboard** - Live statistics and overview
- **User Management** - Activate/deactivate memberships
- **Listings Management** - View and manage all listings
- **Import Requests** - Approve/reject import requests
- **Settings** - Configure Razorpay payment gateway

### Key Features
- ✅ JWT Authentication with role-based access
- ✅ MongoDB database integration
- ✅ Framer Motion animations
- ✅ Mobile-first responsive design
- ✅ Premium Apple/Samsung-style design
- ✅ \u20b95,000/year membership system
- ✅ Manual membership activation
- ✅ Ready for Razorpay integration

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: JWT

## 📦 Installation

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build
```

## 🔐 Admin Access

```
Email: admin@atlasadvisory.com
Password: admin123
```

**⚠️ Change this password after first login!**

## 🗂️ Project Structure

```
/app
├── app/
│   ├── page.js                    # Homepage
│   ├── marketplace/page.js        # Marketplace
│   ├── import/page.js             # Import services
│   ├── drt-assets/page.js         # DRT/NCLT assets
│   ├── dashboard/page.js          # User dashboard
│   ├── admin/                     # Admin panel
│   │   ├── page.js                # Dashboard
│   │   ├── users/page.js          # User management
│   │   ├── listings/page.js       # Listings management
│   │   ├── import-requests/page.js # Import requests
│   │   └── settings/page.js       # Payment settings
│   ├── api/[[...path]]/route.js   # Backend API
│   └── layout.js                  # Root layout
├── components/
│   ├── Navbar.js                  # Navigation
│   ├── Footer.js                  # Footer
│   └── AuthDialog.js              # Authentication modal
├── scripts/
│   ├── create-admin.js            # Create admin user
│   └── seed-data.js               # Seed sample data
└── .env                           # Environment variables
```

## 📊 Seed Data

Run the seed script to populate the database with sample data:

```bash
# Create admin user
node scripts/create-admin.js

# Add sample listings and assets
node scripts/seed-data.js
```

This creates:
- 8 scrap listings (various categories)
- 6 DRT/NCLT assets
- 3 import requests

## 🎨 Design Features

- **Cinematic hero section** with parallax effects
- **Framer Motion animations** throughout
- **Apple-style smooth transitions**
- **Floating particles** and gradient overlays
- **Professional color scheme**: Dark green (#0B3D2E), Teal (#00C896)
- **Mobile-first responsive design**
- **Sticky navigation** with blur backdrop
- **Floating WhatsApp button**

## 🔧 Configuration

### Environment Variables

```env
MONGO_URL=mongodb://localhost:27017
JWT_SECRET=rareus-atlas-secret-2024
```

### Razorpay Integration (Optional)

1. Go to `/admin/settings`
2. Add your Razorpay Key ID and Secret
3. Enable payments
4. Membership payments will work automatically

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/profile` - Get user profile

### Listings
- `GET /api/listings` - Get all listings
- `POST /api/listings` - Create listing
- `PUT /api/listings/:id` - Update listing
- `DELETE /api/listings/:id` - Delete listing

### Import Requests
- `GET /api/import-requests` - Get import requests
- `POST /api/import-requests` - Create request
- `PUT /api/import-requests/:id` - Update request

### DRT Assets
- `GET /api/drt-assets` - Get DRT assets
- `POST /api/drt-assets` - Create asset (admin only)

### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - Get all users
- `POST /api/admin/memberships/activate` - Activate membership
- `GET /api/admin/settings` - Get settings
- `POST /api/admin/settings` - Update settings

## 🎯 User Roles

1. **Admin** - Full access to admin panel
2. **Buyer** - Browse and inquire listings
3. **Seller** - Create listings and manage inventory

## 💳 Membership System

- **Free Account**: Limited features
- **Premium (\u20b95,000/year)**: 
  - Unlimited listings
  - Priority support
  - Exclusive deals
  - Manual activation by admin
  - Ready for Razorpay payment integration

## 🌐 Live URLs

- Homepage: `/`
- Marketplace: `/marketplace`
- Import Services: `/import`
- DRT/NCLT Assets: `/drt-assets`
- User Dashboard: `/dashboard`
- Admin Panel: `/admin`

## 📱 Mobile Support

Fully responsive design optimized for:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Role-based access control
- Environment variable protection

## 🎉 Next Steps

1. **Customize Content**: Update company details, contact information
2. **Add More Listings**: Use dashboard to create real listings
3. **Configure Razorpay**: Add API keys in admin settings
4. **Test Features**: Try all user flows
5. **Deploy**: Deploy to your hosting platform

## 📞 Support

For issues or questions, contact the development team.

---

**Built with ❤️ by Emergent AI**
*Powered by Rareus Private Limited for Atlas Advisory*