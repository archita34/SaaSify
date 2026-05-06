import { useNavigate } from 'react-router-dom'

const features = [
  { icon: '🔐', title: 'Auth & Security',      desc: 'JWT auth, bcrypt hashing, role-based access control out of the box.' },
  { icon: '👥', title: 'Team Workspaces',       desc: 'Multi-tenant architecture with invite system and member management.' },
  { icon: '💳', title: 'Stripe Billing',        desc: 'Subscription management, checkout sessions, and customer portal.' },
  { icon: '📧', title: 'Email Notifications',   desc: 'Automated welcome and invite emails via Resend.' },
  { icon: '🛡️', title: 'Admin Dashboard',       desc: 'Full visibility into users, teams, MRR, and platform stats.' },
  { icon: '⚡', title: 'Production Ready',      desc: 'Built to scale with clean architecture and separation of concerns.' },
]

const plans = [
  { name: 'Free',       price: '$0',  desc: '3 members · 5GB storage',    color: 'var(--muted)' },
  { name: 'Pro',        price: '$29', desc: '10 members · 50GB storage',  color: '#818cf8',      highlight: true },
  { name: 'Enterprise', price: '$99', desc: 'Unlimited · 500GB storage',  color: '#a78bfa' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Navbar */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 48px', borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, background: 'rgba(6,6,18,0.8)', backdropFilter: 'blur(12px)', zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, var(--accent), var(--accent2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>⚡</div>
          <span style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 18 }}>SaaSify</span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => navigate('/login')}    className="btn btn-secondary">Sign in</button>
          <button onClick={() => navigate('/register')} className="btn btn-primary">Get started free</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '100px 48px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 99, padding: '6px 16px', marginBottom: 32, fontSize: 13, color: '#818cf8' }}>
          ✨ Production-ready SaaS boilerplate
        </div>
        <h1 style={{ fontFamily: 'var(--display)', fontSize: 64, fontWeight: 800, lineHeight: 1.1, marginBottom: 24, background: 'linear-gradient(135deg, #fff 30%, #818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Ship your SaaS<br />in days, not months
        </h1>
        <p style={{ fontSize: 20, color: 'var(--muted)', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.6 }}>
          Everything you need to launch — auth, teams, billing, admin. Just start building your actual product.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={() => navigate('/register')} className="btn btn-primary" style={{ fontSize: 16, padding: '14px 28px' }}>
            Start for free →
          </button>
          <button onClick={() => navigate('/login')} className="btn btn-secondary" style={{ fontSize: 16, padding: '14px 28px' }}>
            Sign in
          </button>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 48px', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--display)', fontSize: 36, fontWeight: 700, textAlign: 'center', marginBottom: 56 }}>
          Everything included
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {features.map(f => (
            <div key={f.title} className="card" style={{ transition: 'border-color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: '80px 48px', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--display)', fontSize: 36, fontWeight: 700, textAlign: 'center', marginBottom: 16 }}>Simple pricing</h2>
        <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: 56 }}>Start free, upgrade when you're ready.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {plans.map(p => (
            <div key={p.name} style={{
              background: p.highlight ? 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))' : 'var(--surface)',
              border: `1px solid ${p.highlight ? 'rgba(99,102,241,0.4)' : 'var(--border)'}`,
              borderRadius: 16, padding: 28, textAlign: 'center', position: 'relative'
            }}>
              {p.highlight && (
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg, var(--accent), var(--accent2))', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 99 }}>
                  Popular
                </div>
              )}
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: p.color }}>{p.name}</div>
              <div style={{ fontSize: 40, fontWeight: 800, fontFamily: 'var(--display)', marginBottom: 8 }}>{p.price}<span style={{ fontSize: 16, fontWeight: 400, color: 'var(--muted)' }}>/mo</span></div>
              <div style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24 }}>{p.desc}</div>
              <button onClick={() => navigate('/register')} className={`btn ${p.highlight ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%', justifyContent: 'center' }}>
                Get started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '32px 48px', textAlign: 'center', color: 'var(--muted)', fontSize: 14 }}>
        Built with React, Node.js, Prisma & Stripe · SaaSify © 2026
      </footer>
    </div>
  )
}