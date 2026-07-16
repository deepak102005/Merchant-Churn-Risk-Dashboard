export type MerchantStatus = "Active" | "Inactive" | "Pending"
export type RiskLevel = "Healthy" | "Low" | "Medium" | "High" | "Critical"

export interface Merchant {
  id: string
  name: string
  industry: string
  region: string
  revenue: number
  transactionVolume: number
  lastActivity: string
  healthScore: number
  riskLevel: RiskLevel
  churnProbability: number
  assignedManager: string
  status: MerchantStatus
  recommendation: string
}

const getRiskLevel = (score: number): RiskLevel => {
  if (score >= 90) return "Healthy"
  if (score >= 70) return "Low"
  if (score >= 50) return "Medium"
  if (score >= 30) return "High"
  return "Critical"
}

export const mockMerchants: Merchant[] = [
  {
    id: "MCH-1001",
    name: "CoffeeCo",
    industry: "Retail",
    region: "North America",
    revenue: 42000,
    transactionVolume: 1250,
    lastActivity: new Date(Date.now() - 2 * 86400000).toISOString(),
    healthScore: 91,
    riskLevel: "Healthy",
    churnProbability: 8,
    assignedManager: "Alice Smith",
    status: "Active",
    recommendation: "Upsell New Features",
  },
  {
    id: "MCH-1002",
    name: "Fashion Hub",
    industry: "E-commerce",
    region: "Europe",
    revenue: 12000,
    transactionVolume: 430,
    lastActivity: new Date(Date.now() - 12 * 86400000).toISOString(),
    healthScore: 48,
    riskLevel: "High",
    churnProbability: 56,
    assignedManager: "Bob Jones",
    status: "Active",
    recommendation: "Schedule Success Call",
  },
  {
    id: "MCH-1003",
    name: "FoodExpress",
    industry: "Food & Beverage",
    region: "North America",
    revenue: 6300,
    transactionVolume: 210,
    lastActivity: new Date(Date.now() - 19 * 86400000).toISOString(),
    healthScore: 31,
    riskLevel: "Critical",
    churnProbability: 78,
    assignedManager: "Charlie Brown",
    status: "Active",
    recommendation: "Offer Discount Campaign",
  },
]

// Add 47 more realistic generated ones to make 50
const industries = ["Retail", "SaaS", "E-commerce", "Fintech", "Healthcare", "Food & Beverage", "Travel"]
const regions = ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East"]
const managers = ["Alice Smith", "Bob Jones", "Charlie Brown", "Diana Prince", "Evan Wright"]
const recommendations = [
  "Schedule Success Call",
  "Offer Promotional Discount",
  "Send Re-engagement Email",
  "Provide Training Session",
  "Schedule Business Review",
  "Upsell New Features",
  "Investigate Complaints",
  "Request Feedback",
  "Call Merchant",
]

const realisticNames = [
  "TechNova", "CloudSync", "DataPulse", "NexGen Solutions", "Skyline Analytics", 
  "Prime Logistics", "SwiftPay", "Global Market", "Urban Threads", "Zenith Health",
  "Lumina Design", "Apex Financial", "Vertex Tech", "Quantum Systems", "Nexus Ventures",
  "Aura Group", "Pioneer Works", "Velocity Apps", "Horizon Media", "Crest Industries",
  "Echo Software", "Forge Manufacturing", "Beacon Holdings", "Nova Brands", "Strata Corp",
  "Pulse Marketing", "Matrix Solutions", "Triton Global", "Omega Systems", "Delta Trade",
  "Stellar Web", "Core Dynamics", "Infinity Tech", "Pinnacle Group", "Vista Partners",
  "Titan Ventures", "Aurora Software", "Vanguard Financial", "Genesis Health", "Zen Commerce",
  "Oasis Retail", "Synergy Ops", "Elevate Tech", "Meridian Solutions", "Falcon Express",
  "Atlas Group", "Cielo Systems"
]

for (let i = 0; i < 47; i++) {
  const healthScore = Math.floor(Math.random() * 100) + 1
  const churnProbability = 100 - healthScore + Math.floor(Math.random() * 10) - 5
  
  mockMerchants.push({
    id: `MCH-${1004 + i}`,
    name: realisticNames[i] || `Company ${i}`,
    industry: industries[Math.floor(Math.random() * industries.length)],
    region: regions[Math.floor(Math.random() * regions.length)],
    revenue: Math.floor(Math.random() * 100000) + 1000,
    transactionVolume: Math.floor(Math.random() * 5000) + 50,
    lastActivity: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString(),
    healthScore,
    riskLevel: getRiskLevel(healthScore),
    churnProbability: Math.max(0, Math.min(100, churnProbability)),
    assignedManager: managers[Math.floor(Math.random() * managers.length)],
    status: Math.random() > 0.1 ? "Active" : "Inactive",
    recommendation: recommendations[Math.floor(Math.random() * recommendations.length)],
  })
}
