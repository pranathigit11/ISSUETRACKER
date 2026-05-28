`import { useState } from "react";
import "./App.css";
import Dashboard from "./Dashboard";
import IssueDetail from "./IssueDetail";
import Team from "./Team";
import Profile from "./Profile";

const initialIssues = [
  { id: 1, title: "Fix login authentication bug", desc: "Users are unable to login with correct credentials", status: "In Progress", priority: "High", assignee: "Alex Johnson", initials: "AJ", color: "#4F6EF7", due: "2026-05-28" },
  { id: 2, title: "Update user profile UI", desc: "Modernize the user profile page design", status: "Open", priority: "Medium", assignee: "Sarah Chen", initials: "SC", color: "#7C3AED", due: "2026-06-01" },
  { id: 3, title: "Add dark mode support", desc: "Implement dark mode across the application", status: "In Progress", priority: "Low", assignee: "Mike Davis", initials: "MD", color: "#059669", due: "2026-06-05" },
  { id: 4, title: "Optimize database queries", desc: "Improve performance of slow database queries", status: "Completed", priority: "High", assignee: "Emma Wilson", initials: "EW", color: "#D97706", due: "2026-05-20" },
  { id: 5, title: "Implement file upload feature", desc: "Add ability to upload files to issues", status: "Open", priority: "Medium", assignee: "Alex Johnson", initials: "AJ", color: "#4F6EF7", due: "2026-06-10" },
  { id: 6, title: "Fix mobile responsive issues", desc: "Some pages are not displaying correctly on mobile", status: "Open", priority: "High", assignee: "Sarah Chen", initials: "SC", color: "#7C3AED", due: "2026-05-30" },
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

const navItems = [
  { label: "Dashboard", icon: "⊞" },
  { label: "Issues",    icon: "☰" },
  { label: "Team",      icon: "👥" },
  { label: "Profile",   icon: "👤" },
];

export default function App() {
  const [activeNav, setActiveNav]           = useState("Dashboard");
  const [search, setSearch]                 = useState("");
  const [statusFilter, setStatusFilter]     = useState("All Statuses");
  const [priorityFilter, setPriorityFilter] = useState("All Priorities");
  const [viewMode, setViewMode]             = useState("list");
  const [issues, setIssues]                 = useState(initialIssues);
  const [showModal, setShowModal]           = useState(false);
  const [selectedIssue, setSelectedIssue]   = useState(null);
  const [newIssue, setNewIssue]             = useState({
    title: "", desc: "", status: "Open", priority: "Medium", assignee: "", due: ""
  });

  const filtered = issues.filter(i => {
    const matchSearch   = i.title.toLowerCase().includes(search.toLowerCase()) ||
                          i.desc.toLowerCase().includes(search.toLowerCase());
    const matchStatus   = statusFilter   === "All Statuses"   || i.status   === statusFilter;
    const matchPriority = priorityFilter === "All Priorities" || i.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  function handleAddIssue() {
    if (!newIssue.title.trim()) return;
    const colors   = ["#4F6EF7","#7C3AED","#059669","#D97706","#DC2626"];
    const initials = newIssue.assignee
      ? newIssue.assignee.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
      : "??";
    setIssues(prev => [
      ...prev,
      { ...newIssue, id: Date.now(), initials, color: colors[Math.floor(Math.random() * colors.length)] }
    ]);
    setShowModal(false);
    setNewIssue({ title: "", desc: "", status: "Open", priority: "Medium", assignee: "", due: "" });
  }

  function handleDeleteIssue() {
    setIssues(prev => prev.filter(i => i.id !== selectedIssue.id));
    setSelectedIssue(null);
    setActiveNav("Issues");
  }

  function handleStatusChange(newStatus) {
    setIssues(prev => prev.map(i => i.id === selectedIssue.id ? { ...i, status: newStatus } : i));
    setSelectedIssue(prev => ({ ...prev, status: newStatus }));
  }

  return (
    <div className="app-root">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-icon">☰</span>
          <span className="logo-text">Issue Tracker</span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.label}
              className={`nav-item ${activeNav === item.label ? "active" : ""}`}
              onClick={() => { setActiveNav(item.label); setSelectedIssue(null); }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="main-wrapper">

        {/* Top Bar */}
        <header className="topbar">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              placeholder="Search issues..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="user-info">
            <div className="notif-btn">
              <span>🔔</span>
              <span className="notif-dot" />
            </div>
            <div className="user-details">
              <span className="user-name">Alex Johnson</span>
              <span className="user-role">Product Manager</span>
            </div>
            <div className="avatar" style={{ background: "#4F6EF7" }}>AJ</div>
          </div>
        </header>

        {/* Dashboard Page */}
        {activeNav === "Dashboard" && !selectedIssue && (
          <Dashboard onNewIssue={() => { setActiveNav("Issues"); setShowModal(true); }} />
        )}

        {/* Issue Detail Page */}
        {selectedIssue && (
          <IssueDetail
            issue={selectedIssue}
            onBack={() => { setSelectedIssue(null); setActiveNav("Issues"); }}
            onDelete={handleDeleteIssue}
            onStatusChange={handleStatusChange}
          />
        )}

        {/* Issues Page */}
        {activeNav === "Issues" && !selectedIssue && (
          <main className="content">
            <div className="page-header">
              <h1 className="page-title">Issues</h1>
              <p className="page-sub">Manage and track all your project issues</p>
            </div>

            <div className="toolbar">
              <div className="filters">
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                  {["All Statuses","Open","In Progress","Completed"].map(s => <option key={s}>{s}</option>)}
                </select>
                <select className="filter-select" value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
                  {["All Priorities","High","Medium","Low"].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="actions">
                <button className={`view-btn ${viewMode === "list" ? "view-btn-active" : ""}`} onClick={() => setViewMode("list")}>≡</button>
                <button className={`view-btn ${viewMode === "grid" ? "view-btn-active" : ""}`} onClick={() => setViewMode("grid")}>⊞</button>
                <button className="new-issue-btn" onClick={() => setShowModal(true)}>+ New Issue</button>
              </div>
            </div>

            {viewMode === "list" ? (
              <div className="issues-table">
                <div className="table-header">
                  <span>ISSUE</span>
                  <span>STATUS</span>
                  <span>PRIORITY</span>
                  <span>ASSIGNEE</span>
                  <span>DUE DATE</span>
                </div>
                {filtered.length === 0 && (
                  <div className="empty-state">No issues found matching your filters.</div>
                )}
                {filtered.map(issue => (
                  <div
                    className="table-row"
                    key={issue.id}
                    onClick={() => setSelectedIssue(issue)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="issue-cell">
                      <span className="issue-title">{issue.title}</span>
                      <span className="issue-desc">{issue.desc}</span>
                    </div>
                    <div>
                      <span className="badge" style={{ background: statusConfig[issue.status]?.bg, color: statusConfig[issue.status]?.color }}>
                        <span className="badge-dot" style={{ background: statusConfig[issue.status]?.dot }} />
                        {issue.status}
                      </span>
                    </div>
                    <div>
                      <span className="badge" style={{ background: priorityConfig[issue.priority]?.bg, color: priorityConfig[issue.priority]?.color }}>
                        {issue.priority}
                      </span>
                    </div>
                    <div className="assignee-cell">
                      <div className="mini-avatar" style={{ background: issue.color }}>{issue.initials}</div>
                      <span>{issue.assignee}</span>
                    </div>
                    <div className="due-date">{issue.due}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid-view">
                {filtered.map(issue => (
                  <div
                    className="grid-card"
                    key={issue.id}
                    onClick={() => setSelectedIssue(issue)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="grid-card-top">
                      <span className="badge" style={{ background: priorityConfig[issue.priority]?.bg, color: priorityConfig[issue.priority]?.color }}>{issue.priority}</span>
                      <span className="badge" style={{ background: statusConfig[issue.status]?.bg, color: statusConfig[issue.status]?.color }}>{issue.status}</span>
                    </div>
                    <div className="grid-card-title">{issue.title}</div>
                    <div className="grid-card-desc">{issue.desc}</div>
                    <div className="grid-card-footer">
                      <div className="assignee-cell">
                        <div className="mini-avatar" style={{ background: issue.color }}>{issue.initials}</div>
                        <span>{issue.assignee}</span>
                      </div>
                      <span className="due-date">{issue.due}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        )}

        {/* ✅ Team Page */}
        {activeNav === "Team" && !selectedIssue && <Team />}

        {/* ✅ Profile Page */}
        {activeNav === "Profile" && !selectedIssue && <Profile />}

      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>

            <div className="modal-header">
              <h2 className="modal-title">Create New Issue</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <div className="modal-fields">
              <label>Issue Title</label>
              <input
                className="modal-input"
                placeholder="Brief description of the issue"
                value={newIssue.title}
                onChange={e => setNewIssue(p => ({ ...p, title: e.target.value }))}
              />
              <label>Description</label>
              <textarea
                className="modal-input modal-textarea"
                placeholder="Provide more details about the issue..."
                value={newIssue.desc}
                onChange={e => setNewIssue(p => ({ ...p, desc: e.target.value }))}
              />
              <div className="modal-row">
                <div>
                  <label>Priority</label>
                  <select className="modal-input" value={newIssue.priority} onChange={e => setNewIssue(p => ({ ...p, priority: e.target.value }))}>
                    {["Medium","High","Low"].map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label>Status</label>
                  <select className="modal-input" value={newIssue.status} onChange={e => setNewIssue(p => ({ ...p, status: e.target.value }))}>
                    {["Open","In Progress","Completed"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <label>Assign To</label>
              <select
                className="modal-input"
                value={newIssue.assignee}
                onChange={e => setNewIssue(p => ({ ...p, assignee: e.target.value }))}
              >
                <option value="">Select team member...</option>
                <option>Alex Johnson</option>
                <option>Sarah Chen</option>
                <option>Mike Davis</option>
                <option>Emma Wilson</option>
              </select>
              <label>Due Date</label>
              <input
                className="modal-input"
                type="date"
                value={newIssue.due}
                onChange={e => setNewIssue(p => ({ ...p, due: e.target.value }))}
              />
            </div>

            <div className="modal-actions">
              <button className="new-issue-btn modal-create-btn" onClick={handleAddIssue}>Create Issue</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}`````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
