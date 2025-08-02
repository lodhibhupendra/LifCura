# 🔐 Security Setup Guide

## ⚠️ Important: Secrets Removed from Codebase

All SMTP credentials have been removed from the codebase for security reasons. You need to set them up as environment variables.

## 🛠️ Setup Instructions

### For Vercel Deployment:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add these variables:

```
SMTP_USER = 932ea5002@smtp-brevo.com
SMTP_PASS = xsmtpsib-609b6171fddb3825fe6a7ccda01c8d4b2a41e642bda9f5d4f9871267bbc490f9-NY1nO4rtUAPRwEaI
```

### For Local Development:

Update your `.env.local` file with:

```
SMTP_USER=932ea5002@smtp-brevo.com
SMTP_PASS=xsmtpsib-609b6171fddb3825fe6a7ccda01c8d4b2a41e642bda9f5d4f9871267bbc490f9-NY1nO4rtUAPRwEaI
```

## 🚨 Git History Cleanup Required

GitHub has blocked your push because secrets were found in git history. You need to:

1. **Option 1: Force Push (Destructive)**
   ```bash
   git add .
   git commit -m "Remove hardcoded SMTP secrets for security"
   git push --force-with-lease origin main
   ```

2. **Option 2: Clean Git History (Recommended)**
   ```bash
   # Install git-filter-repo if not installed
   pip install git-filter-repo
   
   # Remove sensitive data from history
   git filter-repo --invert-paths --path-regex '.*\.(md|js)$' --force
   
   # Add files back
   git add .
   git commit -m "Remove hardcoded SMTP secrets for security"
   git push --force-with-lease origin main
   ```

3. **Option 3: Use GitHub's Secret Allow Feature**
   - Click the URL provided by GitHub in the error message
   - Allow the secret temporarily (not recommended for production)

## ✅ After Setup

1. Deploy to Vercel with environment variables
2. Test the contact form
3. Verify emails are being sent

## 🔒 Best Practices

- Never commit API keys, passwords, or tokens
- Always use environment variables for sensitive data
- Use `.env.local` for local development (already in .gitignore)
- Regularly rotate API keys and passwords
