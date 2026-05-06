import { useState } from 'react'
import { api } from '../lib/api'
import { useAuth } from '../context/AuthContext'

export default function TeamMembers({ team, onRefresh }) {
  const { user } = useAuth()
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviting, setInviting] = useState(false)
  const [msg, setMsg] = useState('')

  async function handleInvite(e) {
    e.preventDefault()
    setInviting(true)
    try {
      await api.inviteMember({ email: inviteEmail })
      setMsg('Invite sent! ✓')
      setInviteEmail('')
    } catch (err) {
      setMsg(err.message)
    } finally {
      setInviting(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Invite form */}
      {['owner', 'admin'].includes(user?.role) && (
        <div className="card">
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Invite team member</h3>
          <form onSubmit={handleInvite} style={{ display: 'flex', gap: 10 }}>
            <input className="input" type="email" required placeholder="colleague@company.com"
              value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} />
            <button type="submit" className="btn btn-primary" disabled={inviting} style={{ whiteSpace: 'nowrap' }}>
              {inviting ? 'Sending...' : 'Send invite'}
            </button>
          </form>
          {msg && <p style={{ fontSize: 13, color: 'var(--green)', marginTop: 10 }}>{msg}</p>}
        </div>
      )}

      {/* Members list */}
      <div className="card">
        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>
          Members <span style={{ color: 'var(--muted)', fontWeight: 400 }}>({team?.members?.length || 0})</span>
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {team?.members?.map(member => (
            <div key={member.id} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0',
              borderBottom: '1px solid var(--border)'
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700, flexShrink: 0
              }}>{member.name[0].toUpperCase()}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{member.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{member.email}</div>
              </div>
              <span className={`badge badge-${member.role === 'owner' ? 'pro' : 'free'}`}>{member.role}</span>
              {user?.role === 'owner' && member.id !== user.id && (
                <button onClick={() => api.removeMember(member.id).then(onRefresh)} className="btn btn-danger btn-sm">
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}