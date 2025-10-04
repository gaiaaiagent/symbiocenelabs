# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for Symbiocene Labs/GAIA AI focused on regenerative artificial intelligence and planetary healing. The site features an interactive mycelium network background animation, a chat interface, and comprehensive content about bioregional intelligence and regenerative systems.

## Development Commands

### Local Development Server
```bash
# Start local development server
./serve.sh
# Alternative: python3 -m http.server 8000
```
The site will be available at `http://localhost:8000`

### Git Workflow
- Main development branch: `website-new`
- Production branch: `main`
- Current active development is on `website-new` branch

## Architecture Overview

### File Structure
- **HTML Pages**: `index.html` (main), `chat.html` (chat interface), `greenpaper.html` (academic paper)
- **Styling**: `css/style.css` (main styles), `css/chat.css` (chat-specific)
- **JavaScript**: `js/main.js` (mycelium animation + navigation), `js/chat-page.js` (chat functionality), `js/chat.js` (chat components)
- **Content**: `assets/docs/greenpaper.md` (source content), `subscribed-emails.json` (email list)

### Core Technologies
- **Pure HTML/CSS/JavaScript** - No frameworks or build tools
- **Canvas API** - For mycelium network background animation
- **CSS Variables** - Extensive theming system with teal/green gradient palette
- **Responsive Design** - Mobile-first with hamburger navigation

### Key Visual Elements
1. **Mycelium Network Animation** (`js/main.js`): Canvas-based background with animated nodes and connections, performance-optimized with reduced node density
2. **Watershed Map Background**: Semi-transparent ecological imagery using CSS background
3. **Pixel Art Aesthetic**: Geometric clipped shapes and retro styling using clip-path CSS
4. **Color Scheme**: Teal/green gradients defined in CSS variables

### JavaScript Architecture

#### Main Animation System (`js/main.js`)
- **Canvas Management**: Full-screen mycelium network with dynamic resizing
- **Performance Optimization**: Reduced node count for mobile/slow devices
- **Restricted Zones**: Avoids drawing over content areas
- **Mobile Navigation**: Hamburger menu toggle functionality

#### Chat System (`js/chat-page.js`)
- **Fallback Responses**: Local response system when external API unavailable
- **Progressive Enhancement**: Works without backend integration
- **Component Architecture**: Modular chat interface components

### Styling Patterns

#### CSS Variable System
The theme uses extensive CSS variables for consistency:
- Primary colors: teal/green gradients
- Typography: Space Mono (headings), Inter (body)
- Component styling: "pixel-box" design with geometric shapes

#### Responsive Design
- Mobile-first approach with hamburger navigation
- Flexible grid layouts that adapt to content
- Performance-conscious animations that scale based on device capabilities

## Content Management

### Greenpaper Integration
- Source content in `assets/docs/greenpaper.md`
- Rendered as static HTML in `greenpaper.html`
- Navigation system with scrollable sections

### Email Signup
- Frontend form collection
- Data stored in `subscribed-emails.json`
- Ready for backend integration

## Development Guidelines

### Performance Considerations
- Mycelium animation is optimized for performance with configurable node density
- Background images are optimized and properly sized
- CSS animations use transform properties for hardware acceleration

### Code Style
- Semantic HTML with proper document structure
- Component-based CSS with reusable classes
- Vanilla JavaScript with clear separation of concerns
- Progressive enhancement - site works without JavaScript

### Content Updates
- Mission/vision content can be updated directly in HTML files
- Greenpaper content should be updated in `assets/docs/greenpaper.md` first
- Color schemes managed through CSS variables in `:root`

## Common Tasks

### Adding New Pages
1. Create HTML file following existing structure
2. Link CSS: `<link rel="stylesheet" href="css/style.css">`
3. Include main navigation pattern
4. Add to navigation menus in existing pages

### Modifying Animation
- Node count: Adjust `numNodes` variable in `js/main.js`
- Colors: Modify gradient definitions in CSS variables
- Performance: Use `restrictedZones` to avoid content areas

### Chat Integration
- Backend API integration points in `js/chat-page.js`
- Fallback system maintains functionality during development
- Component structure supports easy API integration

### Deployment
- No build process required - static files only
- All assets are self-contained
- Ready for deployment to any static hosting service