import './Badges.css'

export function StatusBadge({ status }) {
  const cls = {
    'Open': 'status-open',
    'In Progress': 'status-progress',
    'Completed': 'status-completed',
    'Closed': 'status-closed',
  }
  return <span className={`badge ${cls[status] || 'status-open'}`}>{status}</span>
}

export function PriorityBadge({ priority }) {
  const cls = {
    'High': 'priority-high',
    'Medium': 'priority-medium',
    'Low': 'priority-low',
    'Critical': 'priority-critical',
  }
  return <span className={`badge ${cls[priority] || 'priority-medium'}`}>{priority}</span>
}

export function Avatar({ name = '', size = 32 }) {
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
  const colors = ['#3b6ef8','#8b5cf6','#ec4899','#14b8a6','#f59e0b','#ef4444','#22c55e']
  const color = colors[name.charCodeAt(0) % colors.length]
  return (
    <div className="avatar" style={{ width: size, height: size, background: color, fontSize: size * 0.36 }}>
      {initials}
    </div>
  )
}
