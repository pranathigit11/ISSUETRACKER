import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import DashboardPage from './pages/DashboardPage'
import IssuesPage from './pages/IssuesPage'
import IssueDetailPage from './pages/IssueDetailPage'
import TeamPage from './pages/TeamPage'
import ProfilePage from './pages/ProfilePage'
import './App.css'

export default function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [selectedIssueId, setSelectedIssueId] = useState(null)
  const [search, setSearch] = useState('')

  const navigate = (page, id = null) => {
    setSelectedIssueId(id)
    setActivePage(page)
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <DashboardPage navigate={navigate} />
      case 'issues': return <IssuesPage navigate={navigate} searchQuery={search} />
      case 'detail': return <IssueDetailPage issueId={selectedIssueId} navigate={navigate} />
      case 'team': return <TeamPage />
      case 'profile': return <ProfilePage />
      default: return <DashboardPage navigate={navigate} />
    }
  }

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} navigate={navigate} />
      <div className="app-right">
        <Topbar search={search} setSearch={setSearch} />
        <main className="app-content">{renderPage()}</main>
      </div>
    </div>
  )
}
