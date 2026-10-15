# Sri Aurobindo School, Bhopal — Deployment Guide

## Production Deployment Specifications

### Framework & Runtime
- **Framework:** Next.js 14+ (App Router)
- **Node.js Target:** LTS 18.x, 20.x, or 22+ (tested on Node v24.15.0)
- **Edge / Serverless Ready:** Vercel, AWS Amplify, Netlify, or self-hosted Docker / Node container.

### Environment Variables
Configure the following in `.env.local` or host dashboard:
```env
NEXT_PUBLIC_APP_URL=https://sas.edu.in
ADMIN_SECRET_KEY=sas_admin_bhopal_1989
ADMIN_PASSWORD=aurobindo@1989
NEXT_PUBLIC_SCHOOL_PHONE=0755-2558286
NEXT_PUBLIC_SCHOOL_EMAIL=aurobhopal@gmail.com
```

### Local Development Commands
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Production build verification
npm run build

# 4. Run production server
npm run start
```
