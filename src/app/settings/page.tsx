"use client"

import { useState } from "react"
import { Settings2, Bell, Shield, Users } from "lucide-react"
import { useToast } from "@/components/ui/Toast"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tab: activeTab })
      })
      const data = await res.json()
      if (res.ok) {
        toast(data.message, 'success')
      } else {
        toast('Failed to save settings', 'error')
      }
    } catch (err) {
      toast('Network error', 'error')
    } finally {
      setIsSaving(false)
    }
  }
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">Manage your workspace and personal preferences.</p>
      </div>

      <div className="bg-white rounded-[16px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 border-r border-gray-100 p-4 bg-slate-50/50">
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('general')}
              className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors", activeTab === 'general' ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900")}
            >
              <Settings2 className={cn("w-5 h-5", activeTab === 'general' ? "" : "text-slate-400")} />
              General
            </button>
            <button 
              onClick={() => setActiveTab('alerts')}
              className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors", activeTab === 'alerts' ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900")}
            >
              <Bell className={cn("w-5 h-5", activeTab === 'alerts' ? "" : "text-slate-400")} />
              Alert Preferences
            </button>
            <button 
              onClick={() => setActiveTab('team')}
              className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors", activeTab === 'team' ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900")}
            >
              <Users className={cn("w-5 h-5", activeTab === 'team' ? "" : "text-slate-400")} />
              Team Members
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors", activeTab === 'security' ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900")}
            >
              <Shield className={cn("w-5 h-5", activeTab === 'security' ? "" : "text-slate-400")} />
              Security
            </button>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4 capitalize">{activeTab} Settings</h2>
          
          <div className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Workspace Name</label>
              <input 
                type="text" 
                defaultValue="Acme Corp Success Team" 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-shadow"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Default Risk Threshold</label>
              <p className="text-xs text-gray-500 mb-3">Merchants falling below this health score will be marked as 'Critical Risk'.</p>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-shadow bg-white">
                <option value="50">Score &lt; 50</option>
                <option value="40">Score &lt; 40</option>
                <option value="30">Score &lt; 30</option>
              </select>
            </div>

            <div className="pt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Risk Factors Weights</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Product Engagement</p>
                    <p className="text-xs text-gray-500">Weight applied to login and usage metrics.</p>
                  </div>
                  <input type="range" min="0" max="100" defaultValue="70" className="w-32" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Support Tickets</p>
                    <p className="text-xs text-gray-500">Weight applied to unresolved issues.</p>
                  </div>
                  <input type="range" min="0" max="100" defaultValue="45" className="w-32" />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end">
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
