"use client"

import { AIInsightsPanel } from "@/components/dashboard/AIInsightsPanel"
import { AlertTriangle, TrendingDown } from "lucide-react"

export default function ChurnRiskPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Churn Risk Analysis</h1>
        <p className="text-sm text-gray-500">Identify and mitigate revenue risks across your portfolio.</p>
      </div>

      <div className="mb-8">
        <AIInsightsPanel />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-[16px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Top Risk Factors
          </h3>
          <ul className="space-y-4">
            <li className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-slate-700">Low Product Engagement</span>
              <span className="text-sm font-semibold text-red-600">42% of at-risk</span>
            </li>
            <li className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-slate-700">Unresolved Support Tickets</span>
              <span className="text-sm font-semibold text-red-600">28% of at-risk</span>
            </li>
            <li className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-slate-700">Declining Transaction Volume</span>
              <span className="text-sm font-semibold text-red-600">18% of at-risk</span>
            </li>
            <li className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-slate-700">Executive Sponsor Left</span>
              <span className="text-sm font-semibold text-red-600">12% of at-risk</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-[16px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-orange-500" />
            Recent Downgrades
          </h3>
          <ul className="space-y-4">
            <li className="flex justify-between items-center py-2 border-b border-gray-50">
              <div>
                <p className="text-sm font-medium text-slate-900">FoodExpress</p>
                <p className="text-xs text-slate-500">Retail</p>
              </div>
              <span className="text-sm font-semibold text-red-600">-$2,100 MRR</span>
            </li>
            <li className="flex justify-between items-center py-2 border-b border-gray-50">
              <div>
                <p className="text-sm font-medium text-slate-900">TechNova</p>
                <p className="text-xs text-slate-500">SaaS</p>
              </div>
              <span className="text-sm font-semibold text-red-600">-$1,800 MRR</span>
            </li>
            <li className="flex justify-between items-center py-2 border-b border-gray-50">
              <div>
                <p className="text-sm font-medium text-slate-900">Prime Logistics</p>
                <p className="text-xs text-slate-500">Transportation</p>
              </div>
              <span className="text-sm font-semibold text-red-600">-$950 MRR</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
