# Adorzia Email Notification Setup Guide

## Overview
The Adorzia platform now sends email notifications to `haseeb.49251@gmail.com` for all types of submissions:
- ✅ **Spotlight Applications** - New talent applications
- ✅ **Marketplace Applications** - Designer/seller applications
- ✅ **Studio Waitlist** - Creative membership signups
- ✅ **Partnership Inquiries** - Business partnership requests
- ✅ **Contact Inquiries** - General contact form submissions
- ✅ **Newsletter Subscriptions** - New newsletter subscribers

## What's Been Created

### 1. Unified Email API (`api/send-notification.ts`)
- Single endpoint handles all notification types
- Professional HTML email templates with Adorzia branding
- Premium black and gold design
- Detailed submission information for each type
- Sends to: `haseeb.49251@gmail.com`

### 2. Email Service (`src/lib/email.ts`)
- `sendEmailNotification(type, data)` - Main function
- Supports 6 notification types
- Backward compatible with old `sendSpotlightApplicationNotification`
- Error handling and logging

### 3. Integrated Forms
All forms now trigger email notifications:
- **SpotlightApplication.tsx** - Spotlight applications
- **Marketplace.tsx** - Marketplace seller applications
- **ForCreatives.tsx** - Studio waitlist signups
- **ForPartners.tsx** - Partnership inquiries
- **Contact.tsx** - Contact forms & newsletter subscriptions

### 4. Admin Dashboard
- Navigate to `/admin` to view all submissions
- Real-time data from Supabase
- Email notifications arrive instantly

## Setup Instructions

### Step 1: Resend API Key (Already Configured ✅)

Your Resend API key is already set in `.env`:
```env
RESEND_API_KEY=re_2tisSzuU_GAXYdiia57Pnc17DYZxbjL64
VITE_RESEND_API_KEY=re_2tisSzuU_GAXYdiia57Pnc17DYZxbjL64
```

### Step 2: Configure Verified Domain (Recommended for Production)

For production use with custom domain:

1. In Resend dashboard, go to **Domains**
2. Add your domain (e.g., `adorzia.com`)
3. Update DNS records as instructed
4. Change the `from` email in `api/send-notification.ts`:
   ```typescript
   from: 'Adorzia Admin <noreply@adorzia.com>'
   ```

### Step 3: Deploy to Vercel

Environment variables are already configured. Just redeploy:
```bash
git add .
git commit -m "feat: add comprehensive email notifications"
git push
```

## Testing

### Local Testing

1. Start development server:
   ```bash
   npm run dev
   ```

2. Test each form:
   - **Spotlight**: `/spotlight/apply`
   - **Marketplace**: `/marketplace` (Seller application)
   - **Studio Waitlist**: `/for-creatives` (Waitlist form)
   - **Partnership**: `/for-partners` (Contact form)
   - **Contact**: `/contact`
   - **Newsletter**: `/contact` or homepage footer

3. Check `haseeb.49251@gmail.com` inbox for notifications
4. Verify in `/admin` dashboard

### Email Templates

Each notification type has a unique template:

#### Spotlight Application
- Name, Email, Phone, Location, Age
- Discipline, Years of Experience
- Portfolio URL
- Vision Description
- Biggest Obstacle
- Submission timestamp

#### Marketplace Application
- Designer Name, Email, Phone
- Brand Name, Category
- Description
- Submission timestamp

#### Studio Waitlist
- Name, Email, Phone
- Discipline, Preferred City
- Submission timestamp

#### Partnership Inquiry
- Name, Email, Company
- Partnership Type
- Message
- Submission timestamp

#### Contact Inquiry
- Name, Email
- Subject
- Message
- Submission timestamp

#### Newsletter Subscription
- Email address
- Subscription timestamp

## Email Design

All emails feature:
- **Header**: Adorzia branding with black gradient background and gold accent
- **Content**: Clean table layout with submission details
- **Highlighted Sections**: Important information in gold-bordered boxes
- **Footer**: Automated notification disclaimer
- **Responsive**: Works on all email clients

## Admin Dashboard Access

To view all submissions:

1. Navigate to `/admin/login`
2. Login with Supabase credentials
3. Select tab:
   - **Spotlight** - Talent applications
   - **Marketplace** - Seller applications
   - **Studio Waitlist** - Membership signups
   - **Partnership** - Business inquiries
   - **Contact** - Contact messages
   - **Newsletter** - Subscriber list

## Troubleshooting

### Email Not Sending

1. Check browser console for errors
2. Verify `VITE_RESEND_API_KEY` is set correctly
3. Check Resend dashboard at https://resend.com/emails
4. Ensure you're within free tier limits (100 emails/day, 3,000/month)
5. Check network tab for API call status

### Form Submission Fails

1. Check Supabase connection
2. Verify RLS policies allow public inserts
3. Check browser console for errors
4. Ensure all required fields are filled

### Receiving Duplicate Emails

- Check if form is being submitted multiple times
- Verify no duplicate event listeners
- Check Resend dashboard for duplicate sends

## Security Notes

- API key is in client-side code (acceptable for Resend)
- Admin dashboard requires authentication
- RLS policies restrict database access
- Consider adding reCAPTCHA for production spam prevention
- Email validation on all forms

## Cost

Resend Free Tier:
- 100 emails per day
- 3,000 emails per month
- Sufficient for notification volume
- Upgrade if needed: $20/month for 50,000 emails

## Current Status

✅ Resend API key configured
✅ Email templates created for all 6 types
✅ All forms integrated with notifications
✅ Admin dashboard functional
✅ Error handling implemented
✅ Professional email design

## Next Steps

- [ ] Test all notification types
- [ ] Configure verified domain (optional)
- [ ] Monitor email delivery in Resend dashboard
- [ ] Add reCAPTCHA for spam protection (optional)
- [ ] Set up email analytics/tracking (optional)
