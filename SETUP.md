# FAAST Website Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Supabase account
- Resend account (for email notifications)

### 1. Installation

```bash
# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_RESEND_API_KEY=your_resend_api_key
```

### 3. Supabase Setup

1. Create a new project at https://supabase.com
2. Go to SQL Editor in your Supabase dashboard
3. Run the entire `supabase-setup.sql` script
4. Create an admin user:
   - Go to Authentication > Users
   - Click "Add User"
   - Add email and password for admin access

### 4. Run Development Server

```bash
npm run dev
```

The app will be available at http://localhost:5173

### 5. Build for Production

```bash
npm run build
```

### 6. Deploy to Vercel/Netlify

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm run build
# Drag and drop the `dist` folder to Netlify
```

## 📁 Project Structure

```
FAAST/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── lib/                 # Configuration & utilities
│   │   ├── supabase.ts
│   │   └── email.ts
│   ├── pages/               # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── ForCreatives.tsx
│   │   ├── ForPartners.tsx
│   │   ├── SpotlightEvent.tsx
│   │   ├── Contact.tsx
│   │   ├── AdminLogin.tsx
│   │   └── AdminDashboard.tsx
│   ├── types/               # TypeScript types
│   │   └── database.ts
│   ├── App.tsx              # Main app component with routing
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles (Tailwind)
├── supabase-setup.sql       # Database setup script
├── .env.example             # Environment variables template
└── package.json
```

## 🎨 Pages

1. **Home** - Landing page with hero section and features
2. **About** - Company vision and offerings
3. **For Creatives** - Information for fashionpreneurs
4. **For Partners** - Partnership opportunities
5. **Spotlight Event** - Application form for events
6. **Contact** - Contact form and newsletter subscription
7. **Admin Login** - Secure admin authentication
8. **Admin Dashboard** - View all submissions and inquiries

## 🔐 Admin Access

- Admin login: `/admin/login`
- Dashboard: `/admin/dashboard`
- Protected by Supabase Authentication

## 📧 Email Notifications (Resend)

To enable email notifications:

1. Sign up at https://resend.com
2. Get your API key
3. Set up email sending via API routes or Edge Functions
4. Add Resend API key to `.env`

## 🎯 Features

✅ Fully responsive design (mobile, tablet, desktop)
✅ Supabase database integration
✅ Admin authentication
✅ Newsletter subscription
✅ Contact inquiries
✅ Partnership inquiries
✅ Spotlight event applications
✅ Real-time data dashboard
✅ Fashion-forward UI design

## 🛠 Tech Stack

- **Frontend:** Vite + React + TypeScript
- **Styling:** Tailwind CSS v4
- **Backend:** Supabase (Database + Auth)
- **Email:** Resend
- **Routing:** React Router v7
- **Hosting:** Vercel / Netlify

## 📝 Database Tables

1. `newsletter_subscriptions` - Email subscribers
2. `contact_inquiries` - Contact form submissions
3. `partnership_inquiries` - Partnership requests
4. `spotlight_applications` - Event applications

All tables have Row Level Security (RLS) enabled with appropriate policies.

## 🔧 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🎨 Customization

### Colors
Edit Tailwind classes throughout the components. Primary color is purple-600.

### Content
All page content is in the respective page components in `src/pages/`.

### Forms
Form schemas are defined in each page component. Modify as needed.

## 🚨 Troubleshooting

**Supabase connection errors:**
- Verify your `.env` file has correct Supabase URL and anon key
- Check that tables are created in Supabase

**Build errors:**
- Run `npm install` to ensure all dependencies are installed
- Clear cache: `rm -rf node_modules && npm install`

**Admin login not working:**
- Ensure you created an admin user in Supabase Authentication
- Check that the user is confirmed/verified

## 📞 Support

For issues or questions, please contact the development team.
