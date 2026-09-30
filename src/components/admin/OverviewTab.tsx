import { Icon } from './shared'
import type { DashboardCounts } from './shared'

export interface ActivityItem {
  id: string
  type: 'Spotlight' | 'Marketplace' | 'Studio' | 'Partnership' | 'Contact' | 'Newsletter'
  name: string
  email: string
  detail: string
  status?: string
  created_at: string
}

type TabKey = 'overview' | 'spotlight' | 'marketplace' | 'studio-waitlist' | 'partnership' | 'newsletter' | 'contact' | 'blog' | 'designers' | 'events'

interface OverviewTabProps {
  counts: DashboardCounts | null
  activity: ActivityItem[]
  onNavigate: (tab: TabKey) => void
}

const OverviewTab = ({ counts, activity, onNavigate }: OverviewTabProps) => {
  if (!counts) return null

  const statCards = [
    { label: 'Spotlight Pending', value: counts.spotlight_pending, week: counts.spotlight_week, icon: 'star', color: 'from-[#bb9457]/20 to-[#bb9457]/10', borderColor: 'border-[#bb9457]/30', textColor: 'text-[#bb9457]' },
    { label: 'Marketplace Pending', value: counts.marketplace_pending, week: counts.marketplace_week, icon: 'shopping-bag', color: 'from-green-600/20 to-green-800/20', borderColor: 'border-green-600/30', textColor: 'text-green-400' },
    { label: 'Studio Waitlist', value: counts.studio_waitlist_total, week: counts.studio_week, icon: 'users', color: 'from-purple-600/20 to-purple-800/20', borderColor: 'border-purple-600/30', textColor: 'text-purple-400' },
    { label: 'Partnership Pending', value: counts.partnership_pending, week: counts.partnership_week, icon: 'handshake', color: 'from-orange-600/20 to-orange-800/20', borderColor: 'border-orange-600/30', textColor: 'text-orange-400' },
    { label: 'Contact Inquiries', value: counts.inquiries_today, week: counts.contact_week, icon: 'message-square', color: 'from-blue-600/20 to-blue-800/20', borderColor: 'border-blue-600/30', textColor: 'text-blue-400', weekLabel: 'today' },
    { label: 'Newsletter Subscribers', value: counts.newsletter_total, week: counts.newsletter_week, icon: 'mail', color: 'from-teal-600/20 to-teal-800/20', borderColor: 'border-teal-600/30', textColor: 'text-teal-400' },
    { label: 'Journal Articles', value: counts.blog_total, icon: 'newspaper', color: 'from-amber-600/20 to-amber-800/20', borderColor: 'border-amber-600/30', textColor: 'text-amber-400' },
    { label: 'Designers', value: counts.designers_total, icon: 'palette', color: 'from-pink-600/20 to-pink-800/20', borderColor: 'border-pink-600/30', textColor: 'text-pink-400' },
  ]

  const typeBadgeColors: Record<string, string> = {
    'Spotlight': 'bg-[#bb9457]/15 text-[#bb9457] border-[#bb9457]/25',
    'Marketplace': 'bg-green-600/15 text-green-400 border-green-600/25',
    'Studio': 'bg-purple-600/15 text-purple-400 border-purple-600/25',
    'Partnership': 'bg-orange-600/15 text-orange-400 border-orange-600/25',
    'Contact': 'bg-blue-600/15 text-blue-400 border-blue-600/25',
    'Newsletter': 'bg-teal-600/15 text-teal-400 border-teal-600/25',
  }

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

  const quickActions = [
    { label: 'Review Applications', tab: 'spotlight' as TabKey, icon: 'star', description: `${counts.spotlight_pending} pending` },
    { label: 'View Messages', tab: 'contact' as TabKey, icon: 'message-square', description: `${counts.inquiries_today} today` },
    { label: 'Manage Designers', tab: 'designers' as TabKey, icon: 'palette', description: `${counts.designers_active} active` },
    { label: 'New Journal Post', tab: 'blog' as TabKey, icon: 'newspaper', description: `${counts.blog_drafts} drafts` },
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-neutral-900 to-neutral-900/50 border border-neutral-800 rounded-sm p-6 sm:p-8">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-normal mb-2">
              Welcome to <span className="text-[#bb9457] italic font-light">Adorzia</span> Admin
            </h2>
            <p className="text-neutral-400 text-sm font-light">
              Monitor applications, inquiries, and platform activity
            </p>
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-neutral-500 text-xs uppercase tracking-widest">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => onNavigate(action.tab)}
            className="group bg-neutral-900 border border-neutral-800 rounded-sm p-4 sm:p-5 text-left hover:border-[#bb9457]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#bb9457]/5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="text-[#bb9457] opacity-60 group-hover:opacity-100 transition-opacity">
                <Icon name={action.icon} className="w-5 h-5" />
              </div>
              <span className="text-white text-sm font-medium">{action.label}</span>
            </div>
            <p className="text-neutral-500 text-xs">{action.description}</p>
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className={`bg-gradient-to-br ${stat.color} border ${stat.borderColor} rounded-sm p-5 sm:p-6 hover:border-opacity-60 transition-all duration-300 hover:shadow-lg group`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400 mb-3 font-semibold">{stat.label}</p>
                <p className={`text-4xl sm:text-5xl lg:text-6xl font-light font-serif ${stat.textColor} group-hover:scale-105 transition-transform duration-300 origin-left`}>{stat.value}</p>
                {stat.week !== undefined && (
                  <div className="flex items-center gap-1.5 mt-3">
                    {stat.week > 0 ? (
                      <>
                        <Icon name="arrow-up" className="w-3 h-3 text-green-400" />
                        <span className="text-green-400 text-xs font-medium">+{stat.week} this week</span>
                      </>
                    ) : stat.week < 0 ? (
                      <>
                        <Icon name="arrow-down" className="w-3 h-3 text-red-400" />
                        <span className="text-red-400 text-xs font-medium">{stat.week} this week</span>
                      </>
                    ) : (
                      <span className="text-neutral-600 text-xs">No change this week</span>
                    )}
                  </div>
                )}
              </div>
              <div className={`${stat.textColor} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}>
                <Icon name={stat.icon} className="w-7 h-7 sm:w-9 sm:h-9" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cross-Type Activity Feed */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-neutral-800">
          <h3 className="text-xl font-serif text-white font-normal flex items-center gap-4">
            <span className="w-1.5 h-8 bg-[#bb9457] rounded-sm" />
            Recent Activity
          </h3>
          <p className="text-neutral-500 text-xs mt-2 ml-5">Latest submissions across all channels</p>
        </div>
        <div className="p-6 sm:p-8">
          {activity.length > 0 ? (
            <div className="space-y-3">
              {activity.map((item) => (
                <div key={`${item.type}-${item.id}`} className="bg-neutral-950/50 border border-neutral-800 rounded-sm p-5 hover:border-neutral-700 transition-colors duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-full border text-[10px] uppercase tracking-wider font-semibold ${typeBadgeColors[item.type] || 'bg-neutral-600/20 text-neutral-400 border-neutral-600/30'}`}>
                          {item.type}
                        </span>
                        {item.status && (
                          <span className={`px-2 py-0.5 rounded-full border text-[10px] uppercase tracking-wider font-semibold ${statusColors[item.status] || 'bg-neutral-600/20 text-neutral-400 border-neutral-600/30'}`}>
                            {item.status.replace('_', ' ')}
                          </span>
                        )}
                      </div>
                      <p className="text-white font-medium truncate">{item.name}</p>
                      <p className="text-sm text-neutral-400 truncate">{item.email}</p>
                      {item.detail && (
                        <p className="text-xs text-neutral-500 mt-1 line-clamp-1">{item.detail}</p>
                      )}
                    </div>
                    <p className="text-xs text-neutral-600 whitespace-nowrap flex-shrink-0">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-600 text-sm">No recent activity</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OverviewTab
