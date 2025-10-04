# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The GAIA AI website is a **hybrid architecture** combining:
- **React/TypeScript SPA** for the main homepage (modern, interactive UI)
- **Static HTML pages** for chat interface and other pages (legacy design)

The site focuses on regenerative artificial intelligence and planetary healing, featuring an interactive UI, chat interface, and comprehensive content about bioregional intelligence and regenerative systems.

## Architecture Overview - IMPORTANT

### Current Architecture (Hybrid)

**Main Homepage (`/`):**
- React 18 + TypeScript + Vite
- Source: `src/` directory
- Entry point: `src/main.tsx` → `src/App.tsx`
- Build output: `build/` directory
- Deployed to: `/var/www/symbiocenelabs/`

**Chat Page (`/chat`):**
- Static HTML page from old design
- Source: `chat.html`, `chat-mobile.html`
- JavaScript: `old-design/js/` directory
- Uses vanilla JS API client for backend communication

**CRITICAL:** The root `index.html` must point to `src/main.tsx` for Vite to work:
```html
<script type="module" src="/src/main.tsx"></script>
```
NOT to a pre-built bundle like `/assets/index-*.js`

### File Structure

```
symbiocenelabs/
├── src/                          # React/TypeScript source (NEW)
│   ├── main.tsx                  # Entry point - MUST be referenced in index.html
│   ├── App.tsx                   # Main app component
│   ├── components/               # React components
│   │   ├── GaiaChatInterface.tsx # Homepage chat widget
│   │   ├── Navigation.tsx
│   │   └── ...
│   └── index.css                 # Global styles
├── build/                        # Vite build output (generated)
│   ├── index.html                # Built HTML (references hashed assets)
│   └── assets/
│       ├── index-[hash].js       # Built React bundle
│       └── index-[hash].css      # Built styles
├── old-design/                   # Legacy static design files
│   ├── js/                       # Vanilla JS files for chat page
│   │   ├── api-client.js         # GAIA API client
│   │   ├── chat-page.js          # Chat functionality
│   │   └── chat.js               # Chat components
│   ├── css/                      # Legacy styles
│   └── index.html                # Old homepage (not used)
├── chat.html                     # Static chat page (deployed)
├── chat-mobile.html              # Mobile chat variant
├── index.html                    # Vite source HTML (MUST point to src/main.tsx)
├── package.json                  # Node dependencies
├── vite.config.ts                # Vite configuration
└── /var/www/symbiocenelabs/      # Deployment directory
    ├── index.html                # Built React app
    ├── assets/                   # Built JS/CSS bundles
    ├── chat.html                 # Static chat page
    └── js/                       # Legacy JS for chat page
```

## Development Commands

### React Development (Main Homepage)
```bash
# Install dependencies (if needed)
npm install --legacy-peer-deps

# Start Vite dev server (for React development)
npm run dev
# Opens http://localhost:3000

# Build for production
npm run build
# Output goes to build/ directory
```

### Static Pages Development (Chat, etc.)
```bash
# Start simple HTTP server for testing static pages
python3 -m http.server 8000
# Or use the serve.sh script
./serve.sh
```

### Deployment
```bash
# Build React app
npm run build

# Deploy to production server
sudo rsync -av --delete build/ /var/www/symbiocenelabs/

# Deploy static chat pages and dependencies
sudo cp chat.html chat-mobile.html /var/www/symbiocenelabs/
sudo mkdir -p /var/www/symbiocenelabs/js
sudo cp old-design/js/*.js /var/www/symbiocenelabs/js/

# Restart nginx if needed
sudo systemctl restart nginx
```

## Core Technologies

### Homepage (React Stack)
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Framer Motion** - Animations
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives

### Chat Page (Legacy Stack)
- **Vanilla JavaScript** - No frameworks
- **Custom CSS** - Teal/green gradient theme
- **API Client** - Communicates with GAIA agent backend

### Backend Services
- **GAIA Agent** - Port 3003 (AI chat responses)
- **Subscription Handler** - Port 3004 (email signups)
- **Nginx** - Reverse proxy and static file server

## Critical Build System Information

### Vite Build Process

**How Vite Works:**
1. Reads `index.html` in project root
2. Finds `<script type="module" src="/src/main.tsx">`
3. Follows import chain starting from `main.tsx`
4. Transforms all TypeScript/React files
5. Bundles into optimized JS/CSS with content-based hashes
6. Outputs to `build/` directory with updated `index.html`

**IMPORTANT:** If `index.html` points to a pre-built bundle instead of `src/main.tsx`, Vite will:
- Skip transforming your source files
- Create builds with stale/cached code
- Show only "4 modules transformed" instead of "2000+"
- Produce identical output hashes despite source changes

### Verifying Builds Work Correctly

After making source changes, verify the build is working:

```bash
# Clean build
rm -rf build && npm run build

# Check output - should see:
# ✓ 2000+ modules transformed (NOT just 4!)
# build/assets/index-[NEW-HASH].js

# Verify source changes are included
strings build/assets/index-*.js | grep "your test string"
```

### Common Build Issues

**Problem:** Changes to React components don't appear in build
**Cause:** `index.html` pointing to pre-built bundle instead of `src/main.tsx`
**Fix:** Update `index.html` line 8 to: `<script type="module" src="/src/main.tsx">`

**Problem:** Build succeeds but produces identical hash
**Cause:** Vite is using cached transformation output
**Fix:** Delete `node_modules/.vite` cache and rebuild

**Problem:** Browser shows old version after deployment
**Cause:** Browser cache or service worker
**Fix:** Hard refresh (Ctrl+Shift+R) or disable cache in DevTools

## Component Communication

### Homepage → Chat Page Flow

The homepage chat widget (`GaiaChatInterface.tsx`) redirects to the full chat page:

```typescript
// In src/components/GaiaChatInterface.tsx
const handleSubmit = () => {
  if (!inputValue.trim()) return;

  // Redirect to full chat page with query parameter
  const prompt = encodeURIComponent(inputValue);
  window.location.href = `/chat?prompt=${prompt}`;
};
```

The chat page (`chat.html`) receives and processes the prompt:

```javascript
// In chat.html (lines 545-572)
const urlParams = new URLSearchParams(window.location.search);
const initialPrompt = urlParams.get('prompt');
if (initialPrompt) {
    setTimeout(() => {
        input.value = initialPrompt;
        form.dispatchEvent(new Event('submit'));
    }, 500);
}
```

### API Integration

**Chat API Flow:**
1. User submits message in chat interface
2. `js/api-client.js` sends request to `/api/chat`
3. Nginx proxies to GAIA agent on `localhost:3003`
4. Agent processes with AI and returns response
5. Frontend displays response in chat UI

**Email Subscription Flow:**
1. User submits email in subscription form
2. `js/api-client.js` sends request to `/api/subscribe`
3. Nginx proxies to subscription handler on `localhost:3004`
4. Handler saves email to database
5. Returns success/error response

## Nginx Configuration

Location: `/etc/nginx/sites-available/symbiocenelabs`

Key routes:
- `/` - Serves React app (fallback to `index.html` for client-side routing)
- `/chat` - Serves `chat.html` directly
- `/api/*` (except `/api/subscribe`) - Proxies to GAIA agent (port 3003)
- `/api/subscribe` - Proxies to subscription handler (port 3004)

After config changes:
```bash
sudo nginx -t                    # Test configuration
sudo systemctl reload nginx      # Apply changes
```

## Common Tasks

### Modifying Homepage Components

1. Edit files in `src/components/`
2. Changes auto-reload in dev server (`npm run dev`)
3. Build and deploy:
   ```bash
   npm run build
   sudo rsync -av --delete build/ /var/www/symbiocenelabs/
   ```

### Modifying Chat Interface

1. Edit `chat.html` or `old-design/js/*.js`
2. Test with `python3 -m http.server 8000`
3. Deploy:
   ```bash
   sudo cp chat.html /var/www/symbiocenelabs/
   sudo cp old-design/js/*.js /var/www/symbiocenelabs/js/
   ```

### Adding New React Components

1. Create component in `src/components/YourComponent.tsx`
2. Import in `App.tsx` or parent component
3. Component will be included in next build automatically

### Debugging Build Issues

```bash
# Check if Vite is reading source files
npm run build 2>&1 | grep "modules transformed"
# Should show 2000+, not just 4

# Add debug logging to vite.config.ts
{
  name: 'debug-transform',
  transform(code, id) {
    if (id.includes('YourComponent')) {
      console.log('Found YourComponent:', id);
      console.log('Contains your code:', code.includes('yourTestString'));
    }
    return null;
  }
}

# Check deployed file contents
strings /var/www/symbiocenelabs/assets/index-*.js | grep "yourTestString"
```

## Git Workflow

- Main development branch: `website`
- Production branch: `main`
- Feature branches: Create from `website`

## Testing

### Manual Testing Checklist
- [ ] Homepage loads at https://gaiaai.xyz
- [ ] Chat widget accepts input
- [ ] Send button redirects to `/chat?prompt=...`
- [ ] Chat page loads with prompt pre-filled
- [ ] Chat page submits message to AI
- [ ] Email subscription form works
- [ ] Mobile responsive design works
- [ ] All links functional

### Browser Testing
Test in multiple browsers with cache disabled:
- Chrome/Edge (DevTools → Network → Disable cache)
- Firefox (DevTools → Network → Disable cache)
- Safari (Develop → Disable caches)

## Deployment Checklist

Before deploying to production:

1. **Build locally and verify:**
   ```bash
   rm -rf build && npm run build
   # Check module count and new hash
   ```

2. **Test build locally:**
   ```bash
   cd build && python3 -m http.server 8080
   # Visit http://localhost:8080 and test functionality
   ```

3. **Deploy to server:**
   ```bash
   sudo rsync -av --delete build/ /var/www/symbiocenelabs/
   sudo cp chat.html chat-mobile.html /var/www/symbiocenelabs/
   sudo cp old-design/js/*.js /var/www/symbiocenelabs/js/
   ```

4. **Verify deployment:**
   ```bash
   curl -I https://gaiaai.xyz/assets/index-*.js
   # Check Content-Type: application/javascript
   ```

5. **Test in browser:**
   - Hard refresh (Ctrl+Shift+R)
   - Test all functionality
   - Check browser console for errors

## Troubleshooting

### "Refused to execute script" MIME type error
- **Cause:** Browser cache serving old HTML response
- **Fix:** Hard refresh (Ctrl+Shift+R) or clear browser cache

### Chat redirect doesn't work
- **Cause:** Old build without redirect code
- **Fix:** Verify `GaiaChatInterface.tsx` has redirect code, rebuild, redeploy

### Changes don't appear after rebuild
- **Cause:** `index.html` points to pre-built bundle
- **Fix:** Update `index.html` to point to `src/main.tsx`

### API requests fail with 404
- **Cause:** Nginx proxy not configured or backend not running
- **Fix:** Check nginx config, verify backend services running:
  ```bash
  sudo systemctl status eliza-agents
  sudo systemctl status gaia-subscription
  ```

## Service Management

```bash
# Check backend services
sudo systemctl status eliza-agents
sudo systemctl status gaia-subscription
sudo systemctl status nginx

# Restart services
sudo systemctl restart eliza-agents
sudo systemctl restart gaia-subscription
sudo systemctl restart nginx

# View logs
sudo journalctl -u eliza-agents -f
sudo journalctl -u gaia-subscription -f
sudo journalctl -u nginx -f
```
