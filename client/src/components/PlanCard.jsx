export default function PlanCard({ name, price, features, current, onSelect, loading, highlight }) {
  return (
    <div style={{
      background: highlight ? 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))' : 'var(--surface)',
      border: `1px solid ${highlight ? 'rgba(99,102,241,0.4)' : 'var(--border)'}`,
      borderRadius: 16, padding: 28, display: 'flex', flexDirection: 'column', gap: 20,
      position: 'relative', transition: 'all 0.2s',
    }}>
      {highlight && (
        <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg, var(--accent), var(--accent2))', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 99, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Most Popular
        </div>
      )}

      <div>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{name}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontSize: 36, fontWeight: 800, fontFamily: 'var(--display)' }}>${price}</span>
          <span style={{ fontSize: 14, color: 'var(--muted)' }}>/month</span>
        </div>
      </div>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {features.map(f => (
          <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--muted)' }}>
            <span style={{ color: 'var(--green)', fontSize: 16 }}>✓</span>{f}
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        disabled={current || loading}
        className={`btn ${highlight ? 'btn-primary' : 'btn-secondary'}`}
        style={{ justifyContent: 'center', opacity: current ? 0.5 : 1 }}
      >
        {loading ? 'Loading...' : current ? 'Current plan' : `Upgrade to ${name}`}
      </button>
    </div>
  )
}