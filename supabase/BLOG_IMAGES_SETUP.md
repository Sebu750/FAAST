Blog image upload repair
=======================

Apply `migrations/20261009000000_blog_images_storage.sql` in the linked
Supabase project's SQL Editor (or through your normal migration deployment).
It creates or updates the public `blog-images` bucket and grants INSERT only
to authenticated accounts accepted by the existing `public.is_admin()` helper.
Public buckets allow visitors to read images without signing in.

The bucket and frontend accept JPEG, PNG, WebP, and GIF up to 5 MB.
Image files go into Storage; their public URLs are saved in
`blog_posts.featured_image_url`, `blog_posts.banner_image_url`, or the post's
HTML `content`. Those database columns already exist in the blog schema.

If an admin gets a permission error, confirm their account is recognized by
`public.is_admin()`; additional admins can be registered in the existing
`public.admin_users` table with `is_active = true`.

Verify after deployment:
1. Sign in as an admin and edit a blog post.
2. Upload a banner, featured image, and an image using the article toolbar.
3. Save, reopen the post, and confirm all three images persist.
4. Open a published post signed out and confirm its images load.
5. Try an unsupported file or an image larger than 5 MB and confirm the error.

Local checks cannot prove authenticated uploads work in production until
this migration is applied and the updated frontend is deployed.
