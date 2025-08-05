# Domain Setup Guide for LifCura

## Problem: www.lifcura.com और lifcura दोनों Google में दिखना चाहिए

## Solution: Domain Canonicalization & SEO Setup

### 1. Vercel/Hosting Provider Settings
```bash
# Primary Domain: lifcura.com
# Redirect: www.lifcura.com → lifcura.com (301 redirect)
```

### 2. DNS Configuration Required
```
A Record: lifcura.com → Your Server IP
CNAME: www.lifcura.com → lifcura.com
```

### 3. Google Search Console Setup
1. **Add both properties:**
   - https://lifcura.com
   - https://www.lifcura.com

2. **Set preferred domain:** lifcura.com (non-www)

3. **Submit sitemaps for both:**
   - https://lifcura.com/sitemap.xml
   - https://www.lifcura.com/sitemap.xml

### 4. Vercel Configuration
Create/Update `vercel.json`:
```json
{
  "redirects": [
    {
      "source": "https://www.lifcura.com/:path*",
      "destination": "https://lifcura.com/:path*",
      "permanent": true
    }
  ]
}
```

### 5. Meta Tags Added
- Keywords now include: "www.lifcura.com", "lifcura.com"
- Canonical URL set to preferred domain
- Alternate link for www version

### 6. Expected Results
- **www.lifcura.com** → automatically redirects to lifcura.com
- Both domains will appear in Google search results
- Brand searches for "lifcura" will show both variations
- SEO juice consolidated to primary domain

### 7. Deployment Steps
1. Deploy current changes
2. Configure domain redirects in hosting provider
3. Add both domains to Google Search Console
4. Submit updated sitemap
5. Monitor search performance

### 8. Testing
```bash
# Test redirects
curl -I https://www.lifcura.com
# Should return 301 redirect to https://lifcura.com

# Test canonical
curl -s https://lifcura.com | grep canonical
# Should show: <link rel="canonical" href="https://lifcura.com" />
```

## Timeline
- **Immediate**: Redirect setup
- **1-2 days**: Google recognizes both domains
- **1-2 weeks**: Both appear in search results
- **1 month**: Full SEO consolidation
