"use client"

import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell,
  LineChart, Line, Legend
} from 'recharts'

const revenueData = [
  { name: 'Jan', revenue: 4000, risk: 2400 },
  { name: 'Feb', revenue: 3000, risk: 1398 },
  { name: 'Mar', revenue: 2000, risk: 9800 },
  { name: 'Apr', revenue: 2780, risk: 3908 },
  { name: 'May', revenue: 1890, risk: 4800 },
  { name: 'Jun', revenue: 2390, risk: 3800 },
  { name: 'Jul', revenue: 3490, risk: 4300 },
]

const riskDistribution = [
  { name: 'Healthy', value: 1892, color: '#22C55E' },
  { name: 'Low Risk', value: 340, color: '#3B82F6' },
  { name: 'Medium Risk', value: 210, color: '#EAB308' },
  { name: 'High Risk', value: 124, color: '#F97316' },
  { name: 'Critical', value: 60, color: '#EF4444' },
]

const industryData = [
  { name: 'Retail', value: 400 },
  { name: 'SaaS', value: 300 },
  { name: 'E-commerce', value: 300 },
  { name: 'Fintech', value: 200 },
  { name: 'Healthcare', value: 278 },
]

const churnTrend = [
  { name: 'Jan', rate: 4.0 },
  { name: 'Feb', rate: 3.0 },
  { name: 'Mar', rate: 2.0 },
  { name: 'Apr', rate: 2.7 },
  { name: 'May', rate: 1.8 },
  { name: 'Jun', rate: 2.3 },
  { name: 'Jul', rate: 3.4 },
]

export function AnalyticsOverview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue Trend (Area Chart) */}
      <div className="bg-white p-6 rounded-[16px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100">
        <h3 className="text-base font-semibold text-gray-900 mb-6">Revenue vs Risk Trend</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dx={-10} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Area type="monotone" dataKey="revenue" name="Total Revenue" stroke="#2563EB" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
              <Area type="monotone" dataKey="risk" name="Revenue at Risk" stroke="#EF4444" fillOpacity={1} fill="url(#colorRisk)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Risk Distribution (Donut Chart) */}
      <div className="bg-white p-6 rounded-[16px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100">
        <h3 className="text-base font-semibold text-gray-900 mb-6">Risk Distribution</h3>
        <div className="h-[300px] flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold text-gray-900">2,436</span>
            <span className="text-sm text-gray-500">Merchants</span>
          </div>
        </div>
      </div>

      {/* Industry Segmentation (Bar Chart) */}
      <div className="bg-white p-6 rounded-[16px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100">
        <h3 className="text-base font-semibold text-gray-900 mb-6">Industry Segmentation</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={industryData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#374151', fontSize: 13, fontWeight: 500}} dx={-10} />
              <Tooltip 
                cursor={{fill: '#F3F4F6'}}
                contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Bar dataKey="value" fill="#2563EB" radius={[0, 6, 6, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Churn Trend (Line Chart) */}
      <div className="bg-white p-6 rounded-[16px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100">
        <h3 className="text-base font-semibold text-gray-900 mb-6">Monthly Churn Trend (%)</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={churnTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dx={-10} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Line type="monotone" dataKey="rate" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
