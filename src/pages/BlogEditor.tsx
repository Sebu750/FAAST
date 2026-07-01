import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { BlogCategory } from '../types/database'
import RichTextEditor from '../components/RichTextEditor'
import '../styles/blog-content.css'

interface BlogFormData {
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image_url: string
  banner_image_url: string
  category_id: string
  author_name: string
  status: 'draft' | 'published' | 'archived'
  reading_time: number
  tags: string
  meta_title: string
  meta_description: string
  scheduled_at: string
}



const BlogEditor = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState<string | null>(null)
  const [preview, setPreview] = useState(false)
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [hasChanges, setHasChanges] = useState(false)

  const featuredInputRef = useRef<HTMLInputElement>(null)
  const bannerInputRef = useRef<HTMLInputElement>(null)
  const lastSavedRef = useRef<string>('')
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [form, setForm] = useState<BlogFormData>({
    title: '', slug: '', excerpt: '', content: '',
    featured_image_url: '', banner_image_url: '',
    category_id: '', author_name: 'Adorzia Team',
    status: 'draft', reading_time: 5, tags: '',
    meta_title: '', meta_description: '', scheduled_at: ''
  })

  // Get suggested tags based on selected category
  const selectedCategory = categories.find(c => c.id === form.category_id)
  const suggestedTags = selectedCategory?.tags || []

  useEffect(() => {
    checkAuth()
    fetchCategories()
    if (id) fetchPost()
    else setLoading(false)
    return () => { if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current) }
  }, [id])

  // Auto-save every 30 seconds
  useEffect(() => {
    if (!hasChanges || saving || loading) return
    autoSaveTimerRef.current = setTimeout(() => { handleAutoSave() }, 30000)
    return () => { if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current) }
  }, [hasChanges, form])

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (hasChanges) { e.preventDefault(); e.returnValue = '' }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [hasChanges])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) navigate('/admin/login')
  }

  const fetchCategories = async () => {
    const { data } = await supabase.from('blog_categories').select('*').order('name')
    setCategories(data || [])
  }

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single()
      if (error) throw error
      if (data) {
        const formData = {
          title: data.title || '', slug: data.slug || '', excerpt: data.excerpt || '',
          content: data.content || '', featured_image_url: data.featured_image_url || '',
          banner_image_url: data.banner_image_url || '', category_id: data.category_id || '',
          author_name: data.author_name || 'Adorzia Team', status: data.status || 'draft',
          reading_time: data.reading_time || 5, tags: (data.tags || []).join(', '),
          meta_title: data.meta_title || '', meta_description: data.meta_description || '',
          scheduled_at: data.published_at && new Date(data.published_at) > new Date() ? data.published_at : ''
        }
        setForm(formData)
        lastSavedRef.current = JSON.stringify(formData)
      }
    } catch (err) {
      console.error('Error fetching post:', err)
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => {
      const updated = { ...prev, [name]: value }
      if (name === 'title' && !prev.slug) updated.slug = generateSlug(value)
      return updated
    })
    setHasChanges(true)
    setAutoSaveStatus('idle')
  }

  const handleContentChange = (html: string) => {
    setForm(prev => ({ ...prev, content: html }))
    setHasChanges(true)
    setAutoSaveStatus('idle')
  }

  // ── Image uploads ──
  const handleImageUpload = async (file: File, type: 'featured' | 'banner') => {
    setUploading(type)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${type}/${Date.now()}.${fileExt}`
      const { data, error } = await supabase.storage.from('blog-images').upload(fileName, file, { cacheControl: '31536000', upsert: false })
      if (error) throw error
      const { data: { publicUrl } } = supabase.storage.from('blog-images').getPublicUrl(data.path)
      if (type === 'featured') setForm(prev => ({ ...prev, featured_image_url: publicUrl }))
      else if (type === 'banner') setForm(prev => ({ ...prev, banner_image_url: publicUrl }))
      setHasChanges(true)
    } catch (err) {
      console.error('Error uploading image:', err)
      alert('Failed to upload image. Make sure the blog-images bucket exists.')
    } finally {
      setUploading(null)
    }
  }

  // ── Save logic ──
  const buildPostData = (publishNow = false, scheduledDate?: string) => ({
    title: form.title,
    slug: form.slug,
    excerpt: form.excerpt || null,
    content: form.content,
    featured_image_url: form.featured_image_url || null,
    banner_image_url: form.banner_image_url || null,
    category_id: form.category_id || null,
    author_name: form.author_name,
    status: publishNow ? 'published' : form.status,
    published_at: publishNow ? new Date().toISOString() : scheduledDate || (form.status === 'published' ? new Date().toISOString() : null),
    reading_time: form.reading_time,
    tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    meta_title: form.meta_title || null,
    meta_description: form.meta_description || null
  })

  const handleSubmit = async (e: React.FormEvent, publishNow = false) => {
    e.preventDefault()
    setSaving(true)
    try {
      const scheduledDate = form.scheduled_at ? new Date(form.scheduled_at).toISOString() : undefined
      const postData = buildPostData(publishNow, scheduledDate)
      if (isEditing) {
        const { error } = await supabase.from('blog_posts').update(postData).eq('id', id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('blog_posts').insert(postData)
        if (error) throw error
      }
      lastSavedRef.current = JSON.stringify(form)
      setHasChanges(false)
      navigate('/admin/dashboard')
    } catch (err) {
      console.error('Error saving post:', err)
      alert('Failed to save post')
    } finally {
      setSaving(false)
    }
  }

  const handleAutoSave = async () => {
    if (!isEditing || saving) return
    const currentStr = JSON.stringify(form)
    if (currentStr === lastSavedRef.current) return
    setAutoSaveStatus('saving')
    try {
      const postData = buildPostData()
      const { error } = await supabase.from('blog_posts').update(postData).eq('id', id)
      if (error) throw error
      lastSavedRef.current = currentStr
      setAutoSaveStatus('saved')
      setHasChanges(false)
      setTimeout(() => setAutoSaveStatus('idle'), 3000)
    } catch {
      setAutoSaveStatus('error')
    }
  }

  // Word count
  const wordCount = form.content.split(/\s+/).filter(Boolean).length
  const charCount = form.content.length

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-neutral-500">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard" className="text-neutral-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-lg font-serif tracking-wide">{isEditing ? 'Edit Post' : 'New Post'}</h1>
            {autoSaveStatus !== 'idle' && (
              <span className={`text-xs px-2 py-0.5 ${
                autoSaveStatus === 'saving' ? 'text-yellow-400' : autoSaveStatus === 'saved' ? 'text-green-400' : 'text-red-400'
              }`}>
                {autoSaveStatus === 'saving' ? 'Saving...' : autoSaveStatus === 'saved' ? 'Auto-saved' : 'Save failed'}
              </span>
            )}
            {hasChanges && autoSaveStatus === 'idle' && (
              <span className="text-xs text-neutral-500">Unsaved changes</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPreview(!preview)}
              className={`px-3 py-1.5 text-xs transition-colors ${preview ? 'bg-[#bb9457] text-black' : 'bg-neutral-800 text-neutral-300 hover:text-white'}`}>
              {preview ? 'Edit' : 'Preview'}
            </button>
            <button onClick={(e) => handleSubmit(e)}
              disabled={saving || !form.title || !form.content}
              className="px-3 py-1.5 bg-neutral-700 text-white text-xs hover:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              {saving ? 'Saving...' : 'Save Draft'}
            </button>
            <button onClick={(e) => handleSubmit(e, true)}
              disabled={saving || !form.title || !form.content}
              className="px-3 py-1.5 bg-[#bb9457] text-black text-xs font-semibold hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              {saving ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {preview ? (
          /* Preview Mode */
          <article className="max-w-3xl mx-auto">
            {form.banner_image_url && <img src={form.banner_image_url} alt="" className="w-full h-64 object-cover mb-8" />}
            <h1 className="text-4xl font-serif mb-4">{form.title || 'Untitled Post'}</h1>
            {form.excerpt && <p className="text-xl text-neutral-400 mb-8">{form.excerpt}</p>}
            <div 
              className="prose prose-invert prose-adlorzia max-w-none"
              dangerouslySetInnerHTML={{ __html: form.content }}
            />
          </article>
        ) : (
          /* Edit Mode */
          <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-5">
              {/* Title */}
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">Title</label>
                <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Enter post title..."
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 text-white text-xl placeholder-neutral-600 focus:outline-none focus:border-[#bb9457]" />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">URL Slug</label>
                <input type="text" name="slug" value={form.slug} onChange={handleChange} placeholder="post-url-slug"
                  className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-600 focus:outline-none focus:border-[#bb9457] font-mono text-sm" />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">Excerpt</label>
                <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={2} placeholder="Brief description for listings..."
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-600 focus:outline-none focus:border-[#bb9457] resize-none" />
              </div>

              {/* Content - Rich Text Editor */}
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">Content</label>
                <RichTextEditor
                  content={form.content}
                  onChange={handleContentChange}
                  placeholder="Start writing your blog post... Use the toolbar above to format text, insert headings, lists, links, and images."
                />
                <div className="flex items-center justify-between text-[10px] text-neutral-600 mt-2 px-1">
                  <span>{wordCount} words &middot; {charCount} characters</span>
                  <span>Rich Text Editor</span>
                </div>
              </div>

              {/* Banner Image */}
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">Banner Image (Article Header)</label>
                <input ref={bannerInputRef} type="file" accept="image/*" className="hidden"
                  onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'banner')} />
                <div className="flex items-center gap-4">
                  {form.banner_image_url && <img src={form.banner_image_url} alt="" className="h-16 w-24 object-cover" />}
                  <button type="button" onClick={() => bannerInputRef.current?.click()} disabled={uploading === 'banner'}
                    className="px-3 py-1.5 bg-neutral-800 text-xs hover:bg-neutral-700 disabled:opacity-50 transition-colors">
                    {uploading === 'banner' ? 'Uploading...' : form.banner_image_url ? 'Replace Banner' : 'Upload Banner'}
                  </button>
                </div>
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">Featured Image (Card Thumbnail)</label>
                <input ref={featuredInputRef} type="file" accept="image/*" className="hidden"
                  onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'featured')} />
                <div className="flex items-center gap-4">
                  {form.featured_image_url && <img src={form.featured_image_url} alt="" className="h-16 w-16 object-cover" />}
                  <button type="button" onClick={() => featuredInputRef.current?.click()} disabled={uploading === 'featured'}
                    className="px-3 py-1.5 bg-neutral-800 text-xs hover:bg-neutral-700 disabled:opacity-50 transition-colors">
                    {uploading === 'featured' ? 'Uploading...' : form.featured_image_url ? 'Replace Image' : 'Upload Image'}
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Category */}
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">Category</label>
                <select name="category_id" value={form.category_id} onChange={handleChange}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-[#bb9457]">
                  <option value="">Select category...</option>
                  {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>

              {/* Author */}
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">Author Name</label>
                <input type="text" name="author_name" value={form.author_name} onChange={handleChange}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-[#bb9457]" />
              </div>

              {/* Reading Time */}
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">Reading Time (minutes)</label>
                <input type="number" name="reading_time" value={form.reading_time} onChange={handleChange} min="1"
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-[#bb9457]" />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">Tags (comma separated)</label>
                <input type="text" name="tags" value={form.tags} onChange={handleChange} placeholder="fashion, pakistan, startups"
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-[#bb9457]" />
                {suggestedTags.length > 0 && (
                  <div className="mt-2">
                    <p className="text-[10px] text-neutral-600 mb-1.5">Suggested for {selectedCategory?.name}:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {suggestedTags.map(tag => {
                        const currentTags = form.tags.split(',').map(t => t.trim()).filter(Boolean)
                        const isSelected = currentTags.includes(tag)
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => {
                              const newTags = isSelected
                                ? currentTags.filter(t => t !== tag)
                                : [...currentTags, tag]
                              setForm(prev => ({ ...prev, tags: newTags.join(', ') }))
                            }}
                            className={`px-2 py-0.5 text-[10px] rounded-sm transition-colors ${
                              isSelected
                                ? 'bg-[#bb9457] text-black'
                                : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white'
                            }`}
                          >
                            {tag}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Schedule */}
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">Schedule Publishing</label>
                <input type="datetime-local" name="scheduled_at" value={form.scheduled_at ? form.scheduled_at.slice(0, 16) : ''} onChange={handleChange}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-[#bb9457] [color-scheme:dark]" />
                {form.scheduled_at && (
                  <p className="text-[10px] text-neutral-500 mt-1">
                    Will publish: {new Date(form.scheduled_at).toLocaleString()}
                  </p>
                )}
              </div>

              {/* SEO */}
              <div className="border-t border-neutral-800 pt-5">
                <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">SEO Settings</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] text-neutral-600 mb-1">Meta Title</label>
                    <input type="text" name="meta_title" value={form.meta_title} onChange={handleChange} placeholder="SEO title (optional)"
                      className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-700 text-white text-xs placeholder-neutral-600 focus:outline-none focus:border-[#bb9457]" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-neutral-600 mb-1">Meta Description</label>
                    <textarea name="meta_description" value={form.meta_description} onChange={handleChange} rows={3} placeholder="SEO description (optional)"
                      className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-700 text-white text-xs placeholder-neutral-600 focus:outline-none focus:border-[#bb9457] resize-none" />
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  )
}

export default BlogEditor
