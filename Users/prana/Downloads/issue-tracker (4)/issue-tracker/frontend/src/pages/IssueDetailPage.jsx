import { useState, useEffect } from 'react'
import { fetchIssueById, updateIssue, deleteIssue, addComment, deleteComment } from '../api/api'
import { StatusBadge, PriorityBadge, Avatar } from '../components/Badges'
import CreateIssueModal from '../components/CreateIssueModal'
import './IssueDetailPage.css'

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr)
  const h = Math.floor(diff / 3600000)
  const d = Math.floor(diff / 86400000)
  if (h < 1) return 'just now'
  if (h < 24) return `${h} hour${h > 1 ? 's' : ''} ago`
  return `${d} day${d > 1 ? 's' : ''} ago`
}

export default function IssueDetailPage({ issueId, navigate }) {
  const [issue, setIssue] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showEdit, setShowEdit] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const load = async () => {
    try { const d = await fetchIssueById(issueId); setIssue(d) }
    catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [issueId])

  const handleStatusChange = async (e) => {
    const updated = await updateIssue(issueId, { status: e.target.value })
    setIssue(updated)
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this issue permanently?')) return
    await deleteIssue(issueId)
    navigate('issues')
  }

  const handleAddComment = async () => {
    if (!commentText.trim()) return
    setSubmitting(true)
    try {
      const updated = await addComment(issueId, { author: 'Alex Johnson', authorRole: 'Product Manager', text: commentText })
      setIssue(updated)
      setCommentText('')
    } finally { setSubmitting(false) }
  }

  const handleDeleteComment = async (commentId) => {
    const updated = await deleteComment(issueId, commentId)
    setIssue(updated)
  }

  if (loading) return <div className="loader">Loading...</div>
  if (!issue) return <div className="loader">Issue not found.</div>

  return (
    <div className="detail-layout">
      <div className="detail-main">
        {/* Issue Card */}
        <div className="detail-card">
          <div className="detail-badges">
            <PriorityBadge priority={issue.priority} />
            <StatusBadge status={issue.status} />
          </div>
          <h1 className="detail-title">{issue.title}</h1>
          <p className="detail-created">
            Created by {issue.reporter || 'Unknown'} on {new Date(issue.createdAt).toISOString().split('T')[0]}
          </p>
          <p className="detail-desc">{issue.description || 'No description provided.'}</p>
        </div>

        {/* Comments */}
        <div className="comments-card">
          <h2>Comments</h2>
          <div className="comments-list">
            {issue.comments?.length === 0 && <p className="no-comments">No comments yet.</p>}
            {issue.comments?.map(c => (
              <div key={c._id} className="comment">
                <Avatar name={c.author} size={36} />
                <div className="comment-body">
                  <div className="comment-header">
                    <strong>{c.author}</strong>
                    <span>{timeAgo(c.createdAt)}</span>
                    <button className="del-comment" onClick={() => handleDeleteComment(c._id)}>✕</button>
                  </div>
                  <p>{c.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="add-comment">
            <textarea
              placeholder="Add a comment..."
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              rows={3}
            />
            <button className="btn-comment" onClick={handleAddComment} disabled={submitting || !commentText.trim()}>
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="detail-sidebar">
        <div className="sidebar-card">
          <h3>Details</h3>

          <div className="detail-field">
            <label>Status</label>
            <select value={issue.status} onChange={handleStatusChange}>
              <option>Open</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Closed</option>
            </select>
          </div>

          <div className="detail-field">
            <label>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/></svg>
              Assignee
            </label>
            <div className="detail-person">
              <Avatar name={issue.assignee || '?'} size={32} />
              <div>
                <p className="person-name">{issue.assignee || 'Unassigned'}</p>
                <p className="person-role">{issue.assigneeRole || ''}</p>
              </div>
            </div>
          </div>

          <div className="detail-field">
            <label>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              Priority
            </label>
            <PriorityBadge priority={issue.priority} />
          </div>

          <div className="detail-field">
            <label>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              Due Date
            </label>
            <span className="field-value">{issue.dueDate || '—'}</span>
          </div>

          <div className="detail-field">
            <label>Reporter</label>
            <div className="detail-person">
              <Avatar name={issue.reporter || '?'} size={32} />
              <div>
                <p className="person-name">{issue.reporter || '—'}</p>
                <p className="person-role">{issue.reporterRole || ''}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar-card actions-card">
          <h3>Actions</h3>
          <button className="action-btn edit-btn" onClick={() => setShowEdit(true)}>Edit Issue</button>
          <button className="action-btn assign-btn">Assign to Me</button>
          <button className="action-btn delete-btn" onClick={handleDelete}>Delete Issue</button>
        </div>
      </div>

      {showEdit && (
        <CreateIssueModal
          editId={issueId}
          onClose={() => setShowEdit(false)}
          onSaved={() => { setShowEdit(false); load() }}
        />
      )}
    </div>
  )
}
