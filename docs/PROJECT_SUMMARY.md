# Boardurance Project Summary
**Date:** March 27, 2026  
**Status:** Design Phase Complete → Ready for Development Planning

## Project Vision
**Boardurance** is a hyper-casual racing management game where players make real-time strategic decisions during F1-style races. Zero friction entry - no registration required, play instantly in browser.

## Core Concept
- **Platform:** Static JS/TS web page (no backend initially)
- **Session Length:** 3-5 minutes (hyper-casual focus)
- **Core Gameplay:** Pit strategy, tire management, weather adaptation
- **Goal:** Accessible to casual fans, depth for enthusiasts

## Key Design Decisions

### ✅ Confirmed
1. **Zero friction** - No login/registration required
2. **Hyper-casual** - Quick sessions (3-5 min races)
3. **Static web** - No server-side requirements initially
4. **Mobile-first** - Responsive design priority
5. **Phased development** - 4-phase roadmap defined

### ⏳ Awaiting Decisions
1. **Technical stack** - Framework choice (vanilla, Svelte, Preact)
2. **Data sources** - Real F1 APIs vs simulation initially
3. **Visual style** - UI design direction
4. **MVP feature set** - Which Phase 1 features to build first

## Development Roadmap

### Phase 1: Hyper-casual MVP (4 weeks)
- Basic race simulation engine
- Core strategy decisions (pits, tires)
- 3-5 curated race scenarios
- Mobile-responsive interface

### Phase 2: Enhanced Gameplay (4 weeks)
- Weather system
- Advanced tire/fuel management
- Real F1 data integration
- Weekend mode expansion

### Phase 3: Complete Experience (4 weeks)
- Season progression
- Car development
- Advanced analytics
- Monetization integration

### Phase 4: Live & Scale (ongoing)
- Live race synchronization
- Community features
- Platform expansion

## Technical Architecture
- **Frontend:** Static HTML/JS/TS (bundle < 100KB)
- **Data:** LocalStorage + WebSocket for live data
- **Hosting:** Vercel/Netlify static hosting
- **Performance:** <3s load time, 60fps on mobile

## Next Immediate Actions

### 1. Technical Decisions (Yoann input needed)
- Framework selection
- Development environment setup
- Data source strategy

### 2. Prototype Planning
- Define exact MVP feature set
- Create wireframes for core interface
- Set up version control repository

### 3. Agent Coordination
- Plan development agent creation
- Plan marketing agent creation
- Define communication protocols

## Success Metrics (Phase 1)
- **Engagement:** Average session time > 2 minutes
- **Retention:** 30% return within 7 days
- **Performance:** Load time < 3 seconds on 3G
- **Usability:** New player can complete first race in < 5 minutes

---

**Next Step:** Yoann to provide technical preferences and priority decisions so development can begin.