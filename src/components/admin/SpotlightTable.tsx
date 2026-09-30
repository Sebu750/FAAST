import { useState } from 'react'
import type { SpotlightApplication } from '../../types/database'
import { useTableSearch, usePagination, TableToolbar, Pagination, StatusBadge, exportToCSV } from './shared'

interface SpotlightTableProps {
  data: SpotlightApplication[]
  onDelete: (id: string) => void
  onBulkDelete: (ids: string[]) => void
  onStatusChange: (id: string, status: string) => void
}

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'shortlisted', label: 'Shortlisted' },
  { value: 'finalist', label: 'Finalist' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
]

const SpotlightTable = ({ data, onDelete, onBulkDelete, onStatusChange }: SpotlightTableProps) => {
  const [selectedApp, setSelectedApp] = useState<SpotlightApplication | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [statusFilter, setStatusFilter] = useState('all')
  const { searchQuery, setSearchQuery, filtered: searchFiltered } = useTableSearch(data, ['name', 'email', 'location', 'discipline'])
  const filtered = statusFilter === 'all' ? searchFiltered : searchFiltered.filter(i => i.status === statusFilter)
  const { page, setPage, pageSize, setPageSize, paginated } = usePagination(filtered)

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }
  const toggleAll = () => {
    if (selectedIds.size === paginated.length) setSelectedIds(new Set())
    else setSelectedIds(new Set(paginated.map(i => i.id)))
  }

  const handleExport = () => {
    exportToCSV(filtered.map(i => ({
      name: i.name, email: i.email, phone: i.phone, location: i.location,
      discipline: i.discipline, status: i.status, created_at: i.created_at,
    })), 'spotlight_applications.csv')
  }

  if (data.length === 0) {
    return <p className="text-center text-neutral-400 py-12">No spotlight applications yet</p>
  }

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-sm">
      <TableToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search by name, email, location, discipline..."
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        statusOptions={statusOptions}
        selectedCount={selectedIds.size}
        onDeleteSelected={() => { onBulkDelete(Array.from(selectedIds)); setSelectedIds(new Set()) }}
        onExport={handleExport}
        total={data.length}
        filtered={filtered.length}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-800">
          <thead className="bg-neutral-950">
            <tr>
              <th className="px-4 py-4 w-8">
                <input type="checkbox" checked={paginated.length > 0 && selectedIds.size === paginated.length} onChange={toggleAll} className="rounded border-neutral-600 bg-neutral-800 text-[#bb9457] focus:ring-[#bb9457]/20" />
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Location</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Discipline</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-neutral-900 divide-y divide-neutral-800">
            {paginated.map((item) => (
              <tr key={item.id} className={`hover:bg-neutral-800/50 transition-colors ${selectedIds.has(item.id) ? 'bg-[#bb9457]/5' : ''}`}>
                <td className="px-4 py-4">
                  <input type="checkbox" checked={selectedIds.has(item.id)} onChange={() => toggleSelect(item.id)} className="rounded border-neutral-600 bg-neutral-800 text-[#bb9457] focus:ring-[#bb9457]/20" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">{item.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">{item.discipline}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={item.status}
                    onChange={(e) => onStatusChange(item.id, e.target.value)}
                    className="bg-transparent border border-neutral-700 rounded-sm px-2 py-1 text-xs text-white focus:border-[#bb9457]/60 focus:outline-none appearance-none pr-6 cursor-pointer"
                  >
                    {statusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">{new Date(item.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button onClick={() => setSelectedApp(item)} className="text-[#bb9457] hover:text-white font-medium transition-colors mr-4">View</button>
                  <button onClick={() => onDelete(item.id)} className="text-red-400 hover:text-red-300 font-medium transition-colors">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} onPageSizeChange={setPageSize} />

      {/* Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedApp(null)}>
          <div className="bg-neutral-900 border border-neutral-800 rounded-sm max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 p-6 flex justify-between items-center">
              <h3 className="text-xl font-semibold font-serif text-white">Application Details</h3>
              <button onClick={() => setSelectedApp(null)} className="text-neutral-400 hover:text-white text-2xl">&times;</button>
            </div>
            <div className="p-6 space-y-8">
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Personal Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Full Name</label><p className="text-white mt-1">{selectedApp.name}</p></div>
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Email</label><p className="text-white mt-1">{selectedApp.email}</p></div>
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Phone</label><p className="text-white mt-1">{selectedApp.phone || 'N/A'}</p></div>
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Location</label><p className="text-white mt-1">{selectedApp.location}</p></div>
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Discipline</label><p className="text-white mt-1">{selectedApp.discipline}</p></div>
                </div>
              </div>
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Creative Background</h4>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Years of Experience</label><p className="text-white mt-1">{selectedApp.years_experience || 'N/A'}</p></div>
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Formal Education</label><p className="text-white mt-1">{selectedApp.formal_education || 'N/A'}</p></div>
                  <div className="md:col-span-2"><label className="text-xs text-neutral-500 uppercase tracking-wider">Institution</label><p className="text-white mt-1">{selectedApp.institution_name || 'N/A'}</p></div>
                </div>
                <div className="space-y-4">
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Creative Practice</label><p className="text-white mt-2 leading-relaxed">{selectedApp.creative_practice || 'N/A'}</p></div>
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Portfolio</label><p className="mt-1">{selectedApp.portfolio_url ? <a href={selectedApp.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-[#bb9457] hover:underline">{selectedApp.portfolio_url}</a> : <span className="text-neutral-600">N/A</span>}</p></div>
                </div>
              </div>
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Vision & Goals</h4>
                <div className="space-y-4">
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Vision</label><p className="text-white mt-2 leading-relaxed">{selectedApp.vision_description || 'N/A'}</p></div>
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Biggest Obstacle</label><p className="text-white mt-2 leading-relaxed">{selectedApp.biggest_obstacle || 'N/A'}</p></div>
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Why Now?</label><p className="text-white mt-2 leading-relaxed">{selectedApp.why_now || 'N/A'}</p></div>
                </div>
              </div>
              {(selectedApp.heritage_craft || selectedApp.heritage_description) && (
                <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                  <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Heritage Craft</h4>
                  <div className="space-y-4">
                    <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Tradition</label><p className="text-white mt-1">{selectedApp.heritage_craft || 'N/A'}</p></div>
                    <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Description</label><p className="text-white mt-2 leading-relaxed">{selectedApp.heritage_description || 'N/A'}</p></div>
                  </div>
                </div>
              )}
              {selectedApp.additional_info && (
                <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                  <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Additional Information</h4>
                  <p className="text-white mt-2 leading-relaxed">{selectedApp.additional_info}</p>
                </div>
              )}
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Declarations</h4>
                <div className="space-y-3">
                  {[
                    { val: selectedApp.declaration_original_work, label: 'Original work' },
                    { val: selectedApp.declaration_pakistan_age, label: 'Pakistan age eligibility' },
                    { val: selectedApp.declaration_presentations, label: 'Presentations commitment' },
                    { val: selectedApp.declaration_terms, label: 'Terms acceptance' },
                  ].map((d, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${d.val ? 'bg-[#bb9457] border-[#bb9457]' : 'border-neutral-700'}`}>
                        {d.val && <span className="text-black text-xs">&#10003;</span>}
                      </span>
                      <p className="text-sm text-neutral-300">{d.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Metadata</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Status</label><div className="mt-1"><StatusBadge status={selectedApp.status} /></div></div>
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Submitted</label><p className="text-white mt-1">{new Date(selectedApp.created_at).toLocaleString()}</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SpotlightTable
