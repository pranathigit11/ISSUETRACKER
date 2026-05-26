import { useState } from "react";
import "./Profile.css";
 
const assignedIssues = [
  { id: 1, title: "Fix login authentication bug", status: "In Progress", priority: "High", due: "2026-05-28" },
  { id: 5, title: "Implement file upload feature", status: "Open", priority: "Medium", due: "2026-06-10" },
];
 
const completedIssues = [
  { id: 10, title: "Update API documentation", priority: "Low", date: "2026-05-20" },
  { id: 11, title: "Fix navigation menu bug", priority: "Medium", date: "2026-05-18" },
  { id: 12, title: "Implement search functionality", priority: "High", date: "2026-05-15" },
];
 
const recentActivity = [
  { id: 1, action: "Completed", target: "Update API documentation", time: "2 days ago" },
  { id: 2, action: "Commented on", target: "Fix login bug", time: "5 hours ago" },
  { id: 3, action: "Created", target: "Implement file upload", time: "1 week ago" },
  { id: 4, action: "Assigned", target: "Fix authentication", time: "1 week ago" },
];
 
const statusConfig = {
  "In Progress": { bg: "#FEF3C7", color: "#D97706", dot: "#F59E0B" },
  "Open":        { bg: "#DBEAFE", color: "#2563EB", dot: "#3B82F6" },
  "Completed":   { bg: "#D1FAE5", color: "#059669", dot: "#10B981" },
};
 
const priorityConfig = {
  High:   { bg: "#FEE2E2", color: "#DC2626" },
  Medium: { bg: "#FEF3C7", color: "#D97706" },
  Low:    { bg: "#DBEAFE", color: "#2563EB" },
};
 
export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    role: "Product Manager",
    email: "alex.johnson@example.com",
    location: "San Francisco, CA",
    joined: "2025-01-15",
  });
  const [draft, setDraft] = useState({ ...profile });
 
  function handleSave() {
    setProfile({ ...draft });
    setEditMode(false);
  }
 
  return (
    <main className="profile-content">
      <div className="profile-page-header">
        <h1 className="profile-title">Profile</h1>
        <p className="profile-sub">Manage your account and track your activity</p>
      </div>
 
      <div className="profile-layout">
 
        {/* LEFT COLUMN */}
        <div className="profile-left">
 
          {/* Avatar card */}
          <div className="profile-card avatar-card">
            <div className="profile-avatar">AJ</div>
            {editMode ? (
              <div className="edit-fields">
                <input
                  className="edit-input"
                  value={draft.name}
                  onChange={e => setDraft(p => ({ ...p, name: e.target.value }))}
                  placeholder="Full name"
                />
                <input
                  className="edit-input"
                  value={draft.role}
                  onChange={e => setDraft(p => ({ ...p, role: e.target.value }))}
                  placeholder="Role"
                />
              </div>
            ) : (
              <>
                <h2 className="profile-name">{profile.name}</h2>
                <p className="profile-role">{profile.role}</p>
              </>
            )}
            {editMode ? (
              <div className="profile-btn-row">
                <button className="profile-action-btn primary-btn" onClick={handleSave}>Save</button>
                <button className="profile-action-btn" onClick={() => { setDraft({ ...profile }); setEditMode(false); }}>Cancel</button>
              </div>
            ) : (
              <div className="profile-btn-row">
                <button className="profile-action-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
                <button className="profile-action-btn settings-btn">Settings</button>
              </div>
            )}
          </div>
 
          {/* Info card */}
          <div className="profile-card info-card">
            <h3 className="card-section-title">Information</h3>
            {editMode ? (
              <div className="edit-fields">
                <label className="info-label">Email</label>
                <input className="edit-input" value={draft.email} onChange={e => setDraft(p => ({ ...p, email: e.target.value }))} />
                <label className="info-label">Location</label>
                <input className="edit-input" value={draft.location} onChange={e => setDraft(p => ({ ...p, location: e.target.value }))} />
              </div>
            ) : (
              <div className="info-list">
                <div className="info-row">
                  <span className="info-icon">✉</span>
                  <div>
                    <div className="info-label">Email</div>
                    <div className="info-value">{profile.email}</div>
                  </div>
                </div>
                <div className="info-row">
                  <span className="info-icon">⊙</span>
                  <div>
                    <div className="info-label">Location</div>
                    <div className="info-value">{profile.location}</div>
                  </div>
                </div>
                <div className="info-row">
                  <span className="info-icon">▣</span>
                  <div>
                    <div className="info-label">Joined</div>
                    <div className="info-value">{profile.joined}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
 
          {/* Stats */}
          <div className="profile-card stat-card">
            <div className="stat-icon-box blue">⏱</div>
            <div className="stat-card-info">
              <div className="stat-card-label">Total Assigned</div>
              <div className="stat-card-value">2</div>
            </div>
          </div>
          <div className="profile-card stat-card">
            <div className="stat-icon-box green">✓</div>
            <div className="stat-card-info">
              <div className="stat-card-label">Completed</div>
              <div className="stat-card-value">10</div>
            </div>
          </div>
        </div>
 
        {/* RIGHT COLUMN */}
        <div className="profile-right">
 
          {/* Assigned Issues */}
          <div className="profile-card right-card">
            <div className="right-card-header">
              <h3 className="card-section-title">Assigned Issues</h3>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="issues-list">
              {assignedIssues.map(issue => (
                <div className="issue-item" key={issue.id}>
                  <div className="issue-item-info">
                    <span className="issue-item-title">{issue.title}</span>
                    <div className="issue-item-meta">
                      <span className="badge" style={{ background: statusConfig[issue.status]?.bg, color: statusConfig[issue.status]?.color }}>
                        <span className="badge-dot" style={{ background: statusConfig[issue.status]?.dot }} />
                        {issue.status}
                      </span>
                      <span className="due-text">Due {issue.due}</span>
                    </div>
                  </div>
                  <span className="badge" style={{ background: priorityConfig[issue.priority]?.bg, color: priorityConfig[issue.priority]?.color }}>
                    {issue.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
 
          {/* Completed Issues */}
          <div className="profile-card right-card">
            <h3 className="card-section-title">Completed Issues</h3>
            <div className="issues-list">
              {completedIssues.map(issue => (
                <div className="issue-item completed-item" key={issue.id}>
                  <div className="issue-item-info">
                    <div className="completed-row">
                      <span className="completed-check">✓</span>
                      <span className="issue-item-title">{issue.title}</span>
                    </div>
                    <span className="due-text">Completed {issue.date}</span>
                  </div>
                  <span className="badge" style={{ background: priorityConfig[issue.priority]?.bg, color: priorityConfig[issue.priority]?.color }}>
                    {issue.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
 
          {/* Recent Activity */}
          <div className="profile-card right-card">
            <h3 className="card-section-title">Recent Activity</h3>
            <div className="activity-list">
              {recentActivity.map(item => (
                <div className="activity-item" key={item.id}>
                  <div className="activity-avatar">AJ</div>
                  <div className="activity-info">
                    <span className="activity-text">
                      <strong>{item.action}</strong> {item.target}
                    </span>
                    <span className="activity-time">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}