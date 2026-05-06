const BASE = '/api'

function getToken() {
  return localStorage.getItem('token')
}

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
      ...options.headers,
    },
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

export const api = {
  // Auth
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login:    (body) => request('/auth/login',    { method: 'POST', body: JSON.stringify(body) }),
  me:       ()     => request('/auth/me'),

  // Teams
  createTeam:   (body)         => request('/teams',                     { method: 'POST',   body: JSON.stringify(body) }),
  getTeam:      ()             => request('/teams/me'),
  inviteMember: (body)         => request('/teams/invite',              { method: 'POST',   body: JSON.stringify(body) }),
  updateRole:   (userId, role) => request(`/teams/members/${userId}/role`, { method: 'PATCH', body: JSON.stringify({ role }) }),
  removeMember: (userId)       => request(`/teams/members/${userId}`,   { method: 'DELETE' }),

  // Billing
  getPlans:    ()     => request('/billing/plans'),
  checkout:    (plan) => request('/billing/checkout', { method: 'POST', body: JSON.stringify({ plan }) }),
  portal:      ()     => request('/billing/portal',   { method: 'POST' }),

  // Admin
  adminStats: () => request('/admin/stats'),
  adminUsers: () => request('/admin/users'),
  adminTeams: () => request('/admin/teams'),
}