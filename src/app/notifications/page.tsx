"use client"

import { Bell, Clock, AlertTriangle, TrendingDown, CreditCard, ShieldAlert } from "lucide-react"

const notifications = [
  {
    id: 1,
    title: "Merchant inactive for 30 days",
    merchant: "Fashion Hub",
    time: "2 hours ago",
    icon: Clock,
    color: "text-orange-500",
    bg: "bg-orange-100",
    isUnread: true,
  },
  {
    id: 2,
    title: "Revenue declined 25%",
    merchant: "TechNova",
    time: "5 hours ago",
    icon: TrendingDown,
    color: "text-red-500",
    bg: "bg-red-100",
    isUnread: true,
  },
  {
    id: 3,
    title: "Support ticket unresolved (> 48h)",
    merchant: "CloudSync",
    time: "Yesterday",
    icon: AlertTriangle,
    color: "text-yellow-500",
    bg: "bg-yellow-100",
    isUnread: false,
  },
  {
    id: 4,
    title: "Payment failures increased",
    merchant: "Prime Logistics",
    time: "Yesterday",
    icon: CreditCard,
    color: "text-red-500",
    bg: "bg-red-100",
    isUnread: false,
  },
  {
    id: 5,
    title: "Contract renewal approaching",
    merchant: "Global Market",
    time: "2 days ago",
    icon: ShieldAlert,
    color: "text-blue-500",
    bg: "bg-blue-100",
    isUnread: false,
  },
]

export default function NotificationsPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-500">Recent alerts and system messages.</p>
        </div>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-[16px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {notifications.map((note) => (
            <div 
              key={note.id} 
              className={`p-5 flex items-start gap-4 hover:bg-slate-50 transition-colors cursor-pointer ${note.isUnread ? 'bg-blue-50/30' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${note.bg}`}>
                <note.icon className={`w-5 h-5 ${note.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <p className={`text-sm font-semibold ${note.isUnread ? 'text-slate-900' : 'text-slate-700'}`}>
                    {note.title}
                  </p>
                  <span className="text-xs text-slate-400 whitespace-nowrap ml-4">{note.time}</span>
                </div>
                <p className="text-sm text-slate-500">
                  Triggered by <span className="font-medium text-slate-700">{note.merchant}</span>
                </p>
              </div>
              {note.isUnread && (
                <div className="w-2.5 h-2.5 bg-blue-600 rounded-full shrink-0 mt-1.5 shadow-sm border border-white"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
