# ⚡ SaaSify — Multi-Tenant SaaS Starter with Billing

> A production-ready SaaS boilerplate with everything wired up — auth, team workspaces, role-based access, Stripe billing, admin dashboard, and email notifications.

---

## 🔴 Live Demo

**[https://your-saasify-link.netlify.app](https://your-saasify-link.netlify.app)**

> Test credentials — Email: `demo@saasify.com` · Password: `demo1234`

---

## 🚀 What is SaaSify?

SaaSify is a full-stack multi-tenant SaaS boilerplate that lets you skip the boring setup and start building your actual product. Every founder's first 2 weeks of work — auth, teams, billing, admin — is already done.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🔐 Authentication | JWT-based auth with bcrypt password hashing |
| 👥 Team Workspaces | Multi-tenant architecture with invite system |
| 🛡️ Role-Based Access | Owner / Admin / Member roles with middleware enforcement |
| 💳 Stripe Billing | Checkout sessions, subscription management, customer portal |
| 📧 Email Notifications | Welcome emails and team invites via Resend |
| 🛡️ Admin Dashboard | Full platform visibility — users, teams, MRR stats |
| 🗄️ Database | Prisma ORM with SQLite (easily swap to PostgreSQL) |
| 🎨 Dark UI | Custom dark theme with smooth animations |

---

---

## 🖥️ Pages

| Route | Description |
|---|---|
| `/` | Marketing landing page with pricing |
| `/register` | Create account |
| `/login` | Sign in |
| `/dashboard` | Team workspace + member management |
| `/settings` | Profile and account info |
| `/billing` | Plan cards + Stripe checkout |
| `/admin` | Admin-only — users table + MRR |

---

## 🧰 Tech Stack

**Frontend**
- React 18
- React Router v6
- Vite
- Custom CSS variables (no UI library)

**Backend**
- Node.js + Express
- Prisma ORM
- SQLite (dev) / PostgreSQL (prod)
- JWT Authentication
- bcryptjs

**Services**
- Stripe — subscription billing
- Resend — transactional email

---

## ⚙️ How to Run Locally

**Clone the repo**
```bash
git clone https://github.com/archita34/SaaSify.git
cd SaaSify
```

**Set up environment variables**
```bash
cp .env.example .env
# Fill in your keys in .env
```

**Install and run backend**
```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

**Install and run frontend** (new terminal)
```bash
cd client
npm install
npm run dev
```

Open **http://localhost:5173**

---

## 🔑 Environment Variables

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
RESEND_API_KEY="re_..."
CLIENT_URL="http://localhost:5173"
STRIPE_PRO_PRICE_ID="price_..."
STRIPE_ENTERPRISE_PRICE_ID="price_..."
```

---

## 💳 Pricing Plans

| Plan | Price | Members | Storage |
|---|---|---|---|
| Free | $0/mo | 3 | 5GB |
| Pro | $29/mo | 10 | 50GB |
| Enterprise | $99/mo | Unlimited | 500GB |

---

---

## 🚀 Deployment

| Service | Platform |
|---|---|
| Frontend | Netlify / Vercel |
| Backend | Railway |
| Database | Supabase (PostgreSQL) |

---

## 📸 Screenshots

> Dashboard — team workspace with member management
> Billing — Stripe-powered plan cards
> Admin — platform stats with MRR tracking
> <img width="1919" height="896" alt="Screenshot 2026-05-06 150004" src="https://github.com/user-attachments/assets/3723fc1f-d438-4e1a-baad-15f999b1badf" />
> <img width="1919" height="870" alt="Screenshot 2026-05-06 150101" src="https://github.com/user-attachments/assets/4e366152-25c8-4476-94d5-764c3e5c476e" />
> <img width="1911" height="909" alt="Screenshot 2026-05-06 150130" src="https://github.com/user-attachments/assets/30ca9f1e-0dfa-41a9-a7d2-a4eb3f0fedb0" />
> <img width="1917" height="879" alt="Screenshot 2026-05-06 150153" src="https://github.com/user-attachments/assets/e6aa04aa-6eed-4036-87ff-76feda9310e3" />





---

## Built By

**Archita** · [GitHub @archita34](https://github.com/archita34)
