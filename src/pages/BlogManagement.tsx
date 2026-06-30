import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { BlogPost, BlogCategory } from '../types/database'

type StatusFilter = 'all' | 'draft' | 'published' | 'archived'

// ── Icon helper ──
const Ic = ({ name, className = 'w-4 h-4' }: { name: string; className?: string }) => {
  const icons: Record<string, ReactNode> = {
    plus: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
    edit: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    trash: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    check: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
    archive: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>,
    copy: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    search: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    image: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    tag: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" /></svg>,
    x: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
    eye: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
    folder: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>,
  }
  return <>{icons[name] || null}</>
}

// ══════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════
const BlogManagement = () => {
  const [posts, setPosts] = useState<(BlogPost & { category?: BlogCategory | null })[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [showCategoryManager, setShowCategoryManager] = useState(false)
  const [showMediaLibrary, setShowMediaLibrary] = useState(false)

  useEffect(() => { fetchData() }, [statusFilter])

  const fetchData = async () => {
    setLoading(true)
    try {
      const { data: cats } = await supabase.from('blog_categories').select('*').order('name')
      setCategories(cats || [])
      let query = supabase
        .from('blog_posts')
        .select('*, category:blog_categories(id, name, slug)')
        .order('created_at', { ascending: false })
      if (statusFilter !== 'all') query = query.eq('status', statusFilter)
      const { data } = await query
      setPosts(data || [])
    } catch (err) {
      console.error('Error fetching blog data:', err)
    } finally {
      setLoading(false)
    }
  }

  // ── Single post actions ──
  const handlePublish = async (id: string) => {
    await supabase.from('blog_posts').update({ status: 'published', published_at: new Date().toISOString() }).eq('id', id)
    fetchData()
  }
  const handleUnpublish = async (id: string) => {
    await supabase.from('blog_posts').update({ status: 'draft' }).eq('id', id)
    fetchData()
  }
  const handleArchive = async (id: string) => {
    await supabase.from('blog_posts').update({ status: 'archived' }).eq('id', id)
    fetchData()
  }
  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post? This cannot be undone.')) return
    await supabase.from('blog_posts').delete().eq('id', id)
    fetchData()
  }
  const handleDuplicate = async (post: BlogPost) => {
    const { error } = await supabase.from('blog_posts').insert({
      title: `${post.title} (Copy)`,
      slug: `${post.slug}-copy-${Date.now()}`,
      excerpt: post.excerpt,
      content: post.content,
      featured_image_url: post.featured_image_url,
      banner_image_url: post.banner_image_url,
      category_id: post.category_id,
      author_name: post.author_name,
      status: 'draft',
      reading_time: post.reading_time,
      tags: post.tags,
      meta_title: post.meta_title,
      meta_description: post.meta_description,
    })
    if (!error) fetchData()
  }

  // ── Quick edit ──
  const handleQuickStatus = async (id: string, status: string) => {
    const update: Record<string, unknown> = { status }
    if (status === 'published') update.published_at = new Date().toISOString()
    await supabase.from('blog_posts').update(update).eq('id', id)
    fetchData()
  }
  const handleQuickCategory = async (id: string, categoryId: string) => {
    await supabase.from('blog_posts').update({ category_id: categoryId || null }).eq('id', id)
    fetchData()
  }

  // ── Bulk actions ──
  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }
  const toggleSelectAll = () => {
    if (selectedIds.size === filteredPosts.length) setSelectedIds(new Set())
    else setSelectedIds(new Set(filteredPosts.map(p => p.id)))
  }
  const bulkPublish = async () => {
    if (!confirm(`Publish ${selectedIds.size} posts?`)) return
    await supabase.from('blog_posts').update({ status: 'published', published_at: new Date().toISOString() }).in('id', [...selectedIds])
    setSelectedIds(new Set())
    fetchData()
  }
  const bulkArchive = async () => {
    if (!confirm(`Archive ${selectedIds.size} posts?`)) return
    await supabase.from('blog_posts').update({ status: 'archived' }).in('id', [...selectedIds])
    setSelectedIds(new Set())
    fetchData()
  }
  const bulkDelete = async () => {
    if (!confirm(`Delete ${selectedIds.size} posts? This cannot be undone.`)) return
    await supabase.from('blog_posts').delete().in('id', [...selectedIds])
    setSelectedIds(new Set())
    fetchData()
  }

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === 'published').length,
    drafts: posts.filter(p => p.status === 'draft').length,
    archived: posts.filter(p => p.status === 'archived').length,
    totalViews: posts.reduce((sum, p) => sum + (p.views || 0), 0),
  }

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-white">Blog Posts</h2>
          <p className="text-sm text-neutral-500 mt-1">{stats.total} posts &middot; {stats.published} published &middot; {stats.totalViews} total views</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowCategoryManager(true)} className="px-3 py-2 text-xs bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors flex items-center gap-1.5">
            <Ic name="folder" /> Categories
          </button>
          <button onClick={() => setShowMediaLibrary(true)} className="px-3 py-2 text-xs bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors flex items-center gap-1.5">
            <Ic name="image" /> Media
          </button>
          <Link to="/admin/blog/new" className="px-4 py-2 bg-[#bb9457] text-black text-xs font-semibold uppercase tracking-wider hover:bg-white transition-colors flex items-center gap-1.5">
            <Ic name="plus" /> New Post
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-1">
          {(['all', 'draft', 'published', 'archived'] as StatusFilter[]).map(s => (
            <button key={s} onClick={() => { setStatusFilter(s); setSelectedIds(new Set()) }}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${statusFilter === s ? 'bg-[#bb9457] text-black' : 'bg-neutral-800 text-neutral-400 hover:text-white'}`}>
              {s}
            </button>
          ))}
        </div>
        <div className="relative flex-1">
          <Ic name="search" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input type="text" placeholder="Search posts..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-neutral-800 border border-neutral-700 text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-[#bb9457]" />
        </div>
      </div>

      {/* Bulk action bar */}
      {selectedIds.size > 0 && (
        <div className="bg-[#bb9457]/10 border border-[#bb9457]/30 px-4 py-3 flex items-center justify-between">
          <span className="text-sm text-[#bb9457]">{selectedIds.size} selected</span>
          <div className="flex gap-2">
            <button onClick={bulkPublish} className="px-3 py-1 text-xs bg-green-900/50 text-green-400 hover:bg-green-900 transition-colors">Publish</button>
            <button onClick={bulkArchive} className="px-3 py-1 text-xs bg-orange-900/50 text-orange-400 hover:bg-orange-900 transition-colors">Archive</button>
            <button onClick={bulkDelete} className="px-3 py-1 text-xs bg-red-900/50 text-red-400 hover:bg-red-900 transition-colors">Delete</button>
          </div>
        </div>
      )}

      {/* Posts list */}
      {loading ? (
        <div className="text-center py-16 text-neutral-500">Loading posts...</div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-neutral-500 mb-3">No posts found</p>
          <Link to="/admin/blog/new" className="text-[#bb9457] hover:underline text-sm">Create your first post</Link>
        </div>
      ) : (
        <div className="bg-neutral-900 border border-neutral-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-950">
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" checked={selectedIds.size === filteredPosts.length && filteredPosts.length > 0} onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-neutral-600 bg-neutral-800 text-[#bb9457] focus:ring-0 focus:ring-offset-0" />
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Post</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider hidden lg:table-cell">Status</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider hidden lg:table-cell">Views</th>
                <th className="px-4 py-3 text-right text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {filteredPosts.map(post => (
                <PostRow
                  key={post.id}
                  post={post}
                  categories={categories}
                  selected={selectedIds.has(post.id)}
                  onToggleSelect={() => toggleSelect(post.id)}
                  onPublish={() => handlePublish(post.id)}
                  onUnpublish={() => handleUnpublish(post.id)}
                  onArchive={() => handleArchive(post.id)}
                  onDelete={() => handleDelete(post.id)}
                  onDuplicate={() => handleDuplicate(post)}
                  onQuickStatus={s => handleQuickStatus(post.id, s)}
                  onQuickCategory={c => handleQuickCategory(post.id, c)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      {showCategoryManager && (
        <CategoryManagerModal categories={categories} onClose={() => { setShowCategoryManager(false); fetchData() }} />
      )}
      {showMediaLibrary && (
        <MediaLibraryModal onClose={() => setShowMediaLibrary(false)} />
      )}
    </div>
  )
}

// ══════════════════════════════════════════
// POST ROW
// ══════════════════════════════════════════
const PostRow = ({ post, categories, selected, onToggleSelect, onPublish, onUnpublish, onArchive, onDelete, onDuplicate, onQuickStatus, onQuickCategory }: {
  post: BlogPost & { category?: BlogCategory | null }
  categories: BlogCategory[]
  selected: boolean
  onToggleSelect: () => void
  onPublish: () => void
  onUnpublish: () => void
  onArchive: () => void
  onDelete: () => void
  onDuplicate: () => void
  onQuickStatus: (s: string) => void
  onQuickCategory: (c: string) => void
}) => {
  const [showActions, setShowActions] = useState(false)

  return (
    <tr className="hover:bg-neutral-800/50 transition-colors">
      <td className="px-4 py-3">
        <input type="checkbox" checked={selected} onChange={onToggleSelect}
          className="w-4 h-4 rounded border-neutral-600 bg-neutral-800 text-[#bb9457] focus:ring-0 focus:ring-offset-0" />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          {post.featured_image_url ? (
            <img src={post.featured_image_url} alt="" className="w-10 h-10 object-cover flex-shrink-0 hidden sm:block" />
          ) : (
            <div className="w-10 h-10 bg-neutral-800 flex-shrink-0 hidden sm:block flex items-center justify-center">
              <Ic name="image" className="w-4 h-4 text-neutral-600" />
            </div>
          )}
          <div className="min-w-0">
            <Link to={`/admin/blog/edit/${post.id}`} className="text-sm text-white font-medium hover:text-[#bb9457] transition-colors line-clamp-1 block">
              {post.title}
            </Link>
            {post.excerpt && <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5 hidden sm:block">{post.excerpt}</p>}
          </div>
        </div>
      </td>
      <td className="px-4 py-3 hidden md:table-cell">
        <select value={post.category_id || ''} onChange={e => onQuickCategory(e.target.value)}
          className="bg-transparent text-xs text-neutral-400 border border-transparent hover:border-neutral-700 focus:border-[#bb9457] focus:outline-none px-1 py-0.5 max-w-[140px]">
          <option value="">No category</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </td>
      <td className="px-4 py-3 hidden lg:table-cell">
        <select value={post.status} onChange={e => onQuickStatus(e.target.value)}
          className={`text-xs border border-transparent hover:border-neutral-700 focus:border-[#bb9457] focus:outline-none px-1 py-0.5 bg-transparent ${
            post.status === 'published' ? 'text-green-400' : post.status === 'archived' ? 'text-orange-400' : 'text-neutral-400'
          }`}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </td>
      <td className="px-4 py-3 text-xs text-neutral-500 hidden sm:table-cell whitespace-nowrap">
        {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      </td>
      <td className="px-4 py-3 text-xs text-neutral-500 hidden lg:table-cell">{post.views || 0}</td>
      <td className="px-4 py-3 text-right">
        <div className="relative">
          <button onClick={() => setShowActions(!showActions)}
            className="p-1 text-neutral-500 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
            </svg>
          </button>
          {showActions && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowActions(false)} />
              <div className="absolute right-0 top-8 bg-neutral-900 border border-neutral-700 shadow-xl z-50 min-w-[160px] py-1">
                <Link to={`/admin/blog/edit/${post.id}`} onClick={() => setShowActions(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors">
                  <Ic name="edit" /> Edit
                </Link>
                <button onClick={() => { onDuplicate(); setShowActions(false) }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors">
                  <Ic name="copy" /> Duplicate
                </button>
                <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" onClick={() => setShowActions(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors">
                  <Ic name="eye" /> View
                </a>
                <div className="border-t border-neutral-800 my-1" />
                {post.status === 'draft' && (
                  <button onClick={() => { onPublish(); setShowActions(false) }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-green-400 hover:bg-neutral-800 transition-colors">
                    <Ic name="check" /> Publish
                  </button>
                )}
                {post.status === 'published' && (
                  <button onClick={() => { onUnpublish(); setShowActions(false) }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-yellow-400 hover:bg-neutral-800 transition-colors">
                    Unpublish
                  </button>
                )}
                {post.status !== 'archived' && (
                  <button onClick={() => { onArchive(); setShowActions(false) }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-orange-400 hover:bg-neutral-800 transition-colors">
                    <Ic name="archive" /> Archive
                  </button>
                )}
                <div className="border-t border-neutral-800 my-1" />
                <button onClick={() => { onDelete(); setShowActions(false) }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-neutral-800 transition-colors">
                  <Ic name="trash" /> Delete
                </button>
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  )
}

// ══════════════════════════════════════════
// CATEGORY MANAGER MODAL
// ══════════════════════════════════════════
const CategoryManagerModal = ({ categories, onClose }: { categories: BlogCategory[]; onClose: () => void }) => {
  const [newName, setNewName] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editDesc, setEditDesc] = useState('')

  const generateSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const handleAdd = async () => {
    if (!newName.trim()) return
    await supabase.from('blog_categories').insert({ name: newName.trim(), slug: generateSlug(newName), description: newDesc || null })
    setNewName('')
    setNewDesc('')
    onClose()
  }
  const handleEdit = async (id: string) => {
    await supabase.from('blog_categories').update({ name: editName, description: editDesc || null }).eq('id', id)
    setEditingId(null)
    onClose()
  }
  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category? Posts in this category will become uncategorized.')) return
    await supabase.from('blog_categories').delete().eq('id', id)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-neutral-900 border border-neutral-800 max-w-lg w-full max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <h3 className="text-lg font-serif text-white">Manage Categories</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-white"><Ic name="x" className="w-5 h-5" /></button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[50vh] space-y-3">
          {categories.map(cat => (
            <div key={cat.id} className="bg-neutral-950/50 border border-neutral-800 p-3 flex items-center gap-3">
              {editingId === cat.id ? (
                <>
                  <input value={editName} onChange={e => setEditName(e.target.value)}
                    className="flex-1 px-2 py-1 bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:border-[#bb9457]" />
                  <input value={editDesc} onChange={e => setEditDesc(e.target.value)} placeholder="Description"
                    className="flex-1 px-2 py-1 bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:border-[#bb9457]" />
                  <button onClick={() => handleEdit(cat.id)} className="text-green-400 hover:text-green-300 text-xs font-semibold">Save</button>
                  <button onClick={() => setEditingId(null)} className="text-neutral-500 hover:text-white text-xs">Cancel</button>
                </>
              ) : (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium">{cat.name}</p>
                    {cat.description && <p className="text-xs text-neutral-500 line-clamp-1">{cat.description}</p>}
                  </div>
                  <button onClick={() => { setEditingId(cat.id); setEditName(cat.name); setEditDesc(cat.description || '') }}
                    className="text-neutral-400 hover:text-white text-xs">Edit</button>
                  <button onClick={() => handleDelete(cat.id)} className="text-red-400 hover:text-red-300 text-xs">Delete</button>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="p-6 border-t border-neutral-800 space-y-3">
          <p className="text-xs text-neutral-500 uppercase tracking-wider">Add New Category</p>
          <div className="flex gap-2">
            <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Category name"
              className="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-700 text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-[#bb9457]" />
            <input value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Description (optional)"
              className="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-700 text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-[#bb9457]" />
            <button onClick={handleAdd} disabled={!newName.trim()}
              className="px-4 py-2 bg-[#bb9457] text-black text-xs font-semibold uppercase tracking-wider hover:bg-white disabled:opacity-50 transition-colors">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════
// MEDIA LIBRARY MODAL
// ══════════════════════════════════════════
const MediaLibraryModal = ({ onClose }: { onClose: () => void }) => {
  const [images, setImages] = useState<{ name: string; path: string; url: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchImages() }, [])

  const fetchImages = async () => {
    try {
      const { data } = await supabase.storage.from('blog-images').list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } })
      if (data) {
        const imgs = data.filter(f => f.name !== '.emptyFolderPlaceholder').map(f => {
          const { data: { publicUrl } } = supabase.storage.from('blog-images').getPublicUrl(f.name)
          return { name: f.name, path: f.name, url: publicUrl }
        })
        setImages(imgs)
      }
    } catch (err) {
      console.error('Error fetching images:', err)
    } finally {
      setLoading(false)
    }
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-neutral-900 border border-neutral-800 max-w-4xl w-full max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <h3 className="text-lg font-serif text-white">Media Library</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-white"><Ic name="x" className="w-5 h-5" /></button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="text-center py-12 text-neutral-500">Loading images...</div>
          ) : images.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-500 mb-2">No images uploaded yet</p>
              <p className="text-xs text-neutral-600">Upload images through the blog editor</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map(img => (
                <div key={img.path} className="group bg-neutral-950 border border-neutral-800 overflow-hidden hover:border-[#bb9457] transition-colors cursor-pointer"
                  onClick={() => copyUrl(img.url)}>
                  <div className="aspect-square overflow-hidden">
                    <img src={img.url} alt={img.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-2">
                    <p className="text-[10px] text-neutral-500 truncate">{img.name}</p>
                    <p className="text-[10px] text-[#bb9457] opacity-0 group-hover:opacity-100 transition-opacity">Click to copy URL</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogManagement
