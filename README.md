# Boardurance Development Setup

## Project Structure
A hyper-casual racing management game with 8-bit bird's-eye view and boost card mechanics.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
- Opens at `http://localhost:3000`
- Hot reload for development

### 3. Build for Production
```bash
npm run build
```

### 4. Deploy to GitHub Pages
```bash
npm run deploy
```

## Architecture

### Core Systems
1. **Game State Management** (`src/core/state.js`)
   - Race state, car status, boost cards
   - Car characteristics (curve/straight/both)
   - Track section simulation

2. **Game Simulation** (`src/core/simulation.js`)
   - Real-time race progression
   - Boost card effects and timing
   - Pit stop strategy simulation

3. **Main Game Controller** (`src/core/game.js`)
   - Scenario management
   - Progress tracking
   - Grade calculation system

### UI Components
1. **Screen Management** (`src/ui/screens.js`)
   - Landing, race, results screens
   - Screen transitions and updates

2. **8-bit Visualization** (`src/ui/8bit-view.js`)
   - Bird's-eye view of car positions
   - Relative gap displays

3. **Boost Card System** (`src/ui/boost-cards.js`)
   - Card display and interaction
   - Color coding (green/yellow/red)

4. **Car Characteristics** (`src/ui/car-characteristics.js`)
   - Pre-race selection interface
   - Performance advantage indicators

### Scenarios
- Pre-generated race scenarios
- Different track types and conditions
- Progressive difficulty

## Development Roadmap

### Phase 1: Prototype (Current)
- Basic 8-bit visualization
- Boost card system implementation
- Single scenario (Monaco Lap 38)
- Core game loop

### Phase 2: MVP Enhancement
- Multiple scenarios
- Advanced competitor AI
- Weather system
- Sound effects and music

### Phase 3: Polish & Features
- Leaderboards
- Achievement system
- Social sharing
- Advanced analytics

### Phase 4: Live Integration
- Real F1 data integration
- Live race synchronization
- Community features

## Technical Notes

### Performance Optimization
- 8-bit graphics minimize memory usage
- Minimal DOM updates for smooth mobile performance
- LocalStorage for offline progress

### Mobile Considerations
- Touch-friendly controls (44px minimum)
- Responsive design for all screen sizes
- Battery-efficient animations

### Deployment Strategy
1. **Prototype:** GitHub Pages (free, simple)
2. **MVP:** Vercel/Netlify (automatic deployments)
3. **Launch:** Custom domain + CDN (Cloudflare)

## Contributing
1. Fork the repository
2. Create feature branch
3. Submit pull request with clear description

## License
MIT License - See LICENSE file