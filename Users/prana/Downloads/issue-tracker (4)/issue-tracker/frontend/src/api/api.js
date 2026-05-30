const BASE = '/api/issues'
const TEAM_BASE = '/api/team'

// Issues
export async function fetchStats() {
  const res = await fetch(`${BASE}/stats`)
  const d = await res.json()
  if (!d.success) throw new Error(d.message)
  return d.data
}

export async function fetchIssues(filters = {}) {
  const p = new URLSearchParams()
  if (filters.status) p.append('status', filters.status)
  if (filters.priority) p.append('priority', filters.priority)
  if (filters.search) p.append('search', filters.search)
  const res = await fetch(`${BASE}?${p}`)
  const d = await res.json()
  if (!d.success) throw new Error(d.message)
  return d.data
}

export async function fetchIssueById(id) {
  const res = await fetch(`${BASE}/${id}`)
  const d = await res.json()
  if (!d.success) throw new Error(d.message)
  return d.data
}

export async function createIssue(body) {
  const res = await fetch(BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  const d = await res.json()
  if (!d.success) throw new Error(d.message)
  return d.data
}

export async function updateIssue(id, body) {
  const res = await fetch(`${BASE}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  const d = await res.json()
  if (!d.success) throw new Error(d.message)
  return d.data
}

export async function deleteIssue(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  const d = await res.json()
  if (!d.success) throw new Error(d.message)
  return d
}

export async function addComment(id, body) {
  const res = await fetch(`${BASE}/${id}/comments`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  const d = await res.json()
  if (!d.success) throw new Error(d.message)
  return d.data
}

export async function deleteComment(issueId, commentId) {
  const res = await fetch(`${BASE}/${issueId}/comments/${commentId}`, { method: 'DELETE' })
  const d = await res.json()
  if (!d.success) throw new Error(d.message)
  return d.data
}

// Team
export async function fetchTeam() {
  const res = await fetch(TEAM_BASE)
  const d = await res.json()
  if (!d.success) throw new Error(d.message)
  return d.data
}

export async function addMember(body) {
  const res = await fetch(TEAM_BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  const d = await res.json()
  if (!d.success) throw new Error(d.message)
  return d.data
}

export async function deleteMember(id) {
  const res = await fetch(`${TEAM_BASE}/${id}`, { method: 'DELETE' })
  const d = await res.json()
  if (!d.success) throw new Error(d.message)
  return d
}
