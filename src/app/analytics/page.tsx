"use client"

import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview"

export default function AnalyticsPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
        <p className="text-sm text-gray-500">Deep dive into your portfolio's performance and churn trends.</p>
      </div>

      <AnalyticsOverview />
    </>
  )
}
