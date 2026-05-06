import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'
import Sidebar from '../components/Sidebar'
import PlanCard from '../components/PlanCard'

export default function Billing() {
  const { user } = useAuth()
  const [plans, setPlans] = useState({})
  const [loading, setLoading] = useState(null)
  const [msg, setMsg] = useState('')

  useEffect(() => { api.getPlans().then(setPlans).catch(() => {}) }, [])

  async function handleUpgrade(plan) {
    setLoading(plan)
    try {
      const { url } = await api.checkout(plan)
      window.location.href = url
    } catch (err) {
      setMsg(err.message)
    } finally {
      setLoading(null)
    }
  }

  async function handlePortal() {
    try {
      const { url } = await api.portal()
      window.location.href = url
    } catch (err) {
      setMsg(err.message)
    }
  }

  const currentPlan = user?.team?.plan || 'free'

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <main style={{ flex: 1, overflowY: 'auto', padding: 40 }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontFamily: 'var(--display)', fontSize: 32, fontWeight: 700, marginBottom: 6 }}>Billing & Plans</h1>
          <p style={{ color: 'var(--muted)' }}>Manage your subscription and usage.</p>
        </div>

        {/* Current plan banner */}
        <div className="card" style={{ marginBottom: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.08))', borderColor: 'rgba(99,102,241,0.2)' }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Current plan</p>
            <p style={{ fontSize: 24, fontWeight: 800, fontFamily: 'var(--display)', textTransform: 'capitalize' }}>{currentPlan}</p>
          </div>
          {currentPlan !== 'free' && (
            <button onClick={handlePortal} className="btn btn-secondary">Manage subscription →</button>
          )}
        </div>

        {msg && <p style={{ color: 'var(--red)', marginBottom: 24, fontSize: 14 }}>{msg}</p>}

        {/* Plan cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {Object.entries(plans).map(([key, plan]) => (
            <PlanCard
              key={key}
              name={plan.name}
              price={plan.price}
              features={plan.features}
              current={currentPlan === key}
              highlight={key === 'pro'}
              loading={loading === key}
              onSelect={() => key !== 'free' && handleUpgrade(key)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}