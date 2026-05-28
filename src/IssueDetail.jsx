import "./IssueDetail.css";

const comments = [
  { name: "Sarah Chen",   initials: "SC", color: "#7C3AED", role: "Product Manager", text: "I have verified this issue with multiple user accounts. It seems to be related to session handling.", time: "2 hours ago" },
  { name: "Alex Johnson", initials: "AJ", color: "#4F6EF7", role: "Developer",        text: "Thanks for the report. I am investigating the session management code now.",                        time: "1 hour ago"  },
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

export default function IssueDetail({ issue, onBack, onDelete, onStatusChange }) {
  return (
    <main className="detail-content">

      {/* Back Button */}
      <button className="back-btn" onClick={onBack}>
        ← Back to Issues
      </button>

      <div className="detail-layout">

        {/* Left Side */}
        <div className="detail-left">

          {/* Issue Card */}
          <div className="detail-card">
            <div className="detail-badges">
              <span className="badge-pill" style={{ background: priorityConfig[issue.priority]?.bg, color: priorityConfig[issue.priority]?.color }}>
                {issue.priority}
              </span>
              <span className="badge-pill" style={{ background: statusConfig[issue.status]?.bg, color: statusConfig[issue.status]?.color }}>
                {issue.status}
              </span>
            </div>

            <h1 className="detail-title">{issue.title}</h1>
            <p className="detail-meta">Created by Sarah Chen on 2026-05-20</p>

            <div className="detail-body">
              <p>Users are reporting that they cannot log in with their correct credentials. The issue appears to be intermittent and affects approximately 15% of users. We need to investigate the authentication service and identify the root cause.</p>

              <br />
              <p>Steps to reproduce:</p>
              <p>1. Navigate to login page</p>
              <p>2. Enter valid credentials</p>
              <p>3. Click submit</p>
              <p>4. Observe error message</p>

              <br />
              <p>Expected: User should be logged in successfully</p>
              <p>Actual: Error message appears saying credentials are invalid</p>
            </div>
          </div>

          {/* Comments Card */}
          <div className="detail-card">
            <h2 className="comments-title">Comments</h2>
            <div className="comments-list">
              {comments.map((c, i) => (
                <div className="comment-row" key={i}>
                  <div className="comment-avatar" style={{ background: c.color }}>{c.initials}</div>
                  <div className="comment-body">
                    <div className="comment-header">
                      <span className="comment-name">{c.name}</span>
                      <span className="comment-time">{c.time}</span>
                    </div>
                    <p className="comment-text">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <div className="add-comment">
              <textarea className="comment-input" placeholder="Add a comment..." />
              <button className="submit-comment-btn">Post Comment</button>
            </div>
          </div>

        </div>

        {/* Right Side */}
        <div className="detail-right">

          {/* Details Panel */}
          <div className="detail-card">
            <h2 className="panel-title">Details</h2>

            <div className="detail-field">
              <label className="field-label">Status</label>
              <select
                className="field-select"
                value={issue.status}
                onChange={e => onStatusChange(e.target.value)}
              >
                {["Open","In Progress","Completed"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div className="detail-field">
              <label className="field-label">👤 Assignee</label>
              <div className="field-person">
                <div className="person-avatar" style={{ background: "#4F6EF7" }}>AJ</div>
                <div>
                  <div className="person-name">{issue.assignee}</div>
                  <div className="person-role">Developer</div>
                </div>
              </div>
            </div>

            <div className="detail-field">
              <label className="field-label">⏰ Priority</label>
              <span className="badge-pill" style={{ background: priorityConfig[issue.priority]?.bg, color: priorityConfig[issue.priority]?.color }}>
                {issue.priority}
              </span>
            </div>

            <div className="detail-field">
              <label className="field-label">📅 Due Date</label>
              <span className="field-value">{issue.due}</span>
            </div>

            <div className="detail-field">
              <label className="field-label">Reporter</label>
              <div className="field-person">
                <div className="person-avatar" style={{ background: "#7C3AED" }}>SC</div>
                <div>
                  <div className="person-name">Sarah Chen</div>
                  <div className="person-role">Product Manager</div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Panel */}
          <div className="detail-card">
            <h2 className="panel-title">Actions</h2>
            <div className="actions-list">
              <button className="action-btn">Edit Issue</button>
              <button className="action-btn">Assign to Me</button>
              <button className="action-btn action-delete" onClick={onDelete}>Delete Issue</button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}