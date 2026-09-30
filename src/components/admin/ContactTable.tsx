import { useState } from 'react'
import type { ContactInquiry } from '../../types/database'
import { useTableSearch, usePagination, TableToolbar, Pagination, parseContactMessage, exportToCSV } from './shared'

interface ContactTableProps {
  data: ContactInquiry[]
  onDelete: (id: string) => void
  onBulkDelete: (ids: string[]) => void
}

const ContactTable = ({ data, onDelete, onBulkDelete }: ContactTableProps) => {
  const [selectedItem, setSelectedItem] = useState<ContactInquiry | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const { searchQuery, setSearchQuery, filtered } = useTableSearch(data, ['name', 'email', 'message'])
  const { page, setPage, pageSize, setPageSize, paginated } = usePagination(filtered)

  const toggleSelect = (id: string) => { setSelectedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n }) }
  const toggleAll = () => { if (selectedIds.size === paginated.length) setSelectedIds(new Set()); else setSelectedIds(new Set(paginated.map(i => i.id))) }

  const handleExport = () => {
    exportToCSV(filtered.map(i => {
      const p = parseContactMessage(i.message)
      return { name: i.name, email: i.email, role: p.role, subject: p.subject, date: i.created_at }
    }), 'contact_inquiries.csv')
  }

  if (data.length === 0) return <p className="text-center text-neutral-400 py-12">No contact inquiries yet</p>

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden">
      <TableToolbar
        searchQuery={searchQuery} onSearchChange={setSearchQuery}
        searchPlaceholder="Search by name, email, message..."
        selectedCount={selectedIds.size}
        onDeleteSelected={() => { onBulkDelete(Array.from(selectedIds)); setSelectedIds(new Set()) }}
        onExport={handleExport} total={data.length} filtered={filtered.length}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-800">
          <thead className="bg-neutral-950">
            <tr>
              <th className="px-4 py-4 w-8"><input type="checkbox" checked={paginated.length > 0 && selectedIds.size === paginated.length} onChange={toggleAll} className="rounded border-neutral-600 bg-neutral-800 text-[#bb9457] focus:ring-[#bb9457]/20" /></th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Role</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-neutral-900 divide-y divide-neutral-800">
            {paginated.map((item) => {
              const parsed = parseContactMessage(item.message)
              return (
                <tr key={item.id} className={`hover:bg-neutral-800/50 transition-colors ${selectedIds.has(item.id) ? 'bg-[#bb9457]/5' : ''}`}>
                  <td className="px-4 py-4"><input type="checkbox" checked={selectedIds.has(item.id)} onChange={() => toggleSelect(item.id)} className="rounded border-neutral-600 bg-neutral-800 text-[#bb9457] focus:ring-[#bb9457]/20" /></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {parsed.role ? <span className="px-2 py-1 rounded-full bg-[#bb9457]/10 border border-[#bb9457]/20 text-[#bb9457] text-xs">{parsed.role}</span> : <span className="text-neutral-500">--</span>}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-300 max-w-xs truncate">{parsed.subject || '--'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">{new Date(item.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button onClick={() => setSelectedItem(item)} className="text-[#bb9457] hover:text-white font-medium transition-colors mr-4">View</button>
                    <button onClick={() => onDelete(item.id)} className="text-red-400 hover:text-red-300 font-medium transition-colors">Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <Pagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} onPageSizeChange={setPageSize} />

      {selectedItem && (() => {
        const parsed = parseContactMessage(selectedItem.message)
        return (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
            <div className="bg-neutral-900 border border-neutral-800 rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-neutral-800 flex justify-between items-center sticky top-0 bg-neutral-900 z-10">
                <h3 className="text-xl font-semibold text-white">Contact Inquiry</h3>
                <button onClick={() => setSelectedItem(null)} className="text-neutral-400 hover:text-white text-2xl">&times;</button>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Name</label><p className="text-white mt-1">{selectedItem.name}</p></div>
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Email</label><p className="text-white mt-1"><a href={`mailto:${selectedItem.email}`} className="text-[#bb9457] hover:text-white transition-colors">{selectedItem.email}</a></p></div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Role</label><p className="mt-1">{parsed.role ? <span className="px-2.5 py-1 rounded-full bg-[#bb9457]/10 border border-[#bb9457]/20 text-[#bb9457] text-sm">{parsed.role}</span> : <span className="text-neutral-500">Not provided</span>}</p></div>
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Phone</label><p className="text-white mt-1">{parsed.phone || <span className="text-neutral-500">Not provided</span>}</p></div>
                </div>
                <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Subject</label><p className="text-white mt-1">{parsed.subject || <span className="text-neutral-500">No subject</span>}</p></div>
                <div className="pt-4 border-t border-neutral-800"><label className="text-xs text-neutral-500 uppercase tracking-wider">Message</label><p className="text-neutral-300 mt-2 whitespace-pre-wrap leading-relaxed">{parsed.body}</p></div>
                <div className="pt-4 border-t border-neutral-800"><label className="text-xs text-neutral-500 uppercase tracking-wider">Received</label><p className="text-white mt-1">{new Date(selectedItem.created_at).toLocaleString()}</p></div>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}

export default ContactTable
