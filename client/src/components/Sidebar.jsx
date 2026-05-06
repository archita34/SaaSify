import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/dashboard', icon: '⚡', label: 'Dashboard' },
  { to: '/settings',  icon: '⚙️', label: 'Settings'  },
  { to: '/billing',   icon: '💳', label: 'Billing'   },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <aside style={{
      width: 220, background: 'var(--surface)', borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column', padding: '20px 12px', flexShrink: 0
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', marginBottom: 32 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16
        }}>⚡</div>
        <span style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 16 }}>SaaSify</span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {links.map(({ to, icon, label }) => (
          <NavLink key={to} to={to} style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
            borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 500,
            background: isActive ? 'rgba(99,102,241,0.12)' : 'transparent',
            color: isActive ? 'var(--accent)' : 'var(--muted)',
            border: isActive ? '1px solid rgba(99,102,241,0.2)' : '1px solid transparent',
            transition: 'all 0.15s'
          })}>
            <span>{icon}</span>{label}
          </NavLink>
        ))}

        {user?.isAdmin && (
          <NavLink to="/admin" style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
            borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 500,
            background: isActive ? 'rgba(245,158,11,0.12)' : 'transparent',
            color: isActive ? 'var(--amber)' : 'var(--muted)',
            border: isActive ? '1px solid rgba(245,158,11,0.2)' : '1px solid transparent',
            transition: 'all 0.15s'
          })}>
            <span>🛡️</span>Admin
          </NavLink>
        )}
      </nav>

      {/* User */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', marginBottom: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0
          }}>{user?.name?.[0]?.toUpperCase()}</div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.role}</div>
          </div>
        </div>
        <button onClick={handleLogout} className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
          Sign out
        </button>
      </div>
    </aside>
  )
}