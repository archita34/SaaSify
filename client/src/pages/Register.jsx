import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await register(form.name, form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, var(--accent), var(--accent2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 16px' }}>⚡</div>
          <h1 style={{ fontFamily: 'var(--display)', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Create your account</h1>
          <p style={{ color: 'var(--muted)', fontSize: 15 }}>Start building with SaaSify today</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { key: 'name',     type: 'text',     label: 'Full name',  placeholder: 'Archita Sharma'      },
              { key: 'email',    type: 'email',    label: 'Email',      placeholder: 'you@company.com'     },
              { key: 'password', type: 'password', label: 'Password',   placeholder: '8+ characters'       },
            ].map(({ key, type, label, placeholder }) => (
              <div key={key}>
                <label className="label">{label}</label>
                <input className="input" type={type} required placeholder={placeholder}
                  value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} />
              </div>
            ))}
            {error && <p style={{ fontSize: 13, color: 'var(--red)', background: 'rgba(239,68,68,0.1)', padding: '10px 14px', borderRadius: 8 }}>{error}</p>}
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ justifyContent: 'center', marginTop: 8 }}>
              {loading ? 'Creating account...' : 'Get started free →'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: 'var(--muted)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}