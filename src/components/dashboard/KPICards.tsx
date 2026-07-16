"use client"

import { LineChart, Line, ResponsiveContainer, AreaChart, Area } from "recharts"

const generateSparklineData = (trend: "up" | "down" | "flat") => {
  const data = []
  let current = 50
  for (let i = 0; i < 14; i++) {
    if (trend === "up") current += Math.random() * 10 - 2
    else if (trend === "down") current -= Math.random() * 10 - 2
    else current += Math.random() * 10 - 5
    data.push({ value: current })
  }
  return data
}

const kpis = [
  {
    title: "Total Merchants",
    value: "2,436",
    trend: "+12% this month",
    trendType: "up",
    data: generateSparklineData("up"),
    color: "#2563EB",
  },
  {
    title: "Healthy Merchants",
    value: "1,892",
    trend: "+5% this month",
    trendType: "up",
    data: generateSparklineData("up"),
    color: "#22C55E",
  },
  {
    title: "At Risk",
    value: "420",
    trend: "-2% this month",
    trendType: "down",
    data: generateSparklineData("down"),
    color: "#F59E0B",
  },
  {
    title: "Critical Risk",
    value: "124",
    trend: "+8% this month",
    trendType: "up",
    data: generateSparklineData("up"),
    color: "#EF4444",
  },
  {
    title: "Churn Probability",
    value: "18.4%",
    trend: "-1.2% average",
    trendType: "down",
    data: generateSparklineData("down"),
    color: "#64748B",
  },
  {
    title: "Revenue at Risk",
    value: "$2.4M",
    trend: "+$120k this month",
    trendType: "up",
    data: generateSparklineData("up"),
    color: "#EF4444",
  },
]

export function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpis.map((kpi) => (
        <div key={kpi.title} className="bg-white rounded-[16px] p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col hover:shadow-lg transition-shadow">
          <p className="text-sm font-medium text-gray-500 mb-1">{kpi.title}</p>
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900">{kpi.value}</h3>
          </div>
          
          <div className="h-[40px] w-full mt-auto mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={kpi.data}>
                <defs>
                  <linearGradient id={`color-${kpi.title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={kpi.color} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={kpi.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={kpi.color} 
                  fillOpacity={1} 
                  fill={`url(#color-${kpi.title})`} 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex items-center gap-1.5 text-xs">
            <span 
              className={`font-medium ${
                kpi.trendType === "up" 
                  ? kpi.color === "#EF4444" ? "text-red-600" : "text-green-600"
                  : kpi.color === "#22C55E" ? "text-red-600" : "text-green-600"
              }`}
            >
              {kpi.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
