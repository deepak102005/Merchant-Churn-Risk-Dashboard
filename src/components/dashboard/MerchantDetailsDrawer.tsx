"use client"

import * as Dialog from '@radix-ui/react-dialog'
import { X, Sparkles, Building2, TrendingDown, Clock, MessageSquareWarning, ShieldAlert, BadgeInfo } from 'lucide-react'
import { Merchant } from '@/lib/mock-data'
import { motion, AnimatePresence } from 'framer-motion'

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  merchant: Merchant | null;
}

export function MerchantDetailsDrawer({ isOpen, onClose, merchant }: DrawerProps) {
  if (!merchant) return null

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 w-full max-w-md h-full bg-slate-50 shadow-2xl z-50 flex flex-col overflow-hidden outline-none"
              >
                <div className="flex items-center justify-between p-6 bg-white border-b border-gray-100 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 font-bold text-xl">
                      {merchant.name.charAt(0)}
                    </div>
                    <div>
                      <Dialog.Title className="text-xl font-bold text-slate-900">
                        {merchant.name}
                      </Dialog.Title>
                      <p className="text-sm text-slate-500">{merchant.id} • {merchant.industry}</p>
                    </div>
                  </div>
                  <Dialog.Close asChild>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* AI Recommendation Card */}
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-100 rounded-[16px] p-5 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Sparkles className="w-24 h-24 text-blue-600" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-4 text-blue-700">
                        <Sparkles className="w-5 h-5" />
                        <h3 className="font-bold text-base">AI Insight & Recommendation</h3>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-sm font-medium text-slate-700">Merchant has shown:</p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2 text-sm text-slate-600">
                            <TrendingDown className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                            42% decline in transaction volume over 30 days
                          </li>
                          <li className="flex items-start gap-2 text-sm text-slate-600">
                            <Clock className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                            No login activity in 19 days
                          </li>
                          <li className="flex items-start gap-2 text-sm text-slate-600">
                            <MessageSquareWarning className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                            Two unresolved support tickets
                          </li>
                        </ul>
                      </div>

                      <div className="bg-white/60 rounded-xl p-4 border border-white">
                        <p className="text-sm font-semibold text-slate-900 mb-1">Recommended Action</p>
                        <p className="text-sm text-slate-700 leading-relaxed mb-3">
                          {merchant.recommendation}. Follow up within 48 hours to prevent churn.
                        </p>
                        <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-100/50 px-2 py-1 rounded-md w-max">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          92% Confidence
                        </div>
                      </div>

                      <div className="mt-4 flex gap-3">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          Execute Action
                        </button>
                        <button className="flex-1 bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div className="bg-white border border-gray-100 rounded-[16px] p-5 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-slate-400" />
                      Merchant Profile
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-sm text-slate-500">Region</span>
                        <span className="text-sm font-medium text-slate-900">{merchant.region}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-sm text-slate-500">Assigned Manager</span>
                        <span className="text-sm font-medium text-slate-900">{merchant.assignedManager}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-sm text-slate-500">Revenue</span>
                        <span className="text-sm font-medium text-slate-900">${merchant.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-sm text-slate-500">Transactions (30d)</span>
                        <span className="text-sm font-medium text-slate-900">{merchant.transactionVolume.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-slate-500">Status</span>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-md ${merchant.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                          {merchant.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Health Metrics */}
                  <div className="bg-white border border-gray-100 rounded-[16px] p-5 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <BadgeInfo className="w-5 h-5 text-slate-400" />
                      Health Metrics
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-xs text-slate-500 font-medium mb-1">Health Score</p>
                        <p className="text-2xl font-bold text-slate-900">{merchant.healthScore}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-xs text-slate-500 font-medium mb-1">Churn Prob.</p>
                        <p className="text-2xl font-bold text-red-600">{merchant.churnProbability}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
