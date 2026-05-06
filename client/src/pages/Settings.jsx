import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/Sidebar'

export default function Settings() {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)

  function handleSave(e) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <main style={{ flex: 1, overflowY: 'auto', padding: 40, maxWidth: 700 }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontFamily: 'var(--display)', fontSize: 32, fontWeight: 700, marginBottom: 6 }}>Settings</h1>
          <p style={{ color: 'var(--muted)' }}>Manage your account and preferences.</p>
        </div>

        {/* Profile */}
        <div className="card" style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Profile</h2>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label className="label">Full name</label>
                <input className="input" defaultValue={user?.name} />
              </div>
              <div>
                <label className="label">Email</label>
                <input className="input" defaultValue={user?.email} disabled style={{ opacity: 0.6 }} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button type="submit" className="btn btn-primary">Save changes</button>
              {saved && <span style={{ fontSize: 13, color: 'var(--green)' }}>✓ Saved!</span>}
            </div>
          </form>
        </div>

        {/* Account info */}
        <div className="card">
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Account info</h2>
          {[
            { label: 'User ID',   value: user?.id },
            { label: 'Role',      value: user?.role },
            { label: 'Team',      value: user?.team?.name || 'No team yet' },
            { label: 'Plan',      value: user?.team?.plan || 'free' },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 14, color: 'var(--muted)' }}>{label}</span>
              <span style={{ fontSize: 14, fontWeight: 500, fontFamily: label === 'User ID' ? 'monospace' : 'inherit', fontSize: label === 'User ID' ? 12 : 14 }}>{value}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}