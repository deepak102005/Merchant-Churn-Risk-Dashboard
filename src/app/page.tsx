"use client"

import { useState, useEffect } from "react"
import { KPICards } from "@/components/dashboard/KPICards"
import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview"
import { MerchantTable } from "@/components/dashboard/MerchantTable"
import { MerchantDetailsDrawer } from "@/components/dashboard/MerchantDetailsDrawer"
import { AIInsightsPanel } from "@/components/dashboard/AIInsightsPanel"
import { Merchant } from "@/lib/mock-data"

export default function DashboardPage() {
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleRowClick = (merchant: Merchant) => {
    setSelectedMerchant(merchant)
    setIsDrawerOpen(true)
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
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Customize View
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
            Generate Report
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
