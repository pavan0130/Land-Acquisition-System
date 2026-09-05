import React from 'react'
import { statusToClass } from '../../utils/format'

export default function StatusPill({ status }) {
  return <span className={`status-pill ${statusToClass(status)}`}>{status}</span>
}
