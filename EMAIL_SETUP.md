# FAAST Email Notification Setup Guide

## Overview
The Spotlight application form now sends email notifications to `haseeb.49251@gmail.com` every time a new application is submitted.

## What's Been Created

### 1. Email Notification System (`src/lib/email.ts`)
- Uses **Resend** API to send professional HTML email notifications
- Emails include all application details formatted in a premium design
- Sends to: `haseeb.49251@gmail.com`
- Includes: Applicant name, email, brand name, portfolio URL, concept statement, and submission timestamp

### 2. Updated Spotlight Application Form (`src/pages/SpotlightEvent.tsx`)
- Form submission now triggers email notification after successful Supabase insertion
- Email sends asynchronously without blocking the user experience
- Error handling ensures form submission succeeds even if email fails

### 3. Admin Dashboard (Already Exists)
- Navigate to `/admin` to view all spotlight applications
- Login required for security
- Applications displayed in table format with all details

## Setup Instructions

### Step 1: Get Resend API Key

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Navigate to **API Keys** section
4. Create a new API key
5. Copy the API key (starts with `re_`)

### Step 2: Update Environment Variables

Edit `.env` file and replace the placeholder:

```env
VITE_RESEND_API_KEY=re_your_actual_api_key_here
```

Replace with your actual Resend API key:

```env
VITE_RESEND_API_KEY=re_AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
```

### Step 3: Configure Verified Domain (Optional but Recommended)

For production use, you should:

1. In Resend dashboard, go to **Domains**
2. Add your domain (e.g., `faast.com`)
3. Update DNS records as instructed
4. Change the `from` email in `src/lib/email.ts` from:
   ```typescript
   from: 'FAAST Applications <onboarding@resend.dev>'
   ```
   to:
   ```typescript
   from: 'FAAST Applications <noreply@yourdomain.com>'
   ```

### Step 4: Deploy to Vercel

Add environment variables in Vercel:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add `VITE_RESEND_API_KEY` with your Resend API key
4. Add `VITE_SITE_URL` with your production URL
5. Redeploy the application

## Testing

### Local Testing

1. Start development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/spotlight-event`
3. Fill out and submit the application form
4. Check `haseeb.49251@gmail.com` inbox for notification email
5. Check `/admin` dashboard to verify application was saved

### Email Preview

The notification email includes:
- **Header**: FAAST branding with burgundy background and gold accent
- **Applicant Details**: Name, email, brand name, portfolio URL
- **Concept Statement**: Full text in a highlighted box
- **Submission Timestamp**: Date and time of submission
- **Next Steps**: Action items for admin review
- **Footer**: Link to admin dashboard

## Admin Dashboard Access

To view all spotlight applications:

1. Navigate to `/admin/login`
2. Login with your Supabase credentials
3. Click on "Spotlight Applications" tab
4. View all submitted applications with full details

## Database Schema

Applications are stored in `spotlight_applications` table with:
- `id` (UUID, auto-generated)
- `name` (Applicant full name)
- `email` (Applicant email)
- `brand_name` (Fashion brand name)
- `portfolio_url` (Optional portfolio link)
- `description` (Contains phone, location, Instagram, and concept statement)
- `created_at` (Timestamp)

## Troubleshooting

### Email Not Sending

1. Check console for Resend API errors
2. Verify `VITE_RESEND_API_KEY` is correctly set
3. Check Resend dashboard for delivery status
4. Ensure you're not exceeding free tier limits (100 emails/day, 3,000/month)

### Form Submission Fails

1. Check Supabase connection
2. Verify RLS policies allow public inserts
3. Check browser console for errors
4. Ensure all required fields are filled

### Admin Dashboard Empty

1. Verify you're logged in
2. Check Supabase table has data
3. Verify RLS policies allow authenticated selects
4. Refresh the page

## Security Notes

- API key is exposed in client-side code (acceptable for Resend)
- Admin dashboard requires authentication
- RLS policies restrict database access
- Consider adding reCAPTCHA for production to prevent spam

## Cost

Resend Free Tier:
- 100 emails per day
- 3,000 emails per month
- Sufficient for application notifications
- Upgrade if needed: $20/month for 50,000 emails

## Next Steps

- [ ] Get Resend API key
- [ ] Update `.env` file
- [ ] Test email notification
- [ ] Configure verified domain (optional)
- [ ] Deploy to Vercel with environment variables
- [ ] Monitor email delivery in Resend dashboard
