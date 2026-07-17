"use client"

import { Search, Bell, MessageSquare, Calendar, Download } from "lucide-react"

import { useState } from "react"
import { Search, Bell, MessageSquare, Calendar, Download, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/Toast"

export function TopNav() {
  const { toast } = useToast()
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    toast('Generating CSV export...', 'success')
    try {
      const res = await fetch('/api/export')
      if (res.ok) {
        const blob = await res.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'merchants_export.csv'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        a.remove()
        toast('Export completed successfully', 'success')
      } else {
        toast('Failed to export', 'error')
      }
    } catch (err) {
      toast('Network error during export', 'error')
    } finally {
      setIsExporting(false)
    }
  }

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      toast(`Searching for: ${e.currentTarget.value}`, 'success')
    }
  }

  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-8 sticky top-0 z-20">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            onKeyDown={handleSearch}
            placeholder="Search merchants... (Press Enter)" 
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-shadow"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => toast('Filtered to Last 30 Days', 'success')}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Calendar className="w-4 h-4" />
          <span>Last 30 Days</span>
        </button>
        
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          <span>{isExporting ? 'Exporting...' : 'Export'}</span>
        </button>

        <div className="h-6 w-px bg-gray-200 mx-2"></div>

        <button 
          onClick={() => toast('No new messages', 'success')}
          className="relative p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
        </button>

        <button 
          onClick={() => toast('Notifications feature coming soon', 'success')}
          className="relative p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
    </header>
  )
}
