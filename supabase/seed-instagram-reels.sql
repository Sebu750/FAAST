-- Add Instagram Reels seed data to designer profiles
-- Each designer gets 3 Instagram reel embed URLs

UPDATE designers 
SET instagram_reels = ARRAY[
  'https://www.instagram.com/reel/DV89WHbgrgv/embed',
  'https://www.instagram.com/reel/DYnNODwisk0/embed',
  'https://www.instagram.com/reel/DUlz0G2Am6a/embed'
]
WHERE slug = 'nazia-otho';

UPDATE designers 
SET instagram_reels = ARRAY[
  'https://www.instagram.com/reel/DV89WHbgrgv/embed',
  'https://www.instagram.com/reel/DYnNODwisk0/embed',
  'https://www.instagram.com/reel/DUlz0G2Am6a/embed'
]
WHERE slug = 'zara-ahmad';

UPDATE designers 
SET instagram_reels = ARRAY[
  'https://www.instagram.com/reel/DV89WHbgrgv/embed',
  'https://www.instagram.com/reel/DYnNODwisk0/embed',
  'https://www.instagram.com/reel/DUlz0G2Am6a/embed'
]
WHERE slug = 'fatima-noor';
