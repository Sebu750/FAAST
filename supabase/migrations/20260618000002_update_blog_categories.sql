-- ==========================================
-- UPDATE BLOG CATEGORIES WITH TAGS
-- ==========================================
-- This migration updates the blog categories to the new structure
-- and adds a tags column to categories for predefined tags

-- Add tags column to blog_categories
ALTER TABLE blog_categories ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- Clear existing categories (optional - comment out if you want to preserve old ones)
-- DELETE FROM blog_categories;

-- Insert/Update new categories with their tags
INSERT INTO blog_categories (name, slug, description, tags) VALUES
  ('Fashion Startups', 'fashion-startups', 'Building fashion brands from the ground up', 
    ARRAY['Brand Building', 'Startup Guide', 'Manufacturing', 'Pricing', 'Sales', 'Marketing', 'Funding', 'Growth']),
  
  ('Designers', 'designers', 'Spotlight on emerging and established designers',
    ARRAY['Student Spotlight', 'Graduate Stories', 'Founder Interview', 'Emerging Designer', 'Brand Story']),
  
  ('Collections', 'collections', 'Fashion collections, lookbooks, and reviews',
    ARRAY['Thesis Collection', 'New Collection', 'Capsule Collection', 'Lookbook', 'Collection Review']),
  
  ('Universities', 'universities', 'Fashion education and university news',
    ARRAY['Final Year Project', 'Fashion Show', 'Campus Event', 'Student Competition', 'University News']),
  
  ('Fashion Business', 'fashion-business', 'The business side of fashion',
    ARRAY['Retail', 'Export', 'Supply Chain', 'Inventory', 'Fashion Finance']),
  
  ('Branding & Marketing', 'branding-marketing', 'Building and promoting fashion brands',
    ARRAY['Logo', 'Packaging', 'Storytelling', 'Ecommerce', 'Instagram', 'Photography']),
  
  ('Industry Insights', 'industry-insights', 'Market analysis and industry trends',
    ARRAY['Market Research', 'Textile Industry', 'Consumer Trends', 'Reports', 'Analysis']),
  
  ('Resources', 'resources', 'Tools and resources for fashion entrepreneurs',
    ARRAY['Templates', 'Checklists', 'Manufacturers', 'Fabric Suppliers', 'Grants', 'Competitions']),
  
  ('Opportunities', 'opportunities', 'Career and growth opportunities',
    ARRAY['Internships', 'Jobs', 'Freelance', 'Scholarships', 'Incubators', 'Accelerators', 'Events']),
  
  ('Adorzia Journal', 'adorzia-journal', 'Platform updates and community news',
    ARRAY['Platform Updates', 'Roadmap', 'Partnerships', 'Community', 'Announcements']),
  
  ('Awards', 'awards', 'Fashion awards and recognition (Future)',
    ARRAY[]::TEXT[]),
  
  ('Fashion Technology', 'fashion-technology', 'Technology in fashion (Future)',
    ARRAY[]::TEXT[]),
  
  ('Sustainability', 'sustainability', 'Sustainable fashion practices (Future)',
    ARRAY[]::TEXT[]),
  
  ('Opinion', 'opinion', 'Opinion pieces and thought leadership (Future)',
    ARRAY[]::TEXT[])

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  tags = EXCLUDED.tags;

-- Update blog_posts tags column to use text array properly
-- (This is already set up in the original migration)
