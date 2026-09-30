import { useEffect, useState, useMemo, useRef, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import type { Designer, DesignerCollection, DesignerEducation, DesignerAchievement, DesignerSkill, DesignerCertification, DesignerSocialLinks, DesignerFilm } from '../types/database'
import RichTextEditor from '../components/RichTextEditor'

// ── Icon helper ──
const Ic = ({ name, className = 'w-4 h-4' }: { name: string; className?: string }) => {
  const icons: Record<string, ReactNode> = {
    plus: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
    edit: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    trash: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    check: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
    x: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
    search: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    image: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    users: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    eye: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
    // New icons
    chevronRight: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>,
    chevronLeft: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>,
    save: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
    upload: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>,
    copy: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    download: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
    share: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>,
    warning: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
    clock: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    star: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
    archive: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>,
    document: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    academic: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>,
    trophy: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    link: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>,
    collection: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
    drag: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" /></svg>,
    bold: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" /></svg>,
    italic: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    list: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>,
    quote: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>,
    chevronDown: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>,
    chevronUp: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>,
    duplicate: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    grip: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="9" cy="6" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="18" r="1"/></svg>,
    sparkles: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    info: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    user: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    film: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>,
  }
  return <>{icons[name] || null}</>
}

// ── Collapsible Card Component ──
const Card = ({ icon, title, subtitle, defaultOpen = true, children, badge }: { icon: string; title: string; subtitle?: string; defaultOpen?: boolean; children: ReactNode; badge?: string }) => {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-neutral-950/50 border border-neutral-800/80 rounded-lg overflow-hidden transition-all duration-200">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-neutral-900/50 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#bb9457]/10 border border-[#bb9457]/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Ic name={icon} className="w-4 h-4 text-[#bb9457]" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-medium text-white">{title}</h3>
            {subtitle && <p className="text-[11px] text-neutral-500 mt-0.5">{subtitle}</p>}
          </div>
          {badge && (
            <span className="ml-2 px-2 py-0.5 text-[10px] font-medium bg-[#bb9457]/10 text-[#bb9457] border border-[#bb9457]/20 rounded-full">{badge}</span>
          )}
        </div>
        <Ic name={open ? 'chevronUp' : 'chevronDown'} className="w-4 h-4 text-neutral-500 group-hover:text-neutral-300 transition-colors" />
      </button>
      {open && <div className="px-5 pb-5 pt-1 border-t border-neutral-800/40">{children}</div>}
    </div>
  )
}

// ── Enhanced Form input components ──
const Input = ({ label, hint, required, ...props }: { label: string; hint?: string; required?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <label className="block text-[11px] font-medium text-neutral-300 mb-1.5 tracking-wide">{label}{required && <span className="text-[#bb9457] ml-0.5">*</span>}</label>
    <input {...props} className="w-full bg-neutral-950/80 border border-neutral-800 rounded-md px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-[#bb9457]/60 focus:ring-1 focus:ring-[#bb9457]/20 focus:outline-none transition-all hover:border-neutral-700" />
    {hint && <p className="text-[10px] text-neutral-600 mt-1">{hint}</p>}
  </div>
)

const Textarea = ({ label, hint, rows = 3, ...props }: { label: string; hint?: string; rows?: number } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <div>
    <label className="block text-[11px] font-medium text-neutral-300 mb-1.5 tracking-wide">{label}</label>
    <textarea rows={rows} {...props} className="w-full bg-neutral-950/80 border border-neutral-800 rounded-md px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-[#bb9457]/60 focus:ring-1 focus:ring-[#bb9457]/20 focus:outline-none transition-all hover:border-neutral-700 resize-none leading-relaxed" />
    {hint && <p className="text-[10px] text-neutral-600 mt-1">{hint}</p>}
  </div>
)

const Select = ({ label, options, ...props }: { label: string; options: { value: string; label: string }[] } & React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <div>
    <label className="block text-[11px] font-medium text-neutral-300 mb-1.5 tracking-wide">{label}</label>
    <select {...props} className="w-full bg-neutral-950/80 border border-neutral-800 rounded-md px-3.5 py-2.5 text-sm text-white focus:border-[#bb9457]/60 focus:ring-1 focus:ring-[#bb9457]/20 focus:outline-none transition-all hover:border-neutral-700 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-8">
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
)

const Toggle = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) => (
  <div className="flex items-center gap-3">
    <button type="button" onClick={() => onChange(!checked)} className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-[#bb9457]' : 'bg-neutral-700'}`}>
      <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${checked ? 'translate-x-5' : ''}`} />
    </button>
    <span className="text-sm text-neutral-300">{label}</span>
  </div>
)

// Tag/Chip Input Component
const TagInput = ({ label, tags, onChange, placeholder, hint }: { label: string; tags: string[]; onChange: (tags: string[]) => void; placeholder?: string; hint?: string }) => {
  const [input, setInput] = useState('')
  const addTag = () => {
    const trimmed = input.trim()
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed])
      setInput('')
    }
  }
  const removeTag = (idx: number) => onChange(tags.filter((_, i) => i !== idx))
  return (
    <div>
      <label className="block text-[11px] font-medium text-neutral-300 mb-1.5 tracking-wide">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, idx) => (
          <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#bb9457]/10 border border-[#bb9457]/20 text-[#bb9457] text-xs rounded-full">
            {tag}
            <button type="button" onClick={() => removeTag(idx)} className="hover:text-red-400 transition-colors">
              <Ic name="x" className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
          placeholder={placeholder || 'Type and press Enter...'}
          className="flex-1 bg-neutral-950/80 border border-neutral-800 rounded-md px-3.5 py-2 text-sm text-white placeholder-neutral-600 focus:border-[#bb9457]/60 focus:ring-1 focus:ring-[#bb9457]/20 focus:outline-none transition-all hover:border-neutral-700"
        />
        <button type="button" onClick={addTag} className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs uppercase tracking-wider font-medium rounded-md transition-colors">
          Add
        </button>
      </div>
      {hint && <p className="text-[10px] text-neutral-600 mt-1">{hint}</p>}
    </div>
  )
}

// Collection Preview Modal
const CollectionPreview = ({ collection, onClose }: { collection: DesignerCollection; onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[70] flex items-center justify-center p-4" onClick={onClose}>
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
      <div className="sticky top-0 bg-neutral-900/98 backdrop-blur-md border-b border-neutral-800/80 px-6 py-4 flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold">{collection.title || 'Untitled Collection'}</h3>
          {collection.season && <p className="text-xs text-neutral-500 mt-0.5">{collection.season}</p>}
        </div>
        <button onClick={onClose} className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all">
          <Ic name="x" className="w-5 h-5" />
        </button>
      </div>
      <div className="p-6 space-y-5">
        {collection.cover_image_url && (
          <div className="rounded-lg overflow-hidden border border-neutral-800">
            <img src={collection.cover_image_url} alt={collection.title} className="w-full h-48 object-cover" />
          </div>
        )}
        {collection.description && (
          <div>
            <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-2">Description</p>
            <p className="text-sm text-neutral-300 leading-relaxed">{collection.description}</p>
          </div>
        )}
        {collection.inspiration && (
          <div className="border-l-2 border-[#bb9457]/30 pl-4">
            <p className="text-[10px] uppercase tracking-wider text-[#bb9457]/60 mb-1">Inspiration</p>
            <p className="text-sm text-neutral-400 italic leading-relaxed">{collection.inspiration}</p>
          </div>
        )}
        {collection.looks && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-neutral-500">Looks:</span>
            <span className="text-sm text-white font-medium">{collection.looks}</span>
          </div>
        )}
        {collection.images && collection.images.length > 0 && (
          <div>
            <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-2">Gallery</p>
            <div className="grid grid-cols-3 gap-2">
              {collection.images.map((img, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden border border-neutral-800">
                  <img src={img} alt={`Look ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
        {collection.is_latest && (
          <span className="inline-flex px-2.5 py-1 text-[10px] uppercase tracking-wider bg-[#bb9457]/10 text-[#bb9457] border border-[#bb9457]/30 rounded-full">Latest Collection</span>
        )}
      </div>
    </div>
  </div>
)

// Section header component
const SectionHeader = ({ icon, title }: { icon: string; title: string }) => (
  <div className="flex items-center gap-2.5 pb-3 mb-5 border-b border-neutral-800/60">
    <div className="w-8 h-8 bg-[#bb9457]/10 border border-[#bb9457]/20 rounded-md flex items-center justify-center">
      <Ic name={icon} className="w-4 h-4 text-[#bb9457]" />
    </div>
    <h3 className="text-sm font-medium text-white tracking-wide">{title}</h3>
  </div>
)

// ══════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════
const DesignerManagement = () => {
  const [designers, setDesigners] = useState<Designer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showEditor, setShowEditor] = useState(false)
  const [editingDesigner, setEditingDesigner] = useState<Designer | null>(null)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    setLoading(true)
    const { data } = await supabase.from('designers').select('*').order('created_at', { ascending: false })
    setDesigners(data || [])
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this designer? This cannot be undone.')) return
    await supabase.from('designers').delete().eq('id', id)
    fetchData()
  }

  const handleToggleActive = async (id: string, current: boolean) => {
    await supabase.from('designers').update({ is_active: !current }).eq('id', id)
    fetchData()
  }

  const handleToggleFeatured = async (id: string, current: boolean) => {
    // If trying to feature a designer, check the limit
    if (!current) {
      const featuredCount = designers.filter(d => d.is_featured).length
      if (featuredCount >= 6) {
        alert('Featured slots are full. Please unfeature an existing designer before adding a new one.')
        return
      }
    }
    await supabase.from('designers').update({ is_featured: !current }).eq('id', id)
    fetchData()
  }

  const filteredDesigners = designers.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (d.location || '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    total: designers.length,
    active: designers.filter(d => d.is_active).length,
    featured: designers.filter(d => d.is_featured).length,
  }

  if (loading) {
    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-16 text-center">
        <div className="w-10 h-10 border-2 border-[#bb9457] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-neutral-400 text-sm uppercase tracking-wider">Loading designers...</p>
      </div>
    )
  }

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-5">
          <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Total Designers</p>
          <p className="text-3xl font-serif text-white">{stats.total}</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-5">
          <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Active</p>
          <p className="text-3xl font-serif text-green-400">{stats.active}</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-5">
          <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Featured</p>
          <p className="text-3xl font-serif text-[#bb9457]">{stats.featured}</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-4 mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"><Ic name="search" className="w-4 h-4" /></span>
          <input
            type="text"
            placeholder="Search designers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-sm pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-[#bb9457]/50 focus:outline-none transition-colors"
          />
        </div>
        <button
          onClick={() => { setEditingDesigner(null); setShowEditor(true) }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#bb9457] text-black text-xs uppercase tracking-wider font-semibold hover:bg-white transition-colors rounded-sm"
        >
          <Ic name="plus" className="w-4 h-4" />
          Add Designer
        </button>
      </div>

      {/* Table */}
      {filteredDesigners.length === 0 ? (
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-12 text-center">
          <p className="text-neutral-500 text-sm">No designers found</p>
        </div>
      ) : (
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-800">
              <thead className="bg-neutral-950">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Designer</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {filteredDesigners.map((d) => (
                  <tr key={d.id} className="hover:bg-neutral-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-neutral-800 rounded-full overflow-hidden flex-shrink-0">
                          {d.image_url ? (
                            <img src={d.image_url} alt={d.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs font-medium">
                              {d.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{d.name}</p>
                          <p className="text-neutral-500 text-xs">{d.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-400">{d.location || '—'}</td>
                    <td className="px-6 py-4 text-sm text-neutral-400">{d.category || '—'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleActive(d.id, d.is_active)}
                          className={`px-2 py-1 text-[10px] uppercase tracking-wider font-medium rounded-sm border transition-colors ${
                            d.is_active
                              ? 'bg-green-600/10 text-green-400 border-green-600/30 hover:bg-green-600/20'
                              : 'bg-neutral-800 text-neutral-500 border-neutral-700 hover:bg-neutral-700'
                          }`}
                        >
                          {d.is_active ? 'Active' : 'Inactive'}
                        </button>
                        <button
                          onClick={() => handleToggleFeatured(d.id, d.is_featured)}
                          className={`px-2 py-1 text-[10px] uppercase tracking-wider font-medium rounded-sm border transition-colors ${
                            d.is_featured
                              ? 'bg-[#bb9457]/10 text-[#bb9457] border-[#bb9457]/30 hover:bg-[#bb9457]/20'
                              : 'bg-neutral-800 text-neutral-500 border-neutral-700 hover:bg-neutral-700'
                          }`}
                        >
                          {d.is_featured ? 'Featured' : 'Regular'}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => { setEditingDesigner(d); setShowEditor(true) }}
                          className="text-[#bb9457] hover:text-white text-sm transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(d.id)}
                          className="text-red-400 hover:text-red-300 text-sm transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Editor Modal */}
      {showEditor && (
        <DesignerEditor
          designer={editingDesigner}
          onClose={() => { setShowEditor(false); setEditingDesigner(null) }}
          onSave={() => { setShowEditor(false); setEditingDesigner(null); fetchData() }}
        />
      )}
    </>
  )
}

// ══════════════════════════════════════════
// DESIGNER EDITOR MODAL
// ══════════════════════════════════════════
interface DesignerFormData {
  slug: string
  name: string
  brand: string
  location: string
  nationality: string
  languages: string
  experience: string
  specialization: string
  category: string
  gender: string
  bio: string
  short_bio: string
  philosophy: string
  image_url: string
  cover_image_url: string
  availability: string
  priority: number
  is_featured: boolean
  is_active: boolean
  status: 'draft' | 'pending' | 'published' | 'featured' | 'archived'
}

const emptyForm: DesignerFormData = {
  slug: '', name: '', brand: '', location: '', nationality: '', languages: '',
  experience: '', specialization: '', category: '', gender: '', bio: '', short_bio: '',
  philosophy: '', image_url: '', cover_image_url: '', availability: '',
  priority: 0, is_featured: false, is_active: true, status: 'draft'
}

// Stepper steps configuration
const STEPS = [
  { id: 'basic', label: 'Basic Information', icon: 'user', description: 'Name, brand, location & details' },
  { id: 'biography', label: 'Biography', icon: 'document', description: 'Story, philosophy & vision' },
  { id: 'collections', label: 'Collections', icon: 'collection', description: 'Fashion collections & looks' },
  { id: 'gallery', label: 'Gallery', icon: 'image', description: 'Profile & cover photos' },
  { id: 'education', label: 'Education', icon: 'academic', description: 'Training & qualifications' },
  { id: 'achievements', label: 'Achievements', icon: 'trophy', description: 'Awards & recognition' },
  { id: 'skills', label: 'Skills', icon: 'star', description: 'Craft expertise & techniques' },
  { id: 'social', label: 'Social Links', icon: 'link', description: 'Online presence & contact' },
  { id: 'films', label: 'Films', icon: 'film', description: 'YouTube collection films & lookbooks' },
  { id: 'review', label: 'Review & Publish', icon: 'check', description: 'Finalize and publish profile' },
]

const DesignerEditor = ({ designer, onClose, onSave }: {
  designer: Designer | null
  onClose: () => void
  onSave: () => void
}) => {
  const [form, setForm] = useState<DesignerFormData>(() => {
    if (designer) {
      return {
        slug: designer.slug, name: designer.name, brand: designer.brand,
        location: designer.location || '', nationality: designer.nationality || '',
        languages: designer.languages || '', experience: designer.experience || '',
        specialization: designer.specialization || '', category: designer.category || '',
        gender: designer.gender || '', bio: designer.bio || '', short_bio: designer.short_bio || '',
        philosophy: designer.philosophy || '', image_url: designer.image_url || '',
        cover_image_url: designer.cover_image_url || '', availability: designer.availability || '',
        priority: designer.priority || 0, is_featured: designer.is_featured, is_active: designer.is_active,
        status: ((designer as any).status as DesignerFormData['status']) || 'draft'
      }
    }
    return emptyForm
  })

  // Related data states
  const [collections, setCollections] = useState<DesignerCollection[]>([])
  const [education, setEducation] = useState<DesignerEducation[]>([])
  const [achievements, setAchievements] = useState<DesignerAchievement[]>([])
  const [skills, setSkills] = useState<DesignerSkill[]>([])
  const [certifications, setCertifications] = useState<DesignerCertification[]>([])
  const [socialLinks, setSocialLinks] = useState<Partial<DesignerSocialLinks>>({})
  const [films, setFilms] = useState<DesignerFilm[]>([])
  const [saving, setSaving] = useState(false)
  const [autoSaving, setAutoSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)
  const [uploadingImage, setUploadingImage] = useState<'profile' | 'cover' | null>(null)
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const designerIdRef = useRef<string | null>(designer?.id || null)
  const relatedDataLoadedRef = useRef(false)
  const [relatedDataLoaded, setRelatedDataLoaded] = useState(!designer) // true if new designer (no data to load)

  useEffect(() => {
    if (designer) {
      relatedDataLoadedRef.current = false
      setRelatedDataLoaded(false)
      fetchRelatedData(designer.id)
    } else {
      relatedDataLoadedRef.current = true
      setRelatedDataLoaded(true)
    }
  }, [designer])

  // Auto-save effect - only after related data is loaded
  useEffect(() => {
    if (hasUnsavedChanges && designerIdRef.current && relatedDataLoadedRef.current) {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
      saveTimeoutRef.current = setTimeout(() => {
        handleAutoSave()
      }, 3000)
    }
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    }
  }, [form, collections, education, achievements, skills, certifications, socialLinks, films])

  // Keyboard shortcut for save (Ctrl/Cmd + S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [form, collections, education, achievements, skills, certifications, socialLinks, films])

  const fetchRelatedData = async (designerId: string) => {
    const [colRes, eduRes, achRes, skiRes, cerRes, socRes, filmsRes] = await Promise.all([
      supabase.from('designer_collections').select('*').eq('designer_id', designerId).order('created_at'),
      supabase.from('designer_education').select('*').eq('designer_id', designerId).order('created_at'),
      supabase.from('designer_achievements').select('*').eq('designer_id', designerId).order('created_at'),
      supabase.from('designer_skills').select('*').eq('designer_id', designerId).order('created_at'),
      supabase.from('designer_certifications').select('*').eq('designer_id', designerId).order('created_at'),
      supabase.from('designer_social_links').select('*').eq('designer_id', designerId).single(),
      supabase.from('designer_films').select('*').eq('designer_id', designerId).order('display_order'),
    ])
    setCollections(colRes.data || [])
    setEducation(eduRes.data || [])
    setAchievements(achRes.data || [])
    setSkills(skiRes.data || [])
    setCertifications(cerRes.data || [])
    setSocialLinks(socRes.data || {})
    setFilms(filmsRes.data || [])
    relatedDataLoadedRef.current = true
    setRelatedDataLoaded(true)
  }

  const updateField = (field: keyof DesignerFormData, value: string | boolean | number) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setHasUnsavedChanges(true)
  }

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleAutoSave = async () => {
    if (!form.name || !form.brand) return
    if (!relatedDataLoadedRef.current) return // Don't auto-save until data is loaded
    setAutoSaving(true)
    try {
      const slug = form.slug || generateSlug(form.name)
      const designerData = { ...form, slug }
      if (designerIdRef.current) {
        await supabase.from('designers').update(designerData).eq('id', designerIdRef.current)
      } else {
        const { data } = await supabase.from('designers').insert(designerData).select('id').single()
        if (data) designerIdRef.current = data.id
      }
      await saveRelatedData(designerIdRef.current!)
      setLastSaved(new Date())
      setHasUnsavedChanges(false)
    } catch (err) {
      console.error('Auto-save error:', err)
    } finally {
      setAutoSaving(false)
    }
  }

  const handleSave = async () => {
    if (!form.name || !form.brand) {
      showToast('Name and Brand are required', 'error')
      return
    }
    if (!relatedDataLoadedRef.current) {
      showToast('Loading designer data, please try again in a moment...', 'info')
      return
    }
    setSaving(true)
    try {
      const slug = form.slug || generateSlug(form.name)
      const designerData = { ...form, slug }
      if (designerIdRef.current) {
        const { error } = await supabase.from('designers').update(designerData).eq('id', designerIdRef.current)
        if (error) throw error
      } else {
        const { data, error } = await supabase.from('designers').insert(designerData).select('id').single()
        if (error) throw error
        designerIdRef.current = data.id
      }
      await saveRelatedData(designerIdRef.current!)
      // Refresh related data after save to reflect any ID changes
      await fetchRelatedData(designerIdRef.current!)
      setLastSaved(new Date())
      setHasUnsavedChanges(false)
      showToast('Designer profile saved successfully', 'success')
      onSave()
    } catch (err) {
      console.error('Error saving designer:', err)
      showToast('Error saving designer', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = async () => {
    updateField('status', 'published')
    updateField('is_active', true)
    await handleSave()
    showToast('Designer profile published!', 'success')
  }

  const handleDesignerImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'cover') => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showToast('Please select an image file', 'error')
      return
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      showToast('Image must be under 10MB', 'error')
      return
    }

    setUploadingImage(type)
    showToast(`Uploading ${type} image...`, 'info')

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `designers/${designerIdRef.current || 'new'}/${type}-${Date.now()}.${fileExt}`

      const { data, error } = await supabase.storage
        .from('designers')
        .upload(fileName, file, { cacheControl: '31536000', upsert: false })

      if (error) throw error

      const { data: urlData } = supabase.storage
        .from('designers')
        .getPublicUrl(data.path)

      if (type === 'profile') {
        updateField('image_url', urlData.publicUrl)
      } else {
        updateField('cover_image_url', urlData.publicUrl)
      }
      showToast(`${type === 'profile' ? 'Profile' : 'Cover'} image uploaded successfully`, 'success')
    } catch (error) {
      console.error('Error uploading image:', error)
      showToast('Error uploading image. Please try again.', 'error')
    } finally {
      setUploadingImage(null)
    }
  }

  const saveRelatedData = async (designerId: string) => {
    // Delete and re-insert for collections, education, achievements, skills, certifications
    const tables = ['designer_collections', 'designer_education', 'designer_achievements', 'designer_skills', 'designer_certifications', 'designer_films']
    for (const table of tables) {
      await supabase.from(table).delete().eq('designer_id', designerId)
    }

    // Insert collections - ensure only ONE is marked as latest
    if (collections.length > 0) {
      // Find the last collection marked as latest (most recently toggled)
      const latestIdx = collections.map((c, i) => c.is_latest ? i : -1).filter(i => i >= 0)
      const keepLatestIdx = latestIdx.length > 0 ? latestIdx[latestIdx.length - 1] : -1
      
      await supabase.from('designer_collections').insert(
        collections.map((c, i) => ({ 
          designer_id: designerId, 
          title: c.title, 
          season: c.season, 
          description: c.description, 
          inspiration: c.inspiration, 
          looks: c.looks, 
          cover_image_url: c.cover_image_url, 
          images: c.images, 
          is_latest: i === keepLatestIdx // Only one collection can be latest
        }))
      )
    }

    // Insert education
    if (education.length > 0) {
      await supabase.from('designer_education').insert(
        education.map(e => ({ designer_id: designerId, institution: e.institution, degree: e.degree, year: e.year }))
      )
    }

    // Insert achievements
    if (achievements.length > 0) {
      await supabase.from('designer_achievements').insert(
        achievements.map(a => ({ designer_id: designerId, title: a.title, detail: a.detail }))
      )
    }

    // Insert skills
    if (skills.length > 0) {
      await supabase.from('designer_skills').insert(
        skills.map(s => ({ designer_id: designerId, skill: s.skill }))
      )
    }

    // Insert certifications
    if (certifications.length > 0) {
      await supabase.from('designer_certifications').insert(
        certifications.map(c => ({ designer_id: designerId, certification: c.certification }))
      )
    }

    // Upsert social links
    if (Object.keys(socialLinks).length > 0) {
      const existing = await supabase.from('designer_social_links').select('id').eq('designer_id', designerId).single()
      if (existing.data) {
        await supabase.from('designer_social_links').update({ ...socialLinks, designer_id: designerId }).eq('designer_id', designerId)
      } else {
        await supabase.from('designer_social_links').insert({ ...socialLinks, designer_id: designerId })
      }
    }

    // Insert films
    if (films.length > 0) {
      await supabase.from('designer_films').insert(
        films.map((f, i) => ({ designer_id: designerId, title: f.title, description: f.description, youtube_url: f.youtube_url, thumbnail_url: f.thumbnail_url, display_order: i }))
      )
    }
  }

  // Profile completion calculation
  const profileCompletion = useMemo(() => {
    const checks = {
      basic: !!(form.name && form.brand && form.location),
      biography: !!(form.bio && form.short_bio),
      collections: collections.length > 0,
      gallery: !!(form.image_url || form.cover_image_url),
      education: education.length > 0,
      achievements: achievements.length > 0,
      skills: skills.length > 0,
      social: !!(socialLinks.instagram || socialLinks.website),
      films: films.length > 0,
    }
    const completed = Object.values(checks).filter(Boolean).length
    const total = Object.keys(checks).length
    return { percentage: Math.round((completed / total) * 100), checks, completed, total }
  }, [form, collections, education, achievements, skills, socialLinks, films])

  const currentStepData = STEPS[currentStep]
  const isLastStep = currentStep === STEPS.length - 1
  const isFirstStep = currentStep === 0

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto p-4 pt-8 pb-8">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl w-full max-w-[1200px] shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-neutral-900/98 backdrop-blur-md border-b border-neutral-800/80 px-8 py-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-gradient-to-br from-[#bb9457]/20 to-[#bb9457]/5 border border-[#bb9457]/30 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-[#bb9457] font-serif text-xl">{form.name ? form.name.charAt(0).toUpperCase() : '?'}</span>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-white">{designer ? 'Edit Designer' : 'New Designer'}</h2>
                {form.status && (
                  <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium rounded-full border ${
                    form.status === 'published' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                    form.status === 'draft' ? 'bg-neutral-800 text-neutral-400 border-neutral-700' :
                    'bg-[#bb9457]/10 text-[#bb9457] border-[#bb9457]/30'
                  }`}>{form.status}</span>
                )}
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">{form.name || 'Untitled'} {form.brand ? `— ${form.brand}` : ''}</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1">Profile</p>
                <p className="text-sm font-semibold text-white">{profileCompletion.percentage}%</p>
              </div>
              <div className="w-24 h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#bb9457] to-[#d4af37] transition-all duration-500 rounded-full"
                  style={{ width: `${profileCompletion.percentage}%` }}
                />
              </div>
            </div>
            <div className="h-8 w-px bg-neutral-800" />
            <button onClick={onClose} className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all">
              <Ic name="x" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stepper Navigation */}
        <div className="border-b border-neutral-800/80 px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-neutral-400">{currentStep + 1}</span>
                <span className="text-neutral-600">/</span>
                <span className="text-xs text-neutral-500">{STEPS.length}</span>
              </div>
              <div className="h-3 w-px bg-neutral-800" />
              <span className="text-sm font-medium text-white">{currentStepData.label}</span>
              <span className="text-xs text-neutral-500">— {currentStepData.description}</span>
            </div>
            <div className="flex items-center gap-4">
              {autoSaving && (
                <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                  <span className="w-3 h-3 border-2 border-neutral-600 border-t-[#bb9457] rounded-full animate-spin" />
                  Saving...
                </span>
              )}
              {lastSaved && !autoSaving && (
                <span className="flex items-center gap-1.5 text-xs text-green-500/70">
                  <Ic name="check" className="w-3 h-3" />
                  Saved just now
                </span>
              )}
              {hasUnsavedChanges && !autoSaving && (
                <span className="flex items-center gap-1.5 text-xs text-amber-500">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                  Unsaved
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {STEPS.map((step, idx) => {
              const isCompleted = idx < currentStep
              const isActive = idx === currentStep
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(idx)}
                  className={`group relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all flex-shrink-0 ${
                    isActive
                      ? 'bg-[#bb9457]/10 border border-[#bb9457]/30'
                      : isCompleted
                      ? 'hover:bg-neutral-800/60 border border-transparent'
                      : 'hover:bg-neutral-800/40 border border-transparent'
                  }`}
                  title={`${step.label} — ${step.description}`}
                >
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold transition-all flex-shrink-0 ${
                    isActive
                      ? 'bg-[#bb9457] text-black'
                      : isCompleted
                      ? 'bg-green-500/15 text-green-400'
                      : 'bg-neutral-800 text-neutral-500'
                  }`}>
                    {isCompleted ? <Ic name="check" className="w-3 h-3" /> : idx + 1}
                  </div>
                  <span className={`text-[10px] font-medium leading-tight whitespace-nowrap ${
                    isActive ? 'text-[#bb9457]' : isCompleted ? 'text-green-400/80' : 'text-neutral-500'
                  }`}>
                    {step.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6 space-y-5">
          {/* Loading indicator for related data */}
          {designer && !relatedDataLoaded && (
            <div className="flex items-center gap-3 px-4 py-3 bg-[#bb9457]/10 border border-[#bb9457]/20 rounded-lg">
              <span className="w-4 h-4 border-2 border-[#bb9457]/30 border-t-[#bb9457] rounded-full animate-spin" />
              <span className="text-xs text-[#bb9457] font-medium">Loading designer data...</span>
            </div>
          )}

          {/* Basic Info */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <Card icon="user" title="Identity" subtitle="Name, brand & URL">
                <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Name" required value={form.name} onChange={(e) => { updateField('name', e.target.value); if (!designer) updateField('slug', generateSlug(e.target.value)) }} placeholder="Designer full name" hint="First and last name" />
                  <Input label="Brand" required value={form.brand} onChange={(e) => { updateField('brand', e.target.value) }} placeholder="Brand / label name" hint="Your fashion label or studio name" />
                </div>
                <div className="pt-4">
                  <Input label="Slug" value={form.slug} onChange={(e) => updateField('slug', e.target.value)} placeholder="auto-generated-from-name-brand" hint="URL-friendly identifier, auto-generated from name and brand" />
                </div>
              </Card>

              <Card icon="link" title="Location & Background" subtitle="Where they're based">
                <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Location" value={form.location} onChange={(e) => updateField('location', e.target.value)} placeholder="City, Country" hint="City and country of residence" />
                  <Input label="Nationality" value={form.nationality} onChange={(e) => updateField('nationality', e.target.value)} placeholder="Pakistani" hint="National origin" />
                </div>
                <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Languages" value={form.languages} onChange={(e) => updateField('languages', e.target.value)} placeholder="English, Urdu" hint="Languages spoken" />
                  <Input label="Experience" value={form.experience} onChange={(e) => updateField('experience', e.target.value)} placeholder="5 years" hint="Years in the fashion industry" />
                </div>
              </Card>

              <Card icon="star" title="Specialization" subtitle="Design focus & category">
                <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Specialization" value={form.specialization} onChange={(e) => updateField('specialization', e.target.value)} placeholder="Bridal, Pret, Luxury" hint="Primary design focus areas" />
                  <Input label="Category" value={form.category} onChange={(e) => updateField('category', e.target.value)} placeholder="Womenswear" hint="e.g. Womenswear, Menswear, Accessories" />
                </div>
                <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select label="Gender" value={form.gender} onChange={(e) => updateField('gender', e.target.value)} options={[{ value: '', label: 'Select...' }, { value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'non-binary', label: 'Non-binary' }]} />
                  <Input label="Availability" value={form.availability} onChange={(e) => updateField('availability', e.target.value)} placeholder="Available for commissions" hint="Current availability status" />
                </div>
              </Card>
            </div>
          )}

          {/* Biography */}
          {currentStep === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Form Fields - 3/5 width */}
              <div className="lg:col-span-3 space-y-4">
                <Card icon="document" title="Short Description" subtitle="One-liner for cards and previews">
                  <div className="pt-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[11px] font-medium text-neutral-300 tracking-wide">Short Bio</label>
                      <span className={`text-[10px] font-medium ${form.short_bio.length > 130 ? 'text-amber-500' : form.short_bio.length > 0 ? 'text-neutral-500' : 'text-neutral-600'}`}>{form.short_bio.length}/150</span>
                    </div>
                    <input
                      value={form.short_bio}
                      onChange={(e) => updateField('short_bio', e.target.value)}
                      maxLength={150}
                      placeholder="One-line description for cards and previews"
                      className="w-full bg-neutral-950/80 border border-neutral-800 rounded-md px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-[#bb9457]/60 focus:ring-1 focus:ring-[#bb9457]/20 focus:outline-none transition-all hover:border-neutral-700"
                    />
                    <p className="text-[10px] text-neutral-600 mt-1">Used on designer cards and preview sections</p>
                  </div>
                </Card>

                <Card icon="document" title="Full Story" subtitle="The designer's complete narrative">
                  <div className="pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[11px] font-medium text-neutral-300 tracking-wide">Full Biography</label>
                      <span className="text-[10px] text-neutral-500">{form.bio.length} chars</span>
                    </div>
                    <div className="border border-neutral-800 rounded-lg overflow-hidden">
                      <RichTextEditor content={form.bio} onChange={(html) => updateField('bio', html)} placeholder="Detailed biography covering background, training, and journey..." />
                    </div>
                    <p className="text-[10px] text-neutral-600 mt-1">Tells the designer's complete story on their profile page. Use headings, lists, and formatting for rich content.</p>
                  </div>
                </Card>

                <Card icon="sparkles" title="Creative Vision" subtitle="Why they design">
                  <div className="pt-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[11px] font-medium text-neutral-300 tracking-wide">Design Philosophy</label>
                      <span className="text-[10px] text-neutral-500">{form.philosophy.length} chars</span>
                    </div>
                    <textarea
                      value={form.philosophy}
                      onChange={(e) => updateField('philosophy', e.target.value)}
                      rows={5}
                      placeholder="Design philosophy, inspirations, creative vision, heritage craft..."
                      className="w-full bg-neutral-950/80 border border-neutral-800 rounded-md px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-[#bb9457]/60 focus:ring-1 focus:ring-[#bb9457]/20 focus:outline-none transition-all hover:border-neutral-700 resize-none leading-relaxed"
                    />
                    <p className="text-[10px] text-neutral-600 mt-1">Captures the designer's creative ethos and artistic approach</p>
                  </div>
                </Card>
              </div>

              {/* Live Preview Panel - 2/5 width */}
              <div className="lg:col-span-2">
                <div className="sticky top-32 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-[#bb9457]/10 border border-[#bb9457]/20 rounded-md flex items-center justify-center">
                      <Ic name="eye" className="w-3.5 h-3.5 text-[#bb9457]" />
                    </div>
                    <h3 className="text-sm font-medium text-white">Live Preview</h3>
                  </div>
                  <div className="bg-neutral-950 border border-neutral-800/80 rounded-lg overflow-hidden">
                    {/* Cover Preview */}
                    {form.cover_image_url && (
                      <div className="h-20 bg-neutral-800 overflow-hidden">
                        <img src={form.cover_image_url} alt="Cover" className="w-full h-full object-cover opacity-60" />
                      </div>
                    )}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center text-[#bb9457] font-serif text-lg flex-shrink-0 border border-neutral-700">
                          {form.name ? form.name.charAt(0).toUpperCase() : '?'}
                        </div>
                        <div className="min-w-0">
                          <p className="text-white text-sm font-semibold truncate">{form.name || 'Designer Name'}</p>
                          <p className="text-neutral-500 text-xs truncate">{form.brand || 'Brand'}</p>
                          {form.location && <p className="text-neutral-500 text-[11px] mt-0.5">{form.location}</p>}
                        </div>
                      </div>
                      <div className="h-px bg-neutral-800/80" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-neutral-600 mb-1.5">About</p>
                        <p className="text-neutral-300 text-xs leading-relaxed italic">
                          {form.short_bio || 'No short bio yet...'}
                        </p>
                      </div>
                      {form.philosophy && (
                        <div className="border-l-2 border-[#bb9457]/30 pl-3">
                          <p className="text-[10px] uppercase tracking-wider text-[#bb9457]/60 mb-1">Philosophy</p>
                          <p className="text-neutral-400 text-xs leading-relaxed line-clamp-3">{form.philosophy}</p>
                        </div>
                      )}
                      {form.bio && (
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-neutral-600 mb-1.5">Biography</p>
                          <p className="text-neutral-400 text-xs leading-relaxed line-clamp-4">{form.bio}</p>
                        </div>
                      )}
                      {!form.short_bio && !form.philosophy && !form.bio && (
                        <p className="text-neutral-600 text-xs text-center py-4">Start writing to see a preview...</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Images */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <Card icon="image" title="Profile Image" subtitle="Square photo, min 800x800px">
                <div className="pt-4 flex flex-col sm:flex-row gap-5">
                  <div className="flex-1 space-y-3">
                    <Input label="Image URL" value={form.image_url} onChange={(e) => updateField('image_url', e.target.value)} placeholder="Paste image URL..." />
                    <label className={`relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all group hover:bg-[#bb9457]/5 ${uploadingImage === 'profile' ? 'border-[#bb9457] bg-[#bb9457]/10 pointer-events-none' : 'border-neutral-700 hover:border-[#bb9457]/50'}`}>
                      {uploadingImage === 'profile' ? (
                        <>
                          <span className="w-8 h-8 border-2 border-[#bb9457]/30 border-t-[#bb9457] rounded-full animate-spin mb-2" />
                          <span className="text-xs text-[#bb9457] font-medium">Uploading profile image...</span>
                        </>
                      ) : (
                        <>
                          <Ic name="upload" className="w-6 h-6 text-neutral-500 group-hover:text-[#bb9457] mb-2 transition-colors" />
                          <span className="text-xs text-neutral-400 group-hover:text-neutral-300">Click to upload profile image</span>
                          <span className="text-[10px] text-neutral-600 mt-1">PNG, JPG, WebP up to 10MB</span>
                        </>
                      )}
                      <input type="file" accept="image/*" onChange={(e) => handleDesignerImageUpload(e, 'profile')} className="hidden" disabled={uploadingImage === 'profile'} />
                    </label>
                  </div>
                  {form.image_url ? (
                    <div className="relative group w-32 h-32 flex-shrink-0">
                      <div className="w-full h-full bg-neutral-800 rounded-lg overflow-hidden border border-neutral-700 shadow-lg">
                        <img src={form.image_url} alt="Profile preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      </div>
                      <button onClick={() => updateField('image_url', '')} className="absolute top-2 right-2 p-1.5 bg-black/70 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80">
                        <Ic name="x" className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 flex-shrink-0 bg-neutral-800/30 border border-neutral-800 rounded-lg flex flex-col items-center justify-center text-neutral-600">
                      <Ic name="user" className="w-10 h-10 mb-1" />
                    </div>
                  )}
                </div>
              </Card>

              <Card icon="image" title="Cover Image" subtitle="Wide banner, min 1920x600px">
                <div className="pt-4 space-y-3">
                  <Input label="Cover URL" value={form.cover_image_url} onChange={(e) => updateField('cover_image_url', e.target.value)} placeholder="Paste image URL..." />
                  <label className={`relative flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-lg cursor-pointer transition-all group hover:bg-[#bb9457]/5 ${uploadingImage === 'cover' ? 'border-[#bb9457] bg-[#bb9457]/10 pointer-events-none' : 'border-neutral-700 hover:border-[#bb9457]/50'}`}>
                    {uploadingImage === 'cover' ? (
                      <>
                        <span className="w-8 h-8 border-2 border-[#bb9457]/30 border-t-[#bb9457] rounded-full animate-spin mb-2" />
                        <span className="text-xs text-[#bb9457] font-medium">Uploading cover image...</span>
                      </>
                    ) : (
                      <>
                        <Ic name="upload" className="w-6 h-6 text-neutral-500 group-hover:text-[#bb9457] mb-2 transition-colors" />
                        <span className="text-xs text-neutral-400 group-hover:text-neutral-300">Click to upload cover image</span>
                        <span className="text-[10px] text-neutral-600 mt-1">Wide aspect ratio recommended</span>
                      </>
                    )}
                    <input type="file" accept="image/*" onChange={(e) => handleDesignerImageUpload(e, 'cover')} className="hidden" disabled={uploadingImage === 'cover'} />
                  </label>
                  {form.cover_image_url && (
                    <div className="relative group h-32 w-full rounded-lg overflow-hidden border border-neutral-700">
                      <img src={form.cover_image_url} alt="Cover preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      <button onClick={() => updateField('cover_image_url', '')} className="absolute top-2 right-2 p-1.5 bg-black/70 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80">
                        <Ic name="x" className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          )}

          {/* Collections */}
          {currentStep === 2 && (
            <CollectionsEditor collections={collections} setCollections={setCollections} showToast={showToast} />
          )}

          {/* Education */}
          {currentStep === 4 && (
            <EducationEditor education={education} setEducation={setEducation} />
          )}

          {/* Achievements */}
          {currentStep === 5 && (
            <AchievementsEditor achievements={achievements} setAchievements={setAchievements} />
          )}

          {/* Skills */}
          {currentStep === 6 && (
            <SkillsEditor skills={skills} setSkills={setSkills} />
          )}

          {/* Certifications */}
          {currentStep === 6 && (
            <CertificationsEditor certifications={certifications} setCertifications={setCertifications} />
          )}

          {/* Social Links */}
          {currentStep === 7 && (
            <div className="space-y-4">
              <Card icon="link" title="Social Media" subtitle="Instagram, TikTok, Facebook & more">
                <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Instagram" value={socialLinks.instagram || ''} onChange={(e) => setSocialLinks(p => ({ ...p, instagram: e.target.value }))} placeholder="@handle" hint="Your Instagram handle" />
                  <Input label="TikTok" value={socialLinks.tiktok || ''} onChange={(e) => setSocialLinks(p => ({ ...p, tiktok: e.target.value }))} placeholder="@handle" hint="Your TikTok handle" />
                </div>
                <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Facebook" value={socialLinks.facebook || ''} onChange={(e) => setSocialLinks(p => ({ ...p, facebook: e.target.value }))} placeholder="https://facebook.com/..." hint="Facebook profile URL" />
                  <Input label="Pinterest" value={socialLinks.pinterest || ''} onChange={(e) => setSocialLinks(p => ({ ...p, pinterest: e.target.value }))} placeholder="https://pinterest.com/..." hint="Pinterest profile URL" />
                </div>
                <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="LinkedIn" value={socialLinks.linkedin || ''} onChange={(e) => setSocialLinks(p => ({ ...p, linkedin: e.target.value }))} placeholder="https://linkedin.com/in/..." hint="LinkedIn profile URL" />
                  <Input label="Behance" value={socialLinks.behance || ''} onChange={(e) => setSocialLinks(p => ({ ...p, behance: e.target.value }))} placeholder="https://behance.net/..." hint="Behance portfolio URL" />
                </div>
              </Card>
              <Card icon="document" title="Web Presence" subtitle="Website, portfolio, shop & email">
                <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Website" value={socialLinks.website || ''} onChange={(e) => setSocialLinks(p => ({ ...p, website: e.target.value }))} placeholder="https://..." hint="Personal or brand website" />
                  <Input label="Portfolio" value={socialLinks.portfolio || ''} onChange={(e) => setSocialLinks(p => ({ ...p, portfolio: e.target.value }))} placeholder="https://..." hint="Online portfolio URL" />
                </div>
                <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Shop" value={socialLinks.shop || ''} onChange={(e) => setSocialLinks(p => ({ ...p, shop: e.target.value }))} placeholder="https://..." hint="Online shop URL" />
                  <Input label="Email" value={socialLinks.email || ''} onChange={(e) => setSocialLinks(p => ({ ...p, email: e.target.value }))} placeholder="hello@..." hint="Contact email address" />
                </div>
              </Card>
            </div>
          )}

          {/* Films */}
          {currentStep === 8 && (
            <FilmsEditor films={films} setFilms={setFilms} />
          )}

          {/* Review & Publish */}
          {currentStep === 9 && (
            <div className="space-y-4">
              {/* Profile Completion Checklist */}
              <Card icon="check" title="Profile Completion Checklist" subtitle={`${profileCompletion.completed} of ${profileCompletion.total} sections complete`} badge={`${profileCompletion.percentage}%`}>
                <div className="pt-4 space-y-2">
                  {[
                    { key: 'basic', label: 'Basic Information', desc: 'Name, brand, location', step: 0 },
                    { key: 'biography', label: 'Biography', desc: 'Short bio, full story, philosophy', step: 1 },
                    { key: 'collections', label: 'Collections', desc: 'At least one collection', step: 2 },
                    { key: 'gallery', label: 'Gallery', desc: 'Profile or cover image', step: 3 },
                    { key: 'education', label: 'Education', desc: 'Training & qualifications', step: 4 },
                    { key: 'achievements', label: 'Achievements', desc: 'Awards & recognition', step: 5 },
                    { key: 'skills', label: 'Skills', desc: 'Craft expertise', step: 6 },
                    { key: 'social', label: 'Social Links', desc: 'Instagram or website', step: 7 },
                    { key: 'films', label: 'Films', desc: 'YouTube collection films', step: 8 },
                  ].map(item => {
                    const done = profileCompletion.checks[item.key as keyof typeof profileCompletion.checks]
                    return (
                      <button
                        key={item.key}
                        onClick={() => setCurrentStep(item.step)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                          done ? 'bg-green-500/5 hover:bg-green-500/10' : 'bg-amber-500/5 hover:bg-amber-500/10'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          done ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {done ? <Ic name="check" className="w-3.5 h-3.5" /> : <Ic name="warning" className="w-3.5 h-3.5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${done ? 'text-green-300' : 'text-amber-300'}`}>{item.label}</p>
                          <p className="text-[11px] text-neutral-500">{item.desc}</p>
                        </div>
                        <span className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full ${
                          done ? 'text-green-400 bg-green-500/10' : 'text-amber-400 bg-amber-500/10'
                        }`}>{done ? 'Done' : 'Missing'}</span>
                      </button>
                    )
                  })}
                </div>
              </Card>

              {/* Visibility Settings */}
              <Card icon="eye" title="Visibility Settings" subtitle="Control how this profile appears">
                <div className="pt-4 space-y-4">
                  <div className="flex items-start justify-between gap-4 p-4 bg-neutral-900/50 rounded-lg border border-neutral-800/50">
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium mb-1">Active Status</p>
                      <p className="text-xs text-neutral-500">Designer is visible on the site and can be discovered by visitors</p>
                    </div>
                    <Toggle label="" checked={form.is_active} onChange={(v) => updateField('is_active', v)} />
                  </div>
                  <div className="flex items-start justify-between gap-4 p-4 bg-neutral-900/50 rounded-lg border border-neutral-800/50">
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium mb-1">Featured Designer</p>
                      <p className="text-xs text-neutral-500">Showcase in featured sections and homepage highlights (max 6 featured designers)</p>
                    </div>
                    <Toggle label="" checked={form.is_featured} onChange={(v) => updateField('is_featured', v)} />
                  </div>
                  <div className="p-4 bg-neutral-900/50 rounded-lg border border-neutral-800/50">
                    <p className="text-white text-sm font-medium mb-1">Priority</p>
                    <p className="text-xs text-neutral-500 mb-3">Lower numbers appear first in the directory (1, 2, 3...)</p>
                    <input
                      type="number"
                      min="0"
                      value={form.priority}
                      onChange={(e) => updateField('priority', parseInt(e.target.value) || 0)}
                      className="w-32 bg-neutral-950/80 border border-neutral-800 rounded-md px-3.5 py-2.5 text-sm text-white focus:border-[#bb9457]/60 focus:ring-1 focus:ring-[#bb9457]/20 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </Card>

              {/* Preview Link */}
              {designer && (
                <Card icon="link" title="Preview Public Profile" subtitle="See what visitors will see">
                  <div className="pt-4">
                    <a
                      href={`/designers/${designer.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs uppercase tracking-wider font-medium rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Open Profile
                    </a>
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>

        {/* Sticky Footer Action Bar */}
        <div className="sticky bottom-0 bg-neutral-900/98 backdrop-blur-md border-t border-neutral-800/80 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="px-4 py-2.5 text-sm text-neutral-400 hover:text-white transition-all rounded-lg hover:bg-neutral-800 font-medium">
              Cancel
            </button>
            {!isFirstStep && (
              <button
                onClick={() => setCurrentStep(s => s - 1)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-neutral-700 rounded-lg transition-all font-medium"
              >
                <Ic name="chevronLeft" className="w-4 h-4" /> Previous
              </button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <Ic name="check" className="w-3.5 h-3.5 text-green-400" />
                <span>{profileCompletion.completed}/{profileCompletion.total} complete</span>
              </div>
              <div className="h-4 w-px bg-neutral-800" />
              <span className="text-[11px] text-neutral-600">⌘S to save</span>
            </div>
            {!isLastStep ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2.5 bg-neutral-800 text-white text-xs uppercase tracking-wider font-medium hover:bg-neutral-700 transition-all rounded-lg disabled:opacity-50"
                >
                  <Ic name="save" className="w-3.5 h-3.5" /> Save Draft
                </button>
                <button
                  onClick={() => setCurrentStep(s => s + 1)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#bb9457] text-black text-xs uppercase tracking-wider font-semibold hover:bg-white transition-all rounded-lg"
                >
                  Next <Ic name="chevronRight" className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {designer && (
                  <a
                    href={`/designers/${designer.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 text-neutral-400 hover:text-white border border-neutral-700 hover:border-neutral-600 text-xs uppercase tracking-wider font-medium rounded-lg transition-all"
                  >
                    <Ic name="eye" className="w-3.5 h-3.5" /> Preview
                  </a>
                )}
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2.5 bg-neutral-800 text-white text-xs uppercase tracking-wider font-medium hover:bg-neutral-700 transition-all rounded-lg disabled:opacity-50"
                >
                  <Ic name="save" className="w-4 h-4" /> Save
                </button>
                <button
                  onClick={handlePublish}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#bb9457] text-black text-xs uppercase tracking-wider font-semibold hover:bg-white transition-all rounded-lg disabled:opacity-50"
                >
                  {saving ? (
                    <><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Publishing...</>
                  ) : (
                    <><Ic name="sparkles" className="w-4 h-4" /> Publish</>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-8 right-8 z-[60] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl border transition-all animate-in slide-in-from-bottom-4 ${
          toast.type === 'success' ? 'bg-green-950/95 border-green-800/50 text-green-100' :
          toast.type === 'error' ? 'bg-red-950/95 border-red-800/50 text-red-100' :
          'bg-neutral-900/95 border-neutral-700/50 text-white'
        }`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
            toast.type === 'success' ? 'bg-green-500/20' : toast.type === 'error' ? 'bg-red-500/20' : 'bg-neutral-700'
          }`}>
            {toast.type === 'success' && <Ic name="check" className="w-3.5 h-3.5 text-green-400" />}
            {toast.type === 'error' && <Ic name="warning" className="w-3.5 h-3.5 text-red-400" />}
            {toast.type === 'info' && <Ic name="info" className="w-3.5 h-3.5 text-neutral-300" />}
          </div>
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  )
}

// ══════════════════════════════════════════
// SUB-EDITORS
// ══════════════════════════════════════════

// Collections Editor with Image Upload
const CollectionsEditor = ({ collections, setCollections, showToast }: { collections: DesignerCollection[]; setCollections: (v: DesignerCollection[]) => void; showToast: (message: string, type: 'success' | 'error' | 'info') => void }) => {
  const [uploading, setUploading] = useState<string | null>(null)
  const [previewCol, setPreviewCol] = useState<DesignerCollection | null>(null)

  const addCollection = () => {
    setCollections([...collections, { id: '', designer_id: '', title: '', season: '', description: '', inspiration: '', looks: null, cover_image_url: '', images: null, is_latest: false, created_at: '' }])
  }

  const updateCollection = (idx: number, field: string, value: string | number | boolean | string[] | null) => {
    const updated = [...collections]
    updated[idx] = { ...updated[idx], [field]: value }
    // If marking as latest, unmark all others
    if (field === 'is_latest' && value === true) {
      updated.forEach((c, i) => {
        if (i !== idx) c.is_latest = false
      })
    }
    setCollections(updated)
  }

  const removeCollection = (idx: number) => {
    setCollections(collections.filter((_, i) => i !== idx))
  }

  const duplicateCollection = (idx: number) => {
    const copy = { ...collections[idx], id: '', is_latest: false, title: `${collections[idx].title} (Copy)` }
    const updated = [...collections]
    updated.splice(idx + 1, 0, copy)
    setCollections(updated)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, idx: number, type: 'cover' | 'gallery') => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // Validate all files
    for (let i = 0; i < files.length; i++) {
      if (!files[i].type.startsWith('image/')) {
        showToast('Please select only image files', 'error')
        return
      }
      if (files[i].size > 10 * 1024 * 1024) {
        showToast(`File ${files[i].name} is too large (max 10MB)`, 'error')
        return
      }
    }

    const uploadKey = `${idx}-${type}`
    setUploading(uploadKey)
    showToast(`Uploading ${files.length} image${files.length > 1 ? 's' : ''}...`, 'info')

    try {
      const uploadedUrls: string[] = []
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const fileExt = file.name.split('.').pop()
        const fileName = `collections/${Date.now()}-${Math.random().toString(36).substring(2)}-${i}.${fileExt}`

        const { data, error } = await supabase.storage
          .from('designers')
          .upload(fileName, file, { cacheControl: '31536000', upsert: false })

        if (error) throw error

        const { data: urlData } = supabase.storage
          .from('designers')
          .getPublicUrl(data.path)
        
        uploadedUrls.push(urlData.publicUrl)
      }

      if (type === 'cover') {
        updateCollection(idx, 'cover_image_url', uploadedUrls[0])
      } else {
        const currentImages = collections[idx].images || []
        updateCollection(idx, 'images', [...currentImages, ...uploadedUrls])
      }
      showToast(`${files.length} image${files.length > 1 ? 's' : ''} uploaded successfully`, 'success')
    } catch (error) {
      console.error('Error uploading images:', error)
      showToast('Error uploading images. Please try again.', 'error')
    } finally {
      setUploading(null)
      // Reset the input value so the same files can be selected again
      e.target.value = ''
    }
  }

  const removeGalleryImage = (colIdx: number, imgIdx: number) => {
    const currentImages = collections[colIdx].images || []
    const updatedImages = currentImages.filter((_, i) => i !== imgIdx)
    updateCollection(colIdx, 'images', updatedImages.length > 0 ? updatedImages : null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeader icon="collection" title={`Collections (${collections.length})`} />
        <button onClick={addCollection} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#bb9457] hover:bg-[#bb9457]/10 border border-[#bb9457]/20 rounded-md transition-colors">
          <Ic name="plus" className="w-3.5 h-3.5" /> Add Collection
        </button>
      </div>

      {/* Separate Latest and Previous Collections */}
      {(() => {
        const latestCol = collections.find(c => c.is_latest)
        const previousCols = collections.filter(c => !c.is_latest)
        
        return (
          <>
            {/* Latest Collection Section */}
            {latestCol && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-[#bb9457]/10 text-[#bb9457] border border-[#bb9457]/30 rounded-sm">Latest</span>
                  <span className="text-[10px] text-neutral-500">This appears as the main collection on the profile</span>
                </div>
                {renderCollectionCard(latestCol, collections.indexOf(latestCol))}
              </div>
            )}

            {/* Previous Collections Section */}
            {previousCols.length > 0 && (
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-neutral-800" />
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500">Previous Collections</span>
                  <div className="h-px flex-1 bg-neutral-800" />
                </div>
                {previousCols.map(col => renderCollectionCard(col, collections.indexOf(col)))}
              </div>
            )}

            {/* No Latest Collection Warning */}
            {!latestCol && collections.length > 0 && (
              <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-sm">
                <p className="text-yellow-400 text-xs">⚠️ No collection marked as "Latest". Toggle "Mark as Latest Collection" on one collection to display it as the main collection on the profile.</p>
              </div>
            )}

            {/* Empty State */}
            {collections.length === 0 && (
              <div className="p-8 border border-neutral-800 border-dashed text-center">
                <p className="text-neutral-500 text-sm mb-2">No collections yet</p>
                <button onClick={addCollection} className="text-[#bb9457] text-xs hover:underline">Add your first collection</button>
              </div>
            )}
          </>
        )
      })()}
      {/* Collection Preview Modal */}
      {previewCol && <CollectionPreview collection={previewCol} onClose={() => setPreviewCol(null)} />}
    </div>
  )

  function renderCollectionCard(col: DesignerCollection, idx: number) {
    return (
      <div key={idx} className="bg-neutral-950 border border-neutral-800 rounded-sm overflow-hidden">
        {/* Collection Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/50 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-500">Collection #{idx + 1}</span>
            {col.is_latest && (
              <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-[#bb9457]/10 text-[#bb9457] border border-[#bb9457]/30 rounded-sm">Latest</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setPreviewCol(col)} className="p-1.5 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-md transition-all" title="Preview">
              <Ic name="eye" className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => duplicateCollection(idx)} className="p-1.5 text-neutral-500 hover:text-[#bb9457] hover:bg-[#bb9457]/10 rounded-md transition-all" title="Duplicate">
              <Ic name="duplicate" className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => removeCollection(idx)} className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-all" title="Delete">
              <Ic name="trash" className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

          <div className="p-4 space-y-4">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Title *" value={col.title} onChange={(e) => updateCollection(idx, 'title', e.target.value)} placeholder="Collection name" />
              <Input label="Season" value={col.season || ''} onChange={(e) => updateCollection(idx, 'season', e.target.value)} placeholder="SS26, FW25, Bridal 2024" />
            </div>

            <Textarea label="Description" value={col.description || ''} onChange={(e) => updateCollection(idx, 'description', e.target.value)} rows={2} placeholder="Collection concept and story..." />
            
            <Input label="Inspiration" value={col.inspiration || ''} onChange={(e) => updateCollection(idx, 'inspiration', e.target.value)} placeholder="Creative inspiration behind the collection" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Number of Looks" type="number" value={col.looks?.toString() || ''} onChange={(e) => updateCollection(idx, 'looks', parseInt(e.target.value) || 0)} />
              <div className="flex items-end">
                <Toggle label="Mark as Latest Collection" checked={col.is_latest} onChange={(v) => updateCollection(idx, 'is_latest', v)} />
              </div>
            </div>

            {/* Cover Image Upload */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-neutral-800/60">
                <div className="w-6 h-6 bg-[#bb9457]/10 border border-[#bb9457]/20 rounded flex items-center justify-center">
                  <Ic name="image" className="w-3 h-3 text-[#bb9457]" />
                </div>
                <p className="text-xs font-medium text-neutral-300">Cover Image</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Upload Area */}
                <div className="flex-1">
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">Cover Image</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={col.cover_image_url || ''}
                      onChange={(e) => updateCollection(idx, 'cover_image_url', e.target.value)}
                      placeholder="Paste URL or upload"
                      className="flex-1 bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-sm text-white placeholder-neutral-600 focus:border-[#bb9457]/50 focus:outline-none transition-colors"
                    />
                    <label className={`flex items-center gap-2 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs uppercase tracking-wider font-medium rounded-sm cursor-pointer transition-colors ${uploading === `${idx}-cover` ? 'opacity-50 pointer-events-none' : ''}`}>
                      {uploading === `${idx}-cover` ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Ic name="image" className="w-4 h-4" />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, idx, 'cover')}
                        className="hidden"
                      />
                      Upload
                    </label>
                  </div>
                </div>

                {/* Preview */}
                {col.cover_image_url ? (
                  <div className="relative group w-24 h-24 flex-shrink-0">
                    <div className="w-full h-full bg-neutral-800 rounded-sm overflow-hidden border border-neutral-700">
                      <img src={col.cover_image_url} alt="Cover preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                    </div>
                    <button
                      onClick={() => updateCollection(idx, 'cover_image_url', '')}
                      className="absolute top-1 right-1 p-1 bg-black/60 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Ic name="x" className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 flex-shrink-0 bg-neutral-800/50 border-2 border-dashed border-neutral-700 rounded-sm flex items-center justify-center">
                    <Ic name="image" className="w-6 h-6 text-neutral-600" />
                  </div>
                )}
              </div>
            </div>

            {/* Gallery Images Upload */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-neutral-800/60">
                <div className="w-6 h-6 bg-[#bb9457]/10 border border-[#bb9457]/20 rounded flex items-center justify-center">
                  <Ic name="image" className="w-3 h-3 text-[#bb9457]" />
                </div>
                <p className="text-xs font-medium text-neutral-300">Gallery Images</p>
              </div>

              <div className="space-y-3">
                {/* Existing Gallery Images */}
                {col.images && col.images.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {col.images.map((img, imgIdx) => (
                      <div key={imgIdx} className="relative group w-20 h-20">
                        <div className="w-full h-full bg-neutral-800 rounded-sm overflow-hidden border border-neutral-700">
                          <img src={img} alt={`Gallery ${imgIdx + 1}`} className="w-full h-full object-cover" />
                        </div>
                        <button
                          onClick={() => removeGalleryImage(idx, imgIdx)}
                          className="absolute top-1 right-1 p-1 bg-black/60 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Ic name="x" className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload Button */}
                <label className={`inline-flex items-center gap-2 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs uppercase tracking-wider font-medium rounded-sm cursor-pointer transition-colors ${uploading === `${idx}-gallery` ? 'opacity-50 pointer-events-none' : ''}`}>
                  {uploading === `${idx}-gallery` ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Ic name="plus" className="w-4 h-4" />
                  )}
                  Add to Gallery
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e, idx, 'gallery')}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )
  }
}

// Education Editor
const EducationEditor = ({ education, setEducation }: { education: DesignerEducation[]; setEducation: (v: DesignerEducation[]) => void }) => {
  const add = () => setEducation([...education, { id: '', designer_id: '', institution: '', degree: '', year: '', created_at: '' }])
  const update = (idx: number, field: string, value: string) => {
    const updated = [...education]
    updated[idx] = { ...updated[idx], [field]: value }
    setEducation(updated)
  }
  const remove = (idx: number) => setEducation(education.filter((_, i) => i !== idx))

  return (
    <div className="space-y-4">
      <Card icon="academic" title="Education & Training" subtitle="Academic background and qualifications" badge={`${education.length} entries`}>
        <div className="pt-4 space-y-3">
          {education.map((edu, idx) => (
            <div key={idx} className="bg-neutral-900/50 border border-neutral-800/60 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500">Education #{idx + 1}</span>
                <button onClick={() => remove(idx)} className="text-red-400 hover:text-red-300"><Ic name="trash" className="w-4 h-4" /></button>
              </div>
              <Input label="Institution" value={edu.institution} onChange={(e) => update(idx, 'institution', e.target.value)} placeholder="University / School name" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input label="Degree" value={edu.degree || ''} onChange={(e) => update(idx, 'degree', e.target.value)} placeholder="BFA, MFA, Diploma" />
                <Input label="Year" value={edu.year || ''} onChange={(e) => update(idx, 'year', e.target.value)} placeholder="2020 - 2024" />
              </div>
            </div>
          ))}
          <button onClick={add} className="flex items-center gap-1.5 px-3 py-2 text-xs text-[#bb9457] hover:bg-[#bb9457]/10 border border-[#bb9457]/20 rounded-lg transition-colors w-full justify-center">
            <Ic name="plus" className="w-3.5 h-3.5" /> Add Education
          </button>
        </div>
      </Card>
    </div>
  )
}

// Achievements Editor
const AchievementsEditor = ({ achievements, setAchievements }: { achievements: DesignerAchievement[]; setAchievements: (v: DesignerAchievement[]) => void }) => {
  const add = () => setAchievements([...achievements, { id: '', designer_id: '', title: '', detail: '', created_at: '' }])
  const update = (idx: number, field: string, value: string) => {
    const updated = [...achievements]
    updated[idx] = { ...updated[idx], [field]: value }
    setAchievements(updated)
  }
  const remove = (idx: number) => setAchievements(achievements.filter((_, i) => i !== idx))

  return (
    <div className="space-y-4">
      <Card icon="trophy" title="Awards & Recognition" subtitle="Achievements and honors" badge={`${achievements.length} awards`}>
        <div className="pt-4 space-y-3">
          {achievements.map((ach, idx) => (
            <div key={idx} className="bg-neutral-900/50 border border-neutral-800/60 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500">Achievement #{idx + 1}</span>
                <button onClick={() => remove(idx)} className="text-red-400 hover:text-red-300"><Ic name="trash" className="w-4 h-4" /></button>
              </div>
              <Input label="Title" value={ach.title} onChange={(e) => update(idx, 'title', e.target.value)} placeholder="Award / recognition name" />
              <Textarea label="Details" value={ach.detail || ''} onChange={(e) => update(idx, 'detail', e.target.value)} rows={2} placeholder="Brief description" />
            </div>
          ))}
          <button onClick={add} className="flex items-center gap-1.5 px-3 py-2 text-xs text-[#bb9457] hover:bg-[#bb9457]/10 border border-[#bb9457]/20 rounded-lg transition-colors w-full justify-center">
            <Ic name="plus" className="w-3.5 h-3.5" /> Add Achievement
          </button>
        </div>
      </Card>
    </div>
  )
}

// Skills Editor
const SkillsEditor = ({ skills, setSkills }: { skills: DesignerSkill[]; setSkills: (v: DesignerSkill[]) => void }) => {
  const skillNames = skills.map(s => s.skill)
  const updateSkills = (names: string[]) => {
    setSkills(names.map(name => ({ id: '', designer_id: '', skill: name, created_at: '' })))
  }
  return (
    <div className="space-y-4">
      <Card icon="star" title="Skills & Expertise" subtitle="Craft techniques and specializations" badge={`${skills.length} skills`}>
        <div className="pt-4">
          <TagInput
            label="Design Skills"
            tags={skillNames}
            onChange={updateSkills}
            placeholder="e.g. Bridal Couture, Embroidery, Draping..."
            hint="Press Enter to add each skill. These appear as tags on the designer profile."
          />
        </div>
      </Card>
    </div>
  )
}

// Certifications Editor
const CertificationsEditor = ({ certifications, setCertifications }: { certifications: DesignerCertification[]; setCertifications: (v: DesignerCertification[]) => void }) => {
  const certNames = certifications.map(c => c.certification)
  const updateCerts = (names: string[]) => {
    setCertifications(names.map(name => ({ id: '', designer_id: '', certification: name, created_at: '' })))
  }
  return (
    <div className="space-y-4">
      <Card icon="document" title="Certifications" subtitle="Professional qualifications & training" badge={`${certifications.length} certs`}>
        <div className="pt-4">
          <TagInput
            label="Professional Certifications"
            tags={certNames}
            onChange={updateCerts}
            placeholder="e.g. Certified Pattern Maker, Textile Design Certificate..."
            hint="Press Enter to add each certification."
          />
        </div>
      </Card>
    </div>
  )
}

// Films Editor
const FilmsEditor = ({ films, setFilms }: { films: DesignerFilm[]; setFilms: (v: DesignerFilm[]) => void }) => {
  const add = () => setFilms([...films, { id: '', designer_id: '', title: '', description: '', youtube_url: '', thumbnail_url: null, display_order: films.length, created_at: '' }])
  const update = (idx: number, field: string, value: string) => {
    const updated = [...films]
    updated[idx] = { ...updated[idx], [field]: value }
    setFilms(updated)
  }
  const remove = (idx: number) => setFilms(films.filter((_, i) => i !== idx))

  return (
    <div className="space-y-4">
      <Card icon="film" title="Collection Films" subtitle="YouTube videos for lookbooks, behind-the-scenes & collection films" badge={`${films.length} films`}>
        <div className="pt-4 space-y-3">
          {films.map((film, idx) => (
            <div key={idx} className="bg-neutral-900/50 border border-neutral-800/60 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500">Film #{idx + 1}</span>
                <button onClick={() => remove(idx)} className="text-red-400 hover:text-red-300"><Ic name="trash" className="w-4 h-4" /></button>
              </div>
              <Input label="Title" value={film.title} onChange={(e) => update(idx, 'title', e.target.value)} placeholder="Collection film title" />
              <Input label="YouTube URL" value={film.youtube_url} onChange={(e) => update(idx, 'youtube_url', e.target.value)} placeholder="https://www.youtube.com/watch?v=..." hint="Full YouTube URL or embed link" />
              <Textarea label="Description" value={film.description || ''} onChange={(e) => update(idx, 'description', e.target.value)} rows={2} placeholder="Brief description of the film" />
              {/* Preview */}
              {film.youtube_url && (
                <div className="mt-2">
                  <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">Preview</p>
                  <div className="aspect-video rounded-lg overflow-hidden bg-neutral-950 border border-neutral-800 max-w-sm">
                    <iframe
                      src={film.youtube_url.includes('/embed/') ? film.youtube_url : `https://www.youtube.com/embed/${film.youtube_url.match(/(?:youtu\.be\/|[?&]v=)([^&]+)/)?.[1] || ''}`}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={film.title || `Film ${idx + 1}`}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
          <button onClick={add} className="flex items-center gap-1.5 px-3 py-2 text-xs text-[#bb9457] hover:bg-[#bb9457]/10 border border-[#bb9457]/20 rounded-lg transition-colors w-full justify-center">
            <Ic name="plus" className="w-3.5 h-3.5" /> Add Film
          </button>
        </div>
      </Card>
    </div>
  )
}

export default DesignerManagement
