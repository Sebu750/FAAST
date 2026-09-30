import { useState } from 'react'
import type { MarketplaceApplication } from '../../types/database'
import { useTableSearch, usePagination, TableToolbar, Pagination, StatusBadge, exportToCSV } from './shared'

interface MarketplaceTableProps {
  data: MarketplaceApplication[]
  onDelete: (id: string) => void
  onBulkDelete: (ids: string[]) => void
  onStatusChange: (id: string, status: string) => void
}

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
]

const MarketplaceTable = ({ data, onDelete, onBulkDelete, onStatusChange }: MarketplaceTableProps) => {
  const [selectedItem, setSelectedItem] = useState<MarketplaceApplication | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [statusFilter, setStatusFilter] = useState('all')
  const { searchQuery, setSearchQuery, filtered: searchFiltered } = useTableSearch(data, ['brand_name', 'founder_name', 'email', 'product_category', 'location'])
  const filtered = statusFilter === 'all' ? searchFiltered : searchFiltered.filter(i => i.status === statusFilter)
  const { page, setPage, pageSize, setPageSize, paginated } = usePagination(filtered)

  const toggleSelect = (id: string) => { setSelectedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n }) }
  const toggleAll = () => { if (selectedIds.size === paginated.length) setSelectedIds(new Set()); else setSelectedIds(new Set(paginated.map(i => i.id))) }

  const handleExport = () => {
    exportToCSV(filtered.map(i => ({
      brand_name: i.brand_name, founder_name: i.founder_name, email: i.email,
      product_category: i.product_category, status: i.status, created_at: i.created_at,
    })), 'marketplace_applications.csv')
  }

  if (data.length === 0) return <p className="text-center text-neutral-400 py-12">No marketplace applications yet</p>

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-sm">
      <TableToolbar
        searchQuery={searchQuery} onSearchChange={setSearchQuery}
        searchPlaceholder="Search by brand, founder, email, category..."
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
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Brand</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Founder</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Location</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-neutral-900 divide-y divide-neutral-800">
            {paginated.map((item) => (
              <tr key={item.id} className={`hover:bg-neutral-800/50 transition-colors ${selectedIds.has(item.id) ? 'bg-[#bb9457]/5' : ''}`}>
                <td className="px-4 py-4"><input type="checkbox" checked={selectedIds.has(item.id)} onChange={() => toggleSelect(item.id)} className="rounded border-neutral-600 bg-neutral-800 text-[#bb9457] focus:ring-[#bb9457]/20" /></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">{item.brand_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">{item.founder_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">{item.product_category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">{item.location}</td>
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
              <h3 className="text-xl font-semibold text-white">Marketplace Application Details</h3>
              <button onClick={() => setSelectedItem(null)} className="text-neutral-400 hover:text-white text-2xl">&times;</button>
            </div>
            <div className="p-6 space-y-6">
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Brand Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Brand Name</label><p className="text-white mt-1">{selectedItem.brand_name}</p></div>
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Founder</label><p className="text-white mt-1">{selectedItem.founder_name}</p></div>
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Email</label><p className="text-white mt-1">{selectedItem.email}</p></div>
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Phone</label><p className="text-white mt-1">{selectedItem.phone || 'N/A'}</p></div>
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Location</label><p className="text-white mt-1">{selectedItem.location}</p></div>
                  {selectedItem.website && <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Website</label><p className="mt-1"><a href={selectedItem.website} target="_blank" rel="noopener noreferrer" className="text-[#bb9457] hover:underline">{selectedItem.website}</a></p></div>}
                </div>
              </div>
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50"><h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Category</h4><p className="text-white">{selectedItem.product_category}</p></div>
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50"><h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Description</h4><p className="text-neutral-300 whitespace-pre-wrap leading-relaxed">{selectedItem.product_description}</p></div>
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50"><h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Unique Selling Proposition</h4><p className="text-neutral-300 whitespace-pre-wrap leading-relaxed">{selectedItem.unique_selling_proposition}</p></div>
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50"><h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Target Customer</h4><p className="text-neutral-300 whitespace-pre-wrap leading-relaxed">{selectedItem.target_customer}</p></div>
              <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
                <h4 className="text-xs uppercase tracking-widest text-[#bb9457] font-semibold mb-4">Info</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Status</label><div className="mt-1"><StatusBadge status={selectedItem.status} /></div></div>
                  <div><label className="text-xs text-neutral-500 uppercase tracking-wider">Submitted</label><p className="text-white mt-1">{new Date(selectedItem.created_at).toLocaleString()}</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MarketplaceTable
