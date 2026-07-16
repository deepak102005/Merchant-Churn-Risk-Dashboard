"use client"

import { useState, useEffect } from "react"
import { MerchantTable } from "@/components/dashboard/MerchantTable"
import { MerchantDetailsDrawer } from "@/components/dashboard/MerchantDetailsDrawer"
import { Merchant } from "@/lib/mock-data"

export default function MerchantsPage() {
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Merchants Directory</h1>
        <p className="text-sm text-gray-500">View and manage all merchants in your portfolio.</p>
      </div>

      <MerchantTable onRowClick={handleRowClick} />
      
      <MerchantDetailsDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        merchant={selectedMerchant} 
      />
    </>
  )
}
