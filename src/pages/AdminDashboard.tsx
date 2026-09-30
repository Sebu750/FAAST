import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { NewsletterSubscription, ContactInquiry, PartnershipInquiry, MarketplaceApplication, StudioWaitlist, SpotlightApplication } from '../types/database'
import BlogManagement from './BlogManagement'
import DesignerManagement from './DesignerManagement'
import AdminOpportunities from './AdminOpportunities'
import AdminEventsManagement from './AdminEventsManagement'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminTopBar from '../components/admin/AdminTopBar'
import OverviewTab from '../components/admin/OverviewTab'
import type { ActivityItem } from '../components/admin/OverviewTab'
import SpotlightTable from '../components/admin/SpotlightTable'
import MarketplaceTable from '../components/admin/MarketplaceTable'
import StudioWaitlistTable from '../components/admin/StudioWaitlistTable'
import PartnershipTable from '../components/admin/PartnershipTable'
import ContactTable from '../components/admin/ContactTable'
import NewsletterTable from '../components/admin/NewsletterTable'
import { useToast } from '../components/admin/Toast'
import type { DashboardCounts } from '../components/admin/shared'

type TabKey = 'overview' | 'spotlight' | 'marketplace' | 'studio-waitlist' | 'partnership' | 'newsletter' | 'contact' | 'blog' | 'designers' | 'events'
type EventsSubTab = 'opportunities' | 'events'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [newsletterSubscriptions, setNewsletterSubscriptions] = useState<NewsletterSubscription[]>([])
  const [contactInquiries, setContactInquiries] = useState<ContactInquiry[]>([])
  const [partnershipInquiries, setPartnershipInquiries] = useState<PartnershipInquiry[]>([])
  const [spotlightApplications, setSpotlightApplications] = useState<SpotlightApplication[]>([])
  const [marketplaceApplications, setMarketplaceApplications] = useState<MarketplaceApplication[]>([])
  const [studioWaitlist, setStudioWaitlist] = useState<StudioWaitlist[]>([])
  const [dashboardCounts, setDashboardCounts] = useState<DashboardCounts | null>(null)
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>([])
  const [eventsSubTab, setEventsSubTab] = useState<EventsSubTab>('opportunities')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    checkAuth()
    fetchData()
  }, [activeTab])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      navigate('/admin/login')
    }
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      if (activeTab === 'overview') {
        await fetchDashboardCounts()
      } else if (activeTab === 'newsletter') {
        const { data } = await supabase.from('newsletter_subscriptions').select('*').order('created_at', { ascending: false })
        if (data) setNewsletterSubscriptions(data)
      } else if (activeTab === 'contact') {
        const { data } = await supabase.from('contact_inquiries').select('*').order('created_at', { ascending: false })
        if (data) setContactInquiries(data)
      } else if (activeTab === 'partnership') {
        const { data } = await supabase.from('partnership_inquiries').select('*').order('created_at', { ascending: false })
        if (data) setPartnershipInquiries(data)
      } else if (activeTab === 'spotlight') {
        const { data } = await supabase.from('spotlight_applications').select('*').order('created_at', { ascending: false })
        if (data) setSpotlightApplications(data)
      } else if (activeTab === 'marketplace') {
        const { data } = await supabase.from('marketplace_applications').select('*').order('created_at', { ascending: false })
        if (data) setMarketplaceApplications(data)
      } else if (activeTab === 'studio-waitlist') {
        const { data } = await supabase.from('studio_waitlist').select('*').order('created_at', { ascending: false })
        if (data) setStudioWaitlist(data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchDashboardCounts = async () => {
    try {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const todayISO = today.toISOString()

      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      const weekISO = sevenDaysAgo.toISOString()

      const results = await Promise.all([
        supabase.from('contact_inquiries').select('id', { count: 'exact', head: true }).gte('created_at', todayISO),
        supabase.from('spotlight_applications').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('spotlight_applications').select('id', { count: 'exact', head: true }),
        supabase.from('marketplace_applications').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('marketplace_applications').select('id', { count: 'exact', head: true }),
        supabase.from('studio_waitlist').select('id', { count: 'exact', head: true }),
        supabase.from('partnership_inquiries').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('partnership_inquiries').select('id', { count: 'exact', head: true }),
        supabase.from('newsletter_subscriptions').select('id', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('id', { count: 'exact', head: true }).eq('status', 'published'),
        supabase.from('blog_posts').select('id', { count: 'exact', head: true }).eq('status', 'draft'),
        supabase.from('designers').select('id', { count: 'exact', head: true }),
        supabase.from('designers').select('id', { count: 'exact', head: true }).eq('is_active', true),
        // Weekly deltas
        supabase.from('spotlight_applications').select('id', { count: 'exact', head: true }).gte('created_at', weekISO),
        supabase.from('marketplace_applications').select('id', { count: 'exact', head: true }).gte('created_at', weekISO),
        supabase.from('studio_waitlist').select('id', { count: 'exact', head: true }).gte('created_at', weekISO),
        supabase.from('partnership_inquiries').select('id', { count: 'exact', head: true }).gte('created_at', weekISO),
        supabase.from('contact_inquiries').select('id', { count: 'exact', head: true }).gte('created_at', weekISO),
        supabase.from('newsletter_subscriptions').select('id', { count: 'exact', head: true }).gte('created_at', weekISO),
      ])
      const [inquiriesToday, spotlightPending, spotlightTotal, marketplacePending, marketplaceTotal, studioWaitlistTotal, partnershipPending, partnershipTotal, newsletterTotal, blogTotal, blogPublished, blogDrafts, designersTotal, designersActive, spotlightWeek, marketplaceWeek, studioWeek, partnershipWeek, contactWeek, newsletterWeek] = results

      setDashboardCounts({
        inquiries_today: inquiriesToday.count || 0,
        spotlight_pending: spotlightPending.count || 0,
        spotlight_total: spotlightTotal.count || 0,
        marketplace_pending: marketplacePending.count || 0,
        marketplace_total: marketplaceTotal.count || 0,
        studio_waitlist_total: studioWaitlistTotal.count || 0,
        partnership_pending: partnershipPending.count || 0,
        partnership_total: partnershipTotal.count || 0,
        newsletter_total: newsletterTotal.count || 0,
        blog_total: blogTotal.count || 0,
        blog_published: blogPublished.count || 0,
        blog_drafts: blogDrafts.count || 0,
        designers_total: designersTotal.count || 0,
        designers_active: designersActive.count || 0,
        spotlight_week: spotlightWeek.count || 0,
        marketplace_week: marketplaceWeek.count || 0,
        studio_week: studioWeek.count || 0,
        partnership_week: partnershipWeek.count || 0,
        contact_week: contactWeek.count || 0,
        newsletter_week: newsletterWeek.count || 0,
      })

      // Fetch cross-type activity feed (10 most recent across all tables)
      await fetchActivityFeed()
    } catch (error) {
      console.error('Error fetching dashboard counts:', error)
    }
  }

  const fetchActivityFeed = async () => {
    try {
      const [spotlightRes, marketplaceRes, studioRes, partnershipRes, contactRes, newsletterRes] = await Promise.all([
        supabase.from('spotlight_applications').select('id, name, email, location, status, created_at').order('created_at', { ascending: false }).limit(10),
        supabase.from('marketplace_applications').select('id, brand_name, founder_name, email, category, status, created_at').order('created_at', { ascending: false }).limit(10),
        supabase.from('studio_waitlist').select('id, name, email, discipline, preferred_city, status, created_at').order('created_at', { ascending: false }).limit(10),
        supabase.from('partnership_inquiries').select('id, company_name, contact_name, email, message, created_at').order('created_at', { ascending: false }).limit(10),
        supabase.from('contact_inquiries').select('id, name, email, message, created_at').order('created_at', { ascending: false }).limit(10),
        supabase.from('newsletter_subscriptions').select('id, email, created_at').order('created_at', { ascending: false }).limit(10),
      ])

      const items: ActivityItem[] = []

      if (spotlightRes.data) {
        spotlightRes.data.forEach(r => items.push({
          id: r.id, type: 'Spotlight', name: r.name, email: r.email,
          detail: r.location, status: r.status, created_at: r.created_at
        }))
      }
      if (marketplaceRes.data) {
        marketplaceRes.data.forEach(r => items.push({
          id: r.id, type: 'Marketplace', name: r.founder_name, email: r.email,
          detail: `${r.brand_name} — ${r.category}`, status: r.status, created_at: r.created_at
        }))
      }
      if (studioRes.data) {
        studioRes.data.forEach(r => items.push({
          id: r.id, type: 'Studio', name: r.name, email: r.email,
          detail: `${r.discipline} — ${r.preferred_city || 'Any city'}`, status: r.status, created_at: r.created_at
        }))
      }
      if (partnershipRes.data) {
        partnershipRes.data.forEach(r => items.push({
          id: r.id, type: 'Partnership', name: r.contact_name, email: r.email,
          detail: r.company_name, created_at: r.created_at
        }))
      }
      if (contactRes.data) {
        contactRes.data.forEach(r => items.push({
          id: r.id, type: 'Contact', name: r.name, email: r.email,
          detail: r.message.slice(0, 120), created_at: r.created_at
        }))
      }
      if (newsletterRes.data) {
        newsletterRes.data.forEach(r => items.push({
          id: r.id, type: 'Newsletter', name: r.email, email: r.email,
          detail: 'New subscriber', created_at: r.created_at
        }))
      }

      items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      setActivityFeed(items.slice(0, 15))
    } catch (error) {
      console.error('Error fetching activity feed:', error)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  const handleDelete = async (table: string, id: string) => {
    if (!confirm('Are you sure you want to delete this entry? This action cannot be undone.')) return

    try {
      const { data, error } = await supabase.from(table).delete().eq('id', id).select('id')
      if (error) {
        toast.error('Delete failed: ' + error.message)
        return
      }
      if (!data || data.length === 0) {
        toast.error('Delete failed: no rows were removed. A database DELETE policy may be missing.')
        return
      }
      fetchData()
      toast.success('Entry deleted successfully')
    } catch (error) {
      console.error('Error deleting:', error)
      toast.error('Failed to delete entry')
    }
  }

  const handleBulkDelete = async (table: string, ids: string[]) => {
    if (!confirm(`Delete ${ids.length} selected entries? This cannot be undone.`)) return
    try {
      const { data, error } = await supabase.from(table).delete().in('id', ids).select('id')
      if (error) { toast.error('Bulk delete failed: ' + error.message); return }
      if (!data || data.length === 0) { toast.error('Bulk delete failed: no rows removed.'); return }
      fetchData()
      toast.success(`${data.length} entries deleted`)
    } catch (error) {
      console.error('Error bulk deleting:', error)
      toast.error('Failed to delete entries')
    }
  }

  const handleStatusChange = async (table: string, id: string, status: string) => {
    try {
      const { error } = await supabase.from(table).update({ status }).eq('id', id)
      if (error) { toast.error('Status update failed: ' + error.message); return }
      fetchData()
      toast.success('Status updated')
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update status')
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        onLogout={handleLogout}
        counts={{
          spotlight: spotlightApplications.length,
          marketplace: marketplaceApplications.length,
          studioWaitlist: studioWaitlist.length,
          partnership: partnershipInquiries.length,
          contact: contactInquiries.length,
          newsletter: newsletterSubscriptions.length,
        }}
      />

      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <AdminTopBar
          activeTab={activeTab}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          {loading ? (
            <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-16 text-center">
              <div className="w-12 h-12 border-2 border-[#bb9457] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-neutral-400 text-sm uppercase tracking-wider">Loading dashboard...</p>
            </div>
          ) : (
            <>
              {activeTab === 'overview' && <OverviewTab counts={dashboardCounts} activity={activityFeed} onNavigate={(tab) => setActiveTab(tab)} />}
              {activeTab === 'spotlight' && <SpotlightTable data={spotlightApplications} onDelete={(id) => handleDelete('spotlight_applications', id)} onBulkDelete={(ids) => handleBulkDelete('spotlight_applications', ids)} onStatusChange={(id, status) => handleStatusChange('spotlight_applications', id, status)} />}
              {activeTab === 'marketplace' && <MarketplaceTable data={marketplaceApplications} onDelete={(id) => handleDelete('marketplace_applications', id)} onBulkDelete={(ids) => handleBulkDelete('marketplace_applications', ids)} onStatusChange={(id, status) => handleStatusChange('marketplace_applications', id, status)} />}
              {activeTab === 'studio-waitlist' && <StudioWaitlistTable data={studioWaitlist} onDelete={(id) => handleDelete('studio_waitlist', id)} onBulkDelete={(ids) => handleBulkDelete('studio_waitlist', ids)} onStatusChange={(id, status) => handleStatusChange('studio_waitlist', id, status)} />}
              {activeTab === 'partnership' && <PartnershipTable data={partnershipInquiries} onDelete={(id) => handleDelete('partnership_inquiries', id)} onBulkDelete={(ids) => handleBulkDelete('partnership_inquiries', ids)} />}
              {activeTab === 'newsletter' && <NewsletterTable data={newsletterSubscriptions} onDelete={(id) => handleDelete('newsletter_subscriptions', id)} onBulkDelete={(ids) => handleBulkDelete('newsletter_subscriptions', ids)} />}
              {activeTab === 'contact' && <ContactTable data={contactInquiries} onDelete={(id) => handleDelete('contact_inquiries', id)} onBulkDelete={(ids) => handleBulkDelete('contact_inquiries', ids)} />}
              {activeTab === 'blog' && <BlogManagement />}
              {activeTab === 'designers' && <DesignerManagement />}
              {activeTab === 'events' && (
                <div>
                  <div className="flex items-center gap-1 mb-6 bg-neutral-900 border border-neutral-800 rounded-sm p-1 w-fit">
                    <button
                      onClick={() => setEventsSubTab('opportunities')}
                      className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-sm transition-colors ${
                        eventsSubTab === 'opportunities'
                          ? 'bg-[#bb9457]/10 text-[#bb9457] border border-[#bb9457]/30'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                      }`}
                    >
                      Opportunities
                    </button>
                    <button
                      onClick={() => setEventsSubTab('events')}
                      className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-sm transition-colors ${
                        eventsSubTab === 'events'
                          ? 'bg-[#bb9457]/10 text-[#bb9457] border border-[#bb9457]/30'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                      }`}
                    >
                      Events
                    </button>
                  </div>
                  {eventsSubTab === 'opportunities' ? <AdminOpportunities /> : <AdminEventsManagement />}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
