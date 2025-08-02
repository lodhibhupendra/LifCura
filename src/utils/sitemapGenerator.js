// Dynamic sitemap generation utility
export const generateSitemap = (pages, baseUrl = 'https://lifcura.com') => {
  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${page.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq || 'monthly'}</changefreq>
    <priority>${page.priority || '0.8'}</priority>
    ${page.images ? page.images.map(img => `    <image:image>
      <image:loc>${img.url}</image:loc>
      <image:caption>${img.caption || ''}</image:caption>
    </image:image>`).join('\n') : ''}
  </url>`).join('\n')}
</urlset>`;
  
  return sitemapXML;
};

// Default pages configuration
export const defaultPages = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'weekly',
    images: [
      {
        url: 'https://lifcura.com/iconlifcura.png',
        caption: 'LifCura Logo'
      }
    ]
  },
  {
    path: '/#about',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    path: '/#therapy',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    path: '/#manufacturing',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    path: '/#research',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    path: '/#products',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: '/#contact',
    priority: '0.7',
    changefreq: 'monthly'
  },
  {
    path: '/#export',
    priority: '0.8',
    changefreq: 'monthly'
  }
];

export default { generateSitemap, defaultPages };
