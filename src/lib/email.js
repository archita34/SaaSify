import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendInviteEmail({ to, teamName, inviteUrl }) {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: "your-real-email@gmail.com",
    subject: `You're invited to join ${teamName}`,
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:40px 20px;">
        <h2 style="color:#6366f1">You've been invited! 🎉</h2>
        <p>You've been invited to join <strong>${teamName}</strong> on SaaSify.</p>
        <a href="${inviteUrl}" style="display:inline-block;background:#6366f1;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin-top:16px">
          Accept Invitation
        </a>
        <p style="color:#999;margin-top:24px;font-size:13px">This invite expires in 7 days.</p>
      </div>
    `
  })
}

export async function sendWelcomeEmail({ to, name }) {
  await resend.emails.send({
    from: 'SaaSify <noreply@yourdomain.com>',
    to,
    subject: 'Welcome to SaaSify! 🚀',
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:40px 20px;">
        <h2 style="color:#6366f1">Welcome, ${name}! 🚀</h2>
        <p>Your account is ready. Start by creating your team workspace.</p>
        <a href="${process.env.CLIENT_URL}/dashboard" style="display:inline-block;background:#6366f1;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin-top:16px">
          Go to Dashboard
        </a>
      </div>
    `
  })
}