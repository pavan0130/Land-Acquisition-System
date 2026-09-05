import { useEffect, useState } from 'react'
import { NOTIFICATIONS } from '../services/mockData'

// Production note: replace this polling stub with a WebSocket or
// Server-Sent Events (SSE) subscription, e.g.
//   const es = new EventSource('/api/notifications/stream')
//   es.onmessage = (e) => setNotifications((prev) => [JSON.parse(e.data), ...prev])
export function useNotifications() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS)

  useEffect(() => {
    // no-op interval placeholder to demonstrate where a live subscription would attach
    const interval = setInterval(() => {}, 30000)
    return () => clearInterval(interval)
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  const markRead = (id) => setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))

  return { notifications, unreadCount, markAllRead, markRead }
}
