import { useEffect, useState, useMemo, useRef, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import type { Designer, DesignerCollection, DesignerEducation, DesignerAchievement, DesignerSkill, DesignerCertification, DesignerSocialLinks } from '../types/database'

// ── Icon helper ──
const Ic = ({ name, className = 'w-4 h-4' }: { name: string; className?: string }) => {
  const icons: Record<string, ReactNode> = {
    plus: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
    edit: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    trash: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    check: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
    x: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
    search: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    image: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    users: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    eye: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
    // New icons
    chevronRight: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>,
    chevronLeft: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>,
    save: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
    upload: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>,
    copy: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    download: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
    share: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>,
    warning: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
    clock: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    star: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
    archive: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>,
    document: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    academic: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>,
    trophy: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    link: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>,
    collection: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
    drag: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" /></svg>,
    bold: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" /></svg>,
    italic: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    list: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>,
    quote: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>,
  }
  return <>{icons[name] || null}</>
}

// ── Form input components ──
const Input = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">{label}</label>
    <input {...props} className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-[#bb9457]/50 focus:outline-none transition-colors" />
  </div>
)

const Textarea = ({ label, rows = 3, ...props }: { label: string; rows?: number } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <div>
    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">{label}</label>
    <textarea rows={rows} {...props} className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-[#bb9457]/50 focus:outline-none transition-colors resize-none" />
  </div>
)

const Select = ({ label, options, ...props }: { label: string; options: { value: string; label: string }[] } & React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <div>
    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">{label}</label>
    <select {...props} className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-2.5 text-sm text-white focus:border-[#bb9457]/50 focus:outline-none transition-colors">
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
)

const Toggle = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) => (
  <div className="flex items-center gap-3">
    <button type="button" onClick={() => onChange(!checked)} className={`relative w-10 h-5 rounded-full transition-colors ${checked ? 'bg-[#bb9457]' : 'bg-neutral-700'}`}>
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${checked ? 'translate-x-5' : ''}`} />
    </button>
    <span className="text-sm text-neutral-300">{label}</span>
  </div>
)

// ══════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════
const DesignerManagement = () => {
  const [designers, setDesigners] = useState<Designer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showEditor, setShowEditor] = useState(false)
  const [editingDesigner, setEditingDesigner] = useState<Designer | null>(null)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    setLoading(true)
    const { data } = await supabase.from('designers').select('*').order('created_at', { ascending: false })
    setDesigners(data || [])
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this designer? This cannot be undone.')) return
    await supabase.from('designers').delete().eq('id', id)
    fetchData()
  }

  const handleToggleActive = async (id: string, current: boolean) => {
    await supabase.from('designers').update({ is_active: !current }).eq('id', id)
    fetchData()
  }

  const handleToggleFeatured = async (id: string, current: boolean) => {
    await supabase.from('designers').update({ is_featured: !current }).eq('id', id)
    fetchData()
  }

  const filteredDesigners = designers.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (d.location || '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    total: designers.length,
    active: designers.filter(d => d.is_active).length,
    featured: designers.filter(d => d.is_featured).length,
  }

  if (loading) {
    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-16 text-center">
        <div className="w-10 h-10 border-2 border-[#bb9457] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-neutral-400 text-sm uppercase tracking-wider">Loading designers...</p>
      </div>
    )
  }

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-5">
          <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Total Designers</p>
          <p className="text-3xl font-serif text-white">{stats.total}</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-5">
          <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Active</p>
          <p className="text-3xl font-serif text-green-400">{stats.active}</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-5">
          <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Featured</p>
          <p className="text-3xl font-serif text-[#bb9457]">{stats.featured}</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-4 mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"><Ic name="search" className="w-4 h-4" /></span>
          <input
            type="text"
            placeholder="Search designers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-sm pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-[#bb9457]/50 focus:outline-none transition-colors"
          />
        </div>
        <button
          onClick={() => { setEditingDesigner(null); setShowEditor(true) }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#bb9457] text-black text-xs uppercase tracking-wider font-semibold hover:bg-white transition-colors rounded-sm"
        >
          <Ic name="plus" className="w-4 h-4" />
          Add Designer
        </button>
      </div>

      {/* Table */}
      {filteredDesigners.length === 0 ? (
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-12 text-center">
          <p className="text-neutral-500 text-sm">No designers found</p>
        </div>
      ) : (
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-800">
              <thead className="bg-neutral-950">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Designer</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {filteredDesigners.map((d) => (
                  <tr key={d.id} className="hover:bg-neutral-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-neutral-800 rounded-full overflow-hidden flex-shrink-0">
                          {d.image_url ? (
                            <img src={d.image_url} alt={d.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs font-medium">
                              {d.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{d.name}</p>
                          <p className="text-neutral-500 text-xs">{d.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-400">{d.location || '—'}</td>
                    <td className="px-6 py-4 text-sm text-neutral-400">{d.category || '—'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleActive(d.id, d.is_active)}
                          className={`px-2 py-1 text-[10px] uppercase tracking-wider font-medium rounded-sm border transition-colors ${
                            d.is_active
                              ? 'bg-green-600/10 text-green-400 border-green-600/30 hover:bg-green-600/20'
                              : 'bg-neutral-800 text-neutral-500 border-neutral-700 hover:bg-neutral-700'
                          }`}
                        >
                          {d.is_active ? 'Active' : 'Inactive'}
                        </button>
                        <button
                          onClick={() => handleToggleFeatured(d.id, d.is_featured)}
                          className={`px-2 py-1 text-[10px] uppercase tracking-wider font-medium rounded-sm border transition-colors ${
                            d.is_featured
                              ? 'bg-[#bb9457]/10 text-[#bb9457] border-[#bb9457]/30 hover:bg-[#bb9457]/20'
                              : 'bg-neutral-800 text-neutral-500 border-neutral-700 hover:bg-neutral-700'
                          }`}
                        >
                          {d.is_featured ? 'Featured' : 'Regular'}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => { setEditingDesigner(d); setShowEditor(true) }}
                          className="text-[#bb9457] hover:text-white text-sm transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(d.id)}
                          className="text-red-400 hover:text-red-300 text-sm transition-colors"
                        >
                          Delete
                        </button>
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
        <DesignerEditor
          designer={editingDesigner}
          onClose={() => { setShowEditor(false); setEditingDesigner(null) }}
          onSave={() => { setShowEditor(false); setEditingDesigner(null); fetchData() }}
        />
      )}
    </>
  )
}

// ══════════════════════════════════════════
// DESIGNER EDITOR MODAL
// ══════════════════════════════════════════
interface DesignerFormData {
  slug: string
  name: string
  brand: string
  location: string
  nationality: string
  languages: string
  experience: string
  specialization: string
  category: string
  gender: string
  bio: string
  short_bio: string
  philosophy: string
  image_url: string
  cover_image_url: string
  availability: string
  is_featured: boolean
  is_active: boolean
  status: 'draft' | 'pending' | 'published' | 'featured' | 'archived'
}

const emptyForm: DesignerFormData = {
  slug: '', name: '', brand: '', location: '', nationality: '', languages: '',
  experience: '', specialization: '', category: '', gender: '', bio: '', short_bio: '',
  philosophy: '', image_url: '', cover_image_url: '', availability: '',
  is_featured: false, is_active: true, status: 'draft'
}

// Stepper steps configuration
const STEPS = [
  { id: 'basic', label: 'Basic Information', icon: 'user', description: 'Name, brand, location & details' },
  { id: 'biography', label: 'Biography', icon: 'document', description: 'Story, philosophy & vision' },
  { id: 'collections', label: 'Collections', icon: 'collection', description: 'Fashion collections & looks' },
  { id: 'gallery', label: 'Gallery', icon: 'image', description: 'Profile & cover photos' },
  { id: 'education', label: 'Education', icon: 'academic', description: 'Training & qualifications' },
  { id: 'achievements', label: 'Achievements', icon: 'trophy', description: 'Awards & recognition' },
  { id: 'skills', label: 'Skills', icon: 'star', description: 'Craft expertise & techniques' },
  { id: 'social', label: 'Social Links', icon: 'link', description: 'Online presence & contact' },
  { id: 'review', label: 'Review & Publish', icon: 'check', description: 'Finalize and publish profile' },
]

const DesignerEditor = ({ designer, onClose, onSave }: {
  designer: Designer | null
  onClose: () => void
  onSave: () => void
}) => {
  const [form, setForm] = useState<DesignerFormData>(() => {
    if (designer) {
      return {
        slug: designer.slug, name: designer.name, brand: designer.brand,
        location: designer.location || '', nationality: designer.nationality || '',
        languages: designer.languages || '', experience: designer.experience || '',
        specialization: designer.specialization || '', category: designer.category || '',
        gender: designer.gender || '', bio: designer.bio || '', short_bio: designer.short_bio || '',
        philosophy: designer.philosophy || '', image_url: designer.image_url || '',
        cover_image_url: designer.cover_image_url || '', availability: designer.availability || '',
        is_featured: designer.is_featured, is_active: designer.is_active,
        status: ((designer as any).status as DesignerFormData['status']) || 'draft'
      }
    }
    return emptyForm
  })

  // Related data states
  const [collections, setCollections] = useState<DesignerCollection[]>([])
  const [education, setEducation] = useState<DesignerEducation[]>([])
  const [achievements, setAchievements] = useState<DesignerAchievement[]>([])
  const [skills, setSkills] = useState<DesignerSkill[]>([])
  const [certifications, setCertifications] = useState<DesignerCertification[]>([])
  const [socialLinks, setSocialLinks] = useState<Partial<DesignerSocialLinks>>({})
  const [saving, setSaving] = useState(false)
  const [autoSaving, setAutoSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const designerIdRef = useRef<string | null>(designer?.id || null)

  useEffect(() => {
    if (designer) fetchRelatedData(designer.id)
  }, [designer])

  // Auto-save effect
  useEffect(() => {
    if (hasUnsavedChanges && designerIdRef.current) {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
      saveTimeoutRef.current = setTimeout(() => {
        handleAutoSave()
      }, 3000)
    }
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    }
  }, [form, collections, education, achievements, skills, certifications, socialLinks])

  // Keyboard shortcut for save (Ctrl/Cmd + S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [form, collections, education, achievements, skills, certifications, socialLinks])

  const fetchRelatedData = async (designerId: string) => {
    const [colRes, eduRes, achRes, skiRes, cerRes, socRes] = await Promise.all([
      supabase.from('designer_collections').select('*').eq('designer_id', designerId).order('created_at'),
      supabase.from('designer_education').select('*').eq('designer_id', designerId).order('created_at'),
      supabase.from('designer_achievements').select('*').eq('designer_id', designerId).order('created_at'),
      supabase.from('designer_skills').select('*').eq('designer_id', designerId).order('created_at'),
      supabase.from('designer_certifications').select('*').eq('designer_id', designerId).order('created_at'),
      supabase.from('designer_social_links').select('*').eq('designer_id', designerId).single(),
    ])
    setCollections(colRes.data || [])
    setEducation(eduRes.data || [])
    setAchievements(achRes.data || [])
    setSkills(skiRes.data || [])
    setCertifications(cerRes.data || [])
    setSocialLinks(socRes.data || {})
  }

  const updateField = (field: keyof DesignerFormData, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setHasUnsavedChanges(true)
  }

  const generateSlug = (name: string, brand: string) => {
    return `${name}-${brand}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleAutoSave = async () => {
    if (!form.name || !form.brand) return
    setAutoSaving(true)
    try {
      const slug = form.slug || generateSlug(form.name, form.brand)
      const designerData = { ...form, slug }
      if (designerIdRef.current) {
        await supabase.from('designers').update(designerData).eq('id', designerIdRef.current)
      } else {
        const { data } = await supabase.from('designers').insert(designerData).select('id').single()
        if (data) designerIdRef.current = data.id
      }
      await saveRelatedData(designerIdRef.current!)
      setLastSaved(new Date())
      setHasUnsavedChanges(false)
    } catch (err) {
      console.error('Auto-save error:', err)
    } finally {
      setAutoSaving(false)
    }
  }

  const handleSave = async () => {
    if (!form.name || !form.brand) {
      showToast('Name and Brand are required', 'error')
      return
    }
    setSaving(true)
    try {
      const slug = form.slug || generateSlug(form.name, form.brand)
      const designerData = { ...form, slug }
      if (designerIdRef.current) {
        const { error } = await supabase.from('designers').update(designerData).eq('id', designerIdRef.current)
        if (error) throw error
      } else {
        const { data, error } = await supabase.from('designers').insert(designerData).select('id').single()
        if (error) throw error
        designerIdRef.current = data.id
      }
      await saveRelatedData(designerIdRef.current!)
      setLastSaved(new Date())
      setHasUnsavedChanges(false)
      showToast('Designer profile saved successfully', 'success')
      onSave()
    } catch (err) {
      console.error('Error saving designer:', err)
      showToast('Error saving designer', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = async () => {
    updateField('status', 'published')
    updateField('is_active', true)
    await handleSave()
    showToast('Designer profile published!', 'success')
  }

  const saveRelatedData = async (designerId: string) => {
    // Delete and re-insert for collections, education, achievements, skills, certifications
    const tables = ['designer_collections', 'designer_education', 'designer_achievements', 'designer_skills', 'designer_certifications']
    for (const table of tables) {
      await supabase.from(table).delete().eq('designer_id', designerId)
    }

    // Insert collections
    if (collections.length > 0) {
      await supabase.from('designer_collections').insert(
        collections.map(c => ({ designer_id: designerId, title: c.title, season: c.season, description: c.description, inspiration: c.inspiration, looks: c.looks, cover_image_url: c.cover_image_url, images: c.images, is_latest: c.is_latest }))
      )
    }

    // Insert education
    if (education.length > 0) {
      await supabase.from('designer_education').insert(
        education.map(e => ({ designer_id: designerId, institution: e.institution, degree: e.degree, year: e.year }))
      )
    }

    // Insert achievements
    if (achievements.length > 0) {
      await supabase.from('designer_achievements').insert(
        achievements.map(a => ({ designer_id: designerId, title: a.title, detail: a.detail }))
      )
    }

    // Insert skills
    if (skills.length > 0) {
      await supabase.from('designer_skills').insert(
        skills.map(s => ({ designer_id: designerId, skill: s.skill }))
      )
    }

    // Insert certifications
    if (certifications.length > 0) {
      await supabase.from('designer_certifications').insert(
        certifications.map(c => ({ designer_id: designerId, certification: c.certification }))
      )
    }

    // Upsert social links
    if (Object.keys(socialLinks).length > 0) {
      const existing = await supabase.from('designer_social_links').select('id').eq('designer_id', designerId).single()
      if (existing.data) {
        await supabase.from('designer_social_links').update({ ...socialLinks, designer_id: designerId }).eq('designer_id', designerId)
      } else {
        await supabase.from('designer_social_links').insert({ ...socialLinks, designer_id: designerId })
      }
    }
  }

  // Profile completion calculation
  const profileCompletion = useMemo(() => {
    const checks = {
      basic: !!(form.name && form.brand && form.location),
      biography: !!(form.bio && form.short_bio),
      collections: collections.length > 0,
      gallery: !!(form.image_url || form.cover_image_url),
      education: education.length > 0,
      achievements: achievements.length > 0,
      skills: skills.length > 0,
      social: !!(socialLinks.instagram || socialLinks.website),
    }
    const completed = Object.values(checks).filter(Boolean).length
    const total = Object.keys(checks).length
    return { percentage: Math.round((completed / total) * 100), checks, completed, total }
  }, [form, collections, education, achievements, skills, socialLinks])

  const currentStepData = STEPS[currentStep]
  const isLastStep = currentStep === STEPS.length - 1
  const isFirstStep = currentStep === 0

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto p-4 pt-8 pb-8">
      <div className="bg-neutral-900 border border-neutral-800 rounded-sm w-full max-w-4xl">
        {/* Header */}
        <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#bb9457]/20 to-[#bb9457]/5 border border-[#bb9457]/20 rounded-full flex items-center justify-center">
              <span className="text-[#bb9457] font-serif text-lg">{form.name ? form.name.charAt(0).toUpperCase() : '?'}</span>
            </div>
            <div>
              <h2 className="text-xl font-serif text-white">{designer ? 'Edit Designer' : 'New Designer'}</h2>
              <p className="text-xs text-neutral-500 mt-1">{form.name || 'Untitled'} {form.brand ? `— ${form.brand}` : ''}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-neutral-500">Profile Completion</p>
                <p className="text-sm font-medium text-white">{profileCompletion.percentage}%</p>
              </div>
              <div className="w-20 h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#bb9457] to-[#d4af37] transition-all duration-300"
                  style={{ width: `${profileCompletion.percentage}%` }}
                />
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-neutral-400 hover:text-white transition-colors">
              <Ic name="x" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stepper Navigation */}
        <div className="border-b border-neutral-800 px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-xs text-neutral-500">Step {currentStep + 1} of {STEPS.length}</span>
              <span className="text-xs text-[#bb9457] font-medium">{currentStepData.label}</span>
            </div>
            <div className="flex items-center gap-3">
              {autoSaving && (
                <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                  <span className="w-3 h-3 border-2 border-neutral-600 border-t-[#bb9457] rounded-full animate-spin" />
                  Saving...
                </span>
              )}
              {lastSaved && !autoSaving && (
                <span className="text-xs text-neutral-600">
                  Last saved {Math.round((Date.now() - lastSaved.getTime()) / 1000)}s ago
                </span>
              )}
              {hasUnsavedChanges && !autoSaving && (
                <span className="flex items-center gap-1 text-xs text-amber-500">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  Unsaved changes
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            {STEPS.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(idx)}
                className={`flex-1 flex items-center justify-center gap-2 px-2 py-2 text-[10px] uppercase tracking-wider font-medium rounded-sm transition-all ${
                  idx === currentStep
                    ? 'bg-[#bb9457]/10 text-[#bb9457] border border-[#bb9457]/30'
                    : idx < currentStep
                    ? 'text-green-400 hover:bg-neutral-800'
                    : 'text-neutral-600 hover:bg-neutral-800'
                }`}
                title={step.description}
              >
                <span className="flex-shrink-0">
                  {idx < currentStep ? (
                    <Ic name="check" className="w-3.5 h-3.5" />
                  ) : (
                    <Ic name={step.icon} className="w-3.5 h-3.5" />
                  )}
                </span>
                <span className="hidden xl:inline truncate">{step.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-3 h-1 bg-neutral-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#bb9457] to-[#d4af37] transition-all duration-500"
              style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          {currentStep === 0 && (
            <div className="space-y-6">
              {/* Identity Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
                  <div className="w-1 h-4 bg-[#bb9457] rounded-full" />
                  <h3 className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Identity</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Name *" value={form.name} onChange={(e) => { updateField('name', e.target.value); if (!designer) updateField('slug', generateSlug(e.target.value, form.brand)) }} placeholder="Designer full name" />
                  <Input label="Brand *" value={form.brand} onChange={(e) => { updateField('brand', e.target.value); if (!designer) updateField('slug', generateSlug(form.name, e.target.value)) }} placeholder="Brand / label name" />
                </div>
                <Input label="Slug" value={form.slug} onChange={(e) => updateField('slug', e.target.value)} placeholder="auto-generated-from-name-brand" />
              </div>

              {/* Location & Background */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
                  <div className="w-1 h-4 bg-[#bb9457] rounded-full" />
                  <h3 className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Location & Background</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Location" value={form.location} onChange={(e) => updateField('location', e.target.value)} placeholder="City, Country" />
                  <Input label="Nationality" value={form.nationality} onChange={(e) => updateField('nationality', e.target.value)} placeholder="Pakistani" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Languages" value={form.languages} onChange={(e) => updateField('languages', e.target.value)} placeholder="English, Urdu" />
                  <Input label="Experience" value={form.experience} onChange={(e) => updateField('experience', e.target.value)} placeholder="5 years" />
                </div>
              </div>

              {/* Specialization */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
                  <div className="w-1 h-4 bg-[#bb9457] rounded-full" />
                  <h3 className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Specialization</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Specialization" value={form.specialization} onChange={(e) => updateField('specialization', e.target.value)} placeholder="Bridal, Pret, Luxury" />
                  <Input label="Category" value={form.category} onChange={(e) => updateField('category', e.target.value)} placeholder="Womenswear" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select label="Gender" value={form.gender} onChange={(e) => updateField('gender', e.target.value)} options={[{ value: '', label: 'Select...' }, { value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'non-binary', label: 'Non-binary' }]} />
                  <Input label="Availability" value={form.availability} onChange={(e) => updateField('availability', e.target.value)} placeholder="Available for commissions" />
                </div>
              </div>
            </div>
          )}

          {/* Biography */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
                  <div className="w-1 h-4 bg-[#bb9457] rounded-full" />
                  <h3 className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Short Description</h3>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs uppercase tracking-wider text-neutral-400">Short Bio</label>
                    <span className="text-[10px] text-neutral-500">{form.short_bio.length}/150 characters</span>
                  </div>
                  <input
                    value={form.short_bio}
                    onChange={(e) => updateField('short_bio', e.target.value)}
                    maxLength={150}
                    placeholder="One-line description for cards and previews"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-[#bb9457]/50 focus:outline-none transition-colors"
                  />
                  <p className="text-[10px] text-neutral-600 mt-1">Used on designer cards and preview sections</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
                  <div className="w-1 h-4 bg-[#bb9457] rounded-full" />
                  <h3 className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Full Story</h3>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs uppercase tracking-wider text-neutral-400">Full Biography</label>
                    <span className="text-[10px] text-neutral-500">{form.bio.length} characters</span>
                  </div>
                  <textarea
                    value={form.bio}
                    onChange={(e) => updateField('bio', e.target.value)}
                    rows={8}
                    placeholder="Detailed biography covering background, training, and journey..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-[#bb9457]/50 focus:outline-none transition-colors resize-none leading-relaxed"
                  />
                  <p className="text-[10px] text-neutral-600 mt-1">Tells the designer's complete story on their profile page</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
                  <div className="w-1 h-4 bg-[#bb9457] rounded-full" />
                  <h3 className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Creative Vision</h3>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs uppercase tracking-wider text-neutral-400">Design Philosophy / Why I Design</label>
                    <span className="text-[10px] text-neutral-500">{form.philosophy.length} characters</span>
                  </div>
                  <textarea
                    value={form.philosophy}
                    onChange={(e) => updateField('philosophy', e.target.value)}
                    rows={5}
                    placeholder="Design philosophy, inspirations, creative vision, heritage craft..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-[#bb9457]/50 focus:outline-none transition-colors resize-none leading-relaxed"
                  />
                  <p className="text-[10px] text-neutral-600 mt-1">Captures the designer's creative ethos and artistic approach</p>
                </div>
              </div>
            </div>
          )}

          {/* Images */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
                  <div className="w-1 h-4 bg-[#bb9457] rounded-full" />
                  <h3 className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Profile Image</h3>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">Profile Image URL</label>
                  <input
                    value={form.image_url}
                    onChange={(e) => updateField('image_url', e.target.value)}
                    placeholder="https://example.com/profile.jpg"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-[#bb9457]/50 focus:outline-none transition-colors"
                  />
                </div>
                {form.image_url ? (
                  <div className="relative group">
                    <div className="w-40 h-40 bg-neutral-800 rounded-sm overflow-hidden border border-neutral-700">
                      <img src={form.image_url} alt="Profile preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs">Preview</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-40 h-40 bg-neutral-800/50 border-2 border-dashed border-neutral-700 rounded-sm flex flex-col items-center justify-center text-neutral-500">
                    <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-xs">No image</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
                  <div className="w-1 h-4 bg-[#bb9457] rounded-full" />
                  <h3 className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Cover Image</h3>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">Cover Image URL</label>
                  <input
                    value={form.cover_image_url}
                    onChange={(e) => updateField('cover_image_url', e.target.value)}
                    placeholder="https://example.com/cover.jpg"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-[#bb9457]/50 focus:outline-none transition-colors"
                  />
                </div>
                {form.cover_image_url ? (
                  <div className="relative group">
                    <div className="w-full h-48 bg-neutral-800 rounded-sm overflow-hidden border border-neutral-700">
                      <img src={form.cover_image_url} alt="Cover preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs">Preview</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-48 bg-neutral-800/50 border-2 border-dashed border-neutral-700 rounded-sm flex flex-col items-center justify-center text-neutral-500">
                    <svg className="w-10 h-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs">No cover image</span>
                  </div>
                )}
                <p className="text-[10px] text-neutral-600">Recommended: 1920x600px or larger for best quality</p>
              </div>
            </div>
          )}

          {/* Collections */}
          {currentStep === 2 && (
            <CollectionsEditor collections={collections} setCollections={setCollections} />
          )}

          {/* Education */}
          {currentStep === 4 && (
            <EducationEditor education={education} setEducation={setEducation} />
          )}

          {/* Achievements */}
          {currentStep === 5 && (
            <AchievementsEditor achievements={achievements} setAchievements={setAchievements} />
          )}

          {/* Skills */}
          {currentStep === 6 && (
            <SkillsEditor skills={skills} setSkills={setSkills} />
          )}

          {/* Certifications */}
          {currentStep === 6 && (
            <CertificationsEditor certifications={certifications} setCertifications={setCertifications} />
          )}

          {/* Social Links */}
          {currentStep === 7 && (
            <div className="space-y-4">
              <Input label="Instagram" value={socialLinks.instagram || ''} onChange={(e) => setSocialLinks(p => ({ ...p, instagram: e.target.value }))} placeholder="@handle" />
              <Input label="Website" value={socialLinks.website || ''} onChange={(e) => setSocialLinks(p => ({ ...p, website: e.target.value }))} placeholder="https://..." />
              <Input label="Portfolio" value={socialLinks.portfolio || ''} onChange={(e) => setSocialLinks(p => ({ ...p, portfolio: e.target.value }))} placeholder="https://..." />
              <Input label="Shop" value={socialLinks.shop || ''} onChange={(e) => setSocialLinks(p => ({ ...p, shop: e.target.value }))} placeholder="https://..." />
              <Input label="Email" value={socialLinks.email || ''} onChange={(e) => setSocialLinks(p => ({ ...p, email: e.target.value }))} placeholder="hello@..." />
              <Input label="Facebook" value={socialLinks.facebook || ''} onChange={(e) => setSocialLinks(p => ({ ...p, facebook: e.target.value }))} placeholder="https://facebook.com/..." />
              <Input label="TikTok" value={socialLinks.tiktok || ''} onChange={(e) => setSocialLinks(p => ({ ...p, tiktok: e.target.value }))} placeholder="@handle" />
              <Input label="Pinterest" value={socialLinks.pinterest || ''} onChange={(e) => setSocialLinks(p => ({ ...p, pinterest: e.target.value }))} placeholder="https://pinterest.com/..." />
              <Input label="LinkedIn" value={socialLinks.linkedin || ''} onChange={(e) => setSocialLinks(p => ({ ...p, linkedin: e.target.value }))} placeholder="https://linkedin.com/in/..." />
              <Input label="Behance" value={socialLinks.behance || ''} onChange={(e) => setSocialLinks(p => ({ ...p, behance: e.target.value }))} placeholder="https://behance.net/..." />
            </div>
          )}

          {/* Status */}
          {currentStep === 8 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
                  <div className="w-1 h-4 bg-[#bb9457] rounded-full" />
                  <h3 className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Visibility Settings</h3>
                </div>
                <div className="bg-neutral-950 border border-neutral-800 rounded-sm p-5 space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium mb-1">Active Status</p>
                      <p className="text-xs text-neutral-500">Designer is visible on the site and can be discovered by visitors</p>
                    </div>
                    <Toggle label="" checked={form.is_active} onChange={(v) => updateField('is_active', v)} />
                  </div>
                  <div className="border-t border-neutral-800" />
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium mb-1">Featured Designer</p>
                      <p className="text-xs text-neutral-500">Showcase in featured sections and homepage highlights</p>
                    </div>
                    <Toggle label="" checked={form.is_featured} onChange={(v) => updateField('is_featured', v)} />
                  </div>
                </div>
              </div>

              {designer && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
                    <div className="w-1 h-4 bg-[#bb9457] rounded-full" />
                    <h3 className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Preview</h3>
                  </div>
                  <div className="bg-neutral-950 border border-neutral-800 rounded-sm p-5">
                    <p className="text-xs text-neutral-500 mb-3">View this designer's public profile</p>
                    <a
                      href={`/designers/${designer.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs uppercase tracking-wider font-medium rounded-sm transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Open Profile
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sticky Footer Action Bar */}
        <div className="sticky bottom-0 bg-neutral-900 border-t border-neutral-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="px-4 py-2.5 text-sm text-neutral-400 hover:text-white transition-colors">
              Cancel
            </button>
            {!isFirstStep && (
              <button
                onClick={() => setCurrentStep(s => s - 1)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-sm transition-colors"
              >
                <Ic name="chevronLeft" className="w-4 h-4" /> Previous
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-500">
              <Ic name="check" className="w-3.5 h-3.5 text-green-400" />
              <span>{profileCompletion.completed}/{profileCompletion.total} sections complete</span>
            </div>
            {!isLastStep ? (
              <button
                onClick={() => setCurrentStep(s => s + 1)}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#bb9457] text-black text-xs uppercase tracking-wider font-semibold hover:bg-white transition-colors rounded-sm"
              >
                Next <Ic name="chevronRight" className="w-4 h-4" />
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2.5 bg-neutral-800 text-white text-xs uppercase tracking-wider font-medium hover:bg-neutral-700 transition-colors rounded-sm disabled:opacity-50"
                >
                  <Ic name="save" className="w-4 h-4" /> Save Draft
                </button>
                <button
                  onClick={handlePublish}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#bb9457] text-black text-xs uppercase tracking-wider font-semibold hover:bg-white transition-colors rounded-sm disabled:opacity-50"
                >
                  {saving ? (
                    <><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Publishing...</>
                  ) : (
                    <><Ic name="check" className="w-4 h-4" /> Publish Profile</>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-24 right-6 z-[60] flex items-center gap-3 px-4 py-3 rounded-sm shadow-lg border transition-all ${
          toast.type === 'success' ? 'bg-green-900/90 border-green-700 text-green-100' :
          toast.type === 'error' ? 'bg-red-900/90 border-red-700 text-red-100' :
          'bg-neutral-800 border-neutral-700 text-white'
        }`}>
          {toast.type === 'success' && <Ic name="check" className="w-4 h-4 text-green-400" />}
          {toast.type === 'error' && <Ic name="warning" className="w-4 h-4 text-red-400" />}
          <span className="text-sm">{toast.message}</span>
        </div>
      )}
    </div>
  )
}

// ══════════════════════════════════════════
// SUB-EDITORS
// ══════════════════════════════════════════

// Collections Editor with Image Upload
const CollectionsEditor = ({ collections, setCollections }: { collections: DesignerCollection[]; setCollections: (v: DesignerCollection[]) => void }) => {
  const [uploading, setUploading] = useState<string | null>(null)

  const addCollection = () => {
    setCollections([...collections, { id: '', designer_id: '', title: '', season: '', description: '', inspiration: '', looks: null, cover_image_url: '', images: null, is_latest: false, created_at: '' }])
  }

  const updateCollection = (idx: number, field: string, value: string | number | boolean | string[] | null) => {
    const updated = [...collections]
    updated[idx] = { ...updated[idx], [field]: value }
    setCollections(updated)
  }

  const removeCollection = (idx: number) => {
    setCollections(collections.filter((_, i) => i !== idx))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, idx: number, type: 'cover' | 'gallery') => {
    const file = e.target.files?.[0]
    if (!file) return

    const uploadKey = `${idx}-${type}`
    setUploading(uploadKey)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `collections/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

      const { data, error } = await supabase.storage
        .from('designers')
        .upload(fileName, file)

      if (error) throw error

      const { data: urlData } = supabase.storage
        .from('designers')
        .getPublicUrl(data.path)

      if (type === 'cover') {
        updateCollection(idx, 'cover_image_url', urlData.publicUrl)
      } else {
        const currentImages = collections[idx].images || []
        updateCollection(idx, 'images', [...currentImages, urlData.publicUrl])
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error uploading image. Please try again.')
    } finally {
      setUploading(null)
    }
  }

  const removeGalleryImage = (colIdx: number, imgIdx: number) => {
    const currentImages = collections[colIdx].images || []
    const updatedImages = currentImages.filter((_, i) => i !== imgIdx)
    updateCollection(colIdx, 'images', updatedImages.length > 0 ? updatedImages : null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-[#bb9457] rounded-full" />
          <p className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Collections ({collections.length})</p>
        </div>
        <button onClick={addCollection} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#bb9457] hover:bg-[#bb9457]/10 rounded-sm transition-colors">
          <Ic name="plus" className="w-3.5 h-3.5" /> Add Collection
        </button>
      </div>

      {collections.map((col, idx) => (
        <div key={idx} className="bg-neutral-950 border border-neutral-800 rounded-sm overflow-hidden">
          {/* Collection Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/50 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <span className="text-xs text-neutral-500">Collection #{idx + 1}</span>
              {col.is_latest && (
                <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-[#bb9457]/10 text-[#bb9457] border border-[#bb9457]/30 rounded-sm">Latest</span>
              )}
            </div>
            <button onClick={() => removeCollection(idx)} className="text-red-400 hover:text-red-300 transition-colors">
              <Ic name="trash" className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Title *" value={col.title} onChange={(e) => updateCollection(idx, 'title', e.target.value)} placeholder="Collection name" />
              <Input label="Season" value={col.season || ''} onChange={(e) => updateCollection(idx, 'season', e.target.value)} placeholder="SS26, FW25, Bridal 2024" />
            </div>

            <Textarea label="Description" value={col.description || ''} onChange={(e) => updateCollection(idx, 'description', e.target.value)} rows={2} placeholder="Collection concept and story..." />
            
            <Input label="Inspiration" value={col.inspiration || ''} onChange={(e) => updateCollection(idx, 'inspiration', e.target.value)} placeholder="Creative inspiration behind the collection" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Number of Looks" type="number" value={col.looks?.toString() || ''} onChange={(e) => updateCollection(idx, 'looks', parseInt(e.target.value) || 0)} />
              <div className="flex items-end">
                <Toggle label="Mark as Latest Collection" checked={col.is_latest} onChange={(v) => updateCollection(idx, 'is_latest', v)} />
              </div>
            </div>

            {/* Cover Image Upload */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
                <div className="w-1 h-3 bg-[#bb9457]/50 rounded-full" />
                <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">Cover Image</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Upload Area */}
                <div className="flex-1">
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">Cover Image</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={col.cover_image_url || ''}
                      onChange={(e) => updateCollection(idx, 'cover_image_url', e.target.value)}
                      placeholder="Paste URL or upload"
                      className="flex-1 bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-sm text-white placeholder-neutral-600 focus:border-[#bb9457]/50 focus:outline-none transition-colors"
                    />
                    <label className={`flex items-center gap-2 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs uppercase tracking-wider font-medium rounded-sm cursor-pointer transition-colors ${uploading === `${idx}-cover` ? 'opacity-50 pointer-events-none' : ''}`}>
                      {uploading === `${idx}-cover` ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Ic name="image" className="w-4 h-4" />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, idx, 'cover')}
                        className="hidden"
                      />
                      Upload
                    </label>
                  </div>
                </div>

                {/* Preview */}
                {col.cover_image_url ? (
                  <div className="relative group w-24 h-24 flex-shrink-0">
                    <div className="w-full h-full bg-neutral-800 rounded-sm overflow-hidden border border-neutral-700">
                      <img src={col.cover_image_url} alt="Cover preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                    </div>
                    <button
                      onClick={() => updateCollection(idx, 'cover_image_url', '')}
                      className="absolute top-1 right-1 p-1 bg-black/60 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Ic name="x" className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 flex-shrink-0 bg-neutral-800/50 border-2 border-dashed border-neutral-700 rounded-sm flex items-center justify-center">
                    <Ic name="image" className="w-6 h-6 text-neutral-600" />
                  </div>
                )}
              </div>
            </div>

            {/* Gallery Images Upload */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
                <div className="w-1 h-3 bg-[#bb9457]/50 rounded-full" />
                <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">Gallery Images</p>
              </div>

              <div className="space-y-3">
                {/* Existing Gallery Images */}
                {col.images && col.images.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {col.images.map((img, imgIdx) => (
                      <div key={imgIdx} className="relative group w-20 h-20">
                        <div className="w-full h-full bg-neutral-800 rounded-sm overflow-hidden border border-neutral-700">
                          <img src={img} alt={`Gallery ${imgIdx + 1}`} className="w-full h-full object-cover" />
                        </div>
                        <button
                          onClick={() => removeGalleryImage(idx, imgIdx)}
                          className="absolute top-1 right-1 p-1 bg-black/60 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Ic name="x" className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload Button */}
                <label className={`inline-flex items-center gap-2 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs uppercase tracking-wider font-medium rounded-sm cursor-pointer transition-colors ${uploading === `${idx}-gallery` ? 'opacity-50 pointer-events-none' : ''}`}>
                  {uploading === `${idx}-gallery` ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Ic name="plus" className="w-4 h-4" />
                  )}
                  Add to Gallery
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, idx, 'gallery')}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      ))}

      {collections.length === 0 && (
        <div className="text-center py-12 bg-neutral-950 border border-neutral-800 rounded-sm">
          <Ic name="image" className="w-10 h-10 text-neutral-700 mx-auto mb-3" />
          <p className="text-neutral-500 text-sm">No collections added yet</p>
          <p className="text-neutral-600 text-xs mt-1">Click "Add Collection" to get started</p>
        </div>
      )}
    </div>
  )
}

// Education Editor
const EducationEditor = ({ education, setEducation }: { education: DesignerEducation[]; setEducation: (v: DesignerEducation[]) => void }) => {
  const add = () => setEducation([...education, { id: '', designer_id: '', institution: '', degree: '', year: '', created_at: '' }])
  const update = (idx: number, field: string, value: string) => {
    const updated = [...education]
    updated[idx] = { ...updated[idx], [field]: value }
    setEducation(updated)
  }
  const remove = (idx: number) => setEducation(education.filter((_, i) => i !== idx))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider text-neutral-500">Education ({education.length})</p>
        <button onClick={add} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#bb9457] hover:bg-[#bb9457]/10 rounded-sm transition-colors">
          <Ic name="plus" className="w-3.5 h-3.5" /> Add
        </button>
      </div>
      {education.map((edu, idx) => (
        <div key={idx} className="bg-neutral-950 border border-neutral-800 rounded-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-500">Education #{idx + 1}</span>
            <button onClick={() => remove(idx)} className="text-red-400 hover:text-red-300"><Ic name="trash" className="w-4 h-4" /></button>
          </div>
          <Input label="Institution" value={edu.institution} onChange={(e) => update(idx, 'institution', e.target.value)} placeholder="University / School name" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input label="Degree" value={edu.degree || ''} onChange={(e) => update(idx, 'degree', e.target.value)} placeholder="BFA, MFA, Diploma" />
            <Input label="Year" value={edu.year || ''} onChange={(e) => update(idx, 'year', e.target.value)} placeholder="2020 - 2024" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Achievements Editor
const AchievementsEditor = ({ achievements, setAchievements }: { achievements: DesignerAchievement[]; setAchievements: (v: DesignerAchievement[]) => void }) => {
  const add = () => setAchievements([...achievements, { id: '', designer_id: '', title: '', detail: '', created_at: '' }])
  const update = (idx: number, field: string, value: string) => {
    const updated = [...achievements]
    updated[idx] = { ...updated[idx], [field]: value }
    setAchievements(updated)
  }
  const remove = (idx: number) => setAchievements(achievements.filter((_, i) => i !== idx))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider text-neutral-500">Achievements ({achievements.length})</p>
        <button onClick={add} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#bb9457] hover:bg-[#bb9457]/10 rounded-sm transition-colors">
          <Ic name="plus" className="w-3.5 h-3.5" /> Add
        </button>
      </div>
      {achievements.map((ach, idx) => (
        <div key={idx} className="bg-neutral-950 border border-neutral-800 rounded-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-500">Achievement #{idx + 1}</span>
            <button onClick={() => remove(idx)} className="text-red-400 hover:text-red-300"><Ic name="trash" className="w-4 h-4" /></button>
          </div>
          <Input label="Title" value={ach.title} onChange={(e) => update(idx, 'title', e.target.value)} placeholder="Award / recognition name" />
          <Textarea label="Details" value={ach.detail || ''} onChange={(e) => update(idx, 'detail', e.target.value)} rows={2} placeholder="Brief description" />
        </div>
      ))}
    </div>
  )
}

// Skills Editor
const SkillsEditor = ({ skills, setSkills }: { skills: DesignerSkill[]; setSkills: (v: DesignerSkill[]) => void }) => {
  const add = () => setSkills([...skills, { id: '', designer_id: '', skill: '', created_at: '' }])
  const update = (idx: number, value: string) => {
    const updated = [...skills]
    updated[idx] = { ...updated[idx], skill: value }
    setSkills(updated)
  }
  const remove = (idx: number) => setSkills(skills.filter((_, i) => i !== idx))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider text-neutral-500">Skills ({skills.length})</p>
        <button onClick={add} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#bb9457] hover:bg-[#bb9457]/10 rounded-sm transition-colors">
          <Ic name="plus" className="w-3.5 h-3.5" /> Add
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {skills.map((sk, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              value={sk.skill}
              onChange={(e) => update(idx, e.target.value)}
              placeholder="Skill name"
              className="flex-1 bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-2 text-sm text-white placeholder-neutral-600 focus:border-[#bb9457]/50 focus:outline-none"
            />
            <button onClick={() => remove(idx)} className="text-red-400 hover:text-red-300 p-1"><Ic name="x" className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  )
}

// Certifications Editor
const CertificationsEditor = ({ certifications, setCertifications }: { certifications: DesignerCertification[]; setCertifications: (v: DesignerCertification[]) => void }) => {
  const add = () => setCertifications([...certifications, { id: '', designer_id: '', certification: '', created_at: '' }])
  const update = (idx: number, value: string) => {
    const updated = [...certifications]
    updated[idx] = { ...updated[idx], certification: value }
    setCertifications(updated)
  }
  const remove = (idx: number) => setCertifications(certifications.filter((_, i) => i !== idx))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider text-neutral-500">Certifications ({certifications.length})</p>
        <button onClick={add} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#bb9457] hover:bg-[#bb9457]/10 rounded-sm transition-colors">
          <Ic name="plus" className="w-3.5 h-3.5" /> Add
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {certifications.map((cert, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              value={cert.certification}
              onChange={(e) => update(idx, e.target.value)}
              placeholder="Certification name"
              className="flex-1 bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-2 text-sm text-white placeholder-neutral-600 focus:border-[#bb9457]/50 focus:outline-none"
            />
            <button onClick={() => remove(idx)} className="text-red-400 hover:text-red-300 p-1"><Ic name="x" className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DesignerManagement
