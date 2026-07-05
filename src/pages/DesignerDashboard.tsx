import { useState, useEffect, useCallback, useRef, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Designer, DesignerCollection, DesignerEducation, DesignerAchievement, DesignerSkill, DesignerCertification, DesignerSocialLinks, Opportunity } from '../types/database'
import DesignerOpportunities from './DesignerOpportunities'

type Page = 'dashboard' | 'collections' | 'opportunities' | 'profile' | 'account'

const DesignerDashboard = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [activePage, setActivePage] = useState<Page>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [designer, setDesigner] = useState<Designer | null>(null)
  const [collections, setCollections] = useState<DesignerCollection[]>([])
  const [education, setEducation] = useState<DesignerEducation[]>([])
  const [achievements, setAchievements] = useState<DesignerAchievement[]>([])
  const [skills, setSkills] = useState<DesignerSkill[]>([])
  const [certifications, setCertifications] = useState<DesignerCertification[]>([])
  const [socialLinks, setSocialLinks] = useState<DesignerSocialLinks | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [bannerIdx, setBannerIdx] = useState(0)
  const bannerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const [profileForm, setProfileForm] = useState({
    name: '', brand: '', location: '', nationality: '', gender: '',
    category: '', specialization: '', experience: '', languages: '',
    bio: '', short_bio: '', philosophy: '', availability: '',
  })
  const [socialForm, setSocialForm] = useState({
    instagram: '', facebook: '', tiktok: '', pinterest: '',
    linkedin: '', behance: '', email: '', website: '', shop: '', portfolio: '',
  })
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null)
  const [profilePreview, setProfilePreview] = useState('')
  const [coverPreview, setCoverPreview] = useState('')
  const [eduForm, setEduForm] = useState({ institution: '', degree: '', year: '' })
  const [achForm, setAchForm] = useState({ title: '', detail: '' })
  const [skillForm, setSkillForm] = useState({ skill: '' })
  const [certForm, setCertForm] = useState({ certification: '' })
  const [colForm, setColForm] = useState({ title: '', season: '', description: '', inspiration: '', looks: '' })
  const [colImages, setColImages] = useState<FileList | null>(null)
  const [colImagePreviews, setColImagePreviews] = useState<string[]>([])
  const [colCoverImage, setColCoverImage] = useState<File | null>(null)
  const [colCoverPreview, setColCoverPreview] = useState('')
  const [editingColId, setEditingColId] = useState<string | null>(null)
  const [editColForm, setEditColForm] = useState({ title: '', season: '', description: '', inspiration: '', looks: '' })
  const [editColCoverImage, setEditColCoverImage] = useState<File | null>(null)
  const [editColCoverPreview, setEditColCoverPreview] = useState('')
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [editColNewImages, setEditColNewImages] = useState<FileList | null>(null)
  const [editColNewPreviews, setEditColNewPreviews] = useState<string[]>([])
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' })
  const [pwError, setPwError] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])

  const fetchData = useCallback(async (userId: string) => {
    try {
      let { data: designerData } = await supabase.from('designers').select('*').eq('auth_user_id', userId).single()
      // Auto-create designer row if none exists
      if (!designerData) {
        const { data: newDesigner, error: insertErr } = await supabase
          .from('designers')
          .insert({
            id: crypto.randomUUID(),
            auth_user_id: userId,
            name: 'New Designer',
            brand: 'My Brand',
            slug: 'my-brand-' + Date.now(),
            status: 'approved',
            is_active: true,
          })
          .select().single()
        if (insertErr || !newDesigner) { setLoading(false); return }
        designerData = newDesigner
      }
      setDesigner(designerData)
      setProfileForm({
        name: designerData.name || '', brand: designerData.brand || '', location: designerData.location || '',
        nationality: designerData.nationality || '', gender: designerData.gender || '', category: designerData.category || '',
        specialization: designerData.specialization || '', experience: designerData.experience || '', languages: designerData.languages || '',
        bio: designerData.bio || '', short_bio: designerData.short_bio || '', philosophy: designerData.philosophy || '', availability: designerData.availability || '',
      })
      setProfilePreview(designerData.image_url || '')
      setCoverPreview(designerData.cover_image_url || '')
      const [colRes, eduRes, achRes, skillRes, certRes, socialRes, oppRes] = await Promise.all([
        supabase.from('designer_collections').select('*').eq('designer_id', designerData.id).order('created_at', { ascending: false }),
        supabase.from('designer_education').select('*').eq('designer_id', designerData.id).order('year', { ascending: false }),
        supabase.from('designer_achievements').select('*').eq('designer_id', designerData.id).order('created_at', { ascending: false }),
        supabase.from('designer_skills').select('*').eq('designer_id', designerData.id),
        supabase.from('designer_certifications').select('*').eq('designer_id', designerData.id),
        supabase.from('designer_social_links').select('*').eq('designer_id', designerData.id).single(),
        supabase.from('opportunities').select('*').eq('status', 'published').order('application_deadline', { ascending: true }).limit(3),
      ])
      setCollections(colRes.data || [])
      setEducation(eduRes.data || [])
      setAchievements(achRes.data || [])
      setSkills(skillRes.data || [])
      setCertifications(certRes.data || [])
      setOpportunities(oppRes.data || [])
      if (socialRes.data) {
        setSocialLinks(socialRes.data)
        setSocialForm({
          instagram: socialRes.data.instagram || '', facebook: socialRes.data.facebook || '', tiktok: socialRes.data.tiktok || '',
          pinterest: socialRes.data.pinterest || '', linkedin: socialRes.data.linkedin || '', behance: socialRes.data.behance || '',
          email: socialRes.data.email || '', website: socialRes.data.website || '', shop: socialRes.data.shop || '', portfolio: socialRes.data.portfolio || '',
        })
      }
    } catch (err) { console.error('Error fetching data:', err) }
    finally { setLoading(false) }
  }, [navigate])

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { navigate('/designer/auth'); return }
      await fetchData(session.user.id)
    }
    checkAuth()
  }, [navigate, fetchData])

  // Banner auto-slide
  useEffect(() => {
    if (bannerRef.current) clearInterval(bannerRef.current)
    bannerRef.current = setInterval(() => setBannerIdx(i => (i + 1) % 3), 5000)
    return () => { if (bannerRef.current) clearInterval(bannerRef.current) }
  }, [])

  const uploadImage = async (file: File, path: string): Promise<string | null> => {
    const { data, error } = await supabase.storage.from('designers').upload(path, file, { upsert: true })
    if (error) { console.error('Upload error:', error); return null }
    const { data: urlData } = supabase.storage.from('designers').getPublicUrl(data.path)
    return urlData.publicUrl
  }
  const showMsg = (msg: string) => { setMessage(msg); setTimeout(() => setMessage(''), 3000) }

  const saveProfile = async () => {
    if (!designer) return; setSaving(true)
    try {
      const updateData: any = { ...profileForm }
      if (profileImageFile) { const url = await uploadImage(profileImageFile, `${designer.id}/profile-${Date.now()}.${profileImageFile.name.split('.').pop()}`); if (url) { updateData.image_url = url; setProfilePreview(url) } }
      if (coverImageFile) { const url = await uploadImage(coverImageFile, `${designer.id}/cover-${Date.now()}.${coverImageFile.name.split('.').pop()}`); if (url) { updateData.cover_image_url = url; setCoverPreview(url) } }
      const { error } = await supabase.from('designers').update(updateData).eq('id', designer.id)
      if (error) throw error; await fetchData((await supabase.auth.getUser()).data.user!.id); showMsg('Profile saved successfully')
    } catch (err: any) { showMsg('Error: ' + err.message) } finally { setSaving(false) }
  }
  const saveSocial = async () => {
    if (!designer) return; setSaving(true)
    try { const { error } = await supabase.from('designer_social_links').upsert({ designer_id: designer.id, ...socialForm }, { onConflict: 'designer_id' }); if (error) throw error; showMsg('Social links saved') }
    catch (err: any) { showMsg('Error: ' + err.message) } finally { setSaving(false) }
  }
  const addEducation = async () => {
    if (!designer || !eduForm.institution) return; setSaving(true)
    try { const { error } = await supabase.from('designer_education').insert({ designer_id: designer.id, ...eduForm }); if (error) throw error; setEduForm({ institution: '', degree: '', year: '' }); await fetchData((await supabase.auth.getUser()).data.user!.id); showMsg('Education added') }
    catch (err: any) { showMsg('Error: ' + err.message) } finally { setSaving(false) }
  }
  const deleteEducation = async (id: string) => { await supabase.from('designer_education').delete().eq('id', id); await fetchData((await supabase.auth.getUser()).data.user!.id) }
  const addAchievement = async () => {
    if (!designer || !achForm.title) return; setSaving(true)
    try { const { error } = await supabase.from('designer_achievements').insert({ designer_id: designer.id, ...achForm }); if (error) throw error; setAchForm({ title: '', detail: '' }); await fetchData((await supabase.auth.getUser()).data.user!.id); showMsg('Achievement added') }
    catch (err: any) { showMsg('Error: ' + err.message) } finally { setSaving(false) }
  }
  const deleteAchievement = async (id: string) => { await supabase.from('designer_achievements').delete().eq('id', id); await fetchData((await supabase.auth.getUser()).data.user!.id) }
  const addSkill = async () => {
    if (!designer || !skillForm.skill) return; setSaving(true)
    try { const { error } = await supabase.from('designer_skills').insert({ designer_id: designer.id, ...skillForm }); if (error) throw error; setSkillForm({ skill: '' }); await fetchData((await supabase.auth.getUser()).data.user!.id); showMsg('Skill added') }
    catch (err: any) { showMsg('Error: ' + err.message) } finally { setSaving(false) }
  }
  const deleteSkill = async (id: string) => { await supabase.from('designer_skills').delete().eq('id', id); await fetchData((await supabase.auth.getUser()).data.user!.id) }
  const addCertification = async () => {
    if (!designer || !certForm.certification) return; setSaving(true)
    try { const { error } = await supabase.from('designer_certifications').insert({ designer_id: designer.id, ...certForm }); if (error) throw error; setCertForm({ certification: '' }); await fetchData((await supabase.auth.getUser()).data.user!.id); showMsg('Certification added') }
    catch (err: any) { showMsg('Error: ' + err.message) } finally { setSaving(false) }
  }
  const deleteCertification = async (id: string) => { await supabase.from('designer_certifications').delete().eq('id', id); await fetchData((await supabase.auth.getUser()).data.user!.id) }
  const addCollection = async () => {
    if (!designer || !colForm.title) return; setSaving(true)
    try {
      let coverUrl: string | null = null; const imageUrls: string[] = []
      if (colCoverImage) { coverUrl = await uploadImage(colCoverImage, `${designer.id}/collections/cover-${Date.now()}.${colCoverImage.name.split('.').pop()}`) }
      if (colImages) { for (let i = 0; i < colImages.length; i++) { const file = colImages[i]; const url = await uploadImage(file, `${designer.id}/collections/${Date.now()}-${i}.${file.name.split('.').pop()}`); if (url) imageUrls.push(url) } }
      const { error } = await supabase.from('designer_collections').insert({ designer_id: designer.id, title: colForm.title, season: colForm.season || null, description: colForm.description || null, inspiration: colForm.inspiration || null, looks: colForm.looks ? parseInt(colForm.looks) : null, cover_image_url: coverUrl, images: imageUrls.length > 0 ? imageUrls : null })
      if (error) throw error; setColForm({ title: '', season: '', description: '', inspiration: '', looks: '' }); setColImages(null); setColImagePreviews([]); setColCoverImage(null); setColCoverPreview(''); await fetchData((await supabase.auth.getUser()).data.user!.id); showMsg('Collection added')
    } catch (err: any) { showMsg('Error: ' + err.message) } finally { setSaving(false) }
  }
  const deleteCollection = async (id: string) => { await supabase.from('designer_collections').delete().eq('id', id); await fetchData((await supabase.auth.getUser()).data.user!.id) }
  const startEditCollection = (col: DesignerCollection) => { setEditingColId(col.id); setEditColForm({ title: col.title || '', season: col.season || '', description: col.description || '', inspiration: col.inspiration || '', looks: col.looks ? String(col.looks) : '' }); setEditColCoverImage(null); setEditColCoverPreview(''); setExistingImages(col.images || []); setEditColNewImages(null); setEditColNewPreviews([]) }
  const cancelEditCollection = () => { setEditingColId(null); setEditColCoverImage(null); setEditColCoverPreview(''); setExistingImages([]); setEditColNewImages(null); setEditColNewPreviews([]) }
  const removeExistingImage = (idx: number) => { setExistingImages(prev => prev.filter((_, i) => i !== idx)) }
  const removeNewImage = (idx: number) => { setEditColNewPreviews(prev => prev.filter((_, i) => i !== idx)); if (editColNewImages) { const arr = Array.from(editColNewImages); arr.splice(idx, 1); setEditColNewImages(arr as unknown as FileList) } }
  const updateCollection = async (id: string) => {
    if (!designer) return; setSaving(true)
    try {
      const updateData: any = { ...editColForm, looks: editColForm.looks ? parseInt(editColForm.looks) : null }
      if (editColCoverImage) { const url = await uploadImage(editColCoverImage, `${designer.id}/collections/cover-${Date.now()}.${editColCoverImage.name.split('.').pop()}`); if (url) updateData.cover_image_url = url }
      const newUrls: string[] = []
      if (editColNewImages) { for (let i = 0; i < editColNewImages.length; i++) { const file = editColNewImages[i]; const url = await uploadImage(file, `${designer.id}/collections/${Date.now()}-${i}.${file.name.split('.').pop()}`); if (url) newUrls.push(url) } }
      const allImages = [...existingImages, ...newUrls]
      updateData.images = allImages.length > 0 ? allImages : null
      const { error } = await supabase.from('designer_collections').update(updateData).eq('id', id)
      if (error) throw error; setEditingColId(null); setEditColCoverImage(null); setEditColCoverPreview(''); setExistingImages([]); setEditColNewImages(null); setEditColNewPreviews([]); await fetchData((await supabase.auth.getUser()).data.user!.id); showMsg('Collection updated')
    } catch (err: any) { showMsg('Error: ' + err.message) } finally { setSaving(false) }
  }
  const handleLogout = async () => { await supabase.auth.signOut(); navigate('/designer/auth') }

  // Change password
  const changePassword = async () => {
    setPwError(''); setSaving(true)
    if (pwForm.newPw.length < 8) { setPwError('New password must be at least 8 characters'); setSaving(false); return }
    if (pwForm.newPw !== pwForm.confirm) { setPwError('Passwords do not match'); setSaving(false); return }
    try {
      const { error } = await supabase.auth.updateUser({ password: pwForm.newPw })
      if (error) throw error; setPwForm({ current: '', newPw: '', confirm: '' }); showMsg('Password updated successfully')
    } catch (err: any) { setPwError(err.message || 'Failed to update password') }
    finally { setSaving(false) }
  }

  // Delete account
  const deleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') return; setSaving(true)
    try {
      const user = (await supabase.auth.getUser()).data.user
      if (!user) throw new Error('Not authenticated')
      // Delete designer row first (cascades to related tables)
      if (designer) { await supabase.from('designers').delete().eq('id', designer.id) }
      // Delete auth user
      const { error } = await supabase.auth.admin.deleteUser(user.id)
      if (error) {
        // Fallback: sign out if admin delete fails (needs service role)
        await supabase.auth.signOut()
        navigate('/designer/auth'); return
      }
      await supabase.auth.signOut(); navigate('/designer/auth')
    } catch (err: any) { showMsg('Error: ' + err.message) }
    finally { setSaving(false) }
  }

  const inputCls = "w-full px-4 py-3 bg-[#f8f7f4] border border-stone-200 text-stone-900 rounded-xl focus:outline-none focus:border-[#8B1A1A] focus:ring-2 focus:ring-[#8B1A1A]/10 transition-all text-sm placeholder-stone-400"
  const labelCls = "block text-[11px] uppercase tracking-wider text-stone-500 font-semibold mb-2"
  const cardCls = "bg-white rounded-2xl border border-stone-100 shadow-sm shadow-stone-200/50"

  // ---- Sidebar nav items ----
  const mainNav: { key: Page; label: string; icon: ReactNode }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { key: 'profile', label: 'My Profile', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
    { key: 'collections', label: 'Collections', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> },
    { key: 'opportunities', label: 'Opportunities', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
  ]

  const bannerSlides = [
    { title: 'Submit to Lahore Fashion Week', subtitle: 'Showcase your latest collection on the runway', cta: 'Apply Now', bg: 'from-[#8B1A1A] to-[#5C1010]' },
    { title: 'New: Marketplace Integration', subtitle: 'Sell your designs directly through Adorzia', cta: 'Learn More', bg: 'from-stone-800 to-stone-900' },
    { title: 'Designer Spotlight', subtitle: 'Get featured in our curated editorial series', cta: 'Get Featured', bg: 'from-[#3C2415] to-[#1A0F09]' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f4f0]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-stone-200 border-t-[#8B1A1A] rounded-full animate-spin" />
          <p className="text-stone-400 text-sm tracking-wider uppercase">Loading</p>
        </div>
      </div>
    )
  }
  if (!designer) return null

  const completenessItems = [
    { label: 'Profile Image', done: !!designer.image_url },
    { label: 'Cover Image', done: !!designer.cover_image_url },
    { label: 'Bio', done: !!designer.bio },
    { label: 'Philosophy', done: !!designer.philosophy },
    { label: 'Location', done: !!designer.location },
    { label: 'Social Links', done: !!socialLinks },
  ]
  const completenessPct = Math.round((completenessItems.filter(i => i.done).length / completenessItems.length) * 100)

  return (
    <div className="min-h-screen bg-[#f5f4f0] flex">
      {/* ===== SIDEBAR ===== */}
      <aside className={`fixed top-0 left-0 h-full bg-white border-r border-stone-100 z-40 transition-all duration-300 flex flex-col ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        {/* Logo */}
        <div className="px-6 py-6 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B1A1A] flex items-center justify-center shrink-0">
              <span className="text-white text-lg font-serif font-bold">A</span>
            </div>
            {sidebarOpen && <span className="text-stone-900 font-serif text-lg tracking-tight">Adorzia</span>}
          </div>
        </div>

        {/* Main Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {mainNav.map(item => (
            <button
              key={item.key}
              onClick={() => setActivePage(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activePage === item.key
                  ? 'bg-[#8B1A1A] text-white shadow-md shadow-[#8B1A1A]/20'
                  : 'text-stone-500 hover:bg-stone-50 hover:text-stone-800'
              }`}
            >
              {item.icon}
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom: Account Settings + Logout */}
        <div className="px-3 py-4 border-t border-stone-100 space-y-1">
          <button
            onClick={() => setActivePage('account')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activePage === 'account' ? 'bg-[#8B1A1A] text-white shadow-md shadow-[#8B1A1A]/20' : 'text-stone-500 hover:bg-stone-50 hover:text-stone-800'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {sidebarOpen && <span>Account Settings</span>}
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-400 hover:bg-red-50 hover:text-red-600 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* ===== MAIN AREA ===== */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* TOP BAR */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-stone-100">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-xl hover:bg-stone-100 text-stone-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input type="text" placeholder="Search collections, opportunities..." className="pl-10 pr-4 py-2.5 bg-[#f8f7f4] border border-stone-200 rounded-xl text-sm text-stone-700 w-72 focus:outline-none focus:border-[#8B1A1A]/30 focus:ring-2 focus:ring-[#8B1A1A]/5 placeholder-stone-400 transition-all" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2.5 rounded-xl hover:bg-stone-50 text-stone-400 hover:text-stone-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#8B1A1A] rounded-full" />
              </button>
              <button className="relative p-2.5 rounded-xl hover:bg-stone-50 text-stone-400 hover:text-stone-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </button>
              <div className="w-px h-8 bg-stone-200 mx-1" />
              <button onClick={() => setActivePage('profile')} className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-xl hover:bg-stone-50 transition-colors">
                <div className="w-9 h-9 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                  {profilePreview ? <img src={profilePreview} alt={designer.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs font-semibold">{designer.name.charAt(0)}</div>}
                </div>
                <div className="text-left">
                  <p className="text-stone-800 text-sm font-medium leading-tight">{designer.name}</p>
                  <p className="text-stone-400 text-[11px]">{designer.brand}</p>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* TOAST */}
        {message && (
          <div className="fixed top-20 right-8 z-50 bg-white border border-stone-200 text-stone-800 text-sm px-5 py-3.5 rounded-2xl shadow-xl shadow-stone-200/50 flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            {message}
          </div>
        )}

        {/* ===== PAGE CONTENT ===== */}
        <main className="p-8">
          {/* ===== DASHBOARD (OVERVIEW) ===== */}
          {activePage === 'dashboard' && (
            <div className="space-y-8 max-w-7xl mx-auto">
              {/* Welcome */}
              <div>
                <h1 className="text-3xl font-serif text-stone-900 tracking-tight">Welcome back, {designer.name.split(' ')[0]}</h1>
                <p className="text-stone-500 mt-1">Here's what's happening with your profile today.</p>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: 'Collections', value: collections.length, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>, color: 'bg-[#8B1A1A]/10 text-[#8B1A1A]', page: 'collections' as Page },
                  { label: 'Skills', value: skills.length, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, color: 'bg-amber-50 text-amber-600', page: 'profile' as Page },
                  { label: 'Achievements', value: achievements.length, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>, color: 'bg-emerald-50 text-emerald-600', page: 'profile' as Page },
                  { label: 'Profile', value: `${completenessPct}%`, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>, color: 'bg-violet-50 text-violet-600', page: 'profile' as Page },
                ].map(stat => (
                  <div key={stat.label} onClick={() => setActivePage(stat.page)} className={`${cardCls} p-6 hover:shadow-md transition-all cursor-pointer group`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>{stat.icon}</div>
                      <svg className="w-4 h-4 text-stone-300 group-hover:text-[#8B1A1A] group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                    </div>
                    <p className="text-2xl font-serif text-stone-900">{stat.value}</p>
                    <p className="text-stone-400 text-sm mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Banner Slider */}
              <div className="relative overflow-hidden rounded-2xl h-48 lg:h-56">
                {bannerSlides.map((slide, i) => (
                  <div key={i} className={`absolute inset-0 bg-gradient-to-r ${slide.bg} transition-opacity duration-700 ${i === bannerIdx ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex items-center h-full px-10 lg:px-14">
                      <div className="max-w-lg">
                        <h3 className="text-white text-2xl lg:text-3xl font-serif leading-tight mb-2">{slide.title}</h3>
                        <p className="text-white/70 text-sm mb-5">{slide.subtitle}</p>
                        <button className="px-5 py-2.5 bg-white text-stone-900 text-sm font-semibold rounded-xl hover:bg-white/90 transition-colors">{slide.cta}</button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="absolute bottom-4 right-6 flex gap-2 z-10">
                  {bannerSlides.map((_, i) => (
                    <button key={i} onClick={() => setBannerIdx(i)} className={`w-2 h-2 rounded-full transition-all ${i === bannerIdx ? 'bg-white w-6' : 'bg-white/40'}`} />
                  ))}
                </div>
              </div>

              {/* Two Column: Recent Collections + Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Collections */}
                <div className={`${cardCls} p-6 lg:col-span-2`}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-serif text-stone-900">Recent Collections</h3>
                    <button onClick={() => setActivePage('collections')} className="text-[#8B1A1A] text-sm font-medium hover:underline">View all</button>
                  </div>
                  {collections.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-300">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                      </div>
                      <p className="text-stone-400 text-sm">No collections yet</p>
                      <button onClick={() => setActivePage('collections')} className="mt-3 text-[#8B1A1A] text-sm font-medium hover:underline">Add your first collection</button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {collections.slice(0, 4).map(col => (
                        <div key={col.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-stone-50/80 transition-colors group">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                            {col.cover_image_url ? <img src={col.cover_image_url} alt={col.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-stone-300"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-stone-800 text-sm font-medium truncate">{col.title}</p>
                            <p className="text-stone-400 text-xs">{col.season} {col.looks ? `· ${col.looks} looks` : ''}</p>
                          </div>
                          <button onClick={() => deleteCollection(col.id)} className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-red-500 transition-all text-xs">Remove</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className={`${cardCls} p-6`}>
                  <h3 className="text-lg font-serif text-stone-900 mb-5">Quick Actions</h3>
                  <div className="space-y-3">
                    <button onClick={() => setActivePage('profile')} className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#f8f7f4] hover:bg-stone-100 transition-colors text-left group">
                      <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center text-violet-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-stone-800 text-sm font-medium">Edit Profile</p>
                        <p className="text-stone-400 text-xs">Update your info</p>
                      </div>
                      <svg className="w-4 h-4 text-stone-300 group-hover:text-[#8B1A1A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <button onClick={() => setActivePage('collections')} className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#f8f7f4] hover:bg-stone-100 transition-colors text-left group">
                      <div className="w-9 h-9 rounded-lg bg-[#8B1A1A]/10 flex items-center justify-center text-[#8B1A1A]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-stone-800 text-sm font-medium">Add Collection</p>
                        <p className="text-stone-400 text-xs">Upload new work</p>
                      </div>
                      <svg className="w-4 h-4 text-stone-300 group-hover:text-[#8B1A1A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <button onClick={() => setActivePage('opportunities')} className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#f8f7f4] hover:bg-stone-100 transition-colors text-left group">
                      <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-stone-800 text-sm font-medium">Opportunities</p>
                        <p className="text-stone-400 text-xs">Browse & apply</p>
                      </div>
                      <svg className="w-4 h-4 text-stone-300 group-hover:text-[#8B1A1A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <button onClick={() => setActivePage('account')} className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#f8f7f4] hover:bg-stone-100 transition-colors text-left group">
                      <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-stone-800 text-sm font-medium">Account</p>
                        <p className="text-stone-400 text-xs">Settings & security</p>
                      </div>
                      <svg className="w-4 h-4 text-stone-300 group-hover:text-[#8B1A1A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Latest Opportunities */}
              <div className={`${cardCls} p-6`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-serif text-stone-900">Latest Opportunities</h3>
                  <button onClick={() => setActivePage('opportunities')} className="text-[#8B1A1A] text-sm font-medium hover:underline">View all</button>
                </div>
                {opportunities.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-300">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <p className="text-stone-400 text-sm">No opportunities available yet</p>
                    <button onClick={() => setActivePage('opportunities')} className="mt-3 text-[#8B1A1A] text-sm font-medium hover:underline">Check later</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {opportunities.map((opp) => {
                      const typeLabels: Record<string, string> = { job: 'Job', internship: 'Internship', competition: 'Competition', grant: 'Grant', open_call: 'Open Call', fashion_event: 'Event' }
                      const deadline = opp.application_deadline ? new Date(opp.application_deadline) : null
                      const isExpired = deadline && deadline < new Date()
                      return (
                        <div key={opp.id} className="p-4 rounded-xl bg-[#f8f7f4] border border-stone-100 hover:border-[#8B1A1A]/20 transition-colors">
                          <div className="w-10 h-10 rounded-lg bg-[#8B1A1A]/10 flex items-center justify-center mb-3">
                            <svg className="w-5 h-5 text-[#8B1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                          </div>
                          <p className="text-stone-800 text-sm font-semibold line-clamp-2">{opp.title}</p>
                          <p className="text-stone-400 text-xs mt-1">{opp.city || opp.location || 'Adorzia'}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8B1A1A] bg-[#8B1A1A]/8 px-2 py-0.5 rounded-full">{typeLabels[opp.opportunity_type] || opp.opportunity_type}</span>
                            {deadline && (
                              <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${isExpired ? 'text-stone-400 bg-stone-100' : 'text-emerald-600 bg-emerald-50'}`}>
                                {isExpired ? 'Expired' : `Due ${deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ===== COLLECTIONS PAGE ===== */}
          {activePage === 'collections' && (
            <div className="space-y-8 max-w-5xl mx-auto">
              <div>
                <h1 className="text-3xl font-serif text-stone-900 tracking-tight">Collections</h1>
                <p className="text-stone-500 mt-1">Manage your fashion collections and lookbooks.</p>
              </div>
              <div className={`${cardCls} p-8`}>
                <h3 className="text-lg font-serif text-stone-900 mb-6">Add New Collection</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div><label className={labelCls}>Title</label><input className={inputCls} value={colForm.title} onChange={e => setColForm(p => ({...p, title: e.target.value}))} /></div>
                  <div><label className={labelCls}>Season</label><input className={inputCls} value={colForm.season} onChange={e => setColForm(p => ({...p, season: e.target.value}))} placeholder="e.g. SS26" /></div>
                  <div className="sm:col-span-2"><label className={labelCls}>Description</label><textarea className={inputCls + ' resize-none'} rows={3} value={colForm.description} onChange={e => setColForm(p => ({...p, description: e.target.value}))} /></div>
                  <div className="sm:col-span-2"><label className={labelCls}>Inspiration</label><input className={inputCls} value={colForm.inspiration} onChange={e => setColForm(p => ({...p, inspiration: e.target.value}))} /></div>
                  <div><label className={labelCls}>Number of Looks</label><input type="number" className={inputCls} value={colForm.looks} onChange={e => setColForm(p => ({...p, looks: e.target.value}))} /></div>
                  <div>
                    <label className={labelCls}>Cover Image</label>
                    <label className="inline-block cursor-pointer px-4 py-2.5 bg-[#f8f7f4] border border-stone-200 text-stone-600 text-sm rounded-xl hover:border-[#8B1A1A]/30 transition-colors">Choose File<input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0] || null; setColCoverImage(f); if (f) { const r = new FileReader(); r.onload = () => setColCoverPreview(r.result as string); r.readAsDataURL(f) } else setColCoverPreview('') }} /></label>
                    {colCoverPreview && <div className="mt-2 w-24 h-24 rounded-xl overflow-hidden border border-stone-200"><img src={colCoverPreview} className="w-full h-full object-cover" /></div>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Collection Images</label>
                    <label className="inline-block cursor-pointer px-4 py-2.5 bg-[#f8f7f4] border border-stone-200 text-stone-600 text-sm rounded-xl hover:border-[#8B1A1A]/30 transition-colors">Choose Files (multiple)<input type="file" accept="image/*" multiple className="hidden" onChange={e => { const files = e.target.files; setColImages(files); if (files) { const previews: string[] = []; Array.from(files).forEach(f => { const r = new FileReader(); r.onload = () => { previews.push(r.result as string); if (previews.length === files.length) setColImagePreviews(previews) }; r.readAsDataURL(f) }) } else setColImagePreviews([]) }} /></label>
                    {colImagePreviews.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {colImagePreviews.map((src, i) => (
                          <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-stone-200 group">
                            <img src={src} className="w-full h-full object-cover" />
                            <button onClick={() => { setColImagePreviews(prev => prev.filter((_, idx) => idx !== i)); if (colImages) { const arr = Array.from(colImages); arr.splice(i, 1); setColImages(arr as unknown as FileList) } }} className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">&times;</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <button onClick={addCollection} disabled={saving} className="mt-6 px-6 py-3 bg-[#8B1A1A] text-white text-sm font-semibold rounded-xl hover:bg-[#A52A2A] transition-colors shadow-lg shadow-[#8B1A1A]/15 disabled:opacity-50">{saving ? 'Uploading...' : 'Add Collection'}</button>
              </div>
              {collections.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-serif text-stone-900">Your Collections</h3>
                  {collections.map(col => (
                    <div key={col.id} className={`${cardCls} p-5 hover:shadow-md transition-shadow`}>
                      {editingColId === col.id ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div><label className={labelCls}>Title</label><input className={inputCls} value={editColForm.title} onChange={e => setEditColForm(p => ({...p, title: e.target.value}))} /></div>
                            <div><label className={labelCls}>Season</label><input className={inputCls} value={editColForm.season} onChange={e => setEditColForm(p => ({...p, season: e.target.value}))} placeholder="e.g. SS26" /></div>
                            <div className="sm:col-span-2"><label className={labelCls}>Description</label><textarea className={inputCls + ' resize-none'} rows={2} value={editColForm.description} onChange={e => setEditColForm(p => ({...p, description: e.target.value}))} /></div>
                            <div><label className={labelCls}>Inspiration</label><input className={inputCls} value={editColForm.inspiration} onChange={e => setEditColForm(p => ({...p, inspiration: e.target.value}))} /></div>
                            <div><label className={labelCls}>Number of Looks</label><input type="number" className={inputCls} value={editColForm.looks} onChange={e => setEditColForm(p => ({...p, looks: e.target.value}))} /></div>
                          </div>
                          {/* Cover Image */}
                          <div>
                            <label className={labelCls}>Cover Image</label>
                            <div className="flex items-center gap-4">
                              {col.cover_image_url && !editColCoverPreview && <div className="w-20 h-20 rounded-xl overflow-hidden border border-stone-200"><img src={col.cover_image_url} className="w-full h-full object-cover" /></div>}
                              {editColCoverPreview && <div className="w-20 h-20 rounded-xl overflow-hidden border border-stone-200"><img src={editColCoverPreview} className="w-full h-full object-cover" /></div>}
                              <label className="cursor-pointer px-4 py-2.5 bg-[#f8f7f4] border border-stone-200 text-stone-600 text-sm rounded-xl hover:border-[#8B1A1A]/30 transition-colors">Replace<input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0] || null; setEditColCoverImage(f); if (f) { const r = new FileReader(); r.onload = () => setEditColCoverPreview(r.result as string); r.readAsDataURL(f) } }} /></label>
                            </div>
                          </div>
                          {/* Existing Images */}
                          {existingImages.length > 0 && (
                            <div>
                              <label className={labelCls}>Current Images ({existingImages.length})</label>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {existingImages.map((src, i) => (
                                  <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-stone-200 group">
                                    <img src={src} className="w-full h-full object-cover" />
                                    <button onClick={() => removeExistingImage(i)} className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">&times;</button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {/* Add New Images */}
                          <div>
                            <label className={labelCls}>Add More Images</label>
                            <label className="inline-block cursor-pointer px-4 py-2.5 bg-[#f8f7f4] border border-stone-200 text-stone-600 text-sm rounded-xl hover:border-[#8B1A1A]/30 transition-colors">Choose Files<input type="file" accept="image/*" multiple className="hidden" onChange={e => { const files = e.target.files; setEditColNewImages(files); if (files) { const previews: string[] = []; Array.from(files).forEach(f => { const r = new FileReader(); r.onload = () => { previews.push(r.result as string); if (previews.length === files.length) setEditColNewPreviews(previews) }; r.readAsDataURL(f) }) } }} /></label>
                            {editColNewPreviews.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {editColNewPreviews.map((src, i) => (
                                  <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-stone-200 group">
                                    <img src={src} className="w-full h-full object-cover" />
                                    <button onClick={() => removeNewImage(i)} className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">&times;</button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-3">
                            <button onClick={() => updateCollection(col.id)} disabled={saving} className="px-5 py-2.5 bg-[#8B1A1A] text-white text-sm font-semibold rounded-xl hover:bg-[#A52A2A] transition-colors disabled:opacity-50">{saving ? 'Saving...' : 'Save Changes'}</button>
                            <button onClick={cancelEditCollection} className="px-5 py-2.5 bg-stone-100 text-stone-600 text-sm font-medium rounded-xl hover:bg-stone-200 transition-colors">Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                              {col.cover_image_url ? <img src={col.cover_image_url} alt={col.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-stone-300"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>}
                            </div>
                            <div><p className="text-stone-800 text-sm font-medium">{col.title}</p><p className="text-stone-400 text-xs">{col.season} {col.looks ? `· ${col.looks} looks` : ''}</p></div>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => startEditCollection(col)} className="text-stone-400 hover:text-[#8B1A1A] text-sm transition-colors">Edit</button>
                            <button onClick={() => deleteCollection(col.id)} className="text-stone-300 hover:text-red-500 text-sm transition-colors">Delete</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ===== MY PROFILE PAGE ===== */}
          {activePage === 'profile' && (
            <div className="space-y-8 max-w-5xl mx-auto">
              <div>
                <h1 className="text-3xl font-serif text-stone-900 tracking-tight">My Profile</h1>
                <p className="text-stone-500 mt-1">Manage your profile information and public presence.</p>
              </div>

              {/* Basic Info */}
              <div className={`${cardCls} p-8`}>
                <h3 className="text-lg font-serif text-stone-900 mb-6">Basic Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div><label className={labelCls}>Name</label><input className={inputCls} value={profileForm.name} onChange={e => setProfileForm(p => ({...p, name: e.target.value}))} /></div>
                  <div><label className={labelCls}>Brand</label><input className={inputCls} value={profileForm.brand} onChange={e => setProfileForm(p => ({...p, brand: e.target.value}))} /></div>
                  <div><label className={labelCls}>Location</label><input className={inputCls} value={profileForm.location} onChange={e => setProfileForm(p => ({...p, location: e.target.value}))} /></div>
                  <div><label className={labelCls}>Nationality</label><input className={inputCls} value={profileForm.nationality} onChange={e => setProfileForm(p => ({...p, nationality: e.target.value}))} /></div>
                  <div><label className={labelCls}>Category</label>
                    <select className={inputCls} value={profileForm.category} onChange={e => setProfileForm(p => ({...p, category: e.target.value}))}><option value="">Select</option><option value="Womenswear">Womenswear</option><option value="Menswear">Menswear</option><option value="Bridal">Bridal</option><option value="Pret">Pret</option><option value="Luxury Prêt">Luxury Prêt</option><option value="Textiles">Textiles</option><option value="Accessories">Accessories</option><option value="Other">Other</option></select>
                  </div>
                  <div><label className={labelCls}>Specialization</label><input className={inputCls} value={profileForm.specialization} onChange={e => setProfileForm(p => ({...p, specialization: e.target.value}))} /></div>
                  <div><label className={labelCls}>Experience</label><input className={inputCls} value={profileForm.experience} onChange={e => setProfileForm(p => ({...p, experience: e.target.value}))} placeholder="e.g. 5 years" /></div>
                  <div><label className={labelCls}>Languages</label><input className={inputCls} value={profileForm.languages} onChange={e => setProfileForm(p => ({...p, languages: e.target.value}))} /></div>
                </div>
              </div>

              {/* About */}
              <div className={`${cardCls} p-8`}>
                <h3 className="text-lg font-serif text-stone-900 mb-6">About</h3>
                <div className="space-y-5">
                  <div><label className={labelCls}>Short Bio</label><input className={inputCls} value={profileForm.short_bio} onChange={e => setProfileForm(p => ({...p, short_bio: e.target.value}))} maxLength={150} /></div>
                  <div><label className={labelCls}>Full Bio</label><textarea className={inputCls + ' resize-none'} rows={5} value={profileForm.bio} onChange={e => setProfileForm(p => ({...p, bio: e.target.value}))} /></div>
                  <div><label className={labelCls}>Design Philosophy</label><textarea className={inputCls + ' resize-none'} rows={3} value={profileForm.philosophy} onChange={e => setProfileForm(p => ({...p, philosophy: e.target.value}))} /></div>
                </div>
              </div>

              {/* Images */}
              <div className={`${cardCls} p-8`}>
                <h3 className="text-lg font-serif text-stone-900 mb-6">Images</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls}>Profile Photo</label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0">{profilePreview && <img src={profilePreview} alt="" className="w-full h-full object-cover" />}</div>
                      <label className="cursor-pointer px-4 py-2.5 bg-[#f8f7f4] border border-stone-200 text-stone-600 text-sm rounded-xl hover:border-[#8B1A1A]/30 transition-colors">Choose Image<input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) { setProfileImageFile(f); setProfilePreview(URL.createObjectURL(f)) } }} /></label>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Cover Image</label>
                    <div className="w-full h-20 overflow-hidden bg-stone-100 border border-stone-200 rounded-2xl">{coverPreview && <img src={coverPreview} alt="" className="w-full h-full object-cover" />}</div>
                    <label className="inline-block mt-2 cursor-pointer px-4 py-2.5 bg-[#f8f7f4] border border-stone-200 text-stone-600 text-sm rounded-xl hover:border-[#8B1A1A]/30 transition-colors">Choose Cover<input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) { setCoverImageFile(f); setCoverPreview(URL.createObjectURL(f)) } }} /></label>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className={`${cardCls} p-8`}>
                <h3 className="text-lg font-serif text-stone-900 mb-6">Social Links</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div><label className={labelCls}>Instagram</label><input className={inputCls} value={socialForm.instagram} onChange={e => setSocialForm(p => ({...p, instagram: e.target.value}))} /></div>
                  <div><label className={labelCls}>Facebook</label><input className={inputCls} value={socialForm.facebook} onChange={e => setSocialForm(p => ({...p, facebook: e.target.value}))} /></div>
                  <div><label className={labelCls}>TikTok</label><input className={inputCls} value={socialForm.tiktok} onChange={e => setSocialForm(p => ({...p, tiktok: e.target.value}))} /></div>
                  <div><label className={labelCls}>LinkedIn</label><input className={inputCls} value={socialForm.linkedin} onChange={e => setSocialForm(p => ({...p, linkedin: e.target.value}))} /></div>
                  <div><label className={labelCls}>Website</label><input className={inputCls} value={socialForm.website} onChange={e => setSocialForm(p => ({...p, website: e.target.value}))} /></div>
                  <div><label className={labelCls}>Contact Email</label><input type="email" className={inputCls} value={socialForm.email} onChange={e => setSocialForm(p => ({...p, email: e.target.value}))} /></div>
                </div>
              </div>

              {/* Education */}
              <div className={`${cardCls} p-8`}>
                <h3 className="text-lg font-serif text-stone-900 mb-6">Education</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-4">
                  <div><label className={labelCls}>Institution</label><input className={inputCls} value={eduForm.institution} onChange={e => setEduForm(p => ({...p, institution: e.target.value}))} /></div>
                  <div><label className={labelCls}>Degree</label><input className={inputCls} value={eduForm.degree} onChange={e => setEduForm(p => ({...p, degree: e.target.value}))} /></div>
                  <div><label className={labelCls}>Year</label><input className={inputCls} value={eduForm.year} onChange={e => setEduForm(p => ({...p, year: e.target.value}))} /></div>
                </div>
                <button onClick={addEducation} disabled={saving} className="px-5 py-2.5 bg-[#8B1A1A] text-white text-sm font-semibold rounded-xl hover:bg-[#A52A2A] transition-colors shadow-lg shadow-[#8B1A1A]/15 disabled:opacity-50">{saving ? 'Adding...' : 'Add Education'}</button>
                {education.length > 0 && (
                  <div className="mt-5 space-y-2 pt-5 border-t border-stone-100">
                    {education.map(edu => (
                      <div key={edu.id} className="flex items-center justify-between p-3 rounded-xl bg-[#f8f7f4]">
                        <div><p className="text-stone-800 text-sm">{edu.institution}</p><p className="text-stone-400 text-xs">{edu.degree} {edu.year ? `· ${edu.year}` : ''}</p></div>
                        <button onClick={() => deleteEducation(edu.id)} className="text-stone-300 hover:text-red-500 text-sm transition-colors">Remove</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Skills */}
              <div className={`${cardCls} p-8`}>
                <h3 className="text-lg font-serif text-stone-900 mb-6">Skills & Expertise</h3>
                <div className="flex gap-3 mb-4">
                  <input className={inputCls} placeholder="e.g. Pattern Making" value={skillForm.skill} onChange={e => setSkillForm(p => ({...p, skill: e.target.value}))} />
                  <button onClick={addSkill} disabled={saving} className="shrink-0 px-5 py-3 bg-[#8B1A1A] text-white text-sm font-semibold rounded-xl hover:bg-[#A52A2A] transition-colors shadow-lg shadow-[#8B1A1A]/15 disabled:opacity-50">Add</button>
                </div>
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-stone-100">
                    {skills.map(s => (
                      <div key={s.id} className="flex items-center gap-2 px-3 py-1.5 bg-[#f8f7f4] border border-stone-100 rounded-full">
                        <span className="text-stone-600 text-sm">{s.skill}</span>
                        <button onClick={() => deleteSkill(s.id)} className="text-stone-300 hover:text-red-500 text-xs transition-colors">×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Achievements */}
              <div className={`${cardCls} p-8`}>
                <h3 className="text-lg font-serif text-stone-900 mb-6">Achievements</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">
                  <div><label className={labelCls}>Title</label><input className={inputCls} value={achForm.title} onChange={e => setAchForm(p => ({...p, title: e.target.value}))} /></div>
                  <div><label className={labelCls}>Detail</label><input className={inputCls} value={achForm.detail} onChange={e => setAchForm(p => ({...p, detail: e.target.value}))} /></div>
                </div>
                <button onClick={addAchievement} disabled={saving} className="px-5 py-2.5 bg-[#8B1A1A] text-white text-sm font-semibold rounded-xl hover:bg-[#A52A2A] transition-colors shadow-lg shadow-[#8B1A1A]/15 disabled:opacity-50">{saving ? 'Adding...' : 'Add Achievement'}</button>
                {achievements.length > 0 && (
                  <div className="mt-5 space-y-2 pt-5 border-t border-stone-100">
                    {achievements.map(a => (
                      <div key={a.id} className="flex items-center justify-between p-3 rounded-xl bg-[#f8f7f4]">
                        <div><p className="text-stone-800 text-sm">{a.title}</p>{a.detail && <p className="text-stone-400 text-xs">{a.detail}</p>}</div>
                        <button onClick={() => deleteAchievement(a.id)} className="text-stone-300 hover:text-red-500 text-sm transition-colors">Remove</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Certifications */}
              <div className={`${cardCls} p-8`}>
                <h3 className="text-lg font-serif text-stone-900 mb-6">Certifications</h3>
                <div className="flex gap-3 mb-4">
                  <input className={inputCls} placeholder="Certification name" value={certForm.certification} onChange={e => setCertForm(p => ({...p, certification: e.target.value}))} />
                  <button onClick={addCertification} disabled={saving} className="shrink-0 px-5 py-3 bg-[#8B1A1A] text-white text-sm font-semibold rounded-xl hover:bg-[#A52A2A] transition-colors shadow-lg shadow-[#8B1A1A]/15 disabled:opacity-50">Add</button>
                </div>
                {certifications.length > 0 && (
                  <div className="space-y-2 pt-4 border-t border-stone-100">
                    {certifications.map(c => (
                      <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-[#f8f7f4]">
                        <p className="text-stone-600 text-sm">{c.certification}</p>
                        <button onClick={() => deleteCertification(c.id)} className="text-stone-300 hover:text-red-500 text-sm transition-colors">Remove</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button onClick={saveProfile} disabled={saving} className="px-8 py-3.5 bg-[#8B1A1A] text-white text-sm font-semibold rounded-xl hover:bg-[#A52A2A] transition-colors shadow-lg shadow-[#8B1A1A]/15 disabled:opacity-50">{saving ? 'Saving...' : 'Save All Changes'}</button>
                <button onClick={saveSocial} disabled={saving} className="px-8 py-3.5 bg-white border border-stone-200 text-stone-700 text-sm font-semibold rounded-xl hover:bg-stone-50 transition-colors disabled:opacity-50">Save Social Links</button>
              </div>
            </div>
          )}

          {/* ===== OPPORTUNITIES PAGE ===== */}
          {activePage === 'opportunities' && designer && (
            <DesignerOpportunities designerId={designer.id} />
          )}

          {/* ===== ACCOUNT SETTINGS PAGE ===== */}
          {activePage === 'account' && (
            <div className="space-y-8 max-w-5xl mx-auto">
              <div>
                <h1 className="text-3xl font-serif text-stone-900 tracking-tight">Account Settings</h1>
                <p className="text-stone-500 mt-1">Manage your account security and preferences.</p>
              </div>

              {/* Change Password */}
              <div className={`${cardCls} p-8`}>
                <h3 className="text-lg font-serif text-stone-900 mb-6">Change Password</h3>
                <div className="max-w-md space-y-5">
                  <div><label className={labelCls}>Current Password</label><input type="password" className={inputCls} value={pwForm.current} onChange={e => setPwForm(p => ({...p, current: e.target.value}))} /></div>
                  <div><label className={labelCls}>New Password</label><input type="password" className={inputCls} value={pwForm.newPw} onChange={e => setPwForm(p => ({...p, newPw: e.target.value}))} /></div>
                  <div><label className={labelCls}>Confirm New Password</label><input type="password" className={inputCls} value={pwForm.confirm} onChange={e => setPwForm(p => ({...p, confirm: e.target.value}))} /></div>
                  {pwError && <p className="text-red-500 text-sm">{pwError}</p>}
                  <button onClick={changePassword} disabled={saving} className="px-6 py-3 bg-stone-900 text-white text-sm font-semibold rounded-xl hover:bg-stone-800 transition-colors disabled:opacity-50">{saving ? 'Updating...' : 'Update Password'}</button>
                </div>
              </div>

              {/* Delete Account */}
              <div className="bg-red-50 border border-red-100 rounded-2xl p-8">
                <h3 className="text-lg font-serif text-red-900 mb-2">Delete Account</h3>
                <p className="text-red-700/70 text-sm mb-6 max-w-lg">Permanently delete your account and all associated data. This action cannot be undone.</p>
                {showDeleteConfirm ? (
                  <div className="space-y-4">
                    <p className="text-red-800 text-sm font-medium">Type <span className="font-mono bg-red-100 px-1.5 py-0.5 rounded">DELETE</span> to confirm:</p>
                    <div className="flex gap-3 max-w-md">
                      <input className={inputCls + ' border-red-200 focus:border-red-500 focus:ring-red-500/10'} value={deleteConfirmText} onChange={e => setDeleteConfirmText(e.target.value)} placeholder="Type DELETE" />
                      <button onClick={deleteAccount} disabled={deleteConfirmText !== 'DELETE' || saving} className="shrink-0 px-6 py-3 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50">{saving ? 'Deleting...' : 'Delete'}</button>
                      <button onClick={() => { setShowDeleteConfirm(false); setDeleteConfirmText('') }} className="shrink-0 px-6 py-3 bg-white border border-red-200 text-red-700 text-sm font-medium rounded-xl hover:bg-red-50 transition-colors">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setShowDeleteConfirm(true)} className="px-6 py-3 bg-white border border-red-200 text-red-600 text-sm font-semibold rounded-xl hover:bg-red-50 transition-colors">Delete My Account</button>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default DesignerDashboard
