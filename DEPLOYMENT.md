# LifCura Contact Form - Vercel Deployment Guide

## Overview
This guide explains how to deploy the LifCura React application with email functionality to Vercel.

## Prerequisites
- Vercel account
- Brevo SMTP credentials (already configured)

## Environment Variables Setup

### For Vercel Deployment:
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the following variables:

```
SMTP_USER = 932ea5002@smtp-brevo.com
SMTP_PASS = xsmtpsib-609b6171fddb3825fe6a7ccda01c8d4b2a41e642bda9f5d4f9871267bbc490f9-NY1nO4rtUAPRwEaI
```

### For Local Development:
Environment variables are already set in `.env.local` file.

## Deployment Steps

### Method 1: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Method 2: GitHub Integration
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically deploy on every push to main branch

## Project Structure
```
lifcura-react/
├── api/
│   └── send-email.js          # Vercel API endpoint
├── src/
│   └── components/
│       └── ContactSection.js  # Contact form component
├── .env.local                 # Local environment variables
├── .env.example              # Environment variables template
├── vercel.json               # Vercel configuration
└── package.json              # Dependencies including nodemailer
```

## API Endpoint
- **URL**: `/api/send-email`
- **Method**: POST
- **Body**: `{ name, email, subject, message }`

## Email Configuration
- **SMTP Server**: smtp-relay.brevo.com
- **Port**: 587
- **From**: 932ea5002@smtp-brevo.com
- **To**: lifcura@gmail.com

## Testing
1. **Local Testing**: Run `npm start` and test the contact form
2. **Production Testing**: After deployment, test the contact form on your live site

## Troubleshooting
- Ensure environment variables are set correctly in Vercel dashboard
- Check Vercel function logs for any errors
- Verify SMTP credentials are valid in Brevo dashboard

## Security Notes
- SMTP credentials are stored as environment variables
- `.env.local` is excluded from git via `.gitignore`
- API endpoint includes input validation and error handling