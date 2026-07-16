"use client"

import { useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
} from '@tanstack/react-table'
import { Merchant, mockMerchants } from '@/lib/mock-data'
import { ChevronDown, ChevronUp, MoreHorizontal, Eye, Edit, MessageSquare, Filter, ArrowUpDown } from 'lucide-react'

const columnHelper = createColumnHelper<Merchant>()

interface MerchantTableProps {
  onRowClick: (merchant: Merchant) => void;
}

export function MerchantTable({ onRowClick }: MerchantTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [data] = useState(() => mockMerchants)

  const columns = [
    columnHelper.accessor('name', {
      header: 'Merchant',
      cell: info => (
        <div>
          <div className="font-semibold text-slate-900">{info.getValue()}</div>
          <div className="text-xs text-slate-500">{info.row.original.id}</div>
        </div>
      ),
    }),
    columnHelper.accessor('industry', {
      header: 'Industry',
      cell: info => <span className="text-sm text-slate-600">{info.getValue()}</span>,
    }),
    columnHelper.accessor('revenue', {
      header: 'Revenue',
      cell: info => <span className="text-sm font-medium">${info.getValue().toLocaleString()}</span>,
    }),
    columnHelper.accessor('healthScore', {
      header: 'Health Score',
      cell: info => {
        const score = info.getValue()
        let color = 'bg-red-500'
        if (score >= 90) color = 'bg-green-500'
        else if (score >= 70) color = 'bg-blue-500'
        else if (score >= 50) color = 'bg-yellow-500'
        
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium w-6">{score}</span>
            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full ${color}`} style={{ width: `${score}%` }}></div>
            </div>
          </div>
        )
      }
    }),
    columnHelper.accessor('riskLevel', {
      header: 'Risk Level',
      cell: info => {
        const level = info.getValue()
        const styles: Record<string, string> = {
          Healthy: 'bg-green-100 text-green-700 border-green-200',
          Low: 'bg-blue-100 text-blue-700 border-blue-200',
          Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
          High: 'bg-orange-100 text-orange-700 border-orange-200',
          Critical: 'bg-red-100 text-red-700 border-red-200',
        }
        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[level]}`}>
            {level}
          </span>
        )
      }
    }),
    columnHelper.accessor('churnProbability', {
      header: 'Churn Prob.',
      cell: info => {
        const prob = info.getValue()
        let color = 'text-green-600'
        if (prob > 20) color = 'text-yellow-600'
        if (prob > 50) color = 'text-orange-600'
        if (prob > 75) color = 'text-red-600'
        return <span className={`text-sm font-bold ${color}`}>{prob}%</span>
      }
    }),
    columnHelper.accessor('recommendation', {
      header: 'Recommended Action',
      cell: info => (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 shadow-sm whitespace-nowrap">
          ✨ {info.getValue()}
        </span>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      cell: props => (
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="View">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors" title="Contact">
            <MessageSquare className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors" title="More">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      ),
    })
  ]

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      }
    }
  })

  return (
    <div className="bg-white rounded-[16px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Merchants at Risk</h2>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="border-b border-gray-100 bg-slate-50/50">
                {headerGroup.headers.map(header => (
                  <th 
                    key={header.id} 
                    className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <ChevronUp className="w-3 h-3" />,
                        desc: <ChevronDown className="w-3 h-3" />,
                      }[header.column.getIsSorted() as string] ?? (
                        header.column.getCanSort() ? <ArrowUpDown className="w-3 h-3 text-transparent group-hover:text-slate-300" /> : null
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr 
                key={row.id} 
                onClick={() => onRowClick(row.original)}
                className="border-b border-gray-100 hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-sm text-slate-500">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, data.length)} of {data.length} entries
        </span>
        <div className="flex gap-2">
          <button 
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button 
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
