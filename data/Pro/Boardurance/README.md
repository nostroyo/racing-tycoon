# Boardurance - Hyper-Casual Racing Strategy Game

## 🏎️ Live Demo
- **Landing Page:** [https://nostroyo.github.io/racing-tycoon/](https://nostroyo.github.io/racing-tycoon/)
- **Game Prototype:** [https://nostroyo.github.io/racing-tycoon/game/](https://nostroyo.github.io/racing-tycoon/game/)

## 🚀 Quick Start

### Landing Page
The landing page is a complete MVP with:
- Waitlist form with email capture
- Analytics integration points
- Mobile-first responsive design
- 8-bit aesthetic styling
- Social proof/dev diaries section

### Game Prototype
The game prototype includes:
- Core game systems (state, simulation, controller)
- 8-bit visualization foundation
- Vite build configuration
- GitHub Pages deployment ready

## 📁 Project Structure

```
racing-tycoon/
├── index.html              # Landing page (MVP)
├── landing-page/
│   ├── style.css           # Landing page styles
│   └── script.js           # Landing page JavaScript
├── game/                   # Game prototype
│   ├── index.html          # Game entry point
│   ├── src/
│   │   ├── core/          # Game core systems
│   │   └── ui/            # UI components
│   └── public/            # Static assets
├── docs/                  # Documentation
└── .nojekyll             # GitHub Pages config
```

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
cd game
npm install
npm run dev
```

### Build
```bash
npm run build
```

### Deploy to GitHub Pages
```bash
npm run deploy
```

## 🎯 Features

### Landing Page (Complete)
- ✅ Responsive design (mobile-first)
- ✅ Waitlist form with validation
- ✅ Analytics events (Google Analytics ready)
- ✅ 8-bit aesthetic styling
- ✅ Performance optimized
- ✅ Social proof section
- ✅ Interactive elements

### Game Prototype (In Progress)
- ✅ Core game architecture
- ✅ State management system
- ✅ Simulation engine
- ✅ Basic UI framework
- 🔄 8-bit visualization
- 🔄 Boost card system
- 🔄 Complete UI screens

## 📊 Analytics
The landing page includes Google Analytics 4 integration points for:
- `page_view` - Landing page views
- `sign_up_waitlist` - Form submissions
- `cta_click` - Call-to-action clicks
- `section_view` - Scroll tracking
- `slow_page_load` - Performance monitoring

**Note:** Replace `G-XXXXXXXXXX` in `index.html` with your GA4 measurement ID.

## 🚀 Deployment

### GitHub Pages
The site is configured for GitHub Pages deployment:
1. Repository settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` folder `/ (root)`
4. Custom domain: Optional

### Manual Deployment
```bash
cd game
npm run build
npm run deploy
```

## 📈 Next Steps

1. **Analytics Integration:** Add GA4 measurement ID
2. **Form Backend:** Connect waitlist to real backend (FormSubmit.co, Netlify Forms, etc.)
3. **Game Development:** Complete UI screens and 8-bit visualization
4. **Testing:** Cross-browser compatibility testing
5. **Optimization:** Performance audits and improvements

## 📄 License
MIT License - See LICENSE file for details.

## 🤝 Contributing
1. Fork the repository
2. Create feature branch
3. Submit pull request with clear description

---

**Boardurance** - Hyper-casual racing strategy for the data-driven fan.