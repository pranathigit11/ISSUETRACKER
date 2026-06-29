import { useState, useEffect } from 'react'
import { fetchTeam, addMember, deleteMember } from '../api/api'
import { Avatar } from '../components/Badges'
import './TeamPage.css'

export default function TeamPage() {
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ name: '', role: '', email: '' })
  const [saving, setSaving] = useState(false)

  const load = async () => {
    try { const d = await fetchTeam(); setTeam(d) }
    catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const handleAdd = async () => {
    if (!form.name.trim()) return
    setSaving(true)
    try { await addMember(form); setForm({ name: '', role: '', email: '' }); setShowAdd(false); load() }
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this member?')) return
    await deleteMember(id)
    load()
  }

  return (
    <div className="team-page">
      <div className="page-header">
        <div>
          <h1>Team Members</h1>
          <p>{team.length} members in your team</p>
        </div>
        <button className="btn-new" onClick={() => setShowAdd(true)}>+ Add Member</button>
      </div>

      {loading ? <div className="loader">Loading...</div> : (
        <div className="team-grid">
          {team.map(m => (
            <div key={m._id} className="member-card">
              <div className="member-header">
                <div className="member-info">
                  <Avatar name={m.name} size={48} />
                  <div>
                    <p className="member-name">{m.name}</p>
                    <p className="member-role">{m.role}</p>
                    <p className="member-email">✉ {m.email}</p>
                  </div>
                </div>
                <button className="member-menu" onClick={() => handleDelete(m._id)} title="Remove">⋮</button>
              </div>

              <div className="member-stats">
                <div className="member-stat">
                  <div className="stat-icon-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  </div>
                  <span className="stat-label-sm">Assigned</span>
                  <span className="stat-num">{m.assigned}</span>
                </div>
                <div className="member-stat">
                  <div className="stat-icon-sm green">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span className="stat-label-sm">Completed</span>
                  <span className="stat-num green">{m.completed}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Team Member</h2>
              <button className="modal-close" onClick={() => setShowAdd(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Full Name</label>
                <input placeholder="e.g. Alex Johnson" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input placeholder="e.g. Senior Developer" value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input placeholder="email@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-create" onClick={handleAdd} disabled={saving}>{saving ? 'Adding...' : 'Add Member'}</button>
              <button className="btn-cancel" onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
