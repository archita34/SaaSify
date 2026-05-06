import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticate, requireAdmin } from '../middleware/auth.js'

const router = express.Router()
const prisma = new PrismaClient()

// Get all users
router.get('/users', authenticate, requireAdmin, async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, isAdmin: true, createdAt: true, team: { select: { name: true, plan: true } } }
  })
  res.json(users)
})

// Get all teams
router.get('/teams', authenticate, requireAdmin, async (req, res) => {
  const teams = await prisma.team.findMany({
    include: { _count: { select: { members: true } } }
  })
  res.json(teams)
})

// Get stats
router.get('/stats', authenticate, requireAdmin, async (req, res) => {
  const [totalUsers, totalTeams, proTeams, enterpriseTeams] = await Promise.all([
    prisma.user.count(),
    prisma.team.count(),
    prisma.team.count({ where: { plan: 'pro' } }),
    prisma.team.count({ where: { plan: 'enterprise' } }),
  ])

  res.json({
    totalUsers,
    totalTeams,
    proTeams,
    enterpriseTeams,
    mrr: (proTeams * 29) + (enterpriseTeams * 99)
  })
})

export default router