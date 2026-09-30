import { useState } from 'react'
import type { NewsletterSubscription } from '../../types/database'
import { useTableSearch, usePagination, TableToolbar, Pagination, exportToCSV } from './shared'

interface NewsletterTableProps {
  data: NewsletterSubscription[]
  onDelete: (id: string) => void
  onBulkDelete: (ids: string[]) => void
}

const NewsletterTable = ({ data, onDelete, onBulkDelete }: NewsletterTableProps) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const { searchQuery, setSearchQuery, filtered } = useTableSearch(data, ['email'])
  const { page, setPage, pageSize, setPageSize, paginated } = usePagination(filtered)

  const toggleSelect = (id: string) => { setSelectedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n }) }
  const toggleAll = () => { if (selectedIds.size === paginated.length) setSelectedIds(new Set()); else setSelectedIds(new Set(paginated.map(i => i.id))) }

  const handleExport = () => {
    exportToCSV(filtered.map(i => ({ email: i.email, created_at: i.created_at })), 'newsletter_subscribers.csv')
  }

  if (data.length === 0) return <p className="text-center text-neutral-400 py-12">No newsletter subscriptions yet</p>

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden">
      <TableToolbar
        searchQuery={searchQuery} onSearchChange={setSearchQuery}
        searchPlaceholder="Search by email..."
        selectedCount={selectedIds.size}
        onDeleteSelected={() => { onBulkDelete(Array.from(selectedIds)); setSelectedIds(new Set()) }}
        onExport={handleExport} total={data.length} filtered={filtered.length}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-800">
          <thead className="bg-neutral-950">
            <tr>
              <th className="px-4 py-4 w-8"><input type="checkbox" checked={paginated.length > 0 && selectedIds.size === paginated.length} onChange={toggleAll} className="rounded border-neutral-600 bg-neutral-800 text-[#bb9457] focus:ring-[#bb9457]/20" /></th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-neutral-900 divide-y divide-neutral-800">
            {paginated.map((item) => (
              <tr key={item.id} className={`hover:bg-neutral-800/50 transition-colors ${selectedIds.has(item.id) ? 'bg-[#bb9457]/5' : ''}`}>
                <td className="px-4 py-4"><input type="checkbox" checked={selectedIds.has(item.id)} onChange={() => toggleSelect(item.id)} className="rounded border-neutral-600 bg-neutral-800 text-[#bb9457] focus:ring-[#bb9457]/20" /></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">{new Date(item.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button onClick={() => onDelete(item.id)} className="text-red-400 hover:text-red-300 font-medium transition-colors">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} onPageSizeChange={setPageSize} />
    </div>
  )
}

export default NewsletterTable
