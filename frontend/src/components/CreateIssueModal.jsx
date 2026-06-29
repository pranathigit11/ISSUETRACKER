import { useState, useEffect } from 'react'
import { createIssue, updateIssue, fetchIssueById, fetchTeam } from '../api/api'
import './CreateIssueModal.css'

const EMPTY = { title: '', description: '', priority: 'Medium', status: 'Open', assignee: '', dueDate: '' }

export default function CreateIssueModal({ onClose, onSaved, editId = null }) {
  const [form, setForm] = useState(EMPTY)
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTeam().then(setTeam).catch(() => {})
    if (editId) {
      fetchIssueById(editId).then(d => {
        setForm({
          title: d.title, description: d.description,
          priority: d.priority, status: d.status,
          assignee: d.assignee, dueDate: d.dueDate || ''
        })
      })
    }
  }, [editId])

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.title.trim()) { setError('Title is required'); return }
    setLoading(true); setError('')
    try {
      if (editId) await updateIssue(editId, form)
      else await createIssue(form)
      onSaved()
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editId ? 'Edit Issue' : 'Create New Issue'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {error && <div className="modal-error">{error}</div>}

        <div className="modal-body">
          <div className="form-group">
            <label>Issue Title</label>
            <input name="title" placeholder="Brief description of the issue" value={form.title} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" placeholder="Provide more details about the issue..." value={form.description} onChange={handleChange} rows={5} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Priority</label>
              <select name="priority" value={form.priority} onChange={handleChange}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option>Open</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>Closed</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Assign To</label>
            <select name="assignee" value={form.assignee} onChange={handleChange}>
              <option value="">Select team member...</option>
              {team.map(m => <option key={m._id} value={m.name}>{m.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-create" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : editId ? 'Save Changes' : 'Create Issue'}
          </button>
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
