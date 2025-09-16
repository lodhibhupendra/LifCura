# Vercel Deployment Guide - Image Upload Fix

## समस्या का समाधान
Local में image upload काम कर रहा था लेकिन Vercel पर नहीं। अब यह fix हो गया है।

## क्या किया गया है:

### 1. Serverless Functions बनाए गए
- `/api/upload.js` - Image upload के लिए
- `/api/delete-image.js` - Image delete के लिए

### 2. React App में Changes
- Production में serverless functions का use करने के लिए code update किया
- Local development में अभी भी upload server (port 4000) का use होगा

### 3. Dependencies Added
- `imagekit` package added
- `uuid` package added

## Deployment Steps:

### 1. Install Dependencies
```bash
cd lifcura-react
npm install
```

### 2. Vercel Environment Variables Set करें
Vercel dashboard में जाकर ये environment variables add करें:

```
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key  
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

### 3. ImageKit Account Setup
1. https://imagekit.io पर जाएं
2. Free account बनाएं
3. Dashboard से keys copy करें:
   - Public Key
   - Private Key  
   - URL Endpoint

### 4. Deploy to Vercel
```bash
vercel --prod
```

## कैसे काम करता है:

- **Local Development**: Upload server (port 4000) का use करता है
- **Production (Vercel)**: Serverless functions (`/api/upload` और `/api/delete-image`) का use करता है

## Testing:
1. Local में test करें: `npm start`
2. Production में deploy करके test करें

अब आपका image upload Vercel पर भी काम करेगा! 🎉
