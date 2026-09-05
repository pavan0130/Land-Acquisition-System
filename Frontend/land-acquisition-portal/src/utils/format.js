export function formatINR(amount) {
  if (amount == null) return '-'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatCrore(amountCr) {
  return `₹${amountCr.toLocaleString('en-IN')} Cr`
}

export function formatNumber(n) {
  if (n == null) return '-'
  return new Intl.NumberFormat('en-IN').format(n)
}

export function formatDate(dateStr) {
  if (!dateStr || dateStr === '-') return '-'
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

const STATUS_GROUPS = {
  positive: ['paid', 'approved', 'acquired', 'completed'],
  warning: ['pending', 'under review', 'survey', 'in progress', 'under verification'],
  negative: ['rejected', 'overdue'],
  neutral: ['draft'],
}

export function statusToClass(status) {
  const s = (status || '').toLowerCase()
  if (STATUS_GROUPS.positive.includes(s)) return 'bg-indiagreen-500/10 text-indiagreen-600'
  if (STATUS_GROUPS.warning.includes(s)) return 'bg-saffron-500/10 text-saffron-700'
  if (STATUS_GROUPS.negative.includes(s)) return 'bg-red-500/10 text-red-700'
  return 'bg-navy-500/10 text-navy-700'
}
