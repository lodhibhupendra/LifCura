import ImageKit from 'imagekit';

// Initialize ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check for required environment variables
    if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_URL_ENDPOINT) {
      return res.status(500).json({ error: 'ImageKit configuration missing' });
    }

    const { fileId } = req.body || {};
    
    if (!fileId) {
      return res.status(400).json({ error: 'fileId is required' });
    }

    // Delete from ImageKit
    await imagekit.deleteFile(fileId);

    return res.json({ ok: true });

  } catch (error) {
    console.error('Delete error:', error);
    return res.status(500).json({ 
      error: error.message || 'Server error during deletion' 
    });
  }
}
