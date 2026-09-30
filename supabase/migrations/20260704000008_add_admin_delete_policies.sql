-- ==========================================
-- ADD MISSING DELETE POLICIES FOR ADMIN
-- ==========================================
-- contact_inquiries and newsletter_subscriptions had RLS enabled but no DELETE
-- policy, so authenticated admin deletes silently affected 0 rows.

-- contact_inquiries
DROP POLICY IF EXISTS "Allow authenticated delete on contact_inquiries" ON contact_inquiries;
CREATE POLICY "Allow authenticated delete on contact_inquiries"
  ON contact_inquiries FOR DELETE TO authenticated USING (true);

-- newsletter_subscriptions
DROP POLICY IF EXISTS "Allow authenticated delete on newsletter_subscriptions" ON newsletter_subscriptions;
CREATE POLICY "Allow authenticated delete on newsletter_subscriptions"
  ON newsletter_subscriptions FOR DELETE TO authenticated USING (true);
