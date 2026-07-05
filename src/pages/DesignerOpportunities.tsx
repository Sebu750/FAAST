import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Opportunity, OpportunityType, SavedOpportunity, OpportunityApplication } from '../types/database'

// Icon component
const Ic = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, React.ReactNode> = {
    briefcase: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />,
    graduation: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></>,
    trophy: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />,
    gift: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></>,
    megaphone: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />,
    calendar: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    bookmark: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />,
    'bookmark-filled': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" fill="currentColor" />,
    location: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>,
    clock: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
    external: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />,
    x: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />,
    filter: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />,
  }
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  )
}

const typeConfig: Record<OpportunityType, { label: string; icon: string; color: string; bgColor: string; gradient: string }> = {
  job: { label: 'Jobs', icon: 'briefcase', color: 'text-white', bgColor: 'bg-[#8B1A1A]', gradient: 'from-[#8B1A1A]/10 to-transparent' },
  internship: { label: 'Internships', icon: 'graduation', color: 'text-white', bgColor: 'bg-[#8B1A1A]', gradient: 'from-[#8B1A1A]/10 to-transparent' },
  competition: { label: 'Competitions', icon: 'trophy', color: 'text-white', bgColor: 'bg-[#8B1A1A]', gradient: 'from-[#8B1A1A]/10 to-transparent' },
  grant: { label: 'Grants', icon: 'gift', color: 'text-white', bgColor: 'bg-[#8B1A1A]', gradient: 'from-[#8B1A1A]/10 to-transparent' },
  open_call: { label: 'Open Calls', icon: 'megaphone', color: 'text-white', bgColor: 'bg-[#8B1A1A]', gradient: 'from-[#8B1A1A]/10 to-transparent' },
  fashion_event: { label: 'Fashion Events', icon: 'calendar', color: 'text-white', bgColor: 'bg-[#8B1A1A]', gradient: 'from-[#8B1A1A]/10 to-transparent' },
}

// Placeholder images for each opportunity type
const placeholderImages: Record<OpportunityType, string> = {
  job: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  internship: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
  competition: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80',
  grant: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
  open_call: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  fashion_event: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
}

interface Props {
  designerId: string
}

const DesignerOpportunities = ({ designerId }: Props) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [savedOpps, setSavedOpps] = useState<SavedOpportunity[]>([])
  const [myApplications, setMyApplications] = useState<OpportunityApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'browse' | 'saved' | 'applied'>('browse')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterCity, setFilterCity] = useState<string>('all')
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null)
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [applyingOpp, setApplyingOpp] = useState<Opportunity | null>(null)
  const [coverLetter, setCoverLetter] = useState('')
  const [portfolioUrl, setPortfolioUrl] = useState('')
  const [applying, setApplying] = useState(false)

  useEffect(() => { fetchData() }, [designerId])

  const fetchData = async () => {
    setLoading(true)
    const [oppData, savedData, appData] = await Promise.all([
      supabase.from('opportunities').select('*').eq('status', 'published').order('created_at', { ascending: false }),
      supabase.from('saved_opportunities').select('*').eq('designer_id', designerId),
      supabase.from('opportunity_applications').select('*, opportunity:opportunities(*)').eq('designer_id', designerId)
    ])
    setOpportunities(oppData.data || [])
    setSavedOpps(savedData.data || [])
    setMyApplications(appData.data || [])
    setLoading(false)
  }

  const isSaved = (oppId: string) => savedOpps.some(s => s.opportunity_id === oppId)
  const hasApplied = (oppId: string) => myApplications.some(a => a.opportunity_id === oppId)

  const toggleSave = async (oppId: string) => {
    if (isSaved(oppId)) {
      await supabase.from('saved_opportunities').delete().match({ opportunity_id: oppId, designer_id: designerId })
      setSavedOpps(prev => prev.filter(s => s.opportunity_id !== oppId))
    } else {
      const { data } = await supabase.from('saved_opportunities').insert({ opportunity_id: oppId, designer_id: designerId }).select()
      if (data) setSavedOpps(prev => [...prev, data[0]])
    }
  }

  const handleApply = async () => {
    if (!applyingOpp) return
    setApplying(true)
    try {
      const { error } = await supabase.from('opportunity_applications').insert({
        opportunity_id: applyingOpp.id, designer_id: designerId,
        cover_letter: coverLetter || null, portfolio_url: portfolioUrl || null
      })
      if (error) throw error
      await supabase.from('opportunities').update({ applications_count: (applyingOpp.applications_count || 0) + 1 }).eq('id', applyingOpp.id)
      setShowApplyModal(false); setApplyingOpp(null); setCoverLetter(''); setPortfolioUrl('')
      await fetchData()
    } catch (err: any) { alert('Error: ' + err.message) }
    finally { setApplying(false) }
  }

  const filtered = opportunities.filter(o => {
    const matchSearch = o.title.toLowerCase().includes(searchQuery.toLowerCase()) || (o.description || '').toLowerCase().includes(searchQuery.toLowerCase())
    const matchType = filterType === 'all' || o.opportunity_type === filterType
    const matchCity = filterCity === 'all' || o.city === filterCity || (filterCity === 'remote' && o.is_remote)
    return matchSearch && matchType && matchCity
  })

  const savedOpportunities = opportunities.filter(o => savedOpps.some(s => s.opportunity_id === o.id))
  const appliedOpportunities = myApplications.map(a => ({ ...a.opportunity!, application: a }))

  const cities = [...new Set(opportunities.filter(o => o.city).map(o => o.city!))]
  const deadlinePassed = (deadline: string | null) => deadline && new Date(deadline) < new Date()

  const formatDate = (d: string | null) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'
  const daysUntil = (d: string | null) => {
    if (!d) return null
    const diff = Math.ceil((new Date(d).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    if (diff < 0) return 'Expired'
    if (diff === 0) return 'Today'
    if (diff === 1) return 'Tomorrow'
    return `${diff} days`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-stone-200 border-t-[#8B1A1A] rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-stone-900 tracking-tight mb-2">Opportunities</h1>
        <p className="text-stone-500 text-sm">Discover jobs, internships, competitions, grants, open calls, and fashion events</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 mb-8 border-b border-stone-200">
        {[
          { key: 'browse' as const, label: 'All Opportunities', count: opportunities.length },
          { key: 'saved' as const, label: 'Saved', count: savedOpportunities.length },
          { key: 'applied' as const, label: 'Applied', count: myApplications.length },
        ].map(tab => (
          <button 
            key={tab.key}
            onClick={() => setActiveTab(tab.key)} 
            className={`pb-3 text-sm font-medium transition-all relative ${
              activeTab === tab.key 
                ? 'text-[#8B1A1A]' 
                : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            {tab.label}
            <span className="ml-2 text-xs text-stone-400">{tab.count}</span>
            {activeTab === tab.key && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B1A1A]" />
            )}
          </button>
        ))}
      </div>

      {activeTab === 'browse' && (
        <>
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input 
                type="text" 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
                placeholder="Search opportunities..." 
                className="w-full pl-11 pr-4 py-3 bg-white border border-stone-200 text-stone-900 text-sm rounded-lg focus:outline-none focus:border-[#8B1A1A]/30 transition-all placeholder-stone-400" 
              />
            </div>
            <select 
              value={filterType} 
              onChange={e => setFilterType(e.target.value)} 
              className="px-4 py-3 bg-white border border-stone-200 text-stone-900 text-sm rounded-lg focus:outline-none focus:border-[#8B1A1A]/30 min-w-[140px]"
            >
              <option value="all">All Types</option>
              {Object.entries(typeConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
            <select 
              value={filterCity} 
              onChange={e => setFilterCity(e.target.value)} 
              className="px-4 py-3 bg-white border border-stone-200 text-stone-900 text-sm rounded-lg focus:outline-none focus:border-[#8B1A1A]/30 min-w-[140px]"
            >
              <option value="all">All Cities</option>
              <option value="remote">Remote</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Type Quick Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button 
              onClick={() => setFilterType('all')} 
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all ${
                filterType === 'all' 
                  ? 'bg-[#8B1A1A] text-white' 
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Ic name="briefcase" className="w-4 h-4" />
              All Types
            </button>
            {Object.entries(typeConfig).map(([k, v]) => (
              <button 
                key={k} 
                onClick={() => setFilterType(filterType === k ? 'all' : k)} 
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  filterType === k 
                    ? 'bg-[#8B1A1A] text-white' 
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Ic name={v.icon} className="w-4 h-4" />
                {v.label}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Content */}
      {activeTab === 'browse' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full bg-white border border-stone-200 rounded-lg p-16 text-center">
              <Ic name="briefcase" className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <p className="text-stone-500 text-sm">No opportunities found</p>
            </div>
          ) : filtered.map(opp => (
            <div key={opp.id} className="group bg-white border border-stone-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300">
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={opp.cover_image_url || placeholderImages[opp.opportunity_type]} 
                  alt={opp.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                
                {/* Type Badge - Solid Burgundy */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-[#8B1A1A] text-white">
                  <Ic name={typeConfig[opp.opportunity_type].icon} className="w-3.5 h-3.5" />
                  {typeConfig[opp.opportunity_type].label}
                </div>
                
                {/* Save Button - White Circle */}
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleSave(opp.id) }} 
                  className={`absolute top-4 right-4 p-2 rounded-full transition-all ${
                    isSaved(opp.id) 
                      ? 'bg-[#8B1A1A] text-white' 
                      : 'bg-white text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <Ic name={isSaved(opp.id) ? 'bookmark-filled' : 'bookmark'} className="w-4 h-4" />
                </button>
                
                {/* Deadline Badge */}
                {opp.application_deadline && (
                  <div className={`absolute bottom-4 right-4 px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium rounded-full backdrop-blur-sm ${
                    deadlinePassed(opp.application_deadline) 
                      ? 'bg-red-500/90 text-white' 
                      : 'bg-white/90 text-stone-700'
                  }`}>
                    {daysUntil(opp.application_deadline)}
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="p-5">
                <h3 className="text-stone-900 font-medium text-base mb-1 line-clamp-2">{opp.title}</h3>
                <p className="text-stone-500 text-xs mb-4 line-clamp-2 leading-relaxed">{opp.description || 'No description available'}</p>
                
                <div className="flex items-center gap-4 text-xs text-stone-500 mb-5">
                  <span className="flex items-center gap-1.5">
                    <Ic name="location" className="w-3.5 h-3.5" />
                    {opp.is_remote ? 'Remote' : opp.city || opp.location || '—'}
                  </span>
                  {opp.application_deadline && (
                    <span className="flex items-center gap-1.5">
                      <Ic name="clock" className="w-3.5 h-3.5" />
                      {formatDate(opp.application_deadline)}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setSelectedOpp(opp)} 
                    className="flex-1 px-4 py-2.5 bg-white border border-[#8B1A1A] text-[#8B1A1A] text-sm font-medium rounded-lg hover:bg-[#8B1A1A]/5 transition-colors"
                  >
                    View Details
                  </button>
                  {hasApplied(opp.id) ? (
                    <span className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-lg border border-emerald-200">
                      <Ic name="check" className="w-4 h-4" /> Applied
                    </span>
                  ) : opp.is_open_for_applications && !deadlinePassed(opp.application_deadline) ? (
                    <button 
                      onClick={() => { setApplyingOpp(opp); setShowApplyModal(true) }} 
                      className="px-4 py-2.5 bg-[#8B1A1A] text-white text-sm font-semibold rounded-lg hover:bg-[#6d1414] transition-colors"
                    >
                      {opp.application_method === 'external' ? 'Apply ↗' : 'Apply Now'}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'saved' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedOpportunities.length === 0 ? (
            <div className="col-span-full bg-white border border-stone-200 rounded-lg p-16 text-center">
              <Ic name="bookmark" className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <p className="text-stone-500 text-sm">No saved opportunities</p>
              <p className="text-stone-400 text-xs mt-2">Browse opportunities and click the bookmark icon to save them here</p>
            </div>
          ) : savedOpportunities.map(opp => (
            <div key={opp.id} className="group bg-white border border-stone-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={opp.cover_image_url || placeholderImages[opp.opportunity_type]} 
                  alt={opp.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <button 
                  onClick={() => toggleSave(opp.id)} 
                  className="absolute top-4 right-4 p-2 bg-white text-[#8B1A1A] rounded-full hover:bg-stone-50 transition-colors"
                >
                  <Ic name="bookmark-filled" className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5">
                <h3 className="text-stone-900 font-medium text-base mb-1 line-clamp-2">{opp.title}</h3>
                <p className="text-stone-500 text-xs mb-4 line-clamp-2 leading-relaxed">{opp.description || 'No description'}</p>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setSelectedOpp(opp)} 
                    className="flex-1 px-4 py-2.5 bg-white border border-[#8B1A1A] text-[#8B1A1A] text-sm font-medium rounded-lg hover:bg-[#8B1A1A]/5 transition-colors"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => { setApplyingOpp(opp); setShowApplyModal(true) }} 
                    className="px-4 py-2.5 bg-[#8B1A1A] text-white text-sm font-semibold rounded-lg hover:bg-[#6d1414] transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'applied' && (
        <div className="space-y-4">
          {appliedOpportunities.length === 0 ? (
            <div className="bg-white border border-stone-200 rounded-lg p-16 text-center">
              <Ic name="briefcase" className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <p className="text-stone-500 text-sm">No applications yet</p>
              <p className="text-stone-400 text-xs mt-2">Browse opportunities and apply to track your applications here</p>
            </div>
          ) : appliedOpportunities.map(({ application, ...opp }) => (
            <div key={opp.id} className="group bg-white border border-stone-200 rounded-lg p-5 hover:shadow-md transition-all flex items-center gap-5">
              <div className="w-20 h-20 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={opp.cover_image_url || placeholderImages[opp.opportunity_type]} 
                  alt={opp.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-[#8B1A1A] text-white mb-2">
                  <Ic name={typeConfig[opp.opportunity_type].icon} className="w-3.5 h-3.5" />
                  {typeConfig[opp.opportunity_type].label}
                </div>
                <h3 className="text-stone-900 font-medium text-base truncate">{opp.title}</h3>
                <p className="text-stone-400 text-xs mt-1">Applied {formatDate(application.created_at)}</p>
              </div>
              <div className={`px-3 py-1.5 text-xs font-medium rounded-full border ${
                application.status === 'submitted' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                application.status === 'under_review' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                application.status === 'shortlisted' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                'bg-red-50 text-red-700 border-red-200'
              }`}>
                {application.status.replace('_', ' ')}
              </div>
              <button 
                onClick={() => setSelectedOpp(opp)} 
                className="px-4 py-2.5 bg-white border border-[#8B1A1A] text-[#8B1A1A] text-sm font-medium rounded-lg hover:bg-[#8B1A1A]/5 transition-colors"
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedOpp && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 backdrop-blur-sm p-4 sm:p-8">
          <div className="bg-white border border-stone-200 rounded-lg w-full max-w-2xl my-8 shadow-2xl">
            {/* Cover */}
            <div className="relative h-64 overflow-hidden rounded-t-lg">
              <img 
                src={selectedOpp.cover_image_url || placeholderImages[selectedOpp.opportunity_type]} 
                alt={selectedOpp.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button 
                onClick={() => setSelectedOpp(null)} 
                className="absolute top-4 right-4 p-2.5 bg-white text-stone-700 rounded-full hover:bg-stone-50 transition-colors"
              >
                <Ic name="x" className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-[#8B1A1A] text-white">
                <Ic name={typeConfig[selectedOpp.opportunity_type].icon} className="w-3.5 h-3.5" />
                {typeConfig[selectedOpp.opportunity_type].label}
              </div>
            </div>
            {/* Content */}
            <div className="p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-serif text-stone-900 mb-3">{selectedOpp.title}</h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500">
                  <span className="flex items-center gap-1.5">
                    <Ic name="location" className="w-4 h-4" />
                    {selectedOpp.is_remote ? 'Remote' : selectedOpp.city || selectedOpp.location || '—'}
                  </span>
                  {selectedOpp.application_deadline && (
                    <span className="flex items-center gap-1.5">
                      <Ic name="clock" className="w-4 h-4" />
                      Deadline: {formatDate(selectedOpp.application_deadline)}
                    </span>
                  )}
                  {selectedOpp.start_date && (
                    <span className="flex items-center gap-1.5">
                      <Ic name="calendar" className="w-4 h-4" />
                      {formatDate(selectedOpp.start_date)} - {formatDate(selectedOpp.end_date)}
                    </span>
                  )}
                </div>
              </div>
              {selectedOpp.description && (
                <div>
                  <h4 className="text-stone-900 text-sm font-medium mb-2">About</h4>
                  <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-wrap">{selectedOpp.description}</p>
                </div>
              )}
              {selectedOpp.eligibility && (
                <div>
                  <h4 className="text-stone-900 text-sm font-medium mb-2">Eligibility</h4>
                  <p className="text-stone-500 text-sm leading-relaxed whitespace-pre-wrap">{selectedOpp.eligibility}</p>
                </div>
              )}
              {selectedOpp.requirements && (
                <div>
                  <h4 className="text-stone-900 text-sm font-medium mb-2">Requirements</h4>
                  <p className="text-stone-500 text-sm leading-relaxed whitespace-pre-wrap">{selectedOpp.requirements}</p>
                </div>
              )}
              {selectedOpp.benefits && (
                <div>
                  <h4 className="text-stone-900 text-sm font-medium mb-2">Benefits</h4>
                  <p className="text-stone-500 text-sm leading-relaxed whitespace-pre-wrap">{selectedOpp.benefits}</p>
                </div>
              )}
              {selectedOpp.salary_range && (
                <div>
                  <h4 className="text-stone-900 text-sm font-medium mb-2">Salary</h4>
                  <p className="text-stone-700 text-sm">{selectedOpp.salary_range}</p>
                </div>
              )}
              {selectedOpp.prize_amount && (
                <div>
                  <h4 className="text-stone-900 text-sm font-medium mb-2">Prize</h4>
                  <p className="text-stone-700 text-sm">{selectedOpp.prize_amount}</p>
                </div>
              )}
              {/* Actions */}
              <div className="flex items-center gap-3 pt-6 border-t border-stone-200">
                <button 
                  onClick={() => toggleSave(selectedOpp.id)} 
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium transition-all ${
                    isSaved(selectedOpp.id) 
                      ? 'bg-[#8B1A1A] text-white' 
                      : 'bg-white border border-[#8B1A1A] text-[#8B1A1A] hover:bg-[#8B1A1A]/5'
                  }`}
                >
                  <Ic name={isSaved(selectedOpp.id) ? 'bookmark-filled' : 'bookmark'} className="w-4 h-4" />
                  {isSaved(selectedOpp.id) ? 'Saved' : 'Save'}
                </button>
                {hasApplied(selectedOpp.id) ? (
                  <span className="flex items-center gap-2 px-5 py-3 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium">
                    <Ic name="check" className="w-4 h-4" /> Applied
                  </span>
                ) : selectedOpp.is_open_for_applications && !deadlinePassed(selectedOpp.application_deadline) ? (
                  selectedOpp.application_method === 'external' && selectedOpp.external_application_url ? (
                    <a 
                      href={selectedOpp.external_application_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 px-5 py-3 bg-[#8B1A1A] text-white rounded-lg text-sm font-semibold hover:bg-[#6d1414] transition-colors"
                    >
                      Apply External <Ic name="external" className="w-4 h-4" />
                    </a>
                  ) : (
                    <button 
                      onClick={() => { setApplyingOpp(selectedOpp); setShowApplyModal(true); setSelectedOpp(null) }} 
                      className="px-5 py-3 bg-[#8B1A1A] text-white rounded-lg text-sm font-semibold hover:bg-[#6d1414] transition-colors"
                    >
                      Apply Now
                    </button>
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Apply Modal */}
      {showApplyModal && applyingOpp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-8">
          <div className="bg-white border border-stone-200 rounded-lg w-full max-w-lg shadow-2xl">
            {/* Header */}
            <div className="relative px-6 py-5 border-b border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-[#8B1A1A] text-white mb-2">
                    <Ic name={typeConfig[applyingOpp.opportunity_type].icon} className="w-3.5 h-3.5" />
                    {typeConfig[applyingOpp.opportunity_type].label}
                  </div>
                  <h3 className="text-lg font-serif text-stone-900">Apply to {applyingOpp.title}</h3>
                </div>
                <button onClick={() => { setShowApplyModal(false); setApplyingOpp(null) }} className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors">
                  <Ic name="x" className="w-5 h-5" />
                </button>
              </div>
            </div>
            {/* Form */}
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-2">Cover Letter</label>
                <textarea 
                  className="w-full px-4 py-3 bg-white border border-stone-200 text-stone-900 text-sm rounded-lg focus:outline-none focus:border-[#8B1A1A]/30 transition-all placeholder-stone-400 resize-none" 
                  rows={5} 
                  value={coverLetter} 
                  onChange={e => setCoverLetter(e.target.value)} 
                  placeholder="Tell them why you're a great fit..." 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-2">Portfolio URL</label>
                <input 
                  className="w-full px-4 py-3 bg-white border border-stone-200 text-stone-900 text-sm rounded-lg focus:outline-none focus:border-[#8B1A1A]/30 transition-all placeholder-stone-400" 
                  value={portfolioUrl} 
                  onChange={e => setPortfolioUrl(e.target.value)} 
                  placeholder="https://your-portfolio.com" 
                />
              </div>
            </div>
            {/* Actions */}
            <div className="px-6 py-4 border-t border-stone-200 flex justify-end gap-3">
              <button 
                onClick={() => { setShowApplyModal(false); setApplyingOpp(null) }} 
                className="px-5 py-2.5 bg-white border border-stone-200 text-stone-700 text-sm rounded-lg hover:bg-stone-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleApply} 
                disabled={applying} 
                className="px-5 py-2.5 bg-[#8B1A1A] text-white text-sm font-semibold rounded-lg hover:bg-[#6d1414] disabled:opacity-50 transition-colors"
              >
                {applying ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DesignerOpportunities
