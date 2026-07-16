"use client"

import { Sparkles, ArrowRight, AlertTriangle, Lightbulb } from 'lucide-react'

export function AIInsightsPanel() {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[16px] p-6 text-white shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 p-6 opacity-10">
        <Sparkles className="w-32 h-32 text-blue-400" />
      </div>
      
      <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2 text-blue-400">
            <Sparkles className="w-5 h-5" />
            <h2 className="font-semibold tracking-wide uppercase text-sm">Portfolio AI Insights</h2>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-2">145 merchants show early churn signals.</h3>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Based on the last 30 days of activity, we've identified a growing trend of low product engagement primarily in the Retail and E-commerce sectors.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-sm text-slate-300">Revenue at Risk:</span>
              <span className="text-sm font-bold text-white">$2.4M</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-slate-300">Top Reason:</span>
              <span className="text-sm font-bold text-white">Low product engagement</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-sm p-5 rounded-xl border border-slate-700 w-full md:w-80 shrink-0">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Suggested Campaign</p>
          <p className="text-sm font-medium mb-4">Launch Customer Success Outreach for Retail Segments</p>
          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors">
            Review Campaign Draft
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
