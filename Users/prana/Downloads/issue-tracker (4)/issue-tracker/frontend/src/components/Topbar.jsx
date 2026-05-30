import './Topbar.css'

export default function Topbar({ search, setSearch }) {
  return (
    <header className="topbar">
      <div className="topbar-search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          placeholder="Search issues..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="topbar-right">
        <div className="notif-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="notif-dot" />
        </div>
        <div className="user-info">
          <div className="user-text">
            <span className="user-name">Alex Johnson</span>
            <span className="user-role">Product Manager</span>
          </div>
          <div className="user-avatar">AJ</div>
        </div>
      </div>
    </header>
  )
}
