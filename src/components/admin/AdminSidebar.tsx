import { Icon } from './shared'

type TabKey = 'overview' | 'spotlight' | 'marketplace' | 'studio-waitlist' | 'partnership' | 'newsletter' | 'contact' | 'blog' | 'designers' | 'events'

interface AdminSidebarProps {
  activeTab: TabKey
  setActiveTab: (tab: TabKey) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
  onLogout: () => void
  counts: {
    spotlight: number
    marketplace: number
    studioWaitlist: number
    partnership: number
    contact: number
    newsletter: number
  }
}

const AdminSidebar = ({
  activeTab,
  setActiveTab,
  mobileMenuOpen,
  setMobileMenuOpen,
  sidebarCollapsed,
  setSidebarCollapsed,
  onLogout,
  counts,
}: AdminSidebarProps) => {
  const navItem = (tab: TabKey, label: string, icon: string, badge?: number) => (
    <button
      onClick={() => {
        setActiveTab(tab)
        setMobileMenuOpen(false)
      }}
      className={`w-full flex items-center transition-all ${
        sidebarCollapsed ? 'lg:justify-center lg:px-3' : ''
      } px-4 py-3 gap-3 text-sm ${
        activeTab === tab
          ? 'bg-[#bb9457]/10 text-[#bb9457] border-r-2 border-[#bb9457]'
          : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
      }`}
      title={sidebarCollapsed ? label : ''}
    >
      <Icon name={icon} className="w-5 h-5 flex-shrink-0" />
      {!sidebarCollapsed && <span className="hidden lg:inline">{label}</span>}
      {sidebarCollapsed && <span className="lg:hidden">{label}</span>}
      {badge !== undefined && badge > 0 && (
        <span className={`ml-auto bg-[#bb9457]/20 text-[#bb9457] text-xs px-2 py-0.5 rounded-full ${
          sidebarCollapsed ? 'lg:ml-0 lg:absolute lg:top-2 lg:right-2 lg:px-1.5 lg:py-0.5 lg:text-[10px]' : ''
        }`}>
          {badge}
        </span>
      )}
    </button>
  )

  const sectionLabel = (text: string) => (
    <div className={`mt-6 mb-2 ${sidebarCollapsed ? 'lg:px-3' : 'px-4'} px-4`}>
      {!sidebarCollapsed && (
        <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold hidden lg:block">{text}</p>
      )}
    </div>
  )

  return (
    <>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside className={`bg-neutral-900 border-r border-neutral-800 flex flex-col fixed h-full transition-all duration-300 z-50 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'} w-64`}>
        {/* Logo */}
        <div className={`border-b border-neutral-800 ${sidebarCollapsed ? 'lg:p-4' : 'p-6'} p-6`}>
          <div className="flex items-center justify-between">
            <h1 className={`font-semibold tracking-wider text-white uppercase transition-all duration-300 ${
              sidebarCollapsed ? 'lg:text-xs lg:tracking-widest' : 'text-lg'
            }`}>
              {sidebarCollapsed ? (
                <span className="hidden lg:block text-[#bb9457] text-2xl font-serif">A</span>
              ) : (
                <>Adorzia <span className="text-[#bb9457] font-light">Admin</span></>
              )}
            </h1>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors rounded-sm"
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          </div>
          {!sidebarCollapsed && (
            <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-widest hidden lg:block">Management Console</p>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className={`mb-2 ${sidebarCollapsed ? 'lg:px-3' : 'px-4'} px-4`}>
            {!sidebarCollapsed && (
              <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold hidden lg:block">Main</p>
            )}
          </div>
          {navItem('overview', 'Overview', 'grid')}

          {sectionLabel('Applications')}
          {navItem('spotlight', 'Spotlight', 'star', counts.spotlight)}
          {navItem('marketplace', 'Marketplace', 'shopping-bag', counts.marketplace)}
          {navItem('studio-waitlist', 'Studio Waitlist', 'users', counts.studioWaitlist)}

          {sectionLabel('Content')}
          {navItem('blog', 'Journal', 'newspaper')}
          {navItem('designers', 'Designers', 'palette')}
          {navItem('events', 'Events', 'calendar')}

          {sectionLabel('Inquiries')}
          {navItem('partnership', 'Partnership', 'handshake', counts.partnership)}
          {navItem('contact', 'Contact', 'message-square', counts.contact)}

          {sectionLabel('Subscribers')}
          {navItem('newsletter', 'Newsletter', 'mail', counts.newsletter)}
        </nav>

        {/* Logout */}
        <div className={`border-t border-neutral-800 ${sidebarCollapsed ? 'lg:p-3' : 'p-4'} p-4`}>
          <button
            onClick={() => {
              onLogout()
              setMobileMenuOpen(false)
            }}
            className={`w-full flex items-center transition-all text-red-400 hover:bg-red-600/10 rounded-sm ${
              sidebarCollapsed ? 'lg:justify-center lg:px-3 lg:py-3' : ''
            } px-4 py-3 gap-3 text-sm`}
            title={sidebarCollapsed ? 'Sign Out' : ''}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v0a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v0" />
            </svg>
            {!sidebarCollapsed && <span className="hidden lg:inline">Sign Out</span>}
            {sidebarCollapsed && <span className="lg:hidden">Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  )
}

export default AdminSidebar
