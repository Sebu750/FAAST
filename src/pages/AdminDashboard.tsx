import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { NewsletterSubscription, ContactInquiry, PartnershipInquiry, SpotlightApplication } from '../types/database'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'newsletter' | 'contact' | 'partnership' | 'spotlight'>('newsletter')
  const [newsletterSubscriptions, setNewsletterSubscriptions] = useState<NewsletterSubscription[]>([])
  const [contactInquiries, setContactInquiries] = useState<ContactInquiry[]>([])
  const [partnershipInquiries, setPartnershipInquiries] = useState<PartnershipInquiry[]>([])
  const [spotlightApplications, setSpotlightApplications] = useState<SpotlightApplication[]>([])
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
      if (activeTab === 'newsletter') {
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
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  const tabs = [
    { id: 'newsletter' as const, label: 'Newsletter Subscriptions', count: newsletterSubscriptions.length },
    { id: 'contact' as const, label: 'Contact Inquiries', count: contactInquiries.length },
    { id: 'partnership' as const, label: 'Partnership Inquiries', count: partnershipInquiries.length },
    { id: 'spotlight' as const, label: 'Spotlight Applications', count: spotlightApplications.length },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            FAAST <span className="text-purple-600">Dashboard</span>
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 bg-gray-200 text-gray-700 py-0.5 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow">
          {loading ? (
            <div className="p-12 text-center">
              <div className="text-4xl mb-4">⏳</div>
              <p className="text-gray-600">Loading...</p>
            </div>
          ) : (
            <div className="p-6">
              {activeTab === 'newsletter' && (
                <NewsletterTable data={newsletterSubscriptions} />
              )}
              {activeTab === 'contact' && (
                <ContactTable data={contactInquiries} />
              )}
              {activeTab === 'partnership' && (
                <PartnershipTable data={partnershipInquiries} />
              )}
              {activeTab === 'spotlight' && (
                <SpotlightTable data={spotlightApplications} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Table Components
const NewsletterTable = ({ data }: { data: NewsletterSubscription[] }) => {
  if (data.length === 0) {
    return <p className="text-center text-gray-600 py-8">No newsletter subscriptions yet</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(item.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const ContactTable = ({ data }: { data: ContactInquiry[] }) => {
  if (data.length === 0) {
    return <p className="text-center text-gray-600 py-8">No contact inquiries yet</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.email}</td>
              <td className="px-6 py-4 text-sm text-gray-700 max-w-md">{item.message}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(item.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const PartnershipTable = ({ data }: { data: PartnershipInquiry[] }) => {
  if (data.length === 0) {
    return <p className="text-center text-gray-600 py-8">No partnership inquiries yet</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.company_name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.contact_name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.phone}</td>
              <td className="px-6 py-4 text-sm text-gray-700 max-w-md">{item.message}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(item.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const SpotlightTable = ({ data }: { data: SpotlightApplication[] }) => {
  if (data.length === 0) {
    return <p className="text-center text-gray-600 py-8">No spotlight applications yet</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Portfolio</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.brand_name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                {item.portfolio_url ? (
                  <a href={item.portfolio_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    View Portfolio
                  </a>
                ) : (
                  'N/A'
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700 max-w-md">{item.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(item.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminDashboard
