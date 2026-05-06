import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    members: 3,
    features: ['3 team members', 'Basic analytics', '5GB storage', 'Email support']
  },
  pro: {
    name: 'Pro',
    price: 29,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    members: 10,
    features: ['10 team members', 'Advanced analytics', '50GB storage', 'Priority support', 'Custom domains']
  },
  enterprise: {
    name: 'Enterprise',
    price: 99,
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
    members: -1,
    features: ['Unlimited members', 'Full analytics suite', '500GB storage', '24/7 support', 'SSO', 'Audit logs']
  }
}