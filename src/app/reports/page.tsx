"use client"

import { useState } from "react"
import { FileText, Download, Calendar, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/Toast"

const reports = [
  { name: "Q2 2026 Churn Analysis", date: "Jul 15, 2026", type: "PDF", size: "2.4 MB" },
  { name: "Monthly Risk Summary - June", date: "Jul 01, 2026", type: "CSV", size: "1.1 MB" },
  { name: "Enterprise Segment Health", date: "Jun 28, 2026", type: "PDF", size: "3.8 MB" },
  { name: "Product Engagement Metrics", date: "Jun 15, 2026", type: "Excel", size: "4.2 MB" },
  { name: "Support Ticket Correlation", date: "Jun 01, 2026", type: "PDF", size: "1.8 MB" },
]

export default function ReportsPage() {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    toast('Generating new report...', 'success')
    try {
      const res = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportType: 'Custom Report' })
      })
      const data = await res.json()
      if (res.ok) {
        toast(data.message, 'success')
      } else {
        toast('Failed to generate report', 'error')
      }
    } catch (err) {
      toast('Network error', 'error')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-sm text-gray-500">Generate and download historical churn and health reports.</p>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
        >
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {isGenerating ? 'Generating...' : 'Generate New Report'}
        </button>
      </div>

      <div className="bg-white rounded-[16px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Report Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date Generated</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Format</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-slate-400" />
                      <span className="text-sm font-medium text-slate-900">{report.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {report.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {report.type} ({report.size})
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => toast(`Downloading ${report.name}...`, 'success')}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
