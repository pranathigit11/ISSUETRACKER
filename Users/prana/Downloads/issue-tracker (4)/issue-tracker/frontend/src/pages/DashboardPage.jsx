import { useState, useEffect } from 'react'
import { fetchStats } from '../api/api'
import { StatusBadge, PriorityBadge } from '../components/Badges'
import CreateIssueModal from '../components/CreateIssueModal'
import './DashboardPage.css'

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr)
  const h = Math.floor(diff / 3600000)
  const d = Math.floor(diff / 86400000)
  if (h < 1) return 'just now'
  if (h < 24) return `${h} hour${h > 1 ? 's' : ''} ago`
  return `${d} day${d > 1 ? 's' : ''} ago`
}

const STAT_CARDS = [
  { key: 'total', label: 'Total Issues', change: '+12%', icon: '#3b6ef8', iconBg: '#eff4ff', iconPath: <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" stroke="white" strokeWidth="2" strokeLinecap="round"/> },
  { key: 'open', label: 'Open Issues', change: '-5%', icon: '#f59e0b', iconBg: '#fef3c7', iconPath: <><circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/><path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2" strokeLinecap="round"/></> },
  { key: 'inProgress', label: 'In Progress', change: '+3%', icon: '#8b5cf6', iconBg: '#ede9fe', iconPath: <><circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/><path d="M12 7v5l3 3" stroke="white" strokeWidth="2" strokeLinecap="round"/></> },
  { key: 'completed', label: 'Completed', change: '+20%', icon: '#22c55e', iconBg: '#dcfce7', iconPath: <><circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/><path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></> },
]

export default function DashboardPage({ navigate }) {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const load = async () => {
    try { const d = await fetchStats(); setStats(d) }
    catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const statValues = stats ? {
    total: stats.total, open: stats.open,
    inProgress: stats.inProgress, completed: stats.completed
  } : {}

  return (
    <div className="dashboard">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Track your team's progress and recent activity</p>
        </div>
        <button className="btn-new" onClick={() => setShowModal(true)}>+ New Issue</button>
      </div>

      {loading ? <div className="loader">Loading...</div> : (
        <>
          <div className="stat-cards">
            {STAT_CARDS.map(card => (
              <div key={card.key} className="stat-card">
                <div className="stat-left">
                  <span className="stat-label">{card.label}</span>
                  <span className="stat-value">{statValues[card.key] ?? 0}</span>
                  <span className="stat-change">↑ {card.change}</span>
                </div>
                <div className="stat-icon" style={{ background: card.iconBg }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">{card.iconPath}</svg>
                </div>
              </div>
            ))}
          </div>

          <div className="dash-bottom">
            <div className="recent-issues">
              <div className="section-header">
                <h2>Recent Issues</h2>
                <button className="view-all" onClick={() => navigate('issues')}>View All</button>
              </div>
              {!stats?.recent?.length ? (
                <div className="empty">No issues yet.</div>
              ) : (
                stats.recent.map(issue => (
                  <div key={issue._id} className="recent-row" onClick={() => navigate('detail', issue._id)}>
                    <div className="recent-left">
                      <span className="recent-title">{issue.title}</span>
                      <div className="recent-meta">
                        <StatusBadge status={issue.status} />
                        <span className="meta-text">Assigned to {issue.assignee || 'Unassigned'}</span>
                        <span className="dot">•</span>
                        <span className="meta-text">{timeAgo(issue.createdAt)}</span>
                      </div>
                    </div>
                    <PriorityBadge priority={issue.priority} />
                  </div>
                ))
              )}
            </div>

            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                {stats?.recent?.map((issue, i) => {
                  const actions = ['created issue', 'completed', 'commented on', 'assigned']
                  const names = ['Alex Johnson', 'Sarah Chen', 'Mike Davis', 'Emma Wilson']
                  return (
                    <div key={i} className="activity-item">
                      <div className="activity-avatar">{names[i % names.length].split(' ').map(w => w[0]).join('')}</div>
                      <div className="activity-text">
                        <p><strong>{names[i % names.length]}</strong> {actions[i % actions.length]} <strong>{issue.title}</strong></p>
                        <span>{timeAgo(issue.createdAt)}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {showModal && (
        <CreateIssueModal
          onClose={() => setShowModal(false)}
          onSaved={() => { setShowModal(false); load() }}
        />
      )}
    </div>
  )
}
