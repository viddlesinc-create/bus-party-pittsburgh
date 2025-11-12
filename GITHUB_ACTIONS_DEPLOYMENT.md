# GitHub Actions Automated SSR Build

## Overview

This repository now has automated SSR builds via GitHub Actions. Every time you push to the `main` branch, GitHub will automatically:
1. Build the SSR version
2. Verify the build
3. Create a downloadable deployment package

## How It Works

### Automatic Trigger
- **Trigger**: Pushes to `main` branch
- **Also**: Can be manually triggered from GitHub Actions tab

### What Gets Built
- Full SSR pre-rendered HTML for all 19 routes
- Optimized production bundle
- All static assets (robots.txt, sitemap.xml, .htaccess)
- Compressed ZIP file ready for deployment

## How to Deploy to Hostinger

### Step 1: Push Your Code
```bash
git add .
git commit -m "Your changes"
git push origin main
```

### Step 2: Wait for Build
1. Go to your GitHub repository
2. Click on **Actions** tab
3. Wait for the "Build SSR for Hostinger" workflow to complete (usually 2-3 minutes)

### Step 3: Download Artifact
1. Click on the completed workflow run
2. Scroll to **Artifacts** section
3. Download `pittpartybus-ssr-build-[commit-hash].zip`

### Step 4: Extract and Upload
1. Extract the ZIP file on your computer
2. Log into Hostinger File Manager
3. Navigate to `public_html` directory
4. **Delete all existing files** in public_html
5. Upload all extracted files to public_html

### Step 5: Clear Cache and Test
1. Clear Hostinger cache (Website → Settings → Cache)
2. Clear browser cache (Ctrl+Shift+R)
3. Visit https://pittpartybus.com/fleet
4. Right-click → View Page Source
5. Verify you see `<h1>` tags in the source (NOT `<!--ssr-outlet-->`)

## Alternative: Download Full Dist Folder

If you prefer the raw files:
1. Download `dist-folder-[commit-hash]` artifact
2. Extract and upload contents to public_html

## Manual Trigger

You can also manually trigger a build without pushing code:
1. Go to **Actions** tab
2. Click "Build SSR for Hostinger" workflow
3. Click **Run workflow** → **Run workflow**

## Build Verification

The workflow automatically runs `node scripts/verify-build.js` to check:
- ✅ All HTML files exist
- ✅ Meta tags are present
- ✅ H1 tags exist
- ✅ Canonical URLs set
- ✅ Structured data included
- ✅ No SSR placeholders remain

## Troubleshooting

### Build Failed
- Check the workflow logs in GitHub Actions
- Ensure all dependencies are in package.json
- Verify build scripts exist

### Files Missing in Artifact
- Make sure the build completed successfully
- Check that `dist/` folder was created
- Verify all routes are in the build script

### Still Seeing `<!--ssr-outlet-->`
- You uploaded the wrong files (uploaded source instead of dist)
- Cache not cleared properly
- Old files still on Hostinger

## Retention

- Artifacts are kept for **30 days**
- You can download them anytime within this period
- Each build is tagged with the commit hash for easy identification

## Benefits

✅ **No local build needed** - GitHub builds for you
✅ **Always up-to-date** - Builds automatically on every push
✅ **Version history** - Every build is saved for 30 days
✅ **Easy deployment** - Just download and upload to Hostinger
✅ **Build verification** - Automatic checks ensure quality
✅ **No setup required** - Works immediately after push

## Next Steps

1. Push your code to main branch
2. Wait for GitHub Actions to build
3. Download the artifact
4. Upload to Hostinger
5. Clear cache and test

Your SSR build process is now fully automated! 🎉
