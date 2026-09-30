-- ==========================================
-- RENAME BLOG CATEGORIES TO JOURNAL STRUCTURE
-- ==========================================
-- This migration updates the blog categories to the new Journal structure:
-- Designer Stories, Brand Stories, Fashion Industry, Opportunities, Adorzia Updates

-- Update existing categories to new names and descriptions
-- Map old categories to new ones:
--   Designers -> Designer Stories
--   Fashion Startups / Fashion Business -> Brand Stories
--   Industry Insights -> Fashion Industry
--   Opportunities -> Opportunities (keep)
--   Adorzia Journal -> Adorzia Updates

-- Designer Stories (from Designers)
UPDATE blog_categories SET
  name = 'Designer Stories',
  description = 'Profiles, journeys, and creative work of emerging designers'
WHERE slug = 'designers';

-- Brand Stories (from Fashion Startups)
UPDATE blog_categories SET
  name = 'Brand Stories',
  description = 'Stories and journeys of emerging fashion brands'
WHERE slug = 'fashion-startups';

-- Fashion Industry (from Industry Insights)
UPDATE blog_categories SET
  name = 'Fashion Industry',
  description = 'Trends, insights, and industry perspectives'
WHERE slug = 'industry-insights';

-- Opportunities (update description only)
UPDATE blog_categories SET
  description = 'Competitions, programs, jobs, grants, and opportunities'
WHERE slug = 'opportunities';

-- Adorzia Updates (from Adorzia Journal)
UPDATE blog_categories SET
  name = 'Adorzia Updates',
  description = 'News, announcements, events, and company updates'
WHERE slug = 'adorzia-journal';

-- Remove ALL categories except the 5 core Journal categories
-- Reassign any posts in deleted categories to NULL (uncategorized)
UPDATE blog_posts SET category_id = NULL WHERE category_id NOT IN (
  SELECT id FROM blog_categories WHERE slug IN ('designers', 'fashion-startups', 'industry-insights', 'opportunities', 'adorzia-journal')
);

DELETE FROM blog_categories WHERE slug NOT IN (
  'designers',
  'fashion-startups',
  'industry-insights',
  'opportunities',
  'adorzia-journal'
);
