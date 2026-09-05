import React, { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Loader from '../common/Loader'
import EmptyState from '../common/EmptyState'

/**
 * Generic, reusable data table.
 *
 * columns: [{ key, header, render?(row), align? }]
 * rows: array of data objects (assumed already filtered/searched by caller)
 */
export default function DataTable({ columns, rows, loading = false, pageSize = 8, rowKey = 'id', onRowClick }) {
  const [page, setPage] = useState(0)

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize))
  const currentPage = Math.min(page, pageCount - 1)

  const visibleRows = useMemo(
    () => rows.slice(currentPage * pageSize, currentPage * pageSize + pageSize),
    [rows, currentPage, pageSize],
  )

  if (loading) return <Loader label="Fetching records…" />
  if (!rows.length) return <EmptyState />

  return (
    <div className="gov-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-navy-100 bg-navy-50/60">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-xs font-bold uppercase tracking-wide text-navy-600 ${
                    col.align === 'right' ? 'text-right' : 'text-left'
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => (
              <tr
                key={row[rowKey]}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={`border-b border-navy-50 last:border-0 ${
                  onRowClick ? 'cursor-pointer hover:bg-saffron-50/50' : 'hover:bg-navy-50/40'
                }`}
              >
                {columns.map((col) => (
                  <td key={col.key} className={`px-4 py-3 text-navy-800 ${col.align === 'right' ? 'text-right' : 'text-left'}`}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-navy-100 px-4 py-3 text-xs text-navy-500">
        <span>
          Showing <strong>{currentPage * pageSize + 1}</strong>–
          <strong>{Math.min(rows.length, (currentPage + 1) * pageSize)}</strong> of <strong>{rows.length}</strong>
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="rounded-sm border border-navy-200 p-1.5 disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="px-2 font-semibold text-navy-700">
            {currentPage + 1} / {pageCount}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            disabled={currentPage >= pageCount - 1}
            className="rounded-sm border border-navy-200 p-1.5 disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
