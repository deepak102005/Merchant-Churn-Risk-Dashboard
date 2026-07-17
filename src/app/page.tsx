"use client"

import { useState, useEffect } from "react"
import { KPICards } from "@/components/dashboard/KPICards"
import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview"
import { MerchantTable } from "@/components/dashboard/MerchantTable"
import { MerchantDetailsDrawer } from "@/components/dashboard/MerchantDetailsDrawer"
import { AIInsightsPanel } from "@/components/dashboard/AIInsightsPanel"
import { Merchant } from "@/lib/mock-data"
import { useToast } from "@/components/ui/Toast"

export default function DashboardPage() {
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleRowClick = (merchant: Merchant) => {
    setSelectedMerchant(merchant)
    setIsDrawerOpen(true)
  }

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    toast('Generating portfolio report...', 'success')
    try {
      const res = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportType: 'Portfolio Overview' })
      })
      const data = await res.json()
      if (res.ok) {
        toast(data.message, 'success')
      } else {
        toast(data.error || 'Failed to generate report', 'error')
      }
    } catch (err) {
      toast('Network error occurred', 'error')
    } finally {
      setIsGenerating(false)
    }
  }

  if (!isMounted) return null

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Portfolio Overview</h1>
          <p className="text-sm text-gray-500">Monitor merchant health and churn risk</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => toast('View customization coming soon', 'success')}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            Customize View
          </button>
          <button 
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
          >
            {isGenerating ? 'Generating...' : 'Generate Report'}
          </button>
        </div>
      </div>

      <KPICards />
      <AIInsightsPanel />
      <AnalyticsOverview />
      <MerchantTable onRowClick={handleRowClick} />
      
      <MerchantDetailsDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        merchant={selectedMerchant} 
      />
    </>
  )
}
