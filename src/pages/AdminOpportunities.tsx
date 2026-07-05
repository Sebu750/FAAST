import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Opportunity, OpportunityApplication, OpportunityType, OpportunityStatus } from '../types/database'

// Icon component
const Ic = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, React.ReactNode> = {
    briefcase: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />,
    graduation: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></>,
    trophy: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />,
    gift: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></>,
    megaphone: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />,
    calendar: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    plus: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />,
    x: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />,
    edit: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
    trash: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />,
    location: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>,
    clock: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
    upload: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    eye: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>,
    download: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />,
    filter: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />,
    tag: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />,
  }
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  )
}

const typeConfig: Record<OpportunityType, { label: string; icon: string; color: string }> = {
  job: { label: 'Job', icon: 'briefcase', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
  internship: { label: 'Internship', icon: 'graduation', color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
  competition: { label: 'Competition', icon: 'trophy', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30' },
  grant: { label: 'Grant', icon: 'gift', color: 'text-green-400 bg-green-500/10 border-green-500/30' },
  open_call: { label: 'Open Call', icon: 'megaphone', color: 'text-pink-400 bg-pink-500/10 border-pink-500/30' },
  fashion_event: { label: 'Fashion Event', icon: 'calendar', color: 'text-[#bb9457] bg-[#bb9457]/10 border-[#bb9457]/30' },
}

const statusConfig: Record<OpportunityStatus, { label: string; color: string }> = {
  draft: { label: 'Draft', color: 'text-neutral-400 bg-neutral-500/10 border-neutral-500/30' },
  published: { label: 'Published', color: 'text-green-400 bg-green-500/10 border-green-500/30' },
  archived: { label: 'Archived', color: 'text-orange-400 bg-orange-500/10 border-orange-500/30' },
  expired: { label: 'Expired', color: 'text-red-400 bg-red-500/10 border-red-500/30' },
}

const emptyForm = {
  title: '', slug: '', description: '', opportunity_type: 'fashion_event' as OpportunityType,
  start_date: '', end_date: '', application_deadline: '', location: '', city: '',
  is_remote: false, cover_image_url: '', banner_image_url: '', status: 'draft' as OpportunityStatus,
  is_open_for_applications: true, application_method: 'internal' as 'internal' | 'external', external_application_url: '',
  max_applications: '', salary_range: '', employment_type: '', experience_level: '',
  prize_amount: '', eligibility: '', requirements: '', benefits: '',
  event_format: 'in_person', max_participants: '', tags: '', category: '', is_featured: false,
}

type OppForm = typeof emptyForm

const AdminOpportunities = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [applications, setApplications] = useState<OpportunityApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [activeView, setActiveView] = useState<'list' | 'applications'>('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showEditor, setShowEditor] = useState(false)
  const [editingOpp, setEditingOpp] = useState<Opportunity | null>(null)
  const [form, setForm] = useState<OppForm>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [coverPreview, setCoverPreview] = useState('')
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [selectedApp, setSelectedApp] = useState<OpportunityApplication | null>(null)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    setLoading(true)
    const [oppData, appData] = await Promise.all([
      supabase.from('opportunities').select('*').order('created_at', { ascending: false }),
      supabase.from('opportunity_applications').select('*, opportunity:opportunities(*), designer:designers(*)').order('created_at', { ascending: false })
    ])
    setOpportunities(oppData.data || [])
    setApplications(appData.data || [])
    setLoading(false)
  }

  const uploadImage = async (file: File, path: string): Promise<string | null> => {
    const { data, error } = await supabase.storage.from('designers').upload(path, file, { upsert: true })
    if (error) return null
    const { data: urlData } = supabase.storage.from('designers').getPublicUrl(data.path)
    return urlData.publicUrl
  }

  const openCreate = () => {
    setEditingOpp(null)
    setForm(emptyForm)
    setCoverPreview('')
    setCoverFile(null)
    setShowEditor(true)
  }

  const openEdit = (opp: Opportunity) => {
    setEditingOpp(opp)
    setForm({
      title: opp.title, slug: opp.slug, description: opp.description || '',
      opportunity_type: opp.opportunity_type, start_date: opp.start_date || '',
      end_date: opp.end_date || '', application_deadline: opp.application_deadline || '',
      location: opp.location || '', city: opp.city || '', is_remote: opp.is_remote,
      cover_image_url: opp.cover_image_url || '', banner_image_url: opp.banner_image_url || '',
      status: opp.status, is_open_for_applications: opp.is_open_for_applications,
      application_method: opp.application_method, external_application_url: opp.external_application_url || '',
      max_applications: opp.max_applications ? String(opp.max_applications) : '',
      salary_range: opp.salary_range || '', employment_type: opp.employment_type || '',
      experience_level: opp.experience_level || '', prize_amount: opp.prize_amount || '',
      eligibility: opp.eligibility || '', requirements: opp.requirements || '',
      benefits: opp.benefits || '', event_format: opp.event_format || 'in_person',
      max_participants: opp.max_participants ? String(opp.max_participants) : '',
      tags: opp.tags?.join(', ') || '', category: opp.category || '', is_featured: opp.is_featured,
    })
    setCoverPreview(opp.cover_image_url || '')
    setCoverFile(null)
    setShowEditor(true)
  }

  const handleSave = async () => {
    if (!form.title) return
    setSaving(true)
    try {
      const saveData: any = {
        title: form.title,
        slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        description: form.description || null, opportunity_type: form.opportunity_type,
        start_date: form.start_date || null, end_date: form.end_date || null,
        application_deadline: form.application_deadline || null,
        location: form.location || null, city: form.city || null, is_remote: form.is_remote,
        banner_image_url: form.banner_image_url || null, status: form.status,
        is_open_for_applications: form.is_open_for_applications,
        application_method: form.application_method,
        external_application_url: form.external_application_url || null,
        max_applications: form.max_applications ? parseInt(form.max_applications) : null,
        salary_range: form.salary_range || null, employment_type: form.employment_type || null,
        experience_level: form.experience_level || null, prize_amount: form.prize_amount || null,
        eligibility: form.eligibility || null, requirements: form.requirements || null,
        benefits: form.benefits || null, event_format: form.event_format || null,
        max_participants: form.max_participants ? parseInt(form.max_participants) : null,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : null,
        category: form.category || null, is_featured: form.is_featured,
        published_at: form.status === 'published' && !editingOpp?.published_at ? new Date().toISOString() : editingOpp?.published_at || null,
      }
      if (coverFile) {
        const url = await uploadImage(coverFile, `opportunities/cover-${Date.now()}.${coverFile.name.split('.').pop()}`)
        if (url) saveData.cover_image_url = url
      } else if (!editingOpp) {
        saveData.cover_image_url = form.cover_image_url || null
      }

      if (editingOpp) {
        const { error } = await supabase.from('opportunities').update(saveData).eq('id', editingOpp.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('opportunities').insert(saveData)
        if (error) throw error
      }
      setShowEditor(false); setEditingOpp(null); setForm(emptyForm); setCoverPreview(''); setCoverFile(null)
      await fetchData()
    } catch (err: any) { alert('Error: ' + err.message) }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this opportunity? This cannot be undone.')) return
    await supabase.from('opportunities').delete().eq('id', id)
    await fetchData()
  }

  const handleStatusToggle = async (id: string, current: OpportunityStatus) => {
    const next = current === 'draft' ? 'published' : current === 'published' ? 'archived' : 'draft'
    const updateData: any = { status: next }
    if (next === 'published') updateData.published_at = new Date().toISOString()
    await supabase.from('opportunities').update(updateData).eq('id', id)
    await fetchData()
  }

  const handleApplicationStatus = async (id: string, status: string) => {
    await supabase.from('opportunity_applications').update({ status, reviewed_at: new Date().toISOString() }).eq('id', id)
    await fetchData()
    if (selectedApp?.id === id) setSelectedApp({ ...selectedApp, status: status as any })
  }

  const filtered = opportunities.filter(o => {
    const matchSearch = o.title.toLowerCase().includes(searchQuery.toLowerCase()) || (o.location || '').toLowerCase().includes(searchQuery.toLowerCase())
    const matchType = filterType === 'all' || o.opportunity_type === filterType
    const matchStatus = filterStatus === 'all' || o.status === filterStatus
    return matchSearch && matchType && matchStatus
  })

  const stats = {
    total: opportunities.length,
    published: opportunities.filter(o => o.status === 'published').length,
    active: opportunities.filter(o => o.status === 'published' && o.is_open_for_applications).length,
    applications: applications.length,
    pending: applications.filter(a => a.status === 'submitted').length,
  }

  const inputCls = "w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 text-white text-sm rounded-sm focus:outline-none focus:border-[#bb9457] transition-colors placeholder-neutral-500"
  const labelCls = "block text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1.5"

  const formatDate = (d: string | null) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-neutral-700 border-t-[#bb9457] rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-white tracking-tight">Opportunities</h1>
          <p className="text-neutral-500 text-sm mt-1">Manage jobs, internships, competitions, grants, and events</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-[#bb9457] text-black text-xs uppercase tracking-wider font-semibold hover:bg-white transition-colors rounded-sm">
          <Ic name="plus" className="w-4 h-4" />
          Create Opportunity
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Total', value: stats.total, color: 'text-white' },
          { label: 'Published', value: stats.published, color: 'text-green-400' },
          { label: 'Active', value: stats.active, color: 'text-blue-400' },
          { label: 'Applications', value: stats.applications, color: 'text-[#bb9457]' },
          { label: 'Pending Review', value: stats.pending, color: 'text-yellow-400' },
        ].map(s => (
          <div key={s.label} className="bg-neutral-900 border border-neutral-800 rounded-sm px-5 py-4">
            <p className={`text-2xl font-serif ${s.color}`}>{s.value}</p>
            <p className="text-neutral-500 text-xs uppercase tracking-wider mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => setActiveView('list')} className={`px-4 py-2.5 text-xs uppercase tracking-wider font-medium rounded-sm border transition-colors ${activeView === 'list' ? 'bg-[#bb9457]/10 text-[#bb9457] border-[#bb9457]/30' : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700'}`}>
          Opportunities
        </button>
        <button onClick={() => setActiveView('applications')} className={`px-4 py-2.5 text-xs uppercase tracking-wider font-medium rounded-sm border transition-colors ${activeView === 'applications' ? 'bg-[#bb9457]/10 text-[#bb9457] border-[#bb9457]/30' : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700'}`}>
          Applications ({applications.length})
        </button>
      </div>

      {activeView === 'list' ? (
        <>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search opportunities..." className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-neutral-800 text-white text-sm rounded-sm focus:outline-none focus:border-[#bb9457] transition-colors placeholder-neutral-500" />
            </div>
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-4 py-2.5 bg-neutral-900 border border-neutral-800 text-white text-sm rounded-sm focus:outline-none focus:border-[#bb9457]">
              <option value="all">All Types</option>
              {Object.entries(typeConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-4 py-2.5 bg-neutral-900 border border-neutral-800 text-white text-sm rounded-sm focus:outline-none focus:border-[#bb9457]">
              <option value="all">All Status</option>
              {Object.entries(statusConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>

          {/* Table */}
          {filtered.length === 0 ? (
            <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-12 text-center">
              <Ic name="briefcase" className="w-10 h-10 text-neutral-700 mx-auto mb-4" />
              <p className="text-neutral-500 text-sm">No opportunities found</p>
            </div>
          ) : (
            <div className="bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-800">
                  <thead className="bg-neutral-950">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Opportunity</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Deadline</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Applications</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {filtered.map(opp => (
                      <tr key={opp.id} className="hover:bg-neutral-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-neutral-800 rounded-sm overflow-hidden flex-shrink-0">
                              {opp.cover_image_url ? <img src={opp.cover_image_url} alt={opp.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-neutral-600"><Ic name={typeConfig[opp.opportunity_type].icon} className="w-5 h-5" /></div>}
                            </div>
                            <div>
                              <p className="text-white text-sm font-medium">{opp.title}</p>
                              <p className="text-neutral-500 text-xs">{opp.location || opp.city || 'Remote'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-sm border ${typeConfig[opp.opportunity_type].color}`}>
                            {typeConfig[opp.opportunity_type].label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-400">{formatDate(opp.application_deadline)}</td>
                        <td className="px-6 py-4 text-sm text-neutral-400">{opp.applications_count || 0}</td>
                        <td className="px-6 py-4">
                          <button onClick={() => handleStatusToggle(opp.id, opp.status)} className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium rounded-sm border transition-colors ${statusConfig[opp.status].color}`}>
                            {statusConfig[opp.status].label}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <button onClick={() => openEdit(opp)} className="text-[#bb9457] hover:text-white text-sm transition-colors">Edit</button>
                            <button onClick={() => handleDelete(opp.id)} className="text-red-400 hover:text-red-300 text-sm transition-colors">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Applications View */
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-800">
              <thead className="bg-neutral-950">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Designer</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Opportunity</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Applied</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {applications.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-12 text-center text-neutral-500 text-sm">No applications yet</td></tr>
                ) : applications.map(app => (
                  <tr key={app.id} className="hover:bg-neutral-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-neutral-800 rounded-full overflow-hidden flex-shrink-0">
                          {(app.designer as any)?.image_url ? <img src={(app.designer as any).image_url} alt={(app.designer as any)?.name || ''} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs">{((app.designer as any)?.name || 'D').charAt(0)}</div>}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{(app.designer as any)?.name || 'Unknown'}</p>
                          <p className="text-neutral-500 text-xs">{(app.designer as any)?.brand || ''}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-400">{(app.opportunity as any)?.title || 'Unknown'}</td>
                    <td className="px-6 py-4 text-sm text-neutral-400">{formatDate(app.created_at)}</td>
                    <td className="px-6 py-4">
                      <select value={app.status} onChange={e => handleApplicationStatus(app.id, e.target.value)} className="px-2 py-1 bg-neutral-800 border border-neutral-700 text-white text-xs rounded-sm focus:outline-none focus:border-[#bb9457]">
                        <option value="submitted">Submitted</option>
                        <option value="under_review">Under Review</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => setSelectedApp(app)} className="text-[#bb9457] hover:text-white text-sm transition-colors">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Application Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-neutral-950 border border-neutral-800 rounded-sm w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
              <h3 className="text-lg font-serif text-white">Application Details</h3>
              <button onClick={() => setSelectedApp(null)} className="text-neutral-500 hover:text-white"><Ic name="x" className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className={labelCls}>Designer</label><p className="text-white">{(selectedApp.designer as any)?.name || 'Unknown'}</p></div>
              <div><label className={labelCls}>Opportunity</label><p className="text-white">{(selectedApp.opportunity as any)?.title || 'Unknown'}</p></div>
              <div><label className={labelCls}>Applied</label><p className="text-white">{formatDate(selectedApp.created_at)}</p></div>
              {selectedApp.cover_letter && <div><label className={labelCls}>Cover Letter</label><p className="text-neutral-300 text-sm whitespace-pre-wrap">{selectedApp.cover_letter}</p></div>}
              {selectedApp.portfolio_url && <div><label className={labelCls}>Portfolio</label><a href={selectedApp.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-[#bb9457] hover:underline">{selectedApp.portfolio_url}</a></div>}
              <div><label className={labelCls}>Status</label>
                <select value={selectedApp.status} onChange={e => handleApplicationStatus(selectedApp.id, e.target.value)} className={inputCls}>
                  <option value="submitted">Submitted</option>
                  <option value="under_review">Under Review</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-neutral-800 flex justify-end">
              <button onClick={() => setSelectedApp(null)} className="px-4 py-2 bg-neutral-800 text-white text-sm rounded-sm hover:bg-neutral-700">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 backdrop-blur-sm p-4 sm:p-8">
          <div className="bg-neutral-950 border border-neutral-800 rounded-sm w-full max-w-3xl my-8 shadow-2xl">
            <div className="flex items-center justify-between px-8 py-5 border-b border-neutral-800">
              <h2 className="text-lg font-serif text-white">{editingOpp ? 'Edit Opportunity' : 'Create Opportunity'}</h2>
              <button onClick={() => setShowEditor(false)} className="text-neutral-500 hover:text-white"><Ic name="x" className="w-5 h-5" /></button>
            </div>
            <div className="px-8 py-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Basic Info */}
              <div>
                <h3 className="text-sm font-medium text-white mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2"><label className={labelCls}>Title *</label><input className={inputCls} value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} placeholder="e.g. Senior Fashion Designer" /></div>
                  <div><label className={labelCls}>Type</label>
                    <select className={inputCls} value={form.opportunity_type} onChange={e => setForm(p => ({...p, opportunity_type: e.target.value as OpportunityType}))}>
                      {Object.entries(typeConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                    </select>
                  </div>
                  <div><label className={labelCls}>Status</label>
                    <select className={inputCls} value={form.status} onChange={e => setForm(p => ({...p, status: e.target.value as OpportunityStatus}))}>
                      {Object.entries(statusConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div>
                <h3 className="text-sm font-medium text-white mb-4">Dates</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div><label className={labelCls}>Start Date</label><input type="date" className={inputCls} value={form.start_date} onChange={e => setForm(p => ({...p, start_date: e.target.value}))} /></div>
                  <div><label className={labelCls}>End Date</label><input type="date" className={inputCls} value={form.end_date} onChange={e => setForm(p => ({...p, end_date: e.target.value}))} /></div>
                  <div><label className={labelCls}>Application Deadline</label><input type="date" className={inputCls} value={form.application_deadline} onChange={e => setForm(p => ({...p, application_deadline: e.target.value}))} /></div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-sm font-medium text-white mb-4">Location</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={labelCls}>Location</label><input className={inputCls} value={form.location} onChange={e => setForm(p => ({...p, location: e.target.value}))} placeholder="e.g. Lahore Expo Center" /></div>
                  <div><label className={labelCls}>City</label><input className={inputCls} value={form.city} onChange={e => setForm(p => ({...p, city: e.target.value}))} placeholder="e.g. Lahore" /></div>
                  <div className="flex items-center gap-3 pt-6">
                    <input type="checkbox" id="remote" checked={form.is_remote} onChange={e => setForm(p => ({...p, is_remote: e.target.checked}))} className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-[#bb9457]" />
                    <label htmlFor="remote" className="text-sm text-neutral-300">Remote opportunity</label>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className={labelCls}>Description</label>
                <textarea className={inputCls + ' resize-none'} rows={4} value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))} placeholder="Describe the opportunity..." />
              </div>

              {/* Cover Image */}
              <div>
                <label className={labelCls}>Cover Image</label>
                <div className="flex items-center gap-4">
                  {coverPreview && <div className="w-24 h-16 rounded-sm overflow-hidden border border-neutral-700 shrink-0"><img src={coverPreview} className="w-full h-full object-cover" /></div>}
                  <label className="cursor-pointer px-4 py-2.5 bg-neutral-900 border border-neutral-700 text-neutral-300 text-sm rounded-sm hover:border-[#bb9457]">
                    {coverPreview ? 'Replace' : 'Choose Image'}
                    <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) { setCoverFile(f); setCoverPreview(URL.createObjectURL(f)) } }} />
                  </label>
                </div>
              </div>

              {/* Application Settings */}
              <div>
                <h3 className="text-sm font-medium text-white mb-4">Application Settings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 pt-2">
                    <input type="checkbox" id="open-apps" checked={form.is_open_for_applications} onChange={e => setForm(p => ({...p, is_open_for_applications: e.target.checked}))} className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-[#bb9457]" />
                    <label htmlFor="open-apps" className="text-sm text-neutral-300">Open for applications</label>
                  </div>
                  <div><label className={labelCls}>Application Method</label>
                    <select className={inputCls} value={form.application_method} onChange={e => setForm(p => ({...p, application_method: e.target.value as any}))}>
                      <option value="internal">Internal (on platform)</option>
                      <option value="external">External (redirect URL)</option>
                    </select>
                  </div>
                  {form.application_method === 'external' && (
                    <div className="sm:col-span-2"><label className={labelCls}>External URL</label><input className={inputCls} value={form.external_application_url} onChange={e => setForm(p => ({...p, external_application_url: e.target.value}))} placeholder="https://..." /></div>
                  )}
                  <div><label className={labelCls}>Max Applications</label><input type="number" className={inputCls} value={form.max_applications} onChange={e => setForm(p => ({...p, max_applications: e.target.value}))} placeholder="e.g. 50" /></div>
                </div>
              </div>

              {/* Type-specific fields */}
              {form.opportunity_type === 'job' || form.opportunity_type === 'internship' ? (
                <div>
                  <h3 className="text-sm font-medium text-white mb-4">Job Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className={labelCls}>Salary Range</label><input className={inputCls} value={form.salary_range} onChange={e => setForm(p => ({...p, salary_range: e.target.value}))} placeholder="e.g. PKR 80,000 - 120,000" /></div>
                    <div><label className={labelCls}>Employment Type</label>
                      <select className={inputCls} value={form.employment_type} onChange={e => setForm(p => ({...p, employment_type: e.target.value}))}>
                        <option value="">Select...</option>
                        <option value="full_time">Full Time</option>
                        <option value="part_time">Part Time</option>
                        <option value="contract">Contract</option>
                        <option value="freelance">Freelance</option>
                        <option value="internship">Internship</option>
                      </select>
                    </div>
                    <div><label className={labelCls}>Experience Level</label>
                      <select className={inputCls} value={form.experience_level} onChange={e => setForm(p => ({...p, experience_level: e.target.value}))}>
                        <option value="">Select...</option>
                        <option value="entry">Entry Level</option>
                        <option value="mid">Mid Level</option>
                        <option value="senior">Senior Level</option>
                        <option value="executive">Executive</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : null}

              {(form.opportunity_type === 'competition' || form.opportunity_type === 'grant') && (
                <div>
                  <h3 className="text-sm font-medium text-white mb-4">Prize / Grant Details</h3>
                  <div><label className={labelCls}>Prize Amount</label><input className={inputCls} value={form.prize_amount} onChange={e => setForm(p => ({...p, prize_amount: e.target.value}))} placeholder="e.g. PKR 500,000" /></div>
                </div>
              )}

              {form.opportunity_type === 'fashion_event' && (
                <div>
                  <h3 className="text-sm font-medium text-white mb-4">Event Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className={labelCls}>Event Format</label>
                      <select className={inputCls} value={form.event_format} onChange={e => setForm(p => ({...p, event_format: e.target.value}))}>
                        <option value="in_person">In Person</option>
                        <option value="virtual">Virtual</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    </div>
                    <div><label className={labelCls}>Max Participants</label><input type="number" className={inputCls} value={form.max_participants} onChange={e => setForm(p => ({...p, max_participants: e.target.value}))} placeholder="e.g. 50" /></div>
                  </div>
                </div>
              )}

              {/* Additional Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelCls}>Eligibility</label><textarea className={inputCls + ' resize-none'} rows={3} value={form.eligibility} onChange={e => setForm(p => ({...p, eligibility: e.target.value}))} placeholder="Who can apply..." /></div>
                <div><label className={labelCls}>Requirements</label><textarea className={inputCls + ' resize-none'} rows={3} value={form.requirements} onChange={e => setForm(p => ({...p, requirements: e.target.value}))} placeholder="What's required..." /></div>
                <div><label className={labelCls}>Benefits</label><textarea className={inputCls + ' resize-none'} rows={3} value={form.benefits} onChange={e => setForm(p => ({...p, benefits: e.target.value}))} placeholder="What they get..." /></div>
                <div>
                  <label className={labelCls}>Tags (comma separated)</label>
                  <input className={inputCls} value={form.tags} onChange={e => setForm(p => ({...p, tags: e.target.value}))} placeholder="fashion, design, pakistan" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="featured" checked={form.is_featured} onChange={e => setForm(p => ({...p, is_featured: e.target.checked}))} className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-[#bb9457]" />
                <label htmlFor="featured" className="text-sm text-neutral-300">Featured opportunity</label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-neutral-800">
              <button onClick={() => setShowEditor(false)} className="px-5 py-2.5 bg-neutral-900 border border-neutral-700 text-neutral-300 text-sm font-medium rounded-sm hover:bg-neutral-800">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.title} className="px-6 py-2.5 bg-[#bb9457] text-black text-sm font-semibold rounded-sm hover:bg-white disabled:opacity-50">
                {saving ? 'Saving...' : editingOpp ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AdminOpportunities
