import { useState } from 'react'
import type { StudioWaitlist } from '../../types/database'
import { useTableSearch, usePagination, TableToolbar, Pagination, StatusBadge, exportToCSV } from './shared'

interface StudioWaitlistTableProps {
  data: StudioWaitlist[]
  onDelete: (id: string) => void
  onBulkDelete: (ids: string[]) => void
  onStatusChange: (id: string, status: string) => void
}

const statusOptions = [
  { value: 'waiting', label: 'Waiting' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'tour_scheduled', label: 'Tour Scheduled' },
  { value: 'enrolled', label: 'Enrolled' },
  { value: 'rejected', label: 'Rejected' },
]

const StudioWaitlistTable = ({ data, onDelete, onBulkDelete, onStatusChange }: StudioWaitlistTableProps) => {
  const [selectedItem, setSelectedItem] = useState<StudioWaitlist | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [statusFilter, setStatusFilter] = useState('all')
  const { searchQuery, setSearchQuery, filtered: searchFiltered } = useTableSearch(data, ['name', 'email', 'discipline', 'preferred_city', 'current_city'])
  const filtered = statusFilter === 'all' ? searchFiltered : searchFiltered.filter(i => i.status === statusFilter)
  const { page, setPage, pageSize, setPageSize, paginated } = usePagination(filtered)

  const toggleSelect = (id: string) => { setSelectedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n }) }
  const toggleAll = () => { if (selectedIds.size === paginated.length) setSelectedIds(new Set()); else setSelectedIds(new Set(paginated.map(i => i.id))) }

  const handleExport = () => {
    exportToCSV(filtered.map(i => ({
      name: i.name, email: i.email, phone: i.phone, discipline: i.discipline,
      preferred_city: i.preferred_city, status: i.status, created_at: i.created_at,
    })), 'studio_waitlist.csv')
  }

  if (data.length === 0) return <div className="text-center py-20"><p className="text-neutral-500 text-lg">No waitlist entries yet.</p></div>

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-sm">
      <TableToolbar
        searchQuery={searchQuery} onSearchChange={setSearchQuery}
        searchPlaceholder="Search by name, email, discipline, city..."
        statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} statusOptions={statusOptions}
        selectedCount={selectedIds.size}
        onDeleteSelected={() => { onBulkDelete(Array.from(selectedIds)); setSelectedIds(new Set()) }}
        onExport={handleExport} total={data.length} filtered={filtered.length}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-800">
          <thead className="bg-neutral-950">
            <tr>
              <th className="px-4 py-4 w-8"><input type="checkbox" checked={paginated.length > 0 && selectedIds.size === paginated.length} onChange={toggleAll} className="rounded border-neutral-600 bg-neutral-800 text-[#bb9457] focus:ring-[#bb9457]/20" /></th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-neutral-500 font-semibold">Name</th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-neutral-500 font-semibold">Email</th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-neutral-500 font-semibold">Discipline</th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-neutral-500 font-semibold">Preferred City</th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-neutral-500 font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-neutral-500 font-semibold">Date</th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-neutral-500 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900">
            {paginated.map((item) => (
              <tr key={item.id} className={`hover:bg-neutral-900/50 transition-colors ${selectedIds.has(item.id) ? 'bg-[#bb9457]/5' : ''}`}>
                <td className="px-4 py-4"><input type="checkbox" checked={selectedIds.has(item.id)} onChange={() => toggleSelect(item.id)} className="rounded border-neutral-600 bg-neutral-800 text-[#bb9457] focus:ring-[#bb9457]/20" /></td>
                <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-white font-medium">{item.name}</div><div className="text-xs text-neutral-500">{item.current_city}</div></td>
                <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-neutral-300">{item.email}</div><div className="text-xs text-neutral-500">{item.phone}</div></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">{item.discipline}</td>
                <td className="px-6 py-4 whitespace-nowrap"><span className="px-3 py-1 bg-[#bb9457]/10 text-[#bb9457] rounded-sm text-xs uppercase tracking-wider border border-[#bb9457]/20">{item.preferred_city}</span></td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select value={item.status} onChange={(e) => onStatusChange(item.id, e.target.value)} className="bg-transparent border border-neutral-700 rounded-sm px-2 py-1 text-xs text-white focus:border-[#bb9457]/60 focus:outline-none appearance-none pr-6 cursor-pointer">
                    {statusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </td>
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
          <div className="bg-neutral-900 border border-neutral-800 rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-neutral-800 flex justify-between items-center sticky top-0 bg-neutral-900">
              <h3 className="text-xl font-semibold text-white">Studio Waitlist Details</h3>
              <button onClick={() => setSelectedItem(null)} className="text-neutral-400 hover:text-white text-2xl">&times;</button>
            </div>
            <div className="p-6 space-y-6">
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Personal Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Name</label><p className="text-white mt-1">{selectedItem.name}</p></div>
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Email</label><p className="text-white mt-1">{selectedItem.email}</p></div>
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Phone</label><p className="text-white mt-1">{selectedItem.phone}</p></div>
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Current City</label><p className="text-white mt-1">{selectedItem.current_city}</p></div>
                </div>
              </div>
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Preferences</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Preferred City</label><p className="text-white mt-1">{selectedItem.preferred_city}</p></div>
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Discipline</label><p className="text-white mt-1">{selectedItem.discipline}</p></div>
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Experience</label><p className="text-white mt-1">{selectedItem.years_experience}</p></div>
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Membership</label><p className="text-white mt-1">{selectedItem.membership_type.replace('_', ' ')}</p></div>
                </div>
              </div>
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50"><h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Why Studio?</h4><p className="text-neutral-300 whitespace-pre-wrap leading-relaxed">{selectedItem.why_studio}</p></div>
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50"><h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Current Workspace</h4><p className="text-neutral-300 whitespace-pre-wrap leading-relaxed">{selectedItem.current_workspace}</p></div>
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Info</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Status</label><div className="mt-1"><StatusBadge status={selectedItem.status} /></div></div>
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Joined</label><p className="text-white mt-1">{new Date(selectedItem.created_at).toLocaleString()}</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudioWaitlistTable
