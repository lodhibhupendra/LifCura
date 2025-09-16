import ImageKit from 'imagekit';
import { v4 as uuidv4 } from 'uuid';

// Initialize ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Configure body parser for Vercel
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check for required environment variables
    if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_URL_ENDPOINT) {
      return res.status(500).json({ error: 'ImageKit configuration missing' });
    }

    // For Vercel, we'll use a different approach - base64 upload
    const { fileData, fileName, fileType } = req.body;

    if (!fileData) {
      return res.status(400).json({ error: 'No file data provided' });
    }

    // Validate file type
    if (!fileType || !fileType.startsWith('image/')) {
      return res.status(400).json({ error: 'Only image files are allowed' });
    }

    // Convert base64 to buffer
    const base64Data = fileData.replace(/^data:image\/[a-z]+;base64,/, '');
    const fileBuffer = Buffer.from(base64Data, 'base64');

    // Check file size (5MB limit)
    if (fileBuffer.length > 5 * 1024 * 1024) {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB' });
    }

    // Generate safe filename
    const safeName = (fileName || 'upload').replace(/[^a-zA-Z0-9._-]/g, '_');
    const finalFileName = `${Date.now()}-${uuidv4()}-${safeName}`;

    // Upload to ImageKit
    const result = await imagekit.upload({
      file: fileBuffer,
      fileName: finalFileName,
      folder: '/product-images',
      useUniqueFileName: false,
      isPrivateFile: false,
      tags: ['lifcura', 'product'],
    });

    if (!result?.url) {
      return res.status(500).json({ error: 'ImageKit upload failed' });
    }

    return res.json({ 
      url: result.url, 
      fileId: result.fileId 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ 
      error: error.message || 'Server error during upload' 
    });
  }
}
