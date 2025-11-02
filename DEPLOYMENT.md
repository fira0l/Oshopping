# Vercel Deployment Guide

## Prerequisites
1. Install Vercel CLI: `npm i -g vercel`
2. Create accounts: Vercel + Database provider (Supabase/PlanetScale)

## Step 1: Deploy Database
**Option A: Supabase (Recommended)**
1. Go to https://supabase.com
2. Create new project
3. Copy connection string from Settings > Database
4. Run your SQL schema in SQL Editor

**Option B: PlanetScale**
1. Go to https://planetscale.com
2. Create new database
3. Copy connection string

## Step 2: Deploy Backend (Netlify)
```bash
cd backend
npm install -g netlify-cli
netlify deploy --prod
```
- Set environment variables in Netlify dashboard:
  - `DATABASE_URL`: Your database connection string
  - `NODE_ENV`: production

## Step 3: Update Frontend URLs
1. Copy your backend URL from Vercel
2. Update `frontend/.env.production`:
   ```
   REACT_APP_GRAPHQL_URI=https://your-backend-url.vercel.app/graphql
   ```

## Step 4: Deploy Frontend
```bash
cd frontend
vercel --prod
```

## Step 5: Update Admin URLs
1. Update `adminDashboard/.env.production` with backend URL
2. Deploy admin:
```bash
cd adminDashboard
vercel --prod
```

## Final URLs
- **Frontend**: https://your-frontend.vercel.app
- **Admin**: https://your-admin.vercel.app  
- **Backend**: https://your-backend.netlify.app

## Environment Variables to Set in Vercel Dashboard
**Backend (Netlify):**
- `DATABASE_URL`
- `NODE_ENV=production`
- `JWT_SECRET` (if using JWT)

**Frontend & Admin (Vercel):**
- `REACT_APP_GRAPHQL_URI=https://your-backend.netlify.app/.netlify/functions/graphql`
- `REACT_APP_API_URL=https://your-backend.netlify.app`