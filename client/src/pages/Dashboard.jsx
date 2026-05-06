import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'
import Sidebar from '../components/Sidebar'
import TeamMembers from '../components/TeamMembers'

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [team, setTeam] = useState(null)
  const [teamName, setTeamName] = useState('')
  const [creating, setCreating] = useState(false)

  async function loadTeam() {
    try { setTeam(await api.getTeam()) } catch {}
  }

  useEffect(() => { loadTeam() }, [])

  async function createTeam(e) {
    e.preventDefault()
    setCreating(true)
    try {
      await api.createTeam({ name: teamName })
      await loadTeam()
    } catch (err) {
      alert(err.message)
    } finally {
      setCreating(false)
    }
  }

  const stats = [
    { label: 'Team members', value: team?.members?.length || 0,      icon: '👥', color: '#818cf8' },
    { label: 'Current plan',  value: team?.plan || 'free',            icon: '💳', color: '#10b981' },
    { label: 'Your role',     value: user?.role || 'owner',           icon: '🛡️', color: '#f59e0b' },
    { label: 'Status',        value: 'Active',                        icon: '✅', color: '#10b981' },
  ]

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <main style={{ flex: 1, overflowY: 'auto', padding: 40 }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontFamily: 'var(--display)', fontSize: 32, fontWeight: 700, marginBottom: 6 }}>
            Good morning, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 16 }}>Here's what's happening with your workspace.</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 40 }}>
          {stats.map(s => (
            <div key={s.label} className="card fade-up">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</span>
                <span style={{ fontSize: 20 }}>{s.icon}</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'var(--display)', color: s.color, textTransform: 'capitalize' }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Team section */}
        {!team ? (
          <div className="card" style={{ maxWidth: 480 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Create your workspace</h2>
            <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 24 }}>Set up a team workspace to collaborate and manage your project.</p>
            <form onSubmit={createTeam} style={{ display: 'flex', gap: 10 }}>
              <input className="input" required placeholder="My Startup" value={teamName} onChange={e => setTeamName(e.target.value)} />
              <button type="submit" className="btn btn-primary" disabled={creating} style={{ whiteSpace: 'nowrap' }}>
                {creating ? 'Creating...' : 'Create workspace'}
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700 }}>{team.name}</h2>
                <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 4 }}>slug: {team.slug}</p>
              </div>
              <span className={`badge badge-${team.plan}`}>{team.plan}</span>
            </div>
            <TeamMembers team={team} onRefresh={loadTeam} />
          </div>
        )}
      </main>
    </div>
  )
}