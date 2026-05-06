import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticate, requireRole } from '../middleware/auth.js'
import { sendInviteEmail } from '../lib/email.js'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()
const prisma = new PrismaClient()

// Create team
router.post('/', authenticate, async (req, res) => {
  try {
    const { name } = req.body
    const slug = name.toLowerCase().replace(/\s+/g, '-') + '-' + uuidv4().slice(0, 6)

    const team = await prisma.team.create({ data: { name, slug } })
    await prisma.user.update({
      where: { id: req.user.id },
      data: { teamId: team.id, role: 'owner' }
    })

    res.json(team)
  } catch {
    res.status(500).json({ error: 'Failed to create team' })
  }
})

// Get team
router.get('/me', authenticate, async (req, res) => {
  if (!req.user.teamId) return res.json(null)
  const team = await prisma.team.findUnique({
    where: { id: req.user.teamId },
    include: { members: { select: { id: true, name: true, email: true, role: true } } }
  })
  res.json(team)
})

// Invite member
router.post('/invite', authenticate, requireRole('owner', 'admin'), async (req, res) => {
  try {
    const { email } = req.body
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const invite = await prisma.invite.create({
      data: { email, teamId: req.user.teamId, expiresAt }
    })

    const inviteUrl = `${process.env.CLIENT_URL}/invite/${invite.token}`
    await sendInviteEmail({ to: email, teamName: req.user.team.name, inviteUrl })

    res.json({ message: 'Invite sent', invite })
  } catch {
    res.status(500).json({ error: 'Failed to send invite' })
  }
})

// Accept invite
router.post('/invite/:token/accept', authenticate, async (req, res) => {
  try {
    const invite = await prisma.invite.findUnique({ where: { token: req.params.token } })
    if (!invite || invite.expiresAt < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired invite' })
    }

    await prisma.user.update({
      where: { id: req.user.id },
      data: { teamId: invite.teamId, role: 'member' }
    })

    await prisma.invite.delete({ where: { id: invite.id } })
    res.json({ message: 'Joined team successfully' })
  } catch {
    res.status(500).json({ error: 'Failed to accept invite' })
  }
})

// Update member role
router.patch('/members/:userId/role', authenticate, requireRole('owner'), async (req, res) => {
  const { role } = req.body
  await prisma.user.update({ where: { id: req.params.userId }, data: { role } })
  res.json({ message: 'Role updated' })
})

// Remove member
router.delete('/members/:userId', authenticate, requireRole('owner', 'admin'), async (req, res) => {
  await prisma.user.update({ where: { id: req.params.userId }, data: { teamId: null, role: 'member' } })
  res.json({ message: 'Member removed' })
})

export default router