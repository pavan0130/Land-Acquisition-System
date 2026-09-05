import React, { useState } from 'react'
import { FileSpreadsheet, FileText } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import BarChartCard from '../../components/charts/BarChartCard'
import LineChartCard from '../../components/charts/LineChartCard'
import { STATEWISE_PROGRESS, COMPENSATION_TREND } from '../../services/mockData'

const REPORT_TYPES = [
  { key: 'compensation', label: 'Compensation Summary' },
  { key: 'timeline', label: 'Project Timeline Report' },
  { key: 'district', label: 'District-wise Progress' },
  { key: 'state', label: 'State-wise Progress' },
]

export default function Reports() {
  const [generating, setGenerating] = useState(null)

  const handleGenerate = (type, format) => {
    setGenerating(`${type}-${format}`)
    setTimeout(() => setGenerating(null), 1200)
  }

  return (
    <div>
      <PageHeader title="Reports" subtitle="Generate and export MIS reports for review and audit" />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {REPORT_TYPES.map((r) => (
          <div key={r.key} className="gov-card flex flex-col gap-3 p-4">
            <p className="text-sm font-bold text-navy-900">{r.label}</p>
            <div className="mt-auto flex gap-2">
              <button
                type="button"
                onClick={() => handleGenerate(r.key, 'pdf')}
                disabled={generating === `${r.key}-pdf`}
                className="gov-btn-secondary flex-1 !px-2 text-xs"
              >
                <FileText size={14} /> {generating === `${r.key}-pdf` ? 'Generating…' : 'PDF'}
              </button>
              <button
                type="button"
                onClick={() => handleGenerate(r.key, 'xlsx')}
                disabled={generating === `${r.key}-xlsx`}
                className="gov-btn-secondary flex-1 !px-2 text-xs"
              >
                <FileSpreadsheet size={14} /> {generating === `${r.key}-xlsx` ? 'Generating…' : 'Excel'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <BarChartCard
          title="District/State-wise Progress"
          data={STATEWISE_PROGRESS}
          xKey="state"
          bars={[
            { dataKey: 'acquired', name: 'Acquired', color: '#0a7a3c' },
            { dataKey: 'required', name: 'Required', color: '#a9bfd7' },
          ]}
        />
        <LineChartCard
          title="Compensation Timeline"
          data={COMPENSATION_TREND}
          xKey="month"
          lines={[{ dataKey: 'amountCr', name: '₹ Crore', color: '#e97a1f' }]}
        />
      </div>
    </div>
  )
}
