import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { BlogPost, BlogCategory } from '../types/database'

type StatusFilter = 'all' | 'draft' | 'published' | 'archived'

const BlogAdmin = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    checkAuth()
    fetchData()
  }, [statusFilter])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      navigate('/admin/login')
    }
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      // Fetch categories
      const { data: cats } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name')
      setCategories(cats || [])

      // Fetch posts
      let query = supabase
        .from('blog_posts')
        .select('*, category:blog_categories(id, name, slug)')
        .order('created_at', { ascending: false })

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter)
      }

      const { data, error } = await query
      if (error) throw error
      setPosts(data || [])
    } catch (err) {
      console.error('Error fetching blog data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handlePublish = async (id: string) => {
    try {
      await supabase
        .from('blog_posts')
        .update({ status: 'published', published_at: new Date().toISOString() })
        .eq('id', id)
      fetchData()
    } catch (err) {
      console.error('Error publishing post:', err)
    }
  }

  const handleArchive = async (id: string) => {
    try {
      await supabase
        .from('blog_posts')
        .update({ status: 'archived' })
        .eq('id', id)
      fetchData()
    } catch (err) {
      console.error('Error archiving post:', err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    try {
      await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)
      fetchData()
    } catch (err) {
      console.error('Error deleting post:', err)
    }
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    const styles = {
      draft: 'bg-neutral-700 text-neutral-300',
      published: 'bg-green-900/50 text-green-400',
      archived: 'bg-orange-900/50 text-orange-400'
    }
    return styles[status as keyof typeof styles] || styles.draft
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard" className="text-neutral-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-xl font-serif tracking-wide">Blog Management</h1>
          </div>
          <Link
            to="/admin/blog/new"
            className="px-4 py-2 bg-[#bb9457] text-black text-sm font-semibold uppercase tracking-wider hover:bg-white transition-colors"
          >
            + New Post
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Status Filter */}
          <div className="flex gap-2">
            {(['all', 'draft', 'published', 'archived'] as StatusFilter[]).map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 text-sm uppercase tracking-wider transition-colors ${
                  statusFilter === status
                    ? 'bg-[#bb9457] text-black'
                    : 'bg-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-[#bb9457]"
          />
        </div>

        {/* Posts List */}
        {loading ? (
          <div className="text-center py-20 text-neutral-500">Loading posts...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-500 mb-4">No posts found</p>
            <Link to="/admin/blog/new" className="text-[#bb9457] hover:underline">
              Create your first post
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map(post => (
              <div
                key={post.id}
                className="bg-neutral-900 border border-neutral-800 p-4 sm:p-6 hover:border-neutral-700 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-0.5 text-xs uppercase tracking-wider ${getStatusBadge(post.status)}`}>
                        {post.status}
                      </span>
                      {post.category && (
                        <span className="text-xs text-neutral-500">{post.category.name}</span>
                      )}
                    </div>
                    <h3 className="text-lg font-medium truncate">{post.title}</h3>
                    {post.excerpt && (
                      <p className="text-sm text-neutral-400 mt-1 line-clamp-1">{post.excerpt}</p>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-xs text-neutral-500">
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      <span>{post.reading_time} min read</span>
                      <span>{post.views} views</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      to={`/admin/blog/edit/${post.id}`}
                      className="px-3 py-1.5 text-xs bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors"
                    >
                      Edit
                    </Link>
                    {post.status === 'draft' && (
                      <button
                        onClick={() => handlePublish(post.id)}
                        className="px-3 py-1.5 text-xs bg-green-900/50 text-green-400 hover:bg-green-900 transition-colors"
                      >
                        Publish
                      </button>
                    )}
                    {post.status === 'published' && (
                      <button
                        onClick={() => handleArchive(post.id)}
                        className="px-3 py-1.5 text-xs bg-orange-900/50 text-orange-400 hover:bg-orange-900 transition-colors"
                      >
                        Archive
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="px-3 py-1.5 text-xs bg-red-900/50 text-red-400 hover:bg-red-900 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-neutral-900 border border-neutral-800 p-4 text-center">
            <div className="text-2xl font-serif text-[#bb9457]">{posts.length}</div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Total Posts</div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-4 text-center">
            <div className="text-2xl font-serif text-green-400">{posts.filter(p => p.status === 'published').length}</div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Published</div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-4 text-center">
            <div className="text-2xl font-serif text-neutral-400">{posts.filter(p => p.status === 'draft').length}</div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Drafts</div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-4 text-center">
            <div className="text-2xl font-serif text-[#bb9457]">{categories.length}</div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Categories</div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default BlogAdmin
