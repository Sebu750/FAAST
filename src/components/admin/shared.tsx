import { useState, useEffect, useRef, type ReactNode } from 'react'

// ── Shared Types ──

export interface DashboardCounts {
  inquiries_today: number
  spotlight_pending: number
  spotlight_total: number
  marketplace_total: number
  marketplace_pending: number
  studio_waitlist_total: number
  partnership_total: number
  partnership_pending: number
  newsletter_total: number
  blog_total: number
  blog_published: number
  blog_drafts: number
  designers_total: number
  designers_active: number
  // Weekly deltas (new items in last 7 days)
  spotlight_week: number
  marketplace_week: number
  studio_week: number
  partnership_week: number
  contact_week: number
  newsletter_week: number
}

// ── Icon Component ──

export const Icon = ({ name, className = '', color = '' }: { name: string; className?: string; color?: string }) => {
  const icons: Record<string, ReactNode> = {
    'grid': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
    'star': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
    'mail': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    'message-square': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    'handshake': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    'file-text': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    'shopping-bag': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
    'palette': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
    'calendar': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    'award': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>,
    'trending-up': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    'newspaper': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>,
    'users': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    'arrow-up': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>,
    'arrow-down': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>,
    'external-link': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>,
    'plus': <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
  }

  return <span className={color}>{icons[name] || null}</span>
}

// ── Helpers ──

export const parseContactMessage = (message: string) => {
  const phoneMatch = message.match(/^Phone:\s*(.+)$/m)
  const roleMatch = message.match(/^Role:\s*(.+)$/m)
  const subjectMatch = message.match(/^Subject:\s*(.+)$/m)
  const bodyMatch = message.match(/^Subject:.+\n*\n*([\s\S]*)$/m)
  return {
    phone: phoneMatch?.[1]?.trim() || '',
    role: roleMatch?.[1]?.trim() || '',
    subject: subjectMatch?.[1]?.trim() || '',
    body: bodyMatch?.[1]?.trim() || message
  }
}

export const exportToCSV = (rows: Record<string, any>[], filename: string) => {
  if (rows.length === 0) return
  const headers = Object.keys(rows[0])
  const escape = (val: any) => {
    const str = val == null ? '' : String(val)
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return '"' + str.replace(/"/g, '""') + '"'
    }
    return str
  }
  const csv = [
    headers.join(','),
    ...rows.map(row => headers.map(h => escape(row[h])).join(','))
  ].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

// ── Status Badge ──

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30',
  reviewed: 'bg-blue-600/20 text-blue-400 border-blue-600/30',
  shortlisted: 'bg-purple-600/20 text-purple-400 border-purple-600/30',
  finalist: 'bg-[#bb9457]/20 text-[#bb9457] border-[#bb9457]/30',
  accepted: 'bg-green-600/20 text-green-400 border-green-600/30',
  approved: 'bg-green-600/20 text-green-400 border-green-600/30',
  rejected: 'bg-red-600/20 text-red-400 border-red-600/30',
  under_review: 'bg-blue-600/20 text-blue-400 border-blue-600/30',
  waiting: 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30',
  contacted: 'bg-blue-600/20 text-blue-400 border-blue-600/30',
  tour_scheduled: 'bg-purple-600/20 text-purple-400 border-purple-600/30',
  enrolled: 'bg-green-600/20 text-green-400 border-green-600/30',
}

export const StatusBadge = ({ status }: { status: string }) => (
  <span className={`px-3 py-1 rounded-sm text-xs uppercase tracking-wider border ${statusColors[status] || 'bg-neutral-600/20 text-neutral-400 border-neutral-600/30'}`}>
    {status.replace('_', ' ')}
  </span>
)

// ── Table Toolbar (search + status filter + export + bulk actions) ──

interface TableToolbarProps {
  searchQuery: string
  onSearchChange: (q: string) => void
  searchPlaceholder?: string
  statusFilter?: string
  onStatusFilterChange?: (s: string) => void
  statusOptions?: { value: string; label: string }[]
  selectedCount?: number
  onDeleteSelected?: () => void
  onExport?: () => void
  total: number
  filtered: number
}

export const TableToolbar = ({
  searchQuery,
  onSearchChange,
  searchPlaceholder = 'Search...',
  statusFilter,
  onStatusFilterChange,
  statusOptions,
  selectedCount = 0,
  onDeleteSelected,
  onExport,
  total,
  filtered,
}: TableToolbarProps) => (
  <div className="p-4 sm:p-6 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center gap-3">
    {/* Search */}
    <div className="relative flex-1 max-w-md">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={searchPlaceholder}
        className="w-full bg-neutral-950/80 border border-neutral-800 rounded-sm pl-10 pr-4 py-2 text-sm text-white placeholder-neutral-600 focus:border-[#bb9457]/60 focus:ring-1 focus:ring-[#bb9457]/20 focus:outline-none transition-all"
      />
    </div>

    {/* Status filter */}
    {statusOptions && onStatusFilterChange && (
      <select
        value={statusFilter || 'all'}
        onChange={(e) => onStatusFilterChange(e.target.value)}
        className="bg-neutral-950/80 border border-neutral-800 rounded-sm px-3 py-2 text-sm text-white focus:border-[#bb9457]/60 focus:outline-none appearance-none pr-8 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_10px_center] bg-no-repeat"
      >
        <option value="all">All Status</option>
        {statusOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    )}

    {/* Count */}
    <span className="text-xs text-neutral-500">
      {filtered === total ? `${total} total` : `${filtered} of ${total}`}
    </span>

    {/* Actions */}
    <div className="flex items-center gap-2 ml-auto">
      {selectedCount > 0 && onDeleteSelected && (
        <button
          onClick={onDeleteSelected}
          className="px-3 py-2 text-xs font-medium bg-red-600/20 text-red-400 border border-red-600/30 rounded-sm hover:bg-red-600/30 transition-colors"
        >
          Delete Selected ({selectedCount})
        </button>
      )}
      {onExport && (
        <button
          onClick={onExport}
          className="px-3 py-2 text-xs font-medium bg-neutral-800 text-neutral-300 border border-neutral-700 rounded-sm hover:bg-neutral-700 transition-colors"
        >
          Export CSV
        </button>
      )}
    </div>
  </div>
)

// ── Pagination ──

interface PaginationProps {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

export const Pagination = ({ page, pageSize, total, onPageChange, onPageSizeChange }: PaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  if (total === 0) return null

  return (
    <div className="px-4 sm:px-6 py-4 border-t border-neutral-800 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xs text-neutral-500">Rows per page:</span>
        <select
          value={pageSize}
          onChange={(e) => { onPageSizeChange(Number(e.target.value)); onPageChange(1) }}
          className="bg-neutral-950 border border-neutral-800 rounded-sm px-2 py-1 text-xs text-white focus:outline-none"
        >
          {[25, 50, 100].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-neutral-500">
          {page * pageSize + 1}-{Math.min((page + 1) * pageSize, total)} of {total}
        </span>
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
          className="px-2 py-1 text-xs text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Prev
        </button>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages - 1}
          className="px-2 py-1 text-xs text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  )
}

// ── useTableSearch hook ──

export function useTableSearch<T>(items: T[], searchFields: (keyof T)[]) {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedQuery(searchQuery), 300)
    return () => clearTimeout(timerRef.current)
  }, [searchQuery])

  const filtered = items.filter(item => {
    if (!debouncedQuery) return true
    const q = debouncedQuery.toLowerCase()
    return searchFields.some(field => {
      const val = item[field]
      return val != null && String(val).toLowerCase().includes(q)
    })
  })

  return { searchQuery, setSearchQuery, filtered, debouncedQuery }
}

// ── usePagination hook ──

export function usePagination<T>(items: T[]) {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(25)

  const paginated = items.slice(page * pageSize, (page + 1) * pageSize)

  // Reset to page 0 when items change significantly
  useEffect(() => {
    if (page > 0 && page * pageSize >= items.length) {
      setPage(0)
    }
  }, [items.length, page, pageSize])

  return { page, setPage, pageSize, setPageSize, paginated }
}
