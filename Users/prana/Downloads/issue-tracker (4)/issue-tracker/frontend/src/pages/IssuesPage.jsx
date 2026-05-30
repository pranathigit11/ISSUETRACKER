import { useState, useEffect } from 'react'
import { fetchIssues, deleteIssue } from '../api/api'
import { StatusBadge, PriorityBadge, Avatar } from '../components/Badges'
import CreateIssueModal from '../components/CreateIssueModal'
import './IssuesPage.css'

export default function IssuesPage({ navigate, searchQuery }) {
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [priorityFilter, setPriorityFilter] = useState('All Priorities')
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const filters = {}
      if (statusFilter !== 'All Statuses') filters.status = statusFilter
      if (priorityFilter !== 'All Priorities') filters.priority = priorityFilter
      if (searchQuery) filters.search = searchQuery
      const data = await fetchIssues(filters)
      setIssues(data)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [statusFilter, priorityFilter, searchQuery])

  const handleDelete = async (e, id) => {
    e.stopPropagation()
    if (!window.confirm('Delete this issue?')) return
    await deleteIssue(id)
    load()
  }

  const openEdit = (e, id) => {
    e.stopPropagation()
    setEditId(id)
    setShowModal(true)
  }

  return (
    <div className="issues-page">
      <div className="page-header">
        <div>
          <h1>Issues</h1>
          <p>Manage and track all your project issues</p>
        </div>
        <div className="header-right">
          <div className="view-toggle">
            <button className="view-btn active">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            <button className="view-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/></svg>
            </button>
          </div>
          <button className="btn-new" onClick={() => { setEditId(null); setShowModal(true) }}>+ New Issue</button>
        </div>
      </div>

      <div className="filters">
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option>All Statuses</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Closed</option>
        </select>
        <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
          <option>All Priorities</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>
      </div>

      <div className="issues-table">
        <div className="table-head">
          <span>ISSUE</span>
          <span>STATUS</span>
          <span>PRIORITY</span>
          <span>ASSIGNEE</span>
          <span>DUE DATE</span>
          <span></span>
        </div>

        {loading ? <div className="loader">Loading...</div> : issues.length === 0 ? (
          <div className="empty">No issues found.</div>
        ) : issues.map(issue => (
          <div key={issue._id} className="table-row" onClick={() => navigate('detail', issue._id)}>
            <div className="issue-cell">
              <span className="issue-name">{issue.title}</span>
              {issue.description && <span className="issue-desc">{issue.description.slice(0, 60)}{issue.description.length > 60 ? '...' : ''}</span>}
            </div>
            <div><StatusBadge status={issue.status} /></div>
            <div><PriorityBadge priority={issue.priority} /></div>
            <div className="assignee-cell">
              {issue.assignee ? (
                <><Avatar name={issue.assignee} size={28} /><span>{issue.assignee}</span></>
              ) : <span className="no-assignee">—</span>}
            </div>
            <div className="date-cell">{issue.dueDate || '—'}</div>
            <div className="actions-cell" onClick={e => e.stopPropagation()}>
              <button className="row-btn edit" onClick={e => openEdit(e, issue._id)} title="Edit">✏️</button>
              <button className="row-btn del" onClick={e => handleDelete(e, issue._id)} title="Delete">🗑</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <CreateIssueModal
          editId={editId}
          onClose={() => setShowModal(false)}
          onSaved={() => { setShowModal(false); load() }}
        />
      )}
    </div>
  )
}
