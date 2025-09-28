# Deployment Guide for CineReviews

## Environment Variables Required

For the application to work properly, you need to set up the following environment variables:

### Required Variables
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous/public API key

## Getting Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Navigate to **Settings** → **API**
4. Copy the following:
   - **Project URL** → use as `VITE_SUPABASE_URL`
   - **anon/public key** → use as `VITE_SUPABASE_ANON_KEY`

## Setting Up Authentication Redirects

After deployment, you must configure OAuth redirect URLs in Supabase:

1. Go to **Authentication** → **URL Configuration** in your Supabase dashboard
2. Add these redirect URLs based on your deployment:

### For Netlify:
- `https://your-site-name.netlify.app`
- `https://your-custom-domain.com` (if using custom domain)

### For Vercel:
- `https://your-project.vercel.app`
- `https://your-custom-domain.com` (if using custom domain)

### For GitHub Pages:
- `https://username.github.io/repository-name`

### For Local Development:
- `http://localhost:5173`
- `http://localhost:5000` (if using Replit)

**Important**: Without these redirect URLs, authentication will fail after deployment.

## Platform-Specific Deployment

### Netlify Deployment

1. **Connect your GitHub repository** to Netlify
2. **Set build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Add environment variables**:
   - Go to Site settings → Environment variables
   - Add `VITE_SUPABASE_URL` with your Supabase URL
   - Add `VITE_SUPABASE_ANON_KEY` with your anon key
4. **Deploy** - Netlify will automatically rebuild when you push to GitHub

### Vercel Deployment

1. **Import your GitHub repository** to Vercel
2. **Configure build settings** (auto-detected for Vite):
   - Build command: `npm run build`
   - Output directory: `dist`
3. **Add environment variables**:
   - Go to Project Settings → Environment Variables
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
4. **Deploy** - Vercel will auto-deploy on git pushes

### GitHub Pages (Static)

1. **Add GitHub Actions workflow** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      env:
        VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
        VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

2. **Add repository secrets**:
   - Go to your GitHub repo → Settings → Secrets and variables → Actions
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

## Local Development Setup

1. **Clone the repository**:
```bash
git clone <your-repo-url>
cd cinereviews
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
```bash
cp .env.example .env
# Edit .env with your actual Supabase credentials
```

4. **Run development server**:
```bash
npm run dev
```

## Production Build Testing

To test your production build locally:

```bash
npm run build
npm run preview
```

## Troubleshooting

### Common Issues

1. **Environment variables not loading**:
   - Ensure they start with `VITE_` prefix
   - Check that they're set in your deployment platform
   - Verify the values are correct (no extra spaces/quotes)

2. **Authentication not working**:
   - Verify your Supabase URL and anon key are correct
   - Check that your Supabase project is active
   - Ensure your domain is allowed in Supabase Auth settings

3. **Build failures**:
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
   - Check that all environment variables are available during build

### Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify environment variables are set correctly
3. Ensure your Supabase project is properly configured
4. Check that your domain is whitelisted in Supabase settings