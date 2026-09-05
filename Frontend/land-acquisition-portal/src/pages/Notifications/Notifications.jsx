import React from 'react'
import { Bell, Check, FileText, IndianRupee, MapPinned } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import EmptyState from '../../components/common/EmptyState'
import { useNotifications } from '../../hooks/useNotifications'

const TYPE_ICON = {
  compensation: IndianRupee,
  survey: MapPinned,
  project: Bell,
  document: FileText,
}

export default function Notifications() {
  const { notifications, unreadCount, markAllRead, markRead } = useNotifications()

  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle={unreadCount > 0 ? `${unreadCount} unread update${unreadCount > 1 ? 's' : ''}` : 'You are all caught up'}
        actions={
          <button type="button" onClick={markAllRead} className="gov-btn-secondary">
            <Check size={15} /> Mark all as read
          </button>
        }
      />

      {notifications.length === 0 ? (
        <EmptyState title="No notifications" subtitle="New updates will appear here in real time." />
      ) : (
        <div className="gov-card divide-y divide-navy-50">
          {notifications.map((n) => {
            const Icon = TYPE_ICON[n.type] ?? Bell
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => markRead(n.id)}
                className={`flex w-full items-start gap-3 px-4 py-3.5 text-left hover:bg-navy-50/50 ${!n.read ? 'bg-saffron-50/40' : ''}`}
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-600">
                  <Icon size={15} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-navy-900">{n.title}</span>
                    {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-saffron-500" />}
                  </span>
                  <span className="mt-0.5 block text-sm text-navy-600">{n.body}</span>
                  <span className="mt-1 block text-xs text-navy-400">{n.time}</span>
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
