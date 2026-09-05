import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function LineChartCard({ title, data, lines, xKey, height = 280 }) {
  return (
    <div className="gov-card p-4">
      <h3 className="section-heading mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e9ef" vertical={false} />
          <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: '#4a76a3' }} axisLine={{ stroke: '#d4dfeb' }} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#4a76a3' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: 4, border: '1px solid #d4dfeb', fontSize: 12 }}
            labelStyle={{ fontWeight: 700, color: '#0a2038' }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {lines.map((l) => (
            <Line
              key={l.dataKey}
              type="monotone"
              dataKey={l.dataKey}
              name={l.name}
              stroke={l.color}
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
