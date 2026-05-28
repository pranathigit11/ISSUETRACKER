import "./Dashboard.css";

const stats = [
  { label: "Total Issues",  value: 24, change: "+12%", positive: true,  color: "#3B82F6", bg: "#EFF6FF", icon: "☰"  },
  { label: "Open Issues",   value: 8,  change: "-5%",  positive: false, color: "#F59E0B", bg: "#FFFBEB", icon: "⏰" },
  { label: "In Progress",   value: 6,  change: "+3%",  positive: true,  color: "#8B5CF6", bg: "#F5F3FF", icon: "🕐" },
  { label: "Completed",     value: 10, change: "+20%", positive: true,  color: "#10B981", bg: "#ECFDF5", icon: "✅" },
];

const recentIssues = [
  { title: "Fix login authentication bug",  status: "In Progress", priority: "High",   assignee: "Alex Johnson", time: "2 hours ago"  },
  { title: "Update user profile UI",        status: "Open",        priority: "Medium", assignee: "Sarah Chen",   time: "5 hours ago"  },
  { title: "Add dark mode support",         status: "In Progress", priority: "Low",    assignee: "Mike Davis",   time: "1 day ago"    },
  { title: "Optimize database queries",     status: "Completed",   priority: "High",   assignee: "Emma Wilson",  time: "2 days ago"   },
];

const activities = [
  { name: "Alex Johnson", action: "created issue",   subject: "Fix login bug",           time: "2 hours ago", initials: "AJ", color: "#4F6EF7" },
  { name: "Sarah Chen",   action: "completed",       subject: "Update homepage design",  time: "4 hours ago", initials: "SC", color: "#7C3AED" },
  { name: "Mike Davis",   action: "commented on",    subject: "Add dark mode",           time: "6 hours ago", initials: "MD", color: "#059669" },
  { name: "Emma Wilson",  action: "assigned",        subject: "Database optimization",   time: "1 day ago",   initials: "EW", color: "#D97706" },
];

const statusConfig = {
  "In Progress": { bg: "#FEF3C7", color: "#D97706" },
  "Open":        { bg: "#DBEAFE", color: "#2563EB" },
  "Completed":   { bg: "#D1FAE5", color: "#059669" },
};

const priorityConfig = {
  High:   { bg: "#FEE2E2", color: "#DC2626" },
  Medium: { bg: "#FEF3C7", color: "#D97706" },
  Low:    { bg: "#DBEAFE", color: "#2563EB" },
};

export default function Dashboard({ onNewIssue }) {
  return (
    <main className="dash-content">

      {/* Page Header */}
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Dashboard</h1>
          <p className="dash-sub">Track your team's progress and recent activity</p>
        </div>
        <button className="new-issue-btn" onClick={onNewIssue}>+ New Issue</button>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        {stats.map(stat => (
          <div className="stat-card" key={stat.label}>
            <div className="stat-left">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
              <span className={`stat-change ${stat.positive ? "positive" : "negative"}`}>
                ↑ {stat.change}
              </span>
            </div>
            <div className="stat-icon" style={{ background: stat.bg, color: stat.color }}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="dash-bottom">

        {/* Recent Issues */}
        <div className="recent-issues-card">
          <div className="card-header">
            <span className="card-title">Recent Issues</span>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="issues-list">
            {recentIssues.map((issue, i) => (
              <div className="issue-row" key={i}>
                <div className="issue-row-left">
                  <span className="issue-row-title">{issue.title}</span>
                  <div className="issue-row-meta">
                    <span className="mini-badge" style={{ background: statusConfig[issue.status]?.bg, color: statusConfig[issue.status]?.color }}>
                      {issue.status}
                    </span>
                    <span className="meta-text">Assigned to {issue.assignee}</span>
                    <span className="meta-dot">•</span>
                    <span className="meta-text">{issue.time}</span>
                  </div>
                </div>
                <span className="priority-badge" style={{ background: priorityConfig[issue.priority]?.bg, color: priorityConfig[issue.priority]?.color }}>
                  {issue.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="activity-card">
          <div className="card-header">
            <span className="card-title">Recent Activity</span>
          </div>
          <div className="activity-list">
            {activities.map((act, i) => (
              <div className="activity-row" key={i}>
                <div className="activity-avatar" style={{ background: act.color }}>
                  {act.initials}
                </div>
                <div className="activity-text">
                  <p>
                    <span className="activity-name">{act.name}</span>
                    {" "}{act.action}{" "}
                    <span className="activity-subject">{act.subject}</span>
                  </p>
                  <span className="activity-time">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}