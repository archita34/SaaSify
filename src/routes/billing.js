import express from 'express'
import { PrismaClient } from '@prisma/client'
import { stripe, PLANS } from '../lib/stripe.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()
const prisma = new PrismaClient()

// Get plans
router.get('/plans', (req, res) => {
  res.json(PLANS)
})

// Create checkout session
router.post('/checkout', authenticate, async (req, res) => {
  try {
    const { plan } = req.body
    const planData = PLANS[plan]
    if (!planData?.priceId) return res.status(400).json({ error: 'Invalid plan' })

    let customerId = req.user.team?.stripeCustomerId

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: req.user.email,
        name: req.user.team?.name || req.user.name,
        metadata: { teamId: req.user.teamId }
      })
      customerId = customer.id
      await prisma.team.update({
        where: { id: req.user.teamId },
        data: { stripeCustomerId: customerId }
      })
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{ price: planData.priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.CLIENT_URL}/billing?success=true`,
      cancel_url: `${process.env.CLIENT_URL}/billing?cancelled=true`,
      metadata: { teamId: req.user.teamId, plan }
    })

    res.json({ url: session.url })
  } catch (err) {
    console.error("🔥 STRIPE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
})

// Create portal session
router.post('/portal', authenticate, async (req, res) => {
  try {
    const customerId = req.user.team?.stripeCustomerId
    if (!customerId) return res.status(400).json({ error: 'No billing account' })

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.CLIENT_URL}/billing`
    })

    res.json({ url: session.url })
  } catch {
    res.status(500).json({ error: 'Portal failed' })
  }
})

// Stripe webhook
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch {
    return res.status(400).json({ error: 'Webhook error' })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    await prisma.team.update({
      where: { id: session.metadata.teamId },
      data: { plan: session.metadata.plan, stripeSubscriptionId: session.subscription }
    })
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object
    const team = await prisma.team.findFirst({ where: { stripeSubscriptionId: sub.id } })
    if (team) await prisma.team.update({ where: { id: team.id }, data: { plan: 'free' } })
  }

  res.json({ received: true })
})

export default router