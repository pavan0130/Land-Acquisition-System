export const PROJECTS = [
  { id: 'PRJ-101', name: 'National Highway 44 Widening', type: 'Highway', state: 'Tamil Nadu', district: 'Coimbatore', status: 'In Progress', landRequired: 4200, landAcquired: 3100, budget: 185, startDate: '2024-04-01', targetDate: '2026-12-31', progress: 74 },
  { id: 'PRJ-102', name: 'Chennai Metro Phase III', type: 'Metro Rail', state: 'Tamil Nadu', district: 'Chennai', status: 'In Progress', landRequired: 980, landAcquired: 640, budget: 420, startDate: '2023-11-15', targetDate: '2027-03-31', progress: 65 },
  { id: 'PRJ-103', name: 'Kadaladi Solar Park', type: 'Solar Park', state: 'Tamil Nadu', district: 'Ramanathapuram', status: 'Survey', landRequired: 2600, landAcquired: 400, budget: 96, startDate: '2025-01-10', targetDate: '2026-06-30', progress: 22 },
  { id: 'PRJ-104', name: 'Coastal Railway Expansion', type: 'Railway', state: 'Tamil Nadu', district: 'Nagapattinam', status: 'Approved', landRequired: 1850, landAcquired: 0, budget: 260, startDate: '2025-08-01', targetDate: '2028-03-31', progress: 4 },
  { id: 'PRJ-105', name: 'Salem Ring Road', type: 'Highway', state: 'Tamil Nadu', district: 'Salem', status: 'Completed', landRequired: 1100, landAcquired: 1100, budget: 78, startDate: '2022-02-01', targetDate: '2025-01-31', progress: 100 },
  { id: 'PRJ-106', name: 'Madurai Industrial Corridor', type: 'Industrial', state: 'Tamil Nadu', district: 'Madurai', status: 'In Progress', landRequired: 3300, landAcquired: 1450, progress: 44, budget: 310, startDate: '2024-07-01', targetDate: '2027-09-30' },
]

export const PROJECT_TIMELINE = {
  'PRJ-101': [
    { id: 1, title: 'Project Notification (Sec 11)', date: '2024-04-01', status: 'completed', note: 'Gazette notification issued.' },
    { id: 2, title: 'Survey & Joint Measurement', date: '2024-06-15', status: 'completed', note: 'Field survey completed for 38 villages.' },
    { id: 3, title: 'Draft Award Published', date: '2024-11-20', status: 'completed', note: 'Compensation rates finalised by SIA committee.' },
    { id: 4, title: 'Compensation Disbursement', date: '2025-03-10', status: 'in_progress', note: '3,100 of 4,200 acres acquired so far.' },
    { id: 5, title: 'Possession Handover', date: '2026-09-30', status: 'pending', note: 'Scheduled after full disbursement.' },
  ],
}

export const LAND_PARCELS = [
  { id: 'LP-58231', surveyNo: '112/3A', owner: 'Ravichandran M.', village: 'Kinathukadavu', taluk: 'Pollachi', district: 'Coimbatore', area: 2.4, unit: 'acres', status: 'Acquired', projectId: 'PRJ-101', lat: 10.87, lng: 77.02 },
  { id: 'LP-58232', surveyNo: '112/3B', owner: 'Lakshmi Narayanan', village: 'Kinathukadavu', taluk: 'Pollachi', district: 'Coimbatore', area: 1.1, unit: 'acres', status: 'Pending', projectId: 'PRJ-101', lat: 10.86, lng: 77.03 },
  { id: 'LP-58233', surveyNo: '221/1', owner: 'Selvam K.', village: 'Anaimalai', taluk: 'Pollachi', district: 'Coimbatore', area: 3.8, unit: 'acres', status: 'Under Verification', projectId: 'PRJ-101', lat: 10.58, lng: 76.95 },
  { id: 'LP-90112', surveyNo: '45/2', owner: 'Meena R.', village: 'Alandur', taluk: 'Chennai South', district: 'Chennai', area: 0.6, unit: 'acres', status: 'Acquired', projectId: 'PRJ-102', lat: 13.00, lng: 80.20 },
  { id: 'LP-90113', surveyNo: '45/3', owner: 'Suresh Babu', village: 'Alandur', taluk: 'Chennai South', district: 'Chennai', area: 0.4, unit: 'acres', status: 'Pending', projectId: 'PRJ-102', lat: 13.01, lng: 80.21 },
  { id: 'LP-11009', surveyNo: '9/1A', owner: 'Palaniswamy G.', village: 'Kadaladi', taluk: 'Kadaladi', district: 'Ramanathapuram', area: 5.2, unit: 'acres', status: 'Under Verification', projectId: 'PRJ-103', lat: 9.30, lng: 78.75 },
]

export const COMPENSATION_RECORDS = [
  { id: 'CMP-3001', owner: 'Ravichandran M.', parcelId: 'LP-58231', projectId: 'PRJ-101', amount: 1500000, status: 'Paid', mode: 'RTGS', date: '2025-02-14' },
  { id: 'CMP-3002', owner: 'Lakshmi Narayanan', parcelId: 'LP-58232', projectId: 'PRJ-101', amount: 820000, status: 'Pending', mode: '-', date: '-' },
  { id: 'CMP-3003', owner: 'Selvam K.', parcelId: 'LP-58233', projectId: 'PRJ-101', amount: 2650000, status: 'Under Review', mode: '-', date: '-' },
  { id: 'CMP-3004', owner: 'Meena R.', parcelId: 'LP-90112', projectId: 'PRJ-102', amount: 4200000, status: 'Paid', mode: 'NEFT', date: '2025-01-30' },
  { id: 'CMP-3005', owner: 'Suresh Babu', parcelId: 'LP-90113', projectId: 'PRJ-102', amount: 1180000, status: 'Rejected', mode: '-', date: '2025-01-05' },
  { id: 'CMP-3006', owner: 'Palaniswamy G.', parcelId: 'LP-11009', projectId: 'PRJ-103', amount: 3960000, status: 'Pending', mode: '-', date: '-' },
]

export const RR_RECORDS = [
  { id: 'RR-501', family: 'Ravichandran Family', members: 5, village: 'Kinathukadavu', houseAllocated: 'Yes', unit: 'Block C-14, Pollachi Rehab Colony', assistance: 250000, status: 'Completed' },
  { id: 'RR-502', family: 'Lakshmi Family', members: 4, village: 'Kinathukadavu', houseAllocated: 'No', unit: '-', assistance: 250000, status: 'In Progress' },
  { id: 'RR-503', family: 'Selvam Family', members: 6, village: 'Anaimalai', houseAllocated: 'No', unit: '-', assistance: 250000, status: 'Pending' },
  { id: 'RR-504', family: 'Meena Family', members: 3, village: 'Alandur', houseAllocated: 'Yes', unit: 'Flat B-2, Alandur Rehab Complex', assistance: 300000, status: 'Completed' },
]

export const DOCUMENTS = [
  { id: 'DOC-9001', name: 'Sale Deed - LP-58231.pdf', category: 'Sale Deed', parcelId: 'LP-58231', uploadedBy: 'District Collector', date: '2025-02-01', version: 2, size: '1.2 MB' },
  { id: 'DOC-9002', name: 'Survey Report - PRJ-101.pdf', category: 'Survey Report', parcelId: '-', uploadedBy: 'Survey Dept.', date: '2024-06-20', version: 1, size: '4.6 MB' },
  { id: 'DOC-9003', name: 'Compensation Letter - CMP-3001.pdf', category: 'Compensation Letter', parcelId: 'LP-58231', uploadedBy: 'State Officer', date: '2025-02-15', version: 1, size: '340 KB' },
  { id: 'DOC-9004', name: 'Government Order GO-4471.pdf', category: 'Government Order', parcelId: '-', uploadedBy: 'Central Ministry', date: '2024-03-28', version: 1, size: '210 KB' },
]

export const NOTIFICATIONS = [
  { id: 'N-1', title: 'Compensation Released', body: 'Payment of ₹15,00,000 processed for Ravichandran M. (CMP-3001).', time: '2 hours ago', read: false, type: 'compensation' },
  { id: 'N-2', title: 'Survey Completed', body: 'Field survey completed for Anaimalai village, Pollachi taluk.', time: '5 hours ago', read: false, type: 'survey' },
  { id: 'N-3', title: 'Project Approved', body: 'Coastal Railway Expansion (PRJ-104) approved by Central Ministry.', time: 'Yesterday', read: true, type: 'project' },
  { id: 'N-4', title: 'Document Uploaded', body: 'Sale Deed for LP-58231 uploaded by District Collector office.', time: '2 days ago', read: true, type: 'document' },
]

export const DASHBOARD_STATS = {
  projects: 142,
  landRequired: 32450,
  landAcquired: 24780,
  compensationPaidCr: 920,
  pendingCases: 125,
  affectedFamilies: 6800,
}

export const STATEWISE_PROGRESS = [
  { state: 'Tamil Nadu', acquired: 24780, required: 32450 },
  { state: 'Karnataka', acquired: 18120, required: 26900 },
  { state: 'Maharashtra', acquired: 30110, required: 41200 },
  { state: 'Gujarat', acquired: 15600, required: 19800 },
  { state: 'Rajasthan', acquired: 12040, required: 22300 },
]

export const COMPENSATION_TREND = [
  { month: 'Apr', amountCr: 42 },
  { month: 'May', amountCr: 58 },
  { month: 'Jun', amountCr: 51 },
  { month: 'Jul', amountCr: 73 },
  { month: 'Aug', amountCr: 88 },
  { month: 'Sep', amountCr: 96 },
]

export const CASE_STATUS_BREAKDOWN = [
  { name: 'Approved', value: 480 },
  { name: 'Pending', value: 125 },
  { name: 'Under Review', value: 96 },
  { name: 'Rejected', value: 34 },
]

export const RECENT_ACTIVITY = [
  { id: 1, text: 'District Collector, Coimbatore approved 12 land parcels', time: '35 min ago' },
  { id: 2, text: 'Compensation of ₹42L disbursed for Chennai Metro Phase III', time: '2 hours ago' },
  { id: 3, text: 'New survey uploaded for Kadaladi Solar Park', time: '4 hours ago' },
  { id: 4, text: 'Rehabilitation housing allotted to 3 families in Alandur', time: 'Yesterday' },
]
