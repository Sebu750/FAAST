import { useEffect, useState, type ReactNode } from 'react'
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
}

const emptyForm: DesignerFormData = {
  slug: '', name: '', brand: '', location: '', nationality: '', languages: '',
  experience: '', specialization: '', category: '', gender: '', bio: '', short_bio: '',
  philosophy: '', image_url: '', cover_image_url: '', availability: '', is_featured: false, is_active: true
}

const DesignerEditor = ({ designer, onClose, onSave }: {
  designer: Designer | null
  onClose: () => void
  onSave: () => void
}) => {
  const [form, setForm] = useState<DesignerFormData>(
    designer ? {
      slug: designer.slug, name: designer.name, brand: designer.brand,
      location: designer.location || '', nationality: designer.nationality || '',
      languages: designer.languages || '', experience: designer.experience || '',
      specialization: designer.specialization || '', category: designer.category || '',
      gender: designer.gender || '', bio: designer.bio || '', short_bio: designer.short_bio || '',
      philosophy: designer.philosophy || '', image_url: designer.image_url || '',
      cover_image_url: designer.cover_image_url || '', availability: designer.availability || '',
      is_featured: designer.is_featured, is_active: designer.is_active
    } : emptyForm
  )

  // Related data states
  const [collections, setCollections] = useState<DesignerCollection[]>([])
  const [education, setEducation] = useState<DesignerEducation[]>([])
  const [achievements, setAchievements] = useState<DesignerAchievement[]>([])
  const [skills, setSkills] = useState<DesignerSkill[]>([])
  const [certifications, setCertifications] = useState<DesignerCertification[]>([])
  const [socialLinks, setSocialLinks] = useState<Partial<DesignerSocialLinks>>({})
  const [saving, setSaving] = useState(false)
  const [activeSection, setActiveSection] = useState('basic')

  useEffect(() => {
    if (designer) fetchRelatedData(designer.id)
  }, [designer])

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
  }

  const generateSlug = (name: string, brand: string) => {
    return `${name}-${brand}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  const handleSave = async () => {
    if (!form.name || !form.brand) {
      alert('Name and Brand are required')
      return
    }
    setSaving(true)

    try {
      const slug = form.slug || generateSlug(form.name, form.brand)
      const designerData = { ...form, slug }

      let designerId: string

      if (designer) {
        // Update existing
        const { error } = await supabase.from('designers').update(designerData).eq('id', designer.id)
        if (error) throw error
        designerId = designer.id
      } else {
        // Insert new
        const { data, error } = await supabase.from('designers').insert(designerData).select('id').single()
        if (error) throw error
        designerId = data.id
      }

      // Save related data
      await saveRelatedData(designerId)
      onSave()
    } catch (err) {
      console.error('Error saving designer:', err)
      alert('Error saving designer. Please try again.')
    } finally {
      setSaving(false)
    }
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

  const sections = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'bio', label: 'Biography' },
    { id: 'images', label: 'Images' },
    { id: 'collections', label: 'Collections' },
    { id: 'education', label: 'Education' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'skills', label: 'Skills' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'social', label: 'Social Links' },
    { id: 'status', label: 'Status' },
  ]

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto p-4 pt-8 pb-8">
      <div className="bg-neutral-900 border border-neutral-800 rounded-sm w-full max-w-4xl">
        {/* Header */}
        <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-serif text-white">{designer ? 'Edit Designer' : 'New Designer'}</h2>
            <p className="text-xs text-neutral-500 mt-1">{form.name || 'Untitled'}</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-2 text-neutral-400 hover:text-white transition-colors">
              <Ic name="x" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="border-b border-neutral-800 px-6 overflow-x-auto">
          <div className="flex gap-1 -mb-px">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`px-3 py-3 text-xs uppercase tracking-wider font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeSection === s.id
                    ? 'border-[#bb9457] text-[#bb9457]'
                    : 'border-transparent text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          {activeSection === 'basic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Name *" value={form.name} onChange={(e) => { updateField('name', e.target.value); if (!designer) updateField('slug', generateSlug(e.target.value, form.brand)) }} placeholder="Designer full name" />
                <Input label="Brand *" value={form.brand} onChange={(e) => { updateField('brand', e.target.value); if (!designer) updateField('slug', generateSlug(form.name, e.target.value)) }} placeholder="Brand / label name" />
              </div>
              <Input label="Slug" value={form.slug} onChange={(e) => updateField('slug', e.target.value)} placeholder="auto-generated-from-name-brand" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Location" value={form.location} onChange={(e) => updateField('location', e.target.value)} placeholder="City, Country" />
                <Input label="Nationality" value={form.nationality} onChange={(e) => updateField('nationality', e.target.value)} placeholder="Pakistani" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Languages" value={form.languages} onChange={(e) => updateField('languages', e.target.value)} placeholder="English, Urdu" />
                <Input label="Experience" value={form.experience} onChange={(e) => updateField('experience', e.target.value)} placeholder="5 years" />
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
          )}

          {/* Biography */}
          {activeSection === 'bio' && (
            <div className="space-y-4">
              <Input label="Short Bio" value={form.short_bio} onChange={(e) => updateField('short_bio', e.target.value)} placeholder="One-line description for cards and previews" />
              <Textarea label="Full Biography" value={form.bio} onChange={(e) => updateField('bio', e.target.value)} rows={6} placeholder="Detailed biography..." />
              <Textarea label="Design Philosophy / Why I Design" value={form.philosophy} onChange={(e) => updateField('philosophy', e.target.value)} rows={4} placeholder="Design philosophy, inspirations, creative vision..." />
            </div>
          )}

          {/* Images */}
          {activeSection === 'images' && (
            <div className="space-y-4">
              <Input label="Profile Image URL" value={form.image_url} onChange={(e) => updateField('image_url', e.target.value)} placeholder="https://..." />
              {form.image_url && (
                <div className="w-32 h-32 bg-neutral-800 rounded-sm overflow-hidden">
                  <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <Input label="Cover Image URL" value={form.cover_image_url} onChange={(e) => updateField('cover_image_url', e.target.value)} placeholder="https://..." />
              {form.cover_image_url && (
                <div className="w-full h-40 bg-neutral-800 rounded-sm overflow-hidden">
                  <img src={form.cover_image_url} alt="Cover preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          )}

          {/* Collections */}
          {activeSection === 'collections' && (
            <CollectionsEditor collections={collections} setCollections={setCollections} />
          )}

          {/* Education */}
          {activeSection === 'education' && (
            <EducationEditor education={education} setEducation={setEducation} />
          )}

          {/* Achievements */}
          {activeSection === 'achievements' && (
            <AchievementsEditor achievements={achievements} setAchievements={setAchievements} />
          )}

          {/* Skills */}
          {activeSection === 'skills' && (
            <SkillsEditor skills={skills} setSkills={setSkills} />
          )}

          {/* Certifications */}
          {activeSection === 'certifications' && (
            <CertificationsEditor certifications={certifications} setCertifications={setCertifications} />
          )}

          {/* Social Links */}
          {activeSection === 'social' && (
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
          {activeSection === 'status' && (
            <div className="space-y-6">
              <Toggle label="Active (visible on site)" checked={form.is_active} onChange={(v) => updateField('is_active', v)} />
              <Toggle label="Featured (shown in featured section)" checked={form.is_featured} onChange={(v) => updateField('is_featured', v)} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-neutral-900 border-t border-neutral-800 p-6 flex items-center justify-between">
          <button onClick={onClose} className="px-4 py-2.5 text-sm text-neutral-400 hover:text-white transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#bb9457] text-black text-xs uppercase tracking-wider font-semibold hover:bg-white transition-colors rounded-sm disabled:opacity-50"
          >
            {saving ? (
              <><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Saving...</>
            ) : (
              <><Ic name="check" className="w-4 h-4" /> {designer ? 'Update Designer' : 'Create Designer'}</>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════
// SUB-EDITORS
// ══════════════════════════════════════════

// Collections Editor
const CollectionsEditor = ({ collections, setCollections }: { collections: DesignerCollection[]; setCollections: (v: DesignerCollection[]) => void }) => {
  const addCollection = () => {
    setCollections([...collections, { id: '', designer_id: '', title: '', season: '', description: '', inspiration: '', looks: null, cover_image_url: '', images: null, is_latest: false, created_at: '' }])
  }

  const updateCollection = (idx: number, field: string, value: string | number | boolean) => {
    const updated = [...collections]
    updated[idx] = { ...updated[idx], [field]: value }
    setCollections(updated)
  }

  const removeCollection = (idx: number) => {
    setCollections(collections.filter((_, i) => i !== idx))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider text-neutral-500">Collections ({collections.length})</p>
        <button onClick={addCollection} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#bb9457] hover:bg-[#bb9457]/10 rounded-sm transition-colors">
          <Ic name="plus" className="w-3.5 h-3.5" /> Add
        </button>
      </div>
      {collections.map((col, idx) => (
        <div key={idx} className="bg-neutral-950 border border-neutral-800 rounded-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-500">Collection #{idx + 1}</span>
            <button onClick={() => removeCollection(idx)} className="text-red-400 hover:text-red-300"><Ic name="trash" className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input label="Title" value={col.title} onChange={(e) => updateCollection(idx, 'title', e.target.value)} placeholder="Collection name" />
            <Input label="Season" value={col.season || ''} onChange={(e) => updateCollection(idx, 'season', e.target.value)} placeholder="SS26, FW25" />
          </div>
          <Textarea label="Description" value={col.description || ''} onChange={(e) => updateCollection(idx, 'description', e.target.value)} rows={2} />
          <Input label="Inspiration" value={col.inspiration || ''} onChange={(e) => updateCollection(idx, 'inspiration', e.target.value)} placeholder="Creative inspiration" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input label="Number of Looks" type="number" value={col.looks?.toString() || ''} onChange={(e) => updateCollection(idx, 'looks', parseInt(e.target.value) || 0)} />
            <Input label="Cover Image URL" value={col.cover_image_url || ''} onChange={(e) => updateCollection(idx, 'cover_image_url', e.target.value)} />
          </div>
          <Toggle label="Latest Collection" checked={col.is_latest} onChange={(v) => updateCollection(idx, 'is_latest', v)} />
        </div>
      ))}
      {collections.length === 0 && (
        <p className="text-center text-neutral-600 text-sm py-6">No collections added yet</p>
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
