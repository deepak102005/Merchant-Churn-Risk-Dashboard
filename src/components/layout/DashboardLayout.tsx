"use client"

import { Sidebar } from "./Sidebar"
import { TopNav } from "./TopNav"
import { ChatWidget } from "@/components/chat/ChatWidget"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1600px] mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
      <ChatWidget />
    </div>
  )
}
