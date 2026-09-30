import { useState } from 'react'
import type { PartnershipInquiry } from '../../types/database'
import { useTableSearch, usePagination, TableToolbar, Pagination, exportToCSV } from './shared'

interface PartnershipTableProps {
  data: PartnershipInquiry[]
  onDelete: (id: string) => void
  onBulkDelete: (ids: string[]) => void
}

const PartnershipTable = ({ data, onDelete, onBulkDelete }: PartnershipTableProps) => {
  const [selectedItem, setSelectedItem] = useState<PartnershipInquiry | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const { searchQuery, setSearchQuery, filtered } = useTableSearch(data, ['company_name', 'contact_name', 'email', 'message'])
  const { page, setPage, pageSize, setPageSize, paginated } = usePagination(filtered)

  const toggleSelect = (id: string) => { setSelectedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n }) }
  const toggleAll = () => { if (selectedIds.size === paginated.length) setSelectedIds(new Set()); else setSelectedIds(new Set(paginated.map(i => i.id))) }

  const handleExport = () => {
    exportToCSV(filtered.map(i => ({
      company: i.company_name, contact: i.contact_name, email: i.email,
      phone: i.phone, created_at: i.created_at,
    })), 'partnership_inquiries.csv')
  }

  if (data.length === 0) return <p className="text-center text-neutral-400 py-12">No partnership inquiries yet</p>

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-sm">
      <TableToolbar
        searchQuery={searchQuery} onSearchChange={setSearchQuery}
        searchPlaceholder="Search by company, contact, email..."
        selectedCount={selectedIds.size}
        onDeleteSelected={() => { onBulkDelete(Array.from(selectedIds)); setSelectedIds(new Set()) }}
        onExport={handleExport} total={data.length} filtered={filtered.length}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-800">
          <thead className="bg-neutral-950">
            <tr>
              <th className="px-4 py-4 w-8"><input type="checkbox" checked={paginated.length > 0 && selectedIds.size === paginated.length} onChange={toggleAll} className="rounded border-neutral-600 bg-neutral-800 text-[#bb9457] focus:ring-[#bb9457]/20" /></th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Company</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Message</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-neutral-900 divide-y divide-neutral-800">
            {paginated.map((item) => (
              <tr key={item.id} className={`hover:bg-neutral-800/50 transition-colors ${selectedIds.has(item.id) ? 'bg-[#bb9457]/5' : ''}`}>
                <td className="px-4 py-4"><input type="checkbox" checked={selectedIds.has(item.id)} onChange={() => toggleSelect(item.id)} className="rounded border-neutral-600 bg-neutral-800 text-[#bb9457] focus:ring-[#bb9457]/20" /></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">{item.company_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">{item.contact_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">{item.email}</td>
                <td className="px-6 py-4 text-sm text-neutral-300 max-w-md line-clamp-2">{item.message}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">{new Date(item.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button onClick={() => setSelectedItem(item)} className="text-[#bb9457] hover:text-white font-medium transition-colors mr-4">View</button>
                  <button onClick={() => onDelete(item.id)} className="text-red-400 hover:text-red-300 font-medium transition-colors">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} onPageSizeChange={setPageSize} />

      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
          <div className="bg-neutral-900 border border-neutral-800 rounded-sm max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">Partnership Inquiry Details</h3>
              <button onClick={() => setSelectedItem(null)} className="text-neutral-400 hover:text-white text-2xl">&times;</button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Company</label><p className="text-white mt-1">{selectedItem.company_name}</p></div>
                <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Contact</label><p className="text-white mt-1">{selectedItem.contact_name}</p></div>
                <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Email</label><p className="text-white mt-1">{selectedItem.email}</p></div>
                <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Phone</label><p className="text-white mt-1">{selectedItem.phone || 'N/A'}</p></div>
              </div>
              <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Message</label><p className="text-neutral-300 mt-2 whitespace-pre-wrap leading-relaxed">{selectedItem.message}</p></div>
              <div className="pt-4 border-t border-neutral-800"><label className="text-xs text-neutral-500 uppercase tracking-wider">Received</label><p className="text-white mt-1">{new Date(selectedItem.created_at).toLocaleString()}</p></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PartnershipTable
