import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'
import Sidebar from '../components/Sidebar'
import { useNavigate } from 'react-router-dom'

export default function Admin() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [tab, setTab] = useState('overview')

  useEffect(() => {
    if (!user?.isAdmin) { navigate('/dashboard'); return }
    api.adminStats().then(setStats).catch(() => {})
    api.adminUsers().then(setUsers).catch(() => {})
  }, [user])

  const statCards = stats ? [
    { label: 'Total users',  value: stats.totalUsers,       color: '#818cf8', icon: '👥' },
    { label: 'Total teams',  value: stats.totalTeams,       color: '#10b981', icon: '🏢' },
    { label: 'Pro teams',    value: stats.proTeams,         color: '#6366f1', icon: '⚡' },
    { label: 'MRR',          value: `$${stats.mrr}`,        color: '#f59e0b', icon: '💰' },
  ] : []

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <main style={{ flex: 1, overflowY: 'auto', padding: 40 }}>
        <div style={{ marginBottom: 40, display: 'flex', alignItems: 'center', gap: 16 }}>
          <h1 style={{ fontFamily: 'var(--display)', fontSize: 32, fontWeight: 700 }}>Admin</h1>
          <span className="badge" style={{ background: 'rgba(245,158,11,0.15)', color: 'var(--amber)' }}>Staff only</span>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 40 }}>
          {statCards.map(s => (
            <div key={s.label} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</span>
                <span style={{ fontSize: 20 }}>{s.icon}</span>
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, fontFamily: 'var(--display)', color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Users table */}
        <div className="card">
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>All users ({users.length})</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Name', 'Email', 'Role', 'Team', 'Plan', 'Joined'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} style={{ borderBottom: '1px solid var(--border)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '12px 12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--accent2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{u.name[0]}</div>
                        {u.name}
                      </div>
                    </td>
                    <td style={{ padding: '12px 12px', color: 'var(--muted)' }}>{u.email}</td>
                    <td style={{ padding: '12px 12px' }}><span className={`badge badge-${u.role === 'owner' ? 'pro' : 'free'}`}>{u.role}</span></td>
                    <td style={{ padding: '12px 12px', color: 'var(--muted)' }}>{u.team?.name || '—'}</td>
                    <td style={{ padding: '12px 12px' }}><span className={`badge badge-${u.team?.plan || 'free'}`}>{u.team?.plan || 'free'}</span></td>
                    <td style={{ padding: '12px 12px', color: 'var(--muted)' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}