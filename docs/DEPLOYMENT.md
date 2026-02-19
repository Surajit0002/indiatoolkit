# IndiaToolkit.in - Deployment Guide

## ⚠️ Important: GitHub Pages is NOT Supported

**This Next.js project CANNOT be deployed to GitHub Pages** because it uses:
- Server-side middleware (URL normalization, redirects)
- Dynamic API routes (`/api/*`)
- Server-side rendering (SSR)
- Dynamic sitemap generation

**Use Vercel instead** - it's free, optimized for Next.js, and supports all features.

---

## 🚀 Quick Deployment (Vercel - Recommended)

### Prerequisites
- Node.js 18+ installed
- Git installed
- Vercel account

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit: IndiaToolkit.in"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "Add New Project"
   - Select your repository
   - Click "Deploy"

3. **Environment Variables**
   Add these in Vercel dashboard (Settings → Environment Variables):
   ```env
   NEXT_PUBLIC_API_URL=https://api.indiatoolkit.in
   NEXT_PUBLIC_SITE_URL=https://indiatoolkit.in
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxx
   NEXT_PUBLIC_ADSENSE_ENABLED=false
   ```

---

## 🔧 Manual Deployment (Node.js Server)

### Prerequisites
- Node.js 18+
- PM2 (for production process management)
- Nginx (reverse proxy)

### Steps

1. **Clone and Install**
   ```bash
   git clone https://github.com/yourusername/india-toolkit.git
   cd india-toolkit
   npm install
   ```

2. **Build Production**
   ```bash
   npm run build
   ```

3. **Start Server**
   ```bash
   # Using PM2
   pm2 start npm --name "india-toolkit" -- run start

   # Or directly
   npm run start
   ```

4. **Nginx Configuration**
   ```nginx
   server {
       server_name indiatoolkit.in www.indiatoolkit.in;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
       
       # SSL will be handled by Certbot
   }
   ```

---

## 📦 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | No | Backend API URL |
| `NEXT_PUBLIC_SITE_URL` | Yes | Site URL for SEO |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | No | Google AdSense Publisher ID |
| `NEXT_PUBLIC_ADSENSE_ENABLED` | No | Enable/Disable Ads |
| `MONGODB_URI` | No | MongoDB connection string |
| `NEXTAUTH_SECRET` | No | Auth secret key |
| `GOOGLE_ANALYTICS_ID` | No | GA4 Measurement ID |

---

## 🔒 SSL/HTTPS Setup

### Using Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d indiatoolkit.in -d www.indiatoolkit.in

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

---

## 📊 Performance Optimization

### 1. Enable Compression
Next.js automatically compresses responses using gzip/brotli.

### 2. Image Optimization
All images are automatically optimized by Next.js Image component.

### 3. Caching
```javascript
// next.config.js
module.exports = {
  headers: async () => [
    {
      source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      source: '/:all*(js|css)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ],
}
```

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
npm run clean
npm install
npm run build
```

### Memory Issues
```bash
# Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Static Assets Not Loading
Check that your CDN is configured correctly or serve assets locally.

---

## 📈 Monitoring

### Vercel Analytics
Enable Vercel Analytics in dashboard for real-time insights.

### Google Analytics
Add GA4 in `app/layout.tsx`:
```tsx
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
/>
```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_ADSENSE_ENABLED: false
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 📞 Support

- **Documentation**: `/docs`
- **Issues**: GitHub Issues
- **Email**: support@indiatoolkit.in

---

*Last Updated: 2024*
*Version: 1.0.0*
