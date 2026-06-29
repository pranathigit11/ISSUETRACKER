import { useState } from 'react'
import './ProfilePage.css'

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: 'Alex Johnson',
    role: 'Product Manager',
    email: 'alex@example.com',
    bio: 'Product Manager with 5+ years of experience in software development and team leadership.',
  })
  const [saved, setSaved] = useState(false)
  const [editing, setEditing] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)
    setEditing(false)
  }

  const initials = form.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Profile</h1>
        <p>Manage your account settings</p>
      </div>

      <div className="profile-layout">

        {/* Left — Avatar card */}
        <div className="profile-avatar-card">
          <div className="profile-avatar">{initials}</div>
          <h2 className="profile-name">{form.name}</h2>
          <p className="profile-role">{form.role}</p>
          <p className="profile-email">✉ {form.email}</p>

          <div className="profile-stats">
            <div className="profile-stat">
              <span className="pstat-num">12</span>
              <span className="pstat-label">Issues Assigned</span>
            </div>
            <div className="profile-stat">
              <span className="pstat-num" style={{ color: '#22c55e' }}>34</span>
              <span className="pstat-label">Completed</span>
            </div>
          </div>
        </div>

        {/* Right — Edit form */}
        <div className="profile-form-card">
          <div className="profile-form-header">
            <h3>Personal Information</h3>
            {!editing && (
              <button className="btn-edit-profile" onClick={() => setEditing(true)}>
                ✏️ Edit
              </button>
            )}
          </div>

          {saved && (
            <div className="profile-success">✅ Profile updated successfully!</div>
          )}

          <div className="profile-form">
            <div className="pform-row">
              <div className="pform-group">
                <label>Full Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
              <div className="pform-group">
                <label>Role</label>
                <input
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
            </div>

            <div className="pform-group">
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div className="pform-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                disabled={!editing}
                rows={4}
              />
            </div>

            {editing && (
              <div className="pform-actions">
                <button className="btn-save" onClick={handleSave}>Save Changes</button>
                <button className="btn-cancel-edit" onClick={() => setEditing(false)}>Cancel</button>
              </div>
            )}
          </div>

          {/* Account section */}
          <div className="profile-section-divider" />

          <div className="profile-form-header">
            <h3>Account Settings</h3>
          </div>

          <div className="account-rows">
            <div className="account-row">
              <div>
                <p className="account-row-label">Password</p>
                <p className="account-row-sub">Last changed 3 months ago</p>
              </div>
              <button className="btn-account">Change Password</button>
            </div>
            <div className="account-row">
              <div>
                <p className="account-row-label">Notifications</p>
                <p className="account-row-sub">Email notifications enabled</p>
              </div>
              <button className="btn-account">Manage</button>
            </div>
            <div className="account-row">
              <div>
                <p className="account-row-label" style={{ color: '#ef4444' }}>Delete Account</p>
                <p className="account-row-sub">Permanently delete your account and data</p>
              </div>
              <button className="btn-account danger">Delete</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
