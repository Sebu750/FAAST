import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { DesignerEvent } from '../types/database'

// Simple icon component
const Ic = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, React.ReactNode> = {
    calendar: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    plus: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />,
    x: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />,
    edit: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
    trash: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />,
    location: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>,
    clock: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
    upload: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />,
  }
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  )
}

const eventTypeOptions = [
  { value: 'fashion_week', label: 'Fashion Week' },
  { value: 'exhibition', label: 'Exhibition' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'summit', label: 'Summit' },
  { value: 'marketplace', label: 'Marketplace' },
  { value: 'other', label: 'Other' },
]

const statusOptions = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'past', label: 'Past' },
]

const emptyForm = {
  title: '', slug: '', description: '', event_type: 'fashion_week',
  location: '', city: '', start_date: '', end_date: '', application_deadline: '',
  cover_image_url: '', banner_image_url: '', status: 'upcoming' as DesignerEvent['status'],
  is_open_for_applications: true, max_participants: '', requirements: '', benefits: '',
}

type EventForm = typeof emptyForm

const AdminEventsManagement = () => {
  const [events, setEvents] = useState<DesignerEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showEditor, setShowEditor] = useState(false)
  const [editingEvent, setEditingEvent] = useState<DesignerEvent | null>(null)
  const [form, setForm] = useState<EventForm>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [coverPreview, setCoverPreview] = useState('')
  const [coverFile, setCoverFile] = useState<File | null>(null)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    setLoading(true)
    const { data } = await supabase.from('designer_events').select('*').order('start_date', { ascending: true })
    setEvents(data || [])
    setLoading(false)
  }

  const uploadImage = async (file: File, path: string): Promise<string | null> => {
    const { data, error } = await supabase.storage.from('designers').upload(path, file, { upsert: true })
    if (error) return null
    const { data: urlData } = supabase.storage.from('designers').getPublicUrl(data.path)
    return urlData.publicUrl
  }

  const openCreate = () => {
    setEditingEvent(null)
    setForm(emptyForm)
    setCoverPreview('')
    setCoverFile(null)
    setShowEditor(true)
  }

  const openEdit = (ev: DesignerEvent) => {
    setEditingEvent(ev)
    setForm({
      title: ev.title, slug: ev.slug, description: ev.description || '',
      event_type: ev.event_type, location: ev.location || '', city: ev.city || '',
      start_date: ev.start_date, end_date: ev.end_date,
      application_deadline: ev.application_deadline || '',
      cover_image_url: ev.cover_image_url || '', banner_image_url: ev.banner_image_url || '',
      status: ev.status, is_open_for_applications: ev.is_open_for_applications,
      max_participants: ev.max_participants ? String(ev.max_participants) : '',
      requirements: ev.requirements || '', benefits: ev.benefits || '',
    })
    setCoverPreview(ev.cover_image_url || '')
    setCoverFile(null)
    setShowEditor(true)
  }

  const handleSave = async () => {
    if (!form.title || !form.start_date || !form.end_date) return
    setSaving(true)
    try {
      const saveData: any = {
        title: form.title, slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        description: form.description || null, event_type: form.event_type,
        location: form.location || null, city: form.city || null,
        start_date: form.start_date, end_date: form.end_date,
        application_deadline: form.application_deadline || null,
        banner_image_url: form.banner_image_url || null,
        status: form.status, is_open_for_applications: form.is_open_for_applications,
        max_participants: form.max_participants ? parseInt(form.max_participants) : null,
        requirements: form.requirements || null, benefits: form.benefits || null,
      }
      if (coverFile) {
        const url = await uploadImage(coverFile, `events/cover-${Date.now()}.${coverFile.name.split('.').pop()}`)
        if (url) saveData.cover_image_url = url
      } else if (!editingEvent) {
        saveData.cover_image_url = form.cover_image_url || null
      }

      if (editingEvent) {
        const { error } = await supabase.from('designer_events').update(saveData).eq('id', editingEvent.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('designer_events').insert(saveData)
        if (error) throw error
      }
      setShowEditor(false); setEditingEvent(null); setForm(emptyForm); setCoverPreview(''); setCoverFile(null)
      await fetchData()
    } catch (err: any) { alert('Error: ' + err.message) }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this event? This cannot be undone.')) return
    await supabase.from('designer_events').delete().eq('id', id)
    await fetchData()
  }

  const handleStatusToggle = async (id: string, current: string) => {
    const next = current === 'upcoming' ? 'ongoing' : current === 'ongoing' ? 'past' : 'upcoming'
    await supabase.from('designer_events').update({ status: next }).eq('id', id)
    await fetchData()
  }

  const filtered = events.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) || (e.location || '').toLowerCase().includes(searchQuery.toLowerCase())
    const matchStatus = filterStatus === 'all' || e.status === filterStatus
    return matchSearch && matchStatus
  })

  const stats = {
    total: events.length,
    upcoming: events.filter(e => e.status === 'upcoming').length,
    ongoing: events.filter(e => e.status === 'ongoing').length,
    past: events.filter(e => e.status === 'past').length,
  }

  const inputCls = "w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 text-white text-sm rounded-sm focus:outline-none focus:border-[#bb9457] transition-colors placeholder-neutral-500"
  const labelCls = "block text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1.5"

  const formatDate = (d: string) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'

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
          <h1 className="text-2xl font-serif text-white tracking-tight">Events Management</h1>
          <p className="text-neutral-500 text-sm mt-1">Create and manage events for designers</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-[#bb9457] text-black text-xs uppercase tracking-wider font-semibold hover:bg-white transition-colors rounded-sm">
          <Ic name="plus" className="w-4 h-4" />
          Create Event
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total', value: stats.total, color: 'text-white' },
          { label: 'Upcoming', value: stats.upcoming, color: 'text-blue-400' },
          { label: 'Ongoing', value: stats.ongoing, color: 'text-green-400' },
          { label: 'Past', value: stats.past, color: 'text-neutral-500' },
        ].map(s => (
          <div key={s.label} className="bg-neutral-900 border border-neutral-800 rounded-sm px-5 py-4">
            <p className={`text-2xl font-serif ${s.color}`}>{s.value}</p>
            <p className="text-neutral-500 text-xs uppercase tracking-wider mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search events..." className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-neutral-800 text-white text-sm rounded-sm focus:outline-none focus:border-[#bb9457] transition-colors placeholder-neutral-500" />
        </div>
        <div className="flex gap-2">
          {['all', 'upcoming', 'ongoing', 'past'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`px-4 py-2.5 text-xs uppercase tracking-wider font-medium rounded-sm border transition-colors ${filterStatus === s ? 'bg-[#bb9457]/10 text-[#bb9457] border-[#bb9457]/30' : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700'}`}>
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-12 text-center">
          <Ic name="calendar" className="w-10 h-10 text-neutral-700 mx-auto mb-4" />
          <p className="text-neutral-500 text-sm">No events found</p>
        </div>
      ) : (
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-800">
              <thead className="bg-neutral-950">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Event</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Dates</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {filtered.map(ev => (
                  <tr key={ev.id} className="hover:bg-neutral-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-neutral-800 rounded-sm overflow-hidden flex-shrink-0">
                          {ev.cover_image_url ? <img src={ev.cover_image_url} alt={ev.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-neutral-600"><Ic name="calendar" className="w-5 h-5" /></div>}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{ev.title}</p>
                          {ev.is_open_for_applications && ev.status === 'upcoming' && <p className="text-green-400 text-[10px] uppercase tracking-wider mt-0.5">Open for applications</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-neutral-800 text-neutral-300 text-[10px] uppercase tracking-wider rounded-sm">
                        {eventTypeOptions.find(t => t.value === ev.event_type)?.label || ev.event_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-400">
                      <div>{formatDate(ev.start_date)}</div>
                      <div className="text-neutral-600 text-xs">to {formatDate(ev.end_date)}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-400">{ev.location || ev.city || '—'}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleStatusToggle(ev.id, ev.status)} className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium rounded-sm border transition-colors ${
                        ev.status === 'upcoming' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20' :
                        ev.status === 'ongoing' ? 'bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20' :
                        'bg-neutral-800 text-neutral-500 border-neutral-700 hover:bg-neutral-700'
                      }`}>
                        {ev.status === 'ongoing' ? 'Ongoing' : ev.status.charAt(0).toUpperCase() + ev.status.slice(1)}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => openEdit(ev)} className="text-[#bb9457] hover:text-white text-sm transition-colors">Edit</button>
                        <button onClick={() => handleDelete(ev.id)} className="text-red-400 hover:text-red-300 text-sm transition-colors">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 backdrop-blur-sm p-4 sm:p-8">
          <div className="bg-neutral-950 border border-neutral-800 rounded-sm w-full max-w-3xl my-8 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-neutral-800">
              <h2 className="text-lg font-serif text-white">{editingEvent ? 'Edit Event' : 'Create Event'}</h2>
              <button onClick={() => setShowEditor(false)} className="text-neutral-500 hover:text-white transition-colors"><Ic name="x" className="w-5 h-5" /></button>
            </div>

            {/* Modal Body */}
            <div className="px-8 py-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Basic Info */}
              <div>
                <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2"><Ic name="calendar" className="w-4 h-4 text-[#bb9457]" />Basic Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2"><label className={labelCls}>Title *</label><input className={inputCls} value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} placeholder="e.g. Lahore Fashion Week 2026" /></div>
                  <div><label className={labelCls}>Event Type</label>
                    <select className={inputCls} value={form.event_type} onChange={e => setForm(p => ({...p, event_type: e.target.value}))}>
                      {eventTypeOptions.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  <div><label className={labelCls}>Status</label>
                    <select className={inputCls} value={form.status} onChange={e => setForm(p => ({...p, status: e.target.value as DesignerEvent['status']}))}>
                      {statusOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div>
                <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2"><Ic name="clock" className="w-4 h-4 text-[#bb9457]" />Dates</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div><label className={labelCls}>Start Date *</label><input type="date" className={inputCls} value={form.start_date} onChange={e => setForm(p => ({...p, start_date: e.target.value}))} /></div>
                  <div><label className={labelCls}>End Date *</label><input type="date" className={inputCls} value={form.end_date} onChange={e => setForm(p => ({...p, end_date: e.target.value}))} /></div>
                  <div><label className={labelCls}>Application Deadline</label><input type="date" className={inputCls} value={form.application_deadline} onChange={e => setForm(p => ({...p, application_deadline: e.target.value}))} /></div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2"><Ic name="location" className="w-4 h-4 text-[#bb9457]" />Location</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={labelCls}>Venue / Location</label><input className={inputCls} value={form.location} onChange={e => setForm(p => ({...p, location: e.target.value}))} placeholder="e.g. Lahore Expo Center" /></div>
                  <div><label className={labelCls}>City</label><input className={inputCls} value={form.city} onChange={e => setForm(p => ({...p, city: e.target.value}))} placeholder="e.g. Lahore" /></div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-medium text-white mb-4">Description</h3>
                <textarea className={inputCls + ' resize-none'} rows={3} value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))} placeholder="Brief description of the event..." />
              </div>

              {/* Cover Image */}
              <div>
                <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2"><Ic name="upload" className="w-4 h-4 text-[#bb9457]" />Cover Image</h3>
                <div className="flex items-center gap-4">
                  {coverPreview && <div className="w-24 h-16 rounded-sm overflow-hidden border border-neutral-700 shrink-0"><img src={coverPreview} className="w-full h-full object-cover" /></div>}
                  <label className="cursor-pointer px-4 py-2.5 bg-neutral-900 border border-neutral-700 text-neutral-300 text-sm rounded-sm hover:border-[#bb9457] transition-colors">
                    {coverPreview ? 'Replace Image' : 'Choose Image'}
                    <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) { setCoverFile(f); setCoverPreview(URL.createObjectURL(f)) } }} />
                  </label>
                  {coverPreview && <button onClick={() => { setCoverPreview(''); setCoverFile(null); setForm(p => ({...p, cover_image_url: ''})) }} className="text-neutral-500 hover:text-red-400 text-sm transition-colors">Remove</button>}
                </div>
              </div>

              {/* Settings */}
              <div>
                <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2"><Ic name="users" className="w-4 h-4 text-[#bb9457]" />Settings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 pt-6">
                    <input type="checkbox" id="open-apps" checked={form.is_open_for_applications} onChange={e => setForm(p => ({...p, is_open_for_applications: e.target.checked}))} className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-[#bb9457] focus:ring-[#bb9457]" />
                    <label htmlFor="open-apps" className="text-sm text-neutral-300">Open for applications</label>
                  </div>
                  <div><label className={labelCls}>Max Participants</label><input type="number" className={inputCls} value={form.max_participants} onChange={e => setForm(p => ({...p, max_participants: e.target.value}))} placeholder="e.g. 50" /></div>
                </div>
              </div>

              {/* Requirements & Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelCls}>Requirements</label><textarea className={inputCls + ' resize-none'} rows={3} value={form.requirements} onChange={e => setForm(p => ({...p, requirements: e.target.value}))} placeholder="Eligibility requirements..." /></div>
                <div><label className={labelCls}>Benefits</label><textarea className={inputCls + ' resize-none'} rows={3} value={form.benefits} onChange={e => setForm(p => ({...p, benefits: e.target.value}))} placeholder="What designers get..." /></div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-neutral-800">
              <button onClick={() => setShowEditor(false)} className="px-5 py-2.5 bg-neutral-900 border border-neutral-700 text-neutral-300 text-sm font-medium rounded-sm hover:bg-neutral-800 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.title || !form.start_date || !form.end_date} className="px-6 py-2.5 bg-[#bb9457] text-black text-sm font-semibold rounded-sm hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {saving ? 'Saving...' : editingEvent ? 'Update Event' : 'Create Event'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AdminEventsManagement
