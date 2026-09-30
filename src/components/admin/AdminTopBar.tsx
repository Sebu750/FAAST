import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

type TabKey = 'overview' | 'spotlight' | 'marketplace' | 'studio-waitlist' | 'partnership' | 'newsletter' | 'contact' | 'blog' | 'designers' | 'events'

interface AdminTopBarProps {
  activeTab: TabKey
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

const AdminTopBar = ({ activeTab, mobileMenuOpen, setMobileMenuOpen }: AdminTopBarProps) => {
  const [adminEmail, setAdminEmail] = useState('')

  useEffect(() => {
    const getEmail = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email) setAdminEmail(user.email)
    }
    getEmail()
  }, [])

  const initials = adminEmail ? adminEmail.charAt(0).toUpperCase() : 'A'

  return (
    <header className="bg-neutral-900 border-b border-neutral-800 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors rounded-sm"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <h2 className="text-base sm:text-xl font-semibold text-white capitalize">
              {activeTab === 'studio-waitlist' ? 'Studio Waitlist' : activeTab}
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5 hidden sm:block">Manage and monitor</p>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm text-white font-medium">{adminEmail || 'Admin'}</p>
            <p className="text-xs text-neutral-500">Administrator</p>
          </div>
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#bb9457]/20 border border-[#bb9457]/30 rounded-full flex items-center justify-center">
            <span className="text-[#bb9457] font-semibold text-sm sm:text-base">{initials}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminTopBar
