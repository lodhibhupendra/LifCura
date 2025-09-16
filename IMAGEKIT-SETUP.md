# ImageKit Setup Guide

## Step 1: Create ImageKit Account
1. Go to https://imagekit.io
2. Click "Sign up for free"
3. Use your email to create account
4. Verify email

## Step 2: Get API Keys
After login:
1. Go to **Dashboard**
2. Click on **Developer** in left sidebar
3. You'll see:
   - **Public Key**: `public_xxxxxxxxxxxxxxxxxx`
   - **Private Key**: `private_xxxxxxxxxxxxxxxxxx` 
   - **URL Endpoint**: `https://ik.imagekit.io/your_imagekit_id`

## Step 3: Add to Vercel Environment Variables
1. Go to your Vercel project dashboard
2. Click **Settings** tab
3. Click **Environment Variables**
4. Add these 3 variables:

```
IMAGEKIT_PUBLIC_KEY=public_xxxxxxxxxxxxxxxxxx
IMAGEKIT_PRIVATE_KEY=private_xxxxxxxxxxxxxxxxxx
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

## Step 4: Redeploy
After adding environment variables, redeploy your app:
```bash
vercel --prod
```

## Free Tier Limits:
- 20GB Storage
- 20GB Bandwidth per month
- Image transformations included
- Perfect for your project!

## Security Note:
- Public Key: Safe to use in frontend
- Private Key: Only use in backend/serverless functions
- URL Endpoint: Your unique ImageKit domain
