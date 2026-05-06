import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import authRoutes    from './routes/auth.js'
import teamRoutes    from './routes/teams.js'
import billingRoutes from './routes/billing.js'
import adminRoutes   from './routes/admin.js'

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL }))

// Raw body for Stripe webhook
app.use('/api/billing/webhook', express.raw({ type: 'application/json' }))
app.use(express.json())

app.use('/api/auth',    authRoutes)
app.use('/api/teams',   teamRoutes)
app.use('/api/billing', billingRoutes)
app.use('/api/admin',   adminRoutes)

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`🚀 SaaSify server running on port ${PORT}`))