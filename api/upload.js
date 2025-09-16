import ImageKit from 'imagekit';
import { v4 as uuidv4 } from 'uuid';

// Initialize ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

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

    // Parse the multipart form data
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return res.status(400).json({ error: 'Content-Type must be multipart/form-data' });
    }

    // Get the boundary from content-type header
    const boundary = contentType.split('boundary=')[1];
    if (!boundary) {
      return res.status(400).json({ error: 'Invalid multipart boundary' });
    }

    // Parse multipart data manually (simple implementation)
    const body = req.body;
    const chunks = [];
    
    // Convert body to buffer if it's not already
    let buffer;
    if (Buffer.isBuffer(body)) {
      buffer = body;
    } else if (typeof body === 'string') {
      buffer = Buffer.from(body, 'binary');
    } else {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    // Simple multipart parsing - find file content
    const boundaryBuffer = Buffer.from(`--${boundary}`);
    const parts = [];
    let start = 0;
    
    while (true) {
      const boundaryIndex = buffer.indexOf(boundaryBuffer, start);
      if (boundaryIndex === -1) break;
      
      if (start > 0) {
        parts.push(buffer.slice(start, boundaryIndex));
      }
      start = boundaryIndex + boundaryBuffer.length;
    }

    // Find the file part
    let fileBuffer = null;
    let fileName = 'upload';
    
    for (const part of parts) {
      const partStr = part.toString('binary');
      if (partStr.includes('Content-Disposition: form-data') && partStr.includes('filename=')) {
        // Extract filename
        const filenameMatch = partStr.match(/filename="([^"]+)"/);
        if (filenameMatch) {
          fileName = filenameMatch[1];
        }
        
        // Find where headers end and file content begins
        const headerEndIndex = part.indexOf('\r\n\r\n');
        if (headerEndIndex !== -1) {
          fileBuffer = part.slice(headerEndIndex + 4);
          // Remove trailing CRLF
          if (fileBuffer.length >= 2 && fileBuffer[fileBuffer.length - 2] === 0x0D && fileBuffer[fileBuffer.length - 1] === 0x0A) {
            fileBuffer = fileBuffer.slice(0, -2);
          }
          break;
        }
      }
    }

    if (!fileBuffer || fileBuffer.length === 0) {
      return res.status(400).json({ error: 'No file found in request' });
    }

    // Validate file type by checking magic bytes
    const isImage = (
      (fileBuffer[0] === 0xFF && fileBuffer[1] === 0xD8) || // JPEG
      (fileBuffer[0] === 0x89 && fileBuffer[1] === 0x50) || // PNG
      (fileBuffer[0] === 0x47 && fileBuffer[1] === 0x49) || // GIF
      (fileBuffer[0] === 0x52 && fileBuffer[1] === 0x49)    // WEBP
    );

    if (!isImage) {
      return res.status(400).json({ error: 'Only image files are allowed' });
    }

    // Check file size (5MB limit)
    if (fileBuffer.length > 5 * 1024 * 1024) {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB' });
    }

    // Generate safe filename
    const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
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
