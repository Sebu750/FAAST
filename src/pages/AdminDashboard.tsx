import { useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { NewsletterSubscription, ContactInquiry, PartnershipInquiry, MarketplaceApplication, StudioWaitlist } from '../types/database'
import BlogManagement from './BlogManagement'
import DesignerManagement from './DesignerManagement'

interface SpotlightApplication {
  id: string
  name: string
  email: string
  phone: string
  location: string
  age: number
  hear_about: string
  discipline: string
  years_experience: string
  formal_education: string
  institution_name: string | null
  creative_practice: string
  portfolio_url: string | null
  images: string[] | null
  vision_description: string
  biggest_obstacle: string
  why_now: string
  heritage_craft: string | null
  heritage_description: string | null
  additional_info: string | null
  declaration_original_work: boolean
  declaration_pakistan_age: boolean
  declaration_presentations: boolean
  declaration_terms: boolean
  status: string
  admin_notes: string | null
  created_at: string
  updated_at: string
}

interface DashboardCounts {
  inquiries_today: number
  spotlight_pending: number
  spotlight_total: number
  marketplace_total: number
  marketplace_pending: number
  studio_waitlist_total: number
  partnership_total: number
  partnership_pending: number
  newsletter_total: number
  blog_total: number
  blog_published: number
  blog_drafts: number
  designers_total: number
  designers_active: number
}

// Simple SVG Icon Component
const Icon = ({ name, className = '', color = '' }: { name: string; className?: string; color?: string }) => {
  const icons: Record<string, ReactNode> = {
    'grid': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
    'star': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
    'mail': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    'message-square': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    'handshake': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    'file-text': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    'shopping-bag': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
    'palette': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
    'award': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>,
    'trending-up': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    'newspaper': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>,
    'users': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  }
  
  return <span className={color}>{icons[name] || null}</span>
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'spotlight' | 'marketplace' | 'studio-waitlist' | 'partnership' | 'newsletter' | 'contact' | 'blog' | 'designers'>('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [newsletterSubscriptions, setNewsletterSubscriptions] = useState<NewsletterSubscription[]>([])
  const [contactInquiries, setContactInquiries] = useState<ContactInquiry[]>([])
  const [partnershipInquiries, setPartnershipInquiries] = useState<PartnershipInquiry[]>([])
  const [spotlightApplications, setSpotlightApplications] = useState<SpotlightApplication[]>([])
  const [marketplaceApplications, setMarketplaceApplications] = useState<MarketplaceApplication[]>([])
  const [studioWaitlist, setStudioWaitlist] = useState<StudioWaitlist[]>([])
  const [dashboardCounts, setDashboardCounts] = useState<DashboardCounts | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

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
        const { data } = await supabase
          .from('newsletter_subscriptions')
          .select('*')
          .order('created_at', { ascending: false })
        if (data) setNewsletterSubscriptions(data)
      } else if (activeTab === 'contact') {
        const { data } = await supabase
          .from('contact_inquiries')
          .select('*')
          .order('created_at', { ascending: false })
        if (data) setContactInquiries(data)
      } else if (activeTab === 'partnership') {
        const { data } = await supabase
          .from('partnership_inquiries')
          .select('*')
          .order('created_at', { ascending: false })
        if (data) setPartnershipInquiries(data)
      } else if (activeTab === 'spotlight') {
        const { data } = await supabase
          .from('spotlight_applications')
          .select('*')
          .order('created_at', { ascending: false })
        if (data) setSpotlightApplications(data)
      } else if (activeTab === 'marketplace') {
        const { data } = await supabase
          .from('marketplace_applications')
          .select('*')
          .order('created_at', { ascending: false })
        if (data) setMarketplaceApplications(data)
      } else if (activeTab === 'studio-waitlist') {
        const { data } = await supabase
          .from('studio_waitlist')
          .select('*')
          .order('created_at', { ascending: false })
        if (data) setStudioWaitlist(data)
      }
      // Blog tab manages its own data via BlogManagement component
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchDashboardCounts = async () => {
    try {
      // Get today's date range
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const todayISO = today.toISOString()

      // Fetch all counts in parallel
      const results = await Promise.all([
        // Contact inquiries today
        supabase
          .from('contact_inquiries')
          .select('id', { count: 'exact', head: true })
          .gte('created_at', todayISO),
        // Spotlight applications pending
        supabase
          .from('spotlight_applications')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'pending'),
        // Spotlight applications total
        supabase
          .from('spotlight_applications')
          .select('id', { count: 'exact', head: true }),
        // Marketplace pending
        supabase
          .from('marketplace_applications')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'pending'),
        // Marketplace total
        supabase
          .from('marketplace_applications')
          .select('id', { count: 'exact', head: true }),
        // Studio waitlist total
        supabase
          .from('studio_waitlist')
          .select('id', { count: 'exact', head: true }),
        // Partnership pending
        supabase
          .from('partnership_inquiries')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'pending'),
        // Partnership total
        supabase
          .from('partnership_inquiries')
          .select('id', { count: 'exact', head: true }),
        // Newsletter subscribers total
        supabase
          .from('newsletter_subscriptions')
          .select('id', { count: 'exact', head: true }),
        // Blog total
        supabase
          .from('blog_posts')
          .select('id', { count: 'exact', head: true }),
        // Blog published
        supabase
          .from('blog_posts')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'published'),
        // Blog drafts
        supabase
          .from('blog_posts')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'draft'),
        // Designers total
        supabase
          .from('designers')
          .select('id', { count: 'exact', head: true }),
        // Designers active
        supabase
          .from('designers')
          .select('id', { count: 'exact', head: true })
          .eq('is_active', true)
      ])
      const [inquiriesToday, spotlightPending, spotlightTotal, marketplacePending, marketplaceTotal, studioWaitlistTotal, partnershipPending, partnershipTotal, newsletterTotal, blogTotal, blogPublished, blogDrafts, designersTotal, designersActive] = results

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
        designers_active: designersActive.count || 0
      })
    } catch (error) {
      console.error('Error fetching dashboard counts:', error)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  const handleDelete = async (table: string, id: string) => {
    if (!confirm('Are you sure you want to delete this entry? This action cannot be undone.')) {
      return
    }

    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id)

      if (error) {
        alert('Error deleting entry: ' + error.message)
        return
      }

      // Refresh data
      fetchData()
      alert('Entry deleted successfully')
    } catch (error) {
      console.error('Error deleting:', error)
      alert('Failed to delete entry')
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Left Sidebar Navigation */}
      <aside className={`bg-neutral-900 border-r border-neutral-800 flex flex-col fixed h-full transition-all duration-300 z-50 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'} w-64`}>
        {/* Logo */}
        <div className={`border-b border-neutral-800 ${sidebarCollapsed ? 'lg:p-4' : 'p-6'} p-6`}>
          <div className="flex items-center justify-between">
            <h1 className={`font-semibold tracking-wider text-white uppercase transition-all duration-300 ${
              sidebarCollapsed ? 'lg:text-xs lg:tracking-widest' : 'text-lg'
            }`}>
              {sidebarCollapsed ? (
                <span className="hidden lg:block text-[#bb9457] text-2xl font-serif">A</span>
              ) : (
                <>Adorzia <span className="text-[#bb9457] font-light">Admin</span></>
              )}
            </h1>
            {/* Desktop Toggle Button */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors rounded-sm"
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg 
                className={`w-5 h-5 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          </div>
          {!sidebarCollapsed && (
            <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-widest hidden lg:block">Management Console</p>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className={`mb-2 ${sidebarCollapsed ? 'lg:px-3' : 'px-4'} px-4`}>
            {!sidebarCollapsed && (
              <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold hidden lg:block">Main</p>
            )}
          </div>
          <button
            onClick={() => {
              setActiveTab('overview')
              setMobileMenuOpen(false)
            }}
            className={`w-full flex items-center transition-all ${
              sidebarCollapsed ? 'lg:justify-center lg:px-3' : ''
            } px-4 py-3 gap-3 text-sm ${
              activeTab === 'overview'
                ? 'bg-[#bb9457]/10 text-[#bb9457] border-r-2 border-[#bb9457]'
                : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
            title={sidebarCollapsed ? 'Overview' : ''}
          >
            <Icon name="grid" className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span className="hidden lg:inline">Overview</span>}
            {sidebarCollapsed && <span className="lg:hidden">Overview</span>}
          </button>

          <div className={`mt-6 mb-2 ${sidebarCollapsed ? 'lg:px-3' : 'px-4'} px-4`}>
            {!sidebarCollapsed && (
              <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold hidden lg:block">Applications</p>
            )}
          </div>
          <button
            onClick={() => {
              setActiveTab('spotlight')
              setMobileMenuOpen(false)
            }}
            className={`w-full flex items-center transition-all ${
              sidebarCollapsed ? 'lg:justify-center lg:px-3' : ''
            } px-4 py-3 gap-3 text-sm ${
              activeTab === 'spotlight'
                ? 'bg-[#bb9457]/10 text-[#bb9457] border-r-2 border-[#bb9457]'
                : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
            title={sidebarCollapsed ? 'Spotlight' : ''}
          >
            <Icon name="star" className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span className="hidden lg:inline">Spotlight</span>}
            {sidebarCollapsed && <span className="lg:hidden">Spotlight</span>}
            {spotlightApplications.length > 0 && (
              <span className={`ml-auto bg-[#bb9457]/20 text-[#bb9457] text-xs px-2 py-0.5 rounded-full ${
                sidebarCollapsed ? 'lg:ml-0 lg:absolute lg:top-2 lg:right-2 lg:px-1.5 lg:py-0.5 lg:text-[10px]' : ''
              }`}>
                {spotlightApplications.length}
              </span>
            )}
          </button>
          <button
            onClick={() => {
              setActiveTab('marketplace')
              setMobileMenuOpen(false)
            }}
            className={`w-full flex items-center transition-all ${
              sidebarCollapsed ? 'lg:justify-center lg:px-3' : ''
            } px-4 py-3 gap-3 text-sm ${
              activeTab === 'marketplace'
                ? 'bg-[#bb9457]/10 text-[#bb9457] border-r-2 border-[#bb9457]'
                : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
            title={sidebarCollapsed ? 'Marketplace' : ''}
          >
            <Icon name="shopping-bag" className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span className="hidden lg:inline">Marketplace</span>}
            {sidebarCollapsed && <span className="lg:hidden">Marketplace</span>}
            {marketplaceApplications.length > 0 && (
              <span className={`ml-auto bg-[#bb9457]/20 text-[#bb9457] text-xs px-2 py-0.5 rounded-full ${
                sidebarCollapsed ? 'lg:ml-0 lg:absolute lg:top-2 lg:right-2 lg:px-1.5 lg:py-0.5 lg:text-[10px]' : ''
              }`}>
                {marketplaceApplications.length}
              </span>
            )}
          </button>
          <button
            onClick={() => {
              setActiveTab('studio-waitlist')
              setMobileMenuOpen(false)
            }}
            className={`w-full flex items-center transition-all ${
              sidebarCollapsed ? 'lg:justify-center lg:px-3' : ''
            } px-4 py-3 gap-3 text-sm ${
              activeTab === 'studio-waitlist'
                ? 'bg-[#bb9457]/10 text-[#bb9457] border-r-2 border-[#bb9457]'
                : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
            title={sidebarCollapsed ? 'Studio Waitlist' : ''}
          >
            <Icon name="users" className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span className="hidden lg:inline">Studio Waitlist</span>}
            {sidebarCollapsed && <span className="lg:hidden">Studio Waitlist</span>}
            {studioWaitlist.length > 0 && (
              <span className={`ml-auto bg-[#bb9457]/20 text-[#bb9457] text-xs px-2 py-0.5 rounded-full ${
                sidebarCollapsed ? 'lg:ml-0 lg:absolute lg:top-2 lg:right-2 lg:px-1.5 lg:py-0.5 lg:text-[10px]' : ''
              }`}>
                {studioWaitlist.length}
              </span>
            )}
          </button>

          <div className={`mt-6 mb-2 ${sidebarCollapsed ? 'lg:px-3' : 'px-4'} px-4`}>
            {!sidebarCollapsed && (
              <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold hidden lg:block">Content</p>
            )}
          </div>
          <button
            onClick={() => {
              setActiveTab('blog')
              setMobileMenuOpen(false)
            }}
            className={`w-full flex items-center transition-all ${
              sidebarCollapsed ? 'lg:justify-center lg:px-3' : ''
            } px-4 py-3 gap-3 text-sm ${
              activeTab === 'blog'
                ? 'bg-[#bb9457]/10 text-[#bb9457] border-r-2 border-[#bb9457]'
                : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
            title={sidebarCollapsed ? 'Blog' : ''}
          >
            <Icon name="newspaper" className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span className="hidden lg:inline">Blog</span>}
            {sidebarCollapsed && <span className="lg:hidden">Blog</span>}
          </button>
          <button
            onClick={() => {
              setActiveTab('designers')
              setMobileMenuOpen(false)
            }}
            className={`w-full flex items-center transition-all ${
              sidebarCollapsed ? 'lg:justify-center lg:px-3' : ''
            } px-4 py-3 gap-3 text-sm ${
              activeTab === 'designers'
                ? 'bg-[#bb9457]/10 text-[#bb9457] border-r-2 border-[#bb9457]'
                : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
            title={sidebarCollapsed ? 'Designers' : ''}
          >
            <Icon name="palette" className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span className="hidden lg:inline">Designers</span>}
            {sidebarCollapsed && <span className="lg:hidden">Designers</span>}
          </button>

          <div className={`mt-6 mb-2 ${sidebarCollapsed ? 'lg:px-3' : 'px-4'} px-4`}>
            {!sidebarCollapsed && (
              <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold hidden lg:block">Inquiries</p>
            )}
          </div>
          <button
            onClick={() => {
              setActiveTab('partnership')
              setMobileMenuOpen(false)
            }}
            className={`w-full flex items-center transition-all ${
              sidebarCollapsed ? 'lg:justify-center lg:px-3' : ''
            } px-4 py-3 gap-3 text-sm ${
              activeTab === 'partnership'
                ? 'bg-[#bb9457]/10 text-[#bb9457] border-r-2 border-[#bb9457]'
                : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
            title={sidebarCollapsed ? 'Partnership' : ''}
          >
            <Icon name="handshake" className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span className="hidden lg:inline">Partnership</span>}
            {sidebarCollapsed && <span className="lg:hidden">Partnership</span>}
            {partnershipInquiries.length > 0 && (
              <span className={`ml-auto bg-[#bb9457]/20 text-[#bb9457] text-xs px-2 py-0.5 rounded-full ${
                sidebarCollapsed ? 'lg:ml-0 lg:absolute lg:top-2 lg:right-2 lg:px-1.5 lg:py-0.5 lg:text-[10px]' : ''
              }`}>
                {partnershipInquiries.length}
              </span>
            )}
          </button>
          <button
            onClick={() => {
              setActiveTab('contact')
              setMobileMenuOpen(false)
            }}
            className={`w-full flex items-center transition-all ${
              sidebarCollapsed ? 'lg:justify-center lg:px-3' : ''
            } px-4 py-3 gap-3 text-sm ${
              activeTab === 'contact'
                ? 'bg-[#bb9457]/10 text-[#bb9457] border-r-2 border-[#bb9457]'
                : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
            title={sidebarCollapsed ? 'Contact' : ''}
          >
            <Icon name="message-square" className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span className="hidden lg:inline">Contact</span>}
            {sidebarCollapsed && <span className="lg:hidden">Contact</span>}
            {contactInquiries.length > 0 && (
              <span className={`ml-auto bg-[#bb9457]/20 text-[#bb9457] text-xs px-2 py-0.5 rounded-full ${
                sidebarCollapsed ? 'lg:ml-0 lg:absolute lg:top-2 lg:right-2 lg:px-1.5 lg:py-0.5 lg:text-[10px]' : ''
              }`}>
                {contactInquiries.length}
              </span>
            )}
          </button>

          <div className={`mt-6 mb-2 ${sidebarCollapsed ? 'lg:px-3' : 'px-4'} px-4`}>
            {!sidebarCollapsed && (
              <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold hidden lg:block">Subscribers</p>
            )}
          </div>
          <button
            onClick={() => {
              setActiveTab('newsletter')
              setMobileMenuOpen(false)
            }}
            className={`w-full flex items-center transition-all ${
              sidebarCollapsed ? 'lg:justify-center lg:px-3' : ''
            } px-4 py-3 gap-3 text-sm ${
              activeTab === 'newsletter'
                ? 'bg-[#bb9457]/10 text-[#bb9457] border-r-2 border-[#bb9457]'
                : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
            title={sidebarCollapsed ? 'Newsletter' : ''}
          >
            <Icon name="mail" className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span className="hidden lg:inline">Newsletter</span>}
            {sidebarCollapsed && <span className="lg:hidden">Newsletter</span>}
            {newsletterSubscriptions.length > 0 && (
              <span className={`ml-auto bg-[#bb9457]/20 text-[#bb9457] text-xs px-2 py-0.5 rounded-full ${
                sidebarCollapsed ? 'lg:ml-0 lg:absolute lg:top-2 lg:right-2 lg:px-1.5 lg:py-0.5 lg:text-[10px]' : ''
              }`}>
                {newsletterSubscriptions.length}
              </span>
            )}
          </button>
        </nav>

        {/* Logout */}
        <div className={`border-t border-neutral-800 ${sidebarCollapsed ? 'lg:p-3' : 'p-4'} p-4`}>
          <button
            onClick={() => {
              handleLogout()
              setMobileMenuOpen(false)
            }}
            className={`w-full flex items-center transition-all text-red-400 hover:bg-red-600/10 rounded-sm ${
              sidebarCollapsed ? 'lg:justify-center lg:px-3 lg:py-3' : 'px-4 py-3'
            } px-4 py-3 gap-3 text-sm`}
            title={sidebarCollapsed ? 'Sign Out' : ''}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v0a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v0" />
            </svg>
            {!sidebarCollapsed && <span className="hidden lg:inline">Sign Out</span>}
            {sidebarCollapsed && <span className="lg:hidden">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        {/* Top Bar */}
        <header className="bg-neutral-900 border-b border-neutral-800 sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors rounded-sm"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h2 className="text-base sm:text-xl font-semibold text-white capitalize">
                  {activeTab === 'studio-waitlist' ? 'Studio Waitlist' : activeTab}
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5 hidden sm:block">Manage and monitor</p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-white font-medium">Admin User</p>
                <p className="text-xs text-neutral-500">Administrator</p>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#bb9457]/20 border border-[#bb9457]/30 rounded-full flex items-center justify-center">
                <span className="text-[#bb9457] font-semibold text-sm sm:text-base">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {loading ? (
            <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-16 text-center">
              <div className="w-12 h-12 border-2 border-[#bb9457] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-neutral-400 text-sm uppercase tracking-wider">Loading dashboard...</p>
            </div>
          ) : (
            <>
              {activeTab === 'overview' && <OverviewTab counts={dashboardCounts} spotlightRecent={spotlightApplications.slice(0, 5)} inquiriesRecent={contactInquiries.slice(0, 5)} />}
              {activeTab === 'spotlight' && <SpotlightTable data={spotlightApplications} onDelete={(id) => handleDelete('spotlight_applications', id)} />}
              {activeTab === 'marketplace' && <MarketplaceTable data={marketplaceApplications} onDelete={(id) => handleDelete('marketplace_applications', id)} />}
              {activeTab === 'studio-waitlist' && <StudioWaitlistTable data={studioWaitlist} onDelete={(id) => handleDelete('studio_waitlist', id)} />}
              {activeTab === 'partnership' && <PartnershipTable data={partnershipInquiries} onDelete={(id) => handleDelete('partnership_inquiries', id)} />}
              {activeTab === 'newsletter' && <NewsletterTable data={newsletterSubscriptions} onDelete={(id) => handleDelete('newsletter_subscriptions', id)} />}
              {activeTab === 'contact' && <ContactTable data={contactInquiries} onDelete={(id) => handleDelete('contact_inquiries', id)} />}
              {activeTab === 'blog' && <BlogManagement />}
              {activeTab === 'designers' && <DesignerManagement />}
            </>
          )}
        </main>
      </div>
    </div>
  )
}

// Overview Tab Component
const OverviewTab = ({ counts, spotlightRecent, inquiriesRecent }: { 
  counts: DashboardCounts | null
  spotlightRecent: SpotlightApplication[]
  inquiriesRecent: ContactInquiry[]
}) => {
  if (!counts) return null

  const statCards = [
    { label: 'New Inquiries Today', value: counts.inquiries_today, icon: 'message-square', color: 'from-blue-600/20 to-blue-800/20', borderColor: 'border-blue-600/30', textColor: 'text-blue-400' },
    { label: 'Spotlight Pending', value: counts.spotlight_pending, icon: 'star', color: 'from-[#bb9457]/20 to-[#bb9457]/10', borderColor: 'border-[#bb9457]/30', textColor: 'text-[#bb9457]' },
    { label: 'Marketplace Pending', value: counts.marketplace_pending, icon: 'shopping-bag', color: 'from-green-600/20 to-green-800/20', borderColor: 'border-green-600/30', textColor: 'text-green-400' },
    { label: 'Studio Waitlist', value: counts.studio_waitlist_total || 0, icon: 'users', color: 'from-purple-600/20 to-purple-800/20', borderColor: 'border-purple-600/30', textColor: 'text-purple-400' },
    { label: 'Partnership Pending', value: counts.partnership_pending, icon: 'handshake', color: 'from-orange-600/20 to-orange-800/20', borderColor: 'border-orange-600/30', textColor: 'text-orange-400' },
    { label: 'Newsletter Subscribers', value: counts.newsletter_total, icon: 'mail', color: 'from-teal-600/20 to-teal-800/20', borderColor: 'border-teal-600/30', textColor: 'text-teal-400' },
    { label: 'Blog Posts', value: counts.blog_total, icon: 'newspaper', color: 'from-amber-600/20 to-amber-800/20', borderColor: 'border-amber-600/30', textColor: 'text-amber-400' },
    { label: 'Designers', value: counts.designers_total || 0, icon: 'palette', color: 'from-pink-600/20 to-pink-800/20', borderColor: 'border-pink-600/30', textColor: 'text-pink-400' },
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-neutral-900 to-neutral-900/50 border border-neutral-800 rounded-sm p-6 sm:p-8">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-normal mb-2">
              Welcome to <span className="text-[#bb9457] italic font-light">Adorzia</span> Admin
            </h2>
            <p className="text-neutral-400 text-sm font-light">
              Monitor applications, inquiries, and platform activity
            </p>
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-neutral-500 text-xs uppercase tracking-widest">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className={`bg-gradient-to-br ${stat.color} border ${stat.borderColor} rounded-sm p-5 sm:p-6 hover:border-opacity-60 transition-all duration-300 hover:shadow-lg group`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400 mb-3 font-semibold">{stat.label}</p>
                <p className={`text-4xl sm:text-5xl lg:text-6xl font-light font-serif ${stat.textColor} group-hover:scale-105 transition-transform duration-300 origin-left`}>{stat.value}</p>
              </div>
              <div className={`${stat.textColor} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}>
                <Icon name={stat.icon} className="w-7 h-7 sm:w-9 sm:h-9" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-neutral-800">
          <h3 className="text-xl font-serif text-white font-normal flex items-center gap-4">
            <span className="w-1.5 h-8 bg-[#bb9457] rounded-sm" />
            Recent Activity
          </h3>
        </div>
        <div className="p-6 sm:p-8">
          <div className="space-y-8">
            {spotlightRecent.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-semibold text-[#bb9457] uppercase tracking-[0.2em]">Latest Spotlight Applications</h4>
                  <span className="text-neutral-600 text-xs">{spotlightRecent.length} entries</span>
                </div>
                <div className="space-y-3">
                  {spotlightRecent.map((app) => (
                    <div key={app.id} className="bg-neutral-950/50 border border-neutral-800 rounded-sm p-5 hover:border-neutral-700 transition-colors duration-300">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium mb-1 truncate">{app.name}</p>
                          <p className="text-sm text-neutral-400 mb-1">{app.email}</p>
                          <p className="text-xs text-neutral-500">{app.location} • Age {app.age} • {app.discipline}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <span className={`px-3 py-1.5 rounded-sm text-xs uppercase tracking-wider font-semibold ${
                            app.status === 'pending' ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30' :
                            app.status === 'reviewed' ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' :
                            app.status === 'shortlisted' ? 'bg-purple-600/20 text-purple-400 border border-purple-600/30' :
                            app.status === 'finalist' ? 'bg-[#bb9457]/20 text-[#bb9457] border border-[#bb9457]/30' :
                            'bg-green-600/20 text-green-400 border border-green-600/30'
                          }`}>
                            {app.status}
                          </span>
                          <p className="text-xs text-neutral-600 whitespace-nowrap">{new Date(app.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {inquiriesRecent.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-[0.2em]">Latest Contact Inquiries</h4>
                  <span className="text-neutral-600 text-xs">{inquiriesRecent.length} entries</span>
                </div>
                <div className="space-y-3">
                  {inquiriesRecent.map((inquiry) => (
                    <div key={inquiry.id} className="bg-neutral-950/50 border border-neutral-800 rounded-sm p-5 hover:border-neutral-700 transition-colors duration-300">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium mb-1">{inquiry.name}</p>
                          <p className="text-sm text-neutral-400 mb-1">{inquiry.email}</p>
                          <p className="text-xs text-neutral-500 line-clamp-2">{inquiry.message}</p>
                        </div>
                        <p className="text-xs text-neutral-600 whitespace-nowrap flex-shrink-0">{new Date(inquiry.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {spotlightRecent.length === 0 && inquiriesRecent.length === 0 && (
              <div className="text-center py-12">
                <p className="text-neutral-600 text-sm">No recent activity</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Table Components
const NewsletterTable = ({ data, onDelete }: { data: NewsletterSubscription[]; onDelete: (id: string) => void }) => {
  if (data.length === 0) {
    return <p className="text-center text-neutral-400 py-12">No newsletter subscriptions yet</p>
  }

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden">
      <div className="p-6 border-b border-neutral-800">
        <h3 className="text-lg font-semibold font-serif text-white">All Subscribers ({data.length})</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-800">
          <thead className="bg-neutral-950">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-neutral-900 divide-y divide-neutral-800">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-neutral-800/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-400 hover:text-red-300 font-medium transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const ContactTable = ({ data, onDelete }: { data: ContactInquiry[]; onDelete: (id: string) => void }) => {
  const [selectedItem, setSelectedItem] = useState<ContactInquiry | null>(null)

  if (data.length === 0) {
    return <p className="text-center text-neutral-400 py-12">No contact inquiries yet</p>
  }

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden">
      <div className="p-6 border-b border-neutral-800">
        <h3 className="text-lg font-semibold font-serif text-white">All Inquiries ({data.length})</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-800">
          <thead className="bg-neutral-950">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Message</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-neutral-900 divide-y divide-neutral-800">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-neutral-800/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">{item.email}</td>
                <td className="px-6 py-4 text-sm text-neutral-300 max-w-md line-clamp-2">{item.message}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="text-[#bb9457] hover:text-white font-medium transition-colors mr-4"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-400 hover:text-red-300 font-medium transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
          <div className="bg-neutral-900 border border-neutral-800 rounded-sm max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">Contact Inquiry Details</h3>
              <button onClick={() => setSelectedItem(null)} className="text-neutral-400 hover:text-white text-2xl">×</button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-neutral-500 uppercase tracking-wider">Name</label>
                  <p className="text-white mt-1">{selectedItem.name}</p>
                </div>
                <div>
                  <label className="text-xs text-neutral-500 uppercase tracking-wider">Email</label>
                  <p className="text-white mt-1">{selectedItem.email}</p>
                </div>
              </div>
              <div>
                <label className="text-xs text-neutral-500 uppercase tracking-wider">Message</label>
                <p className="text-neutral-300 mt-2 whitespace-pre-wrap leading-relaxed">{selectedItem.message}</p>
              </div>
              <div className="pt-4 border-t border-neutral-800">
                <label className="text-xs text-neutral-500 uppercase tracking-wider">Received</label>
                <p className="text-white mt-1">{new Date(selectedItem.created_at).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const PartnershipTable = ({ data, onDelete }: { data: PartnershipInquiry[]; onDelete: (id: string) => void }) => {
  const [selectedItem, setSelectedItem] = useState<PartnershipInquiry | null>(null)

  if (data.length === 0) {
    return <p className="text-center text-neutral-400 py-12">No partnership inquiries yet</p>
  }

  return (
    <>
      <div className="bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-800">
          <h3 className="text-lg font-semibold font-serif text-white">All Inquiries ({data.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-800">
            <thead className="bg-neutral-950">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Company</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Message</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-neutral-900 divide-y divide-neutral-800">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">{item.company_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">{item.contact_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">{item.phone}</td>
                  <td className="px-6 py-4 text-sm text-neutral-300 max-w-md line-clamp-2">{item.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="text-[#bb9457] hover:text-white font-medium transition-colors mr-4"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="text-red-400 hover:text-red-300 font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
          <div className="bg-neutral-900 border border-neutral-800 rounded-sm max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">Partnership Inquiry Details</h3>
              <button onClick={() => setSelectedItem(null)} className="text-neutral-400 hover:text-white text-2xl">×</button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-neutral-500 uppercase tracking-wider">Company Name</label>
                  <p className="text-white mt-1">{selectedItem.company_name}</p>
                </div>
                <div>
                  <label className="text-xs text-neutral-500 uppercase tracking-wider">Contact Name</label>
                  <p className="text-white mt-1">{selectedItem.contact_name}</p>
                </div>
                <div>
                  <label className="text-xs text-neutral-500 uppercase tracking-wider">Email</label>
                  <p className="text-white mt-1">{selectedItem.email}</p>
                </div>
                <div>
                  <label className="text-xs text-neutral-500 uppercase tracking-wider">Phone</label>
                  <p className="text-white mt-1">{selectedItem.phone || 'N/A'}</p>
                </div>
              </div>
              <div>
                <label className="text-xs text-neutral-500 uppercase tracking-wider">Message</label>
                <p className="text-neutral-300 mt-2 whitespace-pre-wrap leading-relaxed">{selectedItem.message}</p>
              </div>
              <div className="pt-4 border-t border-neutral-800">
                <label className="text-xs text-neutral-500 uppercase tracking-wider">Received</label>
                <p className="text-white mt-1">{new Date(selectedItem.created_at).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const SpotlightTable = ({ data, onDelete }: { data: SpotlightApplication[]; onDelete: (id: string) => void }) => {
  const [selectedApp, setSelectedApp] = useState<SpotlightApplication | null>(null)

  if (data.length === 0) {
    return <p className="text-center text-neutral-400 py-12">No spotlight applications yet</p>
  }

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-sm">
      <div className="p-6 border-b border-neutral-800">
        <h3 className="text-lg font-semibold font-serif text-white">All Applications ({data.length})</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-800">
          <thead className="bg-neutral-950">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Location</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Discipline</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Portfolio</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-neutral-900 divide-y divide-neutral-800">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-neutral-800/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">{item.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">{item.discipline}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {item.portfolio_url ? (
                    <a href={item.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-[#bb9457] hover:underline">
                      View
                    </a>
                  ) : (
                    <span className="text-neutral-600">N/A</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-sm text-xs uppercase tracking-wider ${
                    item.status === 'pending' ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30' :
                    item.status === 'reviewed' ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' :
                    item.status === 'shortlisted' ? 'bg-purple-600/20 text-purple-400 border border-purple-600/30' :
                    item.status === 'finalist' ? 'bg-[#bb9457]/20 text-[#bb9457] border border-[#bb9457]/30' :
                    'bg-green-600/20 text-green-400 border border-green-600/30'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => setSelectedApp(item)}
                    className="text-[#bb9457] hover:text-white font-medium transition-colors mr-4"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-400 hover:text-red-300 font-medium transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Application Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedApp(null)}>
          <div className="bg-neutral-900 border border-neutral-800 rounded-sm max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 p-6 flex justify-between items-center">
              <h3 className="text-xl font-semibold font-serif text-white">Application Details</h3>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-neutral-400 hover:text-white text-2xl transition-colors"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Personal Information */}
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Personal Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Full Name</label>
                    <p className="text-white mt-1">{selectedApp.name}</p>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Email</label>
                    <p className="text-white mt-1">{selectedApp.email}</p>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Phone</label>
                    <p className="text-white mt-1">{selectedApp.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Location</label>
                    <p className="text-white mt-1">{selectedApp.location}</p>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Age</label>
                    <p className="text-white mt-1">{selectedApp.age || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Discipline</label>
                    <p className="text-white mt-1">{selectedApp.discipline}</p>
                  </div>
                </div>
              </div>

              {/* Creative Background */}
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Creative Background</h4>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Years of Experience</label>
                    <p className="text-white mt-1">{selectedApp.years_experience || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Formal Education</label>
                    <p className="text-white mt-1">{selectedApp.formal_education || 'N/A'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Institution Name</label>
                    <p className="text-white mt-1">{selectedApp.institution_name || 'N/A'}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Describe Your Creative Practice</label>
                    <p className="text-white mt-2 leading-relaxed">{selectedApp.creative_practice || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Portfolio URL</label>
                    <p className="mt-1">
                      {selectedApp.portfolio_url ? (
                        <a href={selectedApp.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-[#bb9457] hover:underline">
                          {selectedApp.portfolio_url}
                        </a>
                      ) : (
                        <span className="text-neutral-600">N/A</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Vision & Goals */}
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Vision & Goals</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Vision Description</label>
                    <p className="text-white mt-2 leading-relaxed">{selectedApp.vision_description || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Biggest Obstacle</label>
                    <p className="text-white mt-2 leading-relaxed">{selectedApp.biggest_obstacle || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Why Now?</label>
                    <p className="text-white mt-2 leading-relaxed">{selectedApp.why_now || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Heritage Craft */}
              {(selectedApp.heritage_craft || selectedApp.heritage_description) && (
                <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                  <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Heritage Craft</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-neutral-500 uppercase tracking-wider">Heritage Craft Tradition</label>
                      <p className="text-white mt-1">{selectedApp.heritage_craft || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-xs text-neutral-500 uppercase tracking-wider">Heritage Description</label>
                      <p className="text-white mt-2 leading-relaxed">{selectedApp.heritage_description || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Information */}
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Additional Information</h4>
                <div>
                  <label className="text-xs text-neutral-500 uppercase tracking-wider">Additional Information</label>
                  <p className="text-white mt-2 leading-relaxed">{selectedApp.additional_info || 'N/A'}</p>
                </div>
              </div>

              {/* Declarations */}
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Declarations</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${
                      selectedApp.declaration_original_work ? 'bg-[#bb9457] border-[#bb9457]' : 'border-neutral-700'
                    }`}>
                      {selectedApp.declaration_original_work && <span className="text-black text-xs">✓</span>}
                    </span>
                    <p className="text-sm text-neutral-300">Original work declaration</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${
                      selectedApp.declaration_pakistan_age ? 'bg-[#bb9457] border-[#bb9457]' : 'border-neutral-700'
                    }`}>
                      {selectedApp.declaration_pakistan_age && <span className="text-black text-xs">✓</span>}
                    </span>
                    <p className="text-sm text-neutral-300">Pakistan age eligibility declaration</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${
                      selectedApp.declaration_presentations ? 'bg-[#bb9457] border-[#bb9457]' : 'border-neutral-700'
                    }`}>
                      {selectedApp.declaration_presentations && <span className="text-black text-xs">✓</span>}
                    </span>
                    <p className="text-sm text-neutral-300">Presentations commitment declaration</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${
                      selectedApp.declaration_terms ? 'bg-[#bb9457] border-[#bb9457]' : 'border-neutral-700'
                    }`}>
                      {selectedApp.declaration_terms && <span className="text-black text-xs">✓</span>}
                    </span>
                    <p className="text-sm text-neutral-300">Terms and conditions acceptance</p>
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Application Metadata</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Status</label>
                    <p className="mt-1">
                      <span className={`px-3 py-1 rounded-sm text-xs uppercase tracking-wider ${
                        selectedApp.status === 'pending' ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30' :
                        selectedApp.status === 'reviewed' ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' :
                        selectedApp.status === 'shortlisted' ? 'bg-purple-600/20 text-purple-400 border border-purple-600/30' :
                        selectedApp.status === 'finalist' ? 'bg-[#bb9457]/20 text-[#bb9457] border border-[#bb9457]/30' :
                        'bg-green-600/20 text-green-400 border border-green-600/30'
                      }`}>
                        {selectedApp.status}
                      </span>
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Submitted</label>
                    <p className="text-white mt-1">{new Date(selectedApp.created_at).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Marketplace Table
const MarketplaceTable = ({ data, onDelete }: { data: MarketplaceApplication[]; onDelete: (id: string) => void }) => {
  const [selectedItem, setSelectedItem] = useState<MarketplaceApplication | null>(null)

  if (data.length === 0) {
    return <p className="text-center text-neutral-400 py-12">No marketplace applications yet</p>
  }

  return (
    <>
      <div className="bg-neutral-900 border border-neutral-800 rounded-sm">
        <div className="p-6 border-b border-neutral-800">
          <h3 className="text-lg font-semibold font-serif text-white">Marketplace Seller Applications ({data.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-800">
            <thead className="bg-neutral-950">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Brand</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Founder</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-neutral-900 divide-y divide-neutral-800">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">{item.brand_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">{item.founder_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">{item.product_category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">{item.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-sm text-xs uppercase tracking-wider border ${
                      item.status === 'pending' ? 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30' :
                      item.status === 'under_review' ? 'bg-blue-600/20 text-blue-400 border-blue-600/30' :
                      item.status === 'approved' ? 'bg-green-600/20 text-green-400 border-green-600/30' :
                      'bg-red-600/20 text-red-400 border-red-600/30'
                    }`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="text-[#bb9457] hover:text-white font-medium transition-colors mr-4"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="text-red-400 hover:text-red-300 font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
          <div className="bg-neutral-900 border border-neutral-800 rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-neutral-800 flex justify-between items-center sticky top-0 bg-neutral-900">
              <h3 className="text-xl font-semibold text-white">Marketplace Application Details</h3>
              <button onClick={() => setSelectedItem(null)} className="text-neutral-400 hover:text-white text-2xl">×</button>
            </div>
            <div className="p-6 space-y-6">
              {/* Brand Information */}
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Brand Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Brand Name</label>
                    <p className="text-white mt-1">{selectedItem.brand_name}</p>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Founder Name</label>
                    <p className="text-white mt-1">{selectedItem.founder_name}</p>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Email</label>
                    <p className="text-white mt-1">{selectedItem.email}</p>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Phone</label>
                    <p className="text-white mt-1">{selectedItem.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Location</label>
                    <p className="text-white mt-1">{selectedItem.location}</p>
                  </div>
                  {selectedItem.website && (
                    <div>
                      <label className="text-xs text-neutral-500 uppercase tracking-wider">Website</label>
                      <p className="mt-1">
                        <a href={selectedItem.website} target="_blank" rel="noopener noreferrer" className="text-[#bb9457] hover:underline">
                          {selectedItem.website}
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-4">
                <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                  <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Product Category</h4>
                  <p className="text-white">{selectedItem.product_category}</p>
                </div>
                <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                  <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Product Description</h4>
                  <p className="text-neutral-300 whitespace-pre-wrap leading-relaxed">{selectedItem.product_description}</p>
                </div>
                <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                  <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Unique Selling Proposition</h4>
                  <p className="text-neutral-300 whitespace-pre-wrap leading-relaxed">{selectedItem.unique_selling_proposition}</p>
                </div>
                <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                  <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Target Customer</h4>
                  <p className="text-neutral-300 whitespace-pre-wrap leading-relaxed">{selectedItem.target_customer}</p>
                </div>
              </div>

              {/* Additional Info */}
              {(selectedItem.price_range || selectedItem.years_in_business || selectedItem.instagram_handle) && (
                <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                  <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Additional Information</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedItem.price_range && (
                      <div>
                        <label className="text-xs text-neutral-500 uppercase tracking-wider">Price Range</label>
                        <p className="text-white mt-1">{selectedItem.price_range}</p>
                      </div>
                    )}
                    {selectedItem.years_in_business && (
                      <div>
                        <label className="text-xs text-neutral-500 uppercase tracking-wider">Years in Business</label>
                        <p className="text-white mt-1">{selectedItem.years_in_business}</p>
                      </div>
                    )}
                    {selectedItem.instagram_handle && (
                      <div>
                        <label className="text-xs text-neutral-500 uppercase tracking-wider">Instagram</label>
                        <p className="text-white mt-1">{selectedItem.instagram_handle}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Application Info</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Status</label>
                    <p className="mt-1">
                      <span className={`px-3 py-1 rounded-sm text-xs uppercase tracking-wider border ${
                        selectedItem.status === 'pending' ? 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30' :
                        selectedItem.status === 'under_review' ? 'bg-blue-600/20 text-blue-400 border-blue-600/30' :
                        selectedItem.status === 'approved' ? 'bg-green-600/20 text-green-400 border-green-600/30' :
                        'bg-red-600/20 text-red-400 border-red-600/30'
                      }`}>
                        {selectedItem.status.replace('_', ' ')}
                      </span>
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Submitted</label>
                    <p className="text-white mt-1">{new Date(selectedItem.created_at).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const StudioWaitlistTable = ({ data, onDelete }: { data: StudioWaitlist[]; onDelete: (id: string) => void }) => {
  const [selectedItem, setSelectedItem] = useState<StudioWaitlist | null>(null)

  if (data.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-neutral-500 text-lg">No waitlist entries yet.</p>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-neutral-500 font-semibold">Name</th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-neutral-500 font-semibold">Email</th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-neutral-500 font-semibold">Discipline</th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-neutral-500 font-semibold">Preferred City</th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-neutral-500 font-semibold">Membership</th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-neutral-500 font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-neutral-500 font-semibold">Date</th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-neutral-500 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-neutral-900/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white font-medium">{item.name}</div>
                  <div className="text-xs text-neutral-500">{item.current_city}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-300">{item.email}</div>
                  <div className="text-xs text-neutral-500">{item.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">{item.discipline}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 bg-[#bb9457]/10 text-[#bb9457] rounded-sm text-xs uppercase tracking-wider border border-[#bb9457]/20">
                    {item.preferred_city}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">{item.membership_type.replace('_', ' ')}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-sm text-xs uppercase tracking-wider border ${
                    item.status === 'waiting' ? 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30' :
                    item.status === 'contacted' ? 'bg-blue-600/20 text-blue-400 border-blue-600/30' :
                    item.status === 'tour_scheduled' ? 'bg-purple-600/20 text-purple-400 border-purple-600/30' :
                    item.status === 'enrolled' ? 'bg-green-600/20 text-green-400 border-green-600/30' :
                    'bg-red-600/20 text-red-400 border-red-600/30'
                  }`}>
                    {item.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="text-[#bb9457] hover:text-white font-medium transition-colors mr-4"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-400 hover:text-red-300 font-medium transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
          <div className="bg-neutral-900 border border-neutral-800 rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-neutral-800 flex justify-between items-center sticky top-0 bg-neutral-900">
              <h3 className="text-xl font-semibold text-white">Studio Waitlist Details</h3>
              <button onClick={() => setSelectedItem(null)} className="text-neutral-400 hover:text-white text-2xl">×</button>
            </div>
            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Personal Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Name</label>
                    <p className="text-white mt-1">{selectedItem.name}</p>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Email</label>
                    <p className="text-white mt-1">{selectedItem.email}</p>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Phone</label>
                    <p className="text-white mt-1">{selectedItem.phone}</p>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Current City</label>
                    <p className="text-white mt-1">{selectedItem.current_city}</p>
                  </div>
                </div>
              </div>

              {/* Studio Preferences */}
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Studio Preferences</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Preferred City</label>
                    <p className="text-white mt-1">{selectedItem.preferred_city}</p>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Discipline</label>
                    <p className="text-white mt-1">{selectedItem.discipline}</p>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Years of Experience</label>
                    <p className="text-white mt-1">{selectedItem.years_experience}</p>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Membership Type</label>
                    <p className="text-white mt-1">{selectedItem.membership_type.replace('_', ' ')}</p>
                  </div>
                  {selectedItem.intended_start_date && (
                    <div>
                      <label className="text-xs text-neutral-500 uppercase tracking-wider">Intended Start Date</label>
                      <p className="text-white mt-1">{new Date(selectedItem.intended_start_date).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                  <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Why Studio?</h4>
                  <p className="text-neutral-300 whitespace-pre-wrap leading-relaxed">{selectedItem.why_studio}</p>
                </div>
                <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                  <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Current Workspace</h4>
                  <p className="text-neutral-300 whitespace-pre-wrap leading-relaxed">{selectedItem.current_workspace}</p>
                </div>
              </div>

              {/* Portfolio & Social */}
              {(selectedItem.portfolio_url || selectedItem.instagram_handle) && (
                <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                  <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Portfolio & Social</h4>
                  <div className="space-y-3">
                    {selectedItem.portfolio_url && (
                      <div>
                        <label className="text-xs text-neutral-500 uppercase tracking-wider">Portfolio URL</label>
                        <p className="mt-1">
                          <a href={selectedItem.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-[#bb9457] hover:underline">
                            {selectedItem.portfolio_url}
                          </a>
                        </p>
                      </div>
                    )}
                    {selectedItem.instagram_handle && (
                      <div>
                        <label className="text-xs text-neutral-500 uppercase tracking-wider">Instagram</label>
                        <p className="text-white mt-1">{selectedItem.instagram_handle}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Application Info</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Status</label>
                    <p className="mt-1">
                      <span className={`px-3 py-1 rounded-sm text-xs uppercase tracking-wider border ${
                        selectedItem.status === 'waiting' ? 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30' :
                        selectedItem.status === 'contacted' ? 'bg-blue-600/20 text-blue-400 border-blue-600/30' :
                        selectedItem.status === 'tour_scheduled' ? 'bg-purple-600/20 text-purple-400 border-purple-600/30' :
                        selectedItem.status === 'enrolled' ? 'bg-green-600/20 text-green-400 border-green-600/30' :
                        'bg-red-600/20 text-red-400 border-red-600/30'
                      }`}>
                        {selectedItem.status.replace('_', ' ')}
                      </span>
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-wider">Joined</label>
                    <p className="text-white mt-1">{new Date(selectedItem.created_at).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AdminDashboard
