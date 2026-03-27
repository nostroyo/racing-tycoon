# Boardurance Game Design Document (GDD)

**Project:** Boardurance - Hyper-casual Racing Management Game  
**Version:** 1.0 (Draft)  
**Last Updated:** March 27, 2026  
**Owner:** Yoann  
**Lead:** Stratege

---

## 1.0 Project Overview

### 1.1 Vision Statement
A hyper-casual, zero-friction racing management game based on real-time live data, focusing on F1-style racing. Players can jump in instantly without registration and engage in strategic race management.

### 1.2 Core Concept
- **Platform:** Static page JS/TS game (no backend required initially)
- **Access:** Zero friction - no registration/login required
- **Focus:** Real-time racing strategy and management
- **Style:** Hyper-casual with depth optional

### 1.3 Target Audience
- Casual F1/sports fans
- Management sim enthusiasts looking for quick sessions
- Mobile and desktop casual gamers
- Age: 16-45

### 1.4 Unique Selling Points
1. **Zero friction entry** - Play immediately
2. **Real-time data integration** - Live race feeling
3. **Hyper-casual depth** - Simple to learn, strategically deep
4. **No commitment** - Sessions can be minutes or hours

---

## 2.0 Gameplay Design

### 2.1 Core Gameplay Loop
**Short Session (3-5 minutes):**
1. **Quick Start** → Player lands on game page, clicks "Start Race"
2. **Live Management** → Monitor race, make strategic decisions in real-time
3. **Race Conclusion** → See immediate results and performance metrics
4. **Replay/Retry** → Option to replay same scenario or try different strategy

**Longer Engagement:**
- **Weekend Mode** → Practice, Qualifying, Race sequence
- **Season Challenge** → Multiple races with progressive difficulty
- **Live Events** → Real-world F1 race synchronization

### 2.2 Player Roles & Responsibilities
Based on Yoann's draft vision:

**Primary Role: Race Strategist**
- Monitor real-time race data (position, gap, tire wear, fuel)
- Make pit stop calls (timing, tire compound selection)
- Manage driver aggression/defense modes
- Adapt to changing weather conditions
- Balance risk vs reward in overtake opportunities

**Secondary Role: Team Manager** *(Long-term)*
- Budget allocation for car upgrades
- Driver contract negotiations
- Staff hiring (engineers, strategists)
- Sponsor relationship management

### 2.3 Core Gameplay Mechanics

**1. Boost Card System**
- **Card Types:** 3 boost cards maximum per tire set
- **Card Colors & Effects:**
  - 🟢 **Green Boost** (Defense/Conservation): From Hard tires
    - Reduces tire wear by 15% for 2 laps
    - Improves fuel efficiency by 10%
    - Better car stability in corners
  
  - 🟡 **Yellow Boost** (Balanced): From Medium tires  
    - Small overtake advantage (+0.3s/lap for 1 lap)
    - Moderate tire preservation (+10% for 2 laps)
    - Balanced performance boost
  
  - 🔴 **Red Boost** (Aggressive Overtake): From Soft tires
    - Major overtake advantage (+0.8s/lap for 1 lap)
    - High tire degradation penalty (-20% wear)
    - Fuel consumption increase (+15%)

- **Replenishment:** Pit stops refill all 3 boost cards based on new tire compound
- **Activation:** Manual tap/click during race (strategic timing matters)
- **Visual Feedback:** Boost card animation when activated

**2. Car Characteristic System**
- **Pre-race Choice:** Players select one characteristic:
  - **Curve Specialist:** +15% performance in cornering sections
  - **Straight Line Expert:** +15% performance on straights  
  - **Balanced:** +7% performance everywhere

- **Track Section Indicators:**
  - Cornering sections highlighted in blue
  - Straight sections highlighted in green
  - Mixed sections shown with both colors

- **Performance Impact:** Real-time advantage/disadvantage visible:
  - Car glows/particles when excelling in matched section
  - Speed differential shown in 8-bit view

**3. Key Decision Points**

**Race Strategy Decisions:**
1. **Pit Stop Timing** + **Boost Management**
   - When to pit to refresh boost cards vs tire wear
   - Which tire compound for desired boost type
   - Strategic boost usage before/after pit stops

2. **Tire-Boost Synergy**
   - Soft tires (🔴) → Aggressive push phase with overtake boosts
   - Medium tires (🟡) → Balanced race management
   - Hard tires (🟢) → Defensive/conservation strategy

3. **Track Section Optimization**
   - Timing boosts for maximum advantage in matched sections
   - Choosing car characteristic that matches track layout
   - Adapting strategy based on track type (circuit vs street)

4. **Competitor Interaction**
   - Using boosts to defend position in your strong sections
   - Overtaking in sections where you have advantage
   - Managing boost cards as limited strategic resource

5. **Race Situations**
   - Safety car: Opportunity to pit for fresh tires/boosts
   - Weather changes: Adapting boost strategy to conditions
   - Late race: Deciding between aggressive push or conservation

### 2.4 Game Interface Components (From Draft)

**Primary Dashboard Elements:**
- **Race Control Panel** - Main decision interface
- **Live Timing Screen** - Position, gaps, sector times
- **Car Telemetry** - Tire wear, fuel, engine status
- **Strategy Board** - Planned vs actual stops
- **Competitor Intel** - Other team strategies
- **Weather Radar** - Track conditions forecast

**Information Layers:**
1. **Essential Data** - Always visible (position, laps remaining)
2. **Strategic Data** - Toggleable (tire wear, fuel prediction)
3. **Advanced Analytics** - Optional overlay (competitor patterns, historical data)

### 2.4 Game Modes & Progression

**Phase 1: Hyper-casual Foundation** *(MVP)*
1. **Instant Race** - Single race scenario (3-5 minutes)
   - Pre-defined conditions (track, weather, starting position)
   - Focus on core pit strategy decisions
   - Immediate feedback and score

2. **Scenario Challenges** - Curated race situations
   - Famous historical moments recreated
   - Specific strategic puzzles to solve
   - Learning progressive difficulty

**Phase 2: Medium-term Features**
3. **Weekend Simulator** - Full event experience
   - Practice session (setup optimization)
   - Qualifying (grid position battle)
   - Race (full strategy execution)

4. **Season Lite** - Connected race series
   - 3-5 race "championship"
   - Basic car development between races
   - Driver/team performance tracking

**Phase 3: Long-term Vision**
5. **Live Sync Mode** - Real-world F1 companion
   - Play along with actual race weekends
   - Compare decisions with real team strategies
   - Community challenge events

6. **Full Career Mode** - Complete management sim
   - Multiple seasons progression
   - Team building from ground up
   - Financial management
   - Research and development tree

### 2.5 Difficulty & Accessibility

**Casual Layer** *(Default)*
- Simplified decision set (pit timing, tire choice only)
- Assisted strategy suggestions
- Clear visual indicators for optimal choices
- Goal: Accessible to casual F1 fans

**Advanced Layer** *(Optional)*
- Full decision complexity
- Manual fuel mixture adjustments
- Detailed telemetry analysis
- Predictive modeling tools
- Goal: Satisfy hardcore management sim players

**Learning Curve Design:**
- First race: 1-2 key decisions (pit stop timing)
- Fifth race: 3-4 decisions + weather adaptation
- Tenth race: Full decision set unlocked
- Mastery: Predictive strategy planning

---

## 3.0 Technical Design

### 3.1 Architecture & Technical Stack

**Core Principle:** Zero-friction, static web game

**Frontend Stack Options:**
- **Vanilla JS/TS** - Maximum compatibility, minimal dependencies
- **Svelte/SvelteKit** - Reactive, compiled to static, small bundle size
- **Preact** - React-like but tiny (3KB)
- **Decision Criteria:** Bundle size < 100KB gzipped, no framework lock-in

**State Management:**
- **Game State:** Centralized store (observable pattern)
- **Race Simulation:** Deterministic engine with random seed
- **User Progress:** LocalStorage + IndexedDB for larger data
- **Real-time Updates:** WebSocket for live data (Phase 2+)

**Performance Targets:**
- **First Contentful Paint:** < 1 second
- **Time to Interactive:** < 3 seconds
- **Bundle Size:** < 500KB total (100KB critical)
- **Memory Usage:** < 50MB sustained
- **Framerate:** 60fps on mid-range mobile

**Hosting & Deployment:**
- **Primary:** Vercel/Netlify (automatic deployments)
- **Fallback:** GitHub Pages (static hosting)
- **CDN:** Cloudflare for global distribution
- **Analytics:** Plausible/Umami (privacy-focused)

**Development Workflow:**
- Git-based version control
- Automatic testing on PRs
- Preview deployments for each branch
- A/B testing capability for game balance

### 3.2 Game Simulation & Data Systems

**Core Simulation Engine:**
1. **Race State Simulation**
   - Car positions (relative order for 8-bit view)
   - Lap times with variability based on:
     - Tire wear (increasing degradation)
     - Fuel load (lighter = faster)
     - Boost card effects
     - Car characteristic match with track sections
   - Gap calculations (seconds between cars)

2. **Boost Card System Simulation**
   - Card replenishment logic during pit stops
   - Boost effect duration and magnitude
   - Tire compound → boost type mapping
   - Visual state tracking (green/yellow/red, used/available)

3. **Car Characteristic Simulation**
   - Track section classification (corner/straight/mixed)
   - Performance multiplier based on characteristic match
   - Real-time speed differential calculation
   - Visual feedback system for advantage states

4. **Tire & Fuel Management**
   - Tire degradation curves per compound
   - Fuel consumption rates (affected by boosts)
   - Pit stop duration simulation (time loss)

**Data Requirements for MVP:**
1. **Static Scenario Data** (Pre-generated for MVP)
   - Track layouts with section classification
   - Car performance baselines
   - Tire compound characteristics
   - Weather scenario patterns

2. **Dynamic Simulation Data**
   - Race progression algorithms
   - Competitor AI decision patterns
   - Random event generation (safety cars, incidents)

3. **User Progress Data** (LocalStorage)
   - Boost card usage history
   - Strategy success rates
   - Unlocked scenarios/achievements

**Long-term Data Integration:**
- Real F1 timing data for live race sync (Phase 4)
- Historical race data for scenario generation
- Weather API integration for dynamic conditions

**API Research Candidates:**
- **FastF1** - Python library for F1 timing data
- **Ergast API** - Historical F1 data (RESTful)
- **OpenF1** - Real-time WebSocket data
- **Weather APIs** - OpenWeatherMap, WeatherAPI
- **Custom simulation** - For MVP phase

**Data Flow Architecture:**
```
User Browser → Static Game Page → WebSocket/API → Data Processing → Game State
                     ↓                                    ↓
               Local Storage Cache              Historical Data Archive
```

**MVP Data Strategy:**
1. **Static Scenarios** - Pre-generated race data
2. **Dynamic Simulation** - Algorithmic race progression
3. **API Integration** - Phase 2+ with real F1 data

### 3.3 Technical Requirements
- Mobile-responsive design
- Offline-capable (cached data)
- Fast loading (<3 seconds)
- Lightweight (<5MB initial load)

---

## 4.0 Art & UI Design

### 4.1 Visual Style
**8-bit Bird's-Eye View** (Based on Yoann's reference)
- Simplified top-down representation of car positions
- Cars shown in **relative order**, not actual track position
- Pixel art aesthetic with clear color coding
- Minimalist data overlay on racing visualization

**Color Palette:**
- Team/driver color coding (Red Bull = red, Mercedes = silver, etc.)
- Status indicators (tire wear, fuel, boost) as colored bars/icons
- High contrast for readability on mobile

**UI Philosophy:**
- **Glanceable** - All critical info visible at once
- **Tactile** - Large touch targets for mobile
- **Immersive** - Racing feel without overwhelming detail

### 4.2 Key Screens & Interface Components

**1. Race Control Interface (Main Screen)**
```
┌─────────────────────────────────────┐
│ [Weather: Sunny]  [Lap: 12/50]      │
├─────────────────────────────────────┤
│                                     │
│       8-BIT BIRD'S-EYE VIEW         │
│      (Relative car positions)       │
│                                     │
│    🟥 YOUR CAR (P5)                 │
│    🟦 Rival (+2.1s ahead)           │
│    🟩 Rival (+1.3s behind)          │
│                                     │
├─────────────────────────────────────┤
│ TIRE: S 72%  │ FUEL: 42L  │ BOOST:  │
│              │            │  🟢🟢🟡  │
├─────────────────────────────────────┤
│ [PIT NOW]  [BOOST]  [OVERTAKE]      │
└─────────────────────────────────────┘
```

**2. Boost Card System**
- **Visual:** Card-style display (3 slots max)
- **Colors:** Green (full), Yellow (medium), Red (low)
- **Replenishment:** Pit stops refill boost cards
- **Tie to tires:** Different tire compounds grant different boost types:
  - **Soft tires** → Aggressive overtake boost (red cards)
  - **Medium tires** → Balanced defense/attack (yellow cards)  
  - **Hard tires** → Defense/conservation boost (green cards)

**3. Car Characteristic Display**
- **Curve/Straight/Both rating** visible in car info panel
- **Performance impact:** Visual indicator when car excels/suffers on track sections
- **Setup choice:** Players select car characteristic before race start

**4. Strategy Board Overlay**
- Toggleable panel showing:
  - Planned vs actual pit stops
  - Competitor tire strategies
  - Weather forecast timeline
  - Fuel consumption projection

**5. Results & Analytics Screen**
- Race summary with decision analysis
- "What if" scenarios showing alternative strategies
- Performance grades for each decision category

---

## 5.0 Progression & Monetization

### 5.1 Player Progression
- Unlockable team liveries
- Historical team data access
- Advanced analytics tools
- Custom strategy presets

### 5.2 Monetization Strategy
*(To be defined)*
- Non-intrusive banner ads
- Optional cosmetic purchases
- Premium strategy tools
- Sponsor integration

---

## 6.0 Development Roadmap

### Phase 1: Hyper-casual MVP (Weeks 1-4)
**Goal:** Playable prototype with core mechanics
- **Week 1:** Project setup + basic simulation engine
  - Game state architecture
  - Deterministic race simulation
  - Basic UI framework
- **Week 2:** Core gameplay implementation
  - Pit stop decision system
  - Tire wear simulation
  - Basic race visualization
- **Week 3:** Polish & scenario creation
  - 3-5 curated race scenarios
  - Scoring and feedback system
  - Mobile optimization
- **Week 4:** Testing & refinement
  - User testing sessions
  - Balance adjustments
  - Performance optimization

### Phase 2: Enhanced Gameplay (Weeks 5-8)
**Goal:** Deeper strategy + data integration
- Weather system implementation
- Advanced tire/fuel management
- Competitor AI improvements
- Real F1 data API integration (FastF1/Ergast)
- Weekend mode (Practice + Qualifying + Race)

### Phase 3: Features & Polish (Weeks 9-12)
**Goal:** Complete game experience
- Season progression system
- Car development tree
- Advanced analytics dashboard
- Social features (share results, compare strategies)
- Monetization integration
- Performance optimization pass

### Phase 4: Live & Scale (Weeks 13+)
**Goal:** Real-world integration
- Live race synchronization
- Community events
- Multiplayer elements
- Expanded content (more tracks, scenarios)
- Platform expansion (iOS/Android apps if warranted)

## 7.0 Agent Coordination Plan

### Development Agent (To be created)
**Responsibilities:**
- Technical implementation
- Code architecture
- Performance optimization
- Deployment pipeline

**Initial Tasks:**
1. Evaluate technical stack options
2. Set up development environment
3. Create simulation engine prototype
4. Implement core UI components

### Marketing Agent (To be created)
**Responsibilities:**
- Market research
- Audience targeting
- Community building
- Launch strategy

**Initial Tasks:**
1. Competitor analysis (Motorsport Manager, F1 Manager)
2. Target audience persona development
3. Community platform setup (Discord, social)
4. Early access planning

### Stratege (Current) - Project Lead
**Responsibilities:**
- Overall project coordination
- Game design direction
- Feature prioritization
- Quality assurance
- Communication with Yoann

**Weekly Rhythm:**
- **Daily:** Standup review, task progress tracking
- **Weekly:** Full project review, roadmap updates
- **Bi-weekly:** Agent coordination meetings
- **Monthly:** Strategic direction review with Yoann

---

## 7.0 Open Questions & Decisions Needed

### From Yoann:
1. **Real-time data sources** - Which APIs/services?
2. **Gameplay depth** - How complex should management be?
3. **Monetization approach** - Ads, premium, or hybrid?
4. **Technical stack** - Framework preferences?
5. **Target platforms** - Mobile web, desktop, or both?

### Technical Decisions:
1. Data update frequency
2. Offline fallback strategy
3. Analytics implementation
4. Performance optimization targets

---

## 8.0 Appendix

### 8.1 Reference Games
- Motorsport Manager Mobile
- F1 Manager series
- Football Manager Mobile
- Quick strategy games

### 8.2 Market Analysis
*(To be researched)*
- Casual management game market size
- F1/sports game demographics
- Web-based game trends

### 8.3 Risk Assessment
1. **API reliability** - Live data dependency
2. **Monetization** - Balancing ads vs. UX
3. **Competition** - Existing F1 management games
4. **Technical** - Real-time sync complexity

---

*This document will be updated as project evolves. All major changes require discussion with Yoann.*