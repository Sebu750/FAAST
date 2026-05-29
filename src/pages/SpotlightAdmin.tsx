import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

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
  internal_comments: string | null
  shortlisted_at: string | null
  finalist_at: string | null
  presentation_scheduled: boolean
  presentation_scheduled_date: string | null
  presentation_confirmed: boolean
  presentation_completed: boolean
  winner_at: string | null
  investment_amount: number | null
  investment_details: string | null
  partnership_status: string | null
  brand_building_progress: string | null
  created_at: string
  updated_at: string
}

const SpotlightAdmin = () => {
  const navigate = useNavigate()
  const [applications, setApplications] = useState<SpotlightApplication[]>([])
  const [selectedApp, setSelectedApp] = useState<SpotlightApplication | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDiscipline, setFilterDiscipline] = useState('all')
  const [filterLocation, setFilterLocation] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [emailContent, setEmailContent] = useState({ to: '', subject: '', message: '' })
  const [editingNotes, setEditingNotes] = useState(false)
  const [notesText, setNotesText] = useState('')

  useEffect(() => {
    checkAuth()
    fetchApplications()
    
    // Subscribe to realtime updates
    const channel = supabase
      .channel('spotlight-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'spotlight_applications' }, () => {
        fetchApplications()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      navigate('/admin/login')
    }
  }

  const fetchApplications = async () => {
    setLoading(true)
    try {
      const { data } = await supabase
        .from('spotlight_applications')
        .select('*')
        .order('created_at', { ascending: false })
      if (data) setApplications(data)
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus
    const matchesDiscipline = filterDiscipline === 'all' || app.discipline === filterDiscipline
    const matchesLocation = !filterLocation || app.location.toLowerCase().includes(filterLocation.toLowerCase())
    return matchesSearch && matchesStatus && matchesDiscipline && matchesLocation
  })

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    const updates: any = { status: newStatus }
    
    if (newStatus === 'shortlisted') updates.shortlisted_at = new Date().toISOString()
    if (newStatus === 'finalist') updates.finalist_at = new Date().toISOString()
    if (newStatus === 'winner') updates.winner_at = new Date().toISOString()

    const { error } = await supabase
      .from('spotlight_applications')
      .update(updates)
      .eq('id', id)

    if (!error) {
      fetchApplications()
    }
  }

  const handleBulkStatusUpdate = async (newStatus: string) => {
    const updates: any = { status: newStatus }
    if (newStatus === 'shortlisted') updates.shortlisted_at = new Date().toISOString()
    if (newStatus === 'finalist') updates.finalist_at = new Date().toISOString()
    if (newStatus === 'winner') updates.winner_at = new Date().toISOString()

    const { error } = await supabase
      .from('spotlight_applications')
      .update(updates)
      .in('id', selectedIds)

    if (!error) {
      setSelectedIds([])
      fetchApplications()
    }
  }

  const handleSaveNotes = async () => {
    if (!selectedApp) return

    const { error } = await supabase
      .from('spotlight_applications')
      .update({ admin_notes: notesText })
      .eq('id', selectedApp.id)

    if (!error) {
      setEditingNotes(false)
      fetchApplications()
    }
  }

  const handleSendEmail = async () => {
    try {
      const response = await fetch('/api/send-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: emailContent.to.split('@')[0],
          email: emailContent.to,
          brand_name: 'Spotlight Application',
          description: emailContent.message
        })
      })

      if (!response.ok) throw new Error('Failed to send')

      setShowEmailModal(false)
      setEmailContent({ to: '', subject: '', message: '' })
      alert('Email sent successfully')
    } catch (error) {
      console.error('Error sending email:', error)
      alert('Failed to send email')
    }
  }

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Location', 'Age', 'Discipline', 'Status', 'Submitted']
    const rows = filteredApplications.map(app => [
      app.name,
      app.email,
      app.phone,
      app.location,
      app.age,
      app.discipline,
      app.status,
      new Date(app.created_at).toLocaleDateString()
    ])

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `spotlight-applications-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const selectAll = () => {
    setSelectedIds(prev => prev.length === filteredApplications.length ? [] : filteredApplications.map(a => a.id))
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30',
      under_review: 'bg-blue-600/20 text-blue-400 border-blue-600/30',
      shortlisted: 'bg-purple-600/20 text-purple-400 border-purple-600/30',
      rejected: 'bg-red-600/20 text-red-400 border-red-600/30',
      finalist: 'bg-[#bb9457]/20 text-[#bb9457] border-[#bb9457]/30',
      winner: 'bg-green-600/20 text-green-400 border-green-600/30'
    }
    return colors[status] || 'bg-neutral-600/20 text-neutral-400 border-neutral-600/30'
  }

  if (selectedApp) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex">
        {/* Left Sidebar Navigation */}
        <aside className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col fixed h-full">
          {/* Logo */}
          <div className="p-6 border-b border-neutral-800">
            <h1 className="text-lg font-semibold tracking-wider text-white uppercase">
              Adorzia <span className="text-[#bb9457] font-light">Admin</span>
            </h1>
            <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-widest">Management Console</p>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-4 mb-2">
              <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold">Main</p>
            </div>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="w-full px-4 py-3 flex items-center gap-3 text-sm text-neutral-400 hover:bg-neutral-800 hover:text-white transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span>Overview</span>
            </button>

            <div className="px-4 mt-6 mb-2">
              <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold">Applications</p>
            </div>
            <button
              className="w-full px-4 py-3 flex items-center gap-3 text-sm bg-[#bb9457]/10 text-[#bb9457] border-r-2 border-[#bb9457]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span>Spotlight</span>
            </button>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-neutral-800">
            <button
              onClick={async () => {
                await supabase.auth.signOut()
                navigate('/admin/login')
              }}
              className="w-full px-4 py-3 flex items-center gap-3 text-sm text-red-400 hover:bg-red-600/10 transition-all rounded-sm"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v0a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v0" />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 ml-64">
          {/* Top Bar */}
          <header className="bg-neutral-900 border-b border-neutral-800 sticky top-0 z-40">
            <div className="px-8 py-4 flex justify-between items-center">
              <div>
                <button 
                  onClick={() => setSelectedApp(null)}
                  className="text-neutral-400 hover:text-white transition-colors text-sm mb-1 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Applications
                </button>
                <h2 className="text-xl font-semibold text-white">{selectedApp.name}</h2>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-4 py-2 rounded-sm text-sm uppercase tracking-wider border ${getStatusColor(selectedApp.status)}`}>
                  {selectedApp.status.replace('_', ' ')}
                </span>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-white font-medium">Admin User</p>
                    <p className="text-xs text-neutral-500">Administrator</p>
                  </div>
                  <div className="w-10 h-10 bg-[#bb9457]/20 border border-[#bb9457]/30 rounded-full flex items-center justify-center">
                    <span className="text-[#bb9457] font-semibold">A</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="p-8">
            <div className="max-w-6xl">
              {/* Action Buttons */}
              <div className="flex gap-3 mb-8">
                <button
                  onClick={() => {
                    setEmailContent({
                      to: selectedApp.email,
                      subject: `Adorzia Spotlight - ${selectedApp.name}`,
                      message: ''
                    })
                    setShowEmailModal(true)
                  }}
                  className="bg-[#bb9457]/20 text-[#bb9457] px-6 py-3 rounded-sm border border-[#bb9457]/30 hover:bg-[#bb9457]/30 transition-colors text-sm font-semibold"
                >
                  Email Applicant
                </button>
                <select
                  value={selectedApp.status}
                  onChange={(e) => handleStatusUpdate(selectedApp.id, e.target.value)}
                  className="bg-neutral-800 border border-neutral-700 text-white px-6 py-3 rounded-sm text-sm font-semibold cursor-pointer"
                >
                  <option value="pending">Pending</option>
                  <option value="under_review">Under Review</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                  <option value="finalist">Finalist</option>
                  <option value="winner">Winner</option>
                </select>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Personal Information */}
                  <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-6">
                    <h3 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
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
                        <label className="text-xs text-neutral-500 uppercase tracking-wider">Heard About</label>
                        <p className="text-white mt-1">{selectedApp.hear_about || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Creative Background */}
                  <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-6">
                    <h3 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Creative Background</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-xs text-neutral-500 uppercase tracking-wider">Discipline</label>
                        <p className="text-white mt-1">{selectedApp.discipline}</p>
                      </div>
                      <div>
                        <label className="text-xs text-neutral-500 uppercase tracking-wider">Years of Experience</label>
                        <p className="text-white mt-1">{selectedApp.years_experience || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-xs text-neutral-500 uppercase tracking-wider">Formal Education</label>
                        <p className="text-white mt-1">{selectedApp.formal_education || 'N/A'}</p>
                      </div>
                      {selectedApp.institution_name && (
                        <div>
                          <label className="text-xs text-neutral-500 uppercase tracking-wider">Institution</label>
                          <p className="text-white mt-1">{selectedApp.institution_name}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Creative Practice */}
                  <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-6">
                    <h3 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Creative Practice</h3>
                    <p className="text-neutral-300 whitespace-pre-wrap leading-relaxed">{selectedApp.creative_practice}</p>
                  </div>

                  {/* Vision & Goals */}
                  <div className="space-y-6">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-6">
                      <h3 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Vision Description</h3>
                      <p className="text-neutral-300 whitespace-pre-wrap leading-relaxed">{selectedApp.vision_description}</p>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-6">
                      <h3 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Biggest Obstacle</h3>
                      <p className="text-neutral-300 whitespace-pre-wrap leading-relaxed">{selectedApp.biggest_obstacle}</p>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-6">
                      <h3 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Why Now?</h3>
                      <p className="text-neutral-300 whitespace-pre-wrap leading-relaxed">{selectedApp.why_now}</p>
                    </div>
                  </div>

                  {/* Portfolio */}
                  {selectedApp.portfolio_url && (
                    <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-6">
                      <h3 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Portfolio</h3>
                      <a href={selectedApp.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-[#bb9457] hover:underline">
                        {selectedApp.portfolio_url}
                      </a>
                    </div>
                  )}

                  {/* Heritage Craft */}
                  {(selectedApp.heritage_craft || selectedApp.heritage_description) && (
                    <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-6">
                      <h3 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Heritage Craft</h3>
                      <div className="space-y-3">
                        {selectedApp.heritage_craft && (
                          <div>
                            <label className="text-xs text-neutral-500 uppercase tracking-wider">Craft Tradition</label>
                            <p className="text-white mt-1">{selectedApp.heritage_craft}</p>
                          </div>
                        )}
                        {selectedApp.heritage_description && (
                          <div>
                            <label className="text-xs text-neutral-500 uppercase tracking-wider">Description</label>
                            <p className="text-neutral-300 mt-2 whitespace-pre-wrap">{selectedApp.heritage_description}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Admin Notes */}
                  <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-6">
                    <h3 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Admin Notes</h3>
                    {editingNotes ? (
                      <div className="space-y-3">
                        <textarea
                          value={notesText}
                          onChange={(e) => setNotesText(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-700 rounded-sm p-3 text-sm text-white resize-none"
                          rows={6}
                        />
                        <div className="flex gap-3">
                          <button onClick={handleSaveNotes} className="bg-[#bb9457] text-black px-4 py-2 rounded-sm text-sm font-semibold flex-1">
                            Save
                          </button>
                          <button onClick={() => setEditingNotes(false)} className="bg-neutral-800 text-white px-4 py-2 rounded-sm text-sm flex-1">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-neutral-400 mb-3 min-h-[60px]">{selectedApp.admin_notes || 'No notes added yet'}</p>
                        <button onClick={() => { setEditingNotes(true); setNotesText(selectedApp.admin_notes || '') }} className="text-[#bb9457] text-sm hover:underline w-full">
                          {selectedApp.admin_notes ? 'Edit Notes' : 'Add Notes'}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Application Metadata */}
                  <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-6">
                    <h3 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Application Info</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <label className="text-xs text-neutral-500 uppercase tracking-wider">Submitted</label>
                        <p className="text-white mt-1">{new Date(selectedApp.created_at).toLocaleString()}</p>
                      </div>
                      {selectedApp.shortlisted_at && (
                        <div>
                          <label className="text-xs text-neutral-500 uppercase tracking-wider">Shortlisted</label>
                          <p className="text-white mt-1">{new Date(selectedApp.shortlisted_at).toLocaleString()}</p>
                        </div>
                      )}
                      {selectedApp.finalist_at && (
                        <div>
                          <label className="text-xs text-neutral-500 uppercase tracking-wider">Finalist</label>
                          <p className="text-white mt-1">{new Date(selectedApp.finalist_at).toLocaleString()}</p>
                        </div>
                      )}
                      {selectedApp.winner_at && (
                        <div>
                          <label className="text-xs text-neutral-500 uppercase tracking-wider">Winner</label>
                          <p className="text-white mt-1">{new Date(selectedApp.winner_at).toLocaleString()}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Declarations */}
                  <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-6">
                    <h3 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Declarations</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${
                          selectedApp.declaration_original_work ? 'bg-[#bb9457] border-[#bb9457]' : 'border-neutral-700'
                        }`}>
                          {selectedApp.declaration_original_work && <span className="text-black text-xs">✓</span>}
                        </span>
                        <p className="text-xs text-neutral-300">Original work</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${
                          selectedApp.declaration_pakistan_age ? 'bg-[#bb9457] border-[#bb9457]' : 'border-neutral-700'
                        }`}>
                          {selectedApp.declaration_pakistan_age && <span className="text-black text-xs">✓</span>}
                        </span>
                        <p className="text-xs text-neutral-300">Pakistan age eligibility</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${
                          selectedApp.declaration_presentations ? 'bg-[#bb9457] border-[#bb9457]' : 'border-neutral-700'
                        }`}>
                          {selectedApp.declaration_presentations && <span className="text-black text-xs">✓</span>}
                        </span>
                        <p className="text-xs text-neutral-300">Presentations commitment</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${
                          selectedApp.declaration_terms ? 'bg-[#bb9457] border-[#bb9457]' : 'border-neutral-700'
                        }`}>
                          {selectedApp.declaration_terms && <span className="text-black text-xs">✓</span>}
                        </span>
                        <p className="text-xs text-neutral-300">Terms and conditions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Email Modal */}
        {showEmailModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8" onClick={() => setShowEmailModal(false)}>
            <div className="bg-neutral-900 border border-neutral-800 rounded-sm max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Send Email</h3>
                <button onClick={() => setShowEmailModal(false)} className="text-neutral-400 hover:text-white text-2xl">×</button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-neutral-400 mb-2 block">To</label>
                  <input
                    type="email"
                    value={emailContent.to}
                    onChange={(e) => setEmailContent({ ...emailContent, to: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-sm p-3 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-neutral-400 mb-2 block">Subject</label>
                  <input
                    type="text"
                    value={emailContent.subject}
                    onChange={(e) => setEmailContent({ ...emailContent, subject: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-sm p-3 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-neutral-400 mb-2 block">Message</label>
                  <textarea
                    value={emailContent.message}
                    onChange={(e) => setEmailContent({ ...emailContent, message: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-sm p-3 text-white text-sm resize-none"
                    rows={8}
                  />
                </div>
                <div className="flex gap-3">
                  <button onClick={handleSendEmail} className="bg-[#bb9457] text-black px-6 py-3 rounded-sm font-semibold text-sm flex-1">
                    Send Email
                  </button>
                  <button onClick={() => setShowEmailModal(false)} className="bg-neutral-800 text-white px-6 py-3 rounded-sm text-sm flex-1">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex">
      {/* Left Sidebar Navigation */}
      <aside className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-neutral-800">
          <h1 className="text-lg font-semibold tracking-wider text-white uppercase">
            Adorzia <span className="text-[#bb9457] font-light">Admin</span>
          </h1>
          <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-widest">Management Console</p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-2">
            <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold">Main</p>
          </div>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="w-full px-4 py-3 flex items-center gap-3 text-sm text-neutral-400 hover:bg-neutral-800 hover:text-white transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span>Overview</span>
          </button>

          <div className="px-4 mt-6 mb-2">
            <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold">Applications</p>
          </div>
          <button
            className="w-full px-4 py-3 flex items-center gap-3 text-sm bg-[#bb9457]/10 text-[#bb9457] border-r-2 border-[#bb9457]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span>Spotlight</span>
            {applications.length > 0 && (
              <span className="ml-auto bg-[#bb9457]/20 text-[#bb9457] text-xs px-2 py-0.5 rounded-full">
                {applications.length}
              </span>
            )}
          </button>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-neutral-800">
          <button
            onClick={async () => {
              await supabase.auth.signOut()
              navigate('/admin/login')
            }}
            className="w-full px-4 py-3 flex items-center gap-3 text-sm text-red-400 hover:bg-red-600/10 transition-all rounded-sm"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v0a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v0" />
            </svg>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64">
        {/* Top Bar */}
        <header className="bg-neutral-900 border-b border-neutral-800 sticky top-0 z-40">
          <div className="px-8 py-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-white">Spotlight Applications</h2>
              <p className="text-xs text-neutral-500 mt-0.5">Manage and review applications</p>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={handleExportCSV} className="bg-neutral-800 text-white px-4 py-2 rounded-sm text-sm hover:bg-neutral-700 transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export CSV
              </button>
              <div className="text-right">
                <p className="text-sm text-white font-medium">Admin User</p>
                <p className="text-xs text-neutral-500">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-[#bb9457]/20 border border-[#bb9457]/30 rounded-full flex items-center justify-center">
                <span className="text-[#bb9457] font-semibold">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-8">
          {/* Filters */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-6 mb-6">
            <div className="grid md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-neutral-950 border border-neutral-700 rounded-sm p-3 text-white text-sm"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-neutral-950 border border-neutral-700 rounded-sm p-3 text-white text-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
                <option value="finalist">Finalist</option>
                <option value="winner">Winner</option>
              </select>
              <select
                value={filterDiscipline}
                onChange={(e) => setFilterDiscipline(e.target.value)}
                className="bg-neutral-950 border border-neutral-700 rounded-sm p-3 text-white text-sm"
              >
                <option value="all">All Disciplines</option>
                <option value="fashion-design">Fashion Design</option>
                <option value="textile-heritage">Textile & Heritage Craft</option>
                <option value="fashion-entrepreneurship">Fashion Entrepreneurship</option>
                <option value="accessories-design">Accessories Design</option>
                <option value="mixed-interdisciplinary">Mixed or Interdisciplinary</option>
                <option value="other">Other</option>
              </select>
              <input
                type="text"
                placeholder="Filter by city..."
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="bg-neutral-950 border border-neutral-700 rounded-sm p-3 text-white text-sm"
              />
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedIds.length > 0 && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-4 mb-6 flex items-center justify-between">
              <span className="text-sm text-neutral-400">{selectedIds.length} selected</span>
              <div className="flex gap-3">
                <button onClick={() => handleBulkStatusUpdate('shortlisted')} className="bg-purple-600/20 text-purple-400 px-4 py-2 rounded-sm text-sm border border-purple-600/30 hover:bg-purple-600/30 transition-colors">
                  Mark Shortlisted
                </button>
                <button onClick={() => handleBulkStatusUpdate('under_review')} className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-sm text-sm border border-blue-600/30 hover:bg-blue-600/30 transition-colors">
                  Mark Under Review
                </button>
              </div>
            </div>
          )}

          {/* Table */}
          {loading ? (
            <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-16 text-center">
              <div className="w-12 h-12 border-2 border-[#bb9457] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-neutral-400 text-sm uppercase tracking-wider">Loading applications...</p>
            </div>
          ) : (
            <div className="bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-800">
                  <thead className="bg-neutral-950">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        <input
                          type="checkbox"
                          checked={selectedIds.length === filteredApplications.length && filteredApplications.length > 0}
                          onChange={selectAll}
                          className="accent-[#bb9457]"
                        />
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">City</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Discipline</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-neutral-900 divide-y divide-neutral-800">
                    {filteredApplications.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-16 text-center text-neutral-400">
                          No applications found
                        </td>
                      </tr>
                    ) : (
                      filteredApplications.map((app) => (
                        <tr key={app.id} className="hover:bg-neutral-800/50 transition-colors">
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(app.id)}
                              onChange={() => toggleSelect(app.id)}
                              className="accent-[#bb9457]"
                            />
                          </td>
                          <td className="px-6 py-4 text-sm text-white font-medium">{app.name}</td>
                          <td className="px-6 py-4 text-sm text-neutral-300">{app.email}</td>
                          <td className="px-6 py-4 text-sm text-neutral-300">{app.location}</td>
                          <td className="px-6 py-4 text-sm text-neutral-300">{app.discipline}</td>
                          <td className="px-6 py-4 text-sm text-neutral-400">{new Date(app.created_at).toLocaleDateString()}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-sm text-xs uppercase tracking-wider border ${getStatusColor(app.status)}`}>
                              {app.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => setSelectedApp(app)}
                              className="text-[#bb9457] hover:text-white text-sm font-medium transition-colors"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default SpotlightAdmin
