# Boardurance Wireframes & UI Flow
**Based on 8-bit Bird's-Eye View Style + Boost Card Mechanics**

## Visual Style Reference
- **8-bit aesthetic** - Simplified, pixelated look
- **Bird's-eye view** - Shows relative car positions (not track layout)
- **Color coding** - Teams by color, status by icon colors
- **Minimalist data overlay** - Essential info only

## Screen Flow

### 1. Landing/Quick Start Screen
```
┌─────────────────────────────────────┐
│           BOARDURANCE               │
│      Hyper-Casual Racing Strategy   │
│                                     │
│         [QUICK RACE]                │
│          (3-5 minutes)              │
│                                     │
│      [SCENARIO CHALLENGE]           │
│      [LEADERBOARDS]   [SETTINGS]    │
└─────────────────────────────────────┘
```
**Key Features:**
- Zero friction - no login required
- "Quick Race" as primary call-to-action
- Session estimate shown (3-5 minutes)

### 2. Pre-Race Setup (15 seconds max)
```
┌─────────────────────────────────────┐
│  SCENARIO: Monaco Lap 38            │
│  Starting Position: P5              │
│  Weather: Clear                     │
│                                     │
│  CHOOSE CAR CHARACTERISTIC:         │
│  [●] Curve Specialist    (+15% corners)
│  [ ] Straight Expert     (+15% straights)
│  [ ] Balanced            (+7% everywhere)
│                                     │
│  Track Type: Street (Many corners)  │
│                                     │
│           [START RACE]              │
└─────────────────────────────────────┘
```
**Gameplay Impact:**
- Characteristic choice affects race strategy
- Track type hint helps decision
- Quick choice - no analysis paralysis

### 3. Main Race Interface (8-bit View)
```
┌─────────────────────────────────────┐
│ [SUNNY]  LAP: 12/50  POS: P5        │
├─────────────────────────────────────┤
│                                     │
│       8-BIT CAR POSITIONS           │
│                                     │
│    █████                            │
│    █🟦██  +2.1s                     │
│    █🟥██  YOUR CAR                  │
│    █🟩██  -1.3s                     │
│    █████                            │
│                                     │
├─────────────────────────────────────┤
│ TIRE: S 68% │ FUEL: 38L │ BOOST:    │
│             │           │  🟢🟢🟡    │
├─────────────────────────────────────┤
│   [PIT]   [BOOST]   [OVERTAKE]      │
└─────────────────────────────────────┘
```

**8-bit Visualization Details:**
- Cars shown as colored blocks in relative order
- Gap times shown (+2.1s ahead, -1.3s behind)
- Your car highlighted (red block with indicator)
- Simple track representation (borders only)

**Boost Card Display:**
- 3 slots maximum
- Colors: Green/Yellow/Red based on tire compound
- Visual depletion as used (full → half → empty)

**Control Buttons:**
- **PIT** - Opens pit strategy menu
- **BOOST** - Activates selected boost card  
- **OVERTAKE** - Aggressive move (consumes red boost)

### 4. Pit Stop Strategy Interface
```
┌─────────────────────────────────────┐
│         PIT STRATEGY                │
│ Lap: 12  Next Pit Window: 18-22     │
│                                     │
│ TIRE COMPOUND:                      │
│ [●] Soft (🔴🔴🔴) - Fast, high wear
│ [ ] Medium (🟡🟡🟡) - Balanced
│ [ ] Hard (🟢🟢🟢) - Durable, slower
│                                     │
│ FUEL: [======= 65L =====]           │
│ (Enough for 20 laps)                │
│                                     │
│ Pit Time: 2.8 seconds               │
│                                     │
│       [CONFIRM PIT]    [CANCEL]     │
└─────────────────────────────────────┘
```

**Strategic Decisions:**
- Tire compound affects boost cards received
- Fuel amount affects car weight/performance
- Pit timing based on wear/window predictions

### 5. Boost Activation Interface
```
┌─────────────────────────────────────┐
│      ACTIVATE BOOST CARD            │
│                                     │
│ Available Boosts:                   │
│  [🟢] DEFENSE BOOST                 │
│   -15% tire wear for 2 laps         │
│   Best for: Corner sections         │
│                                     │
│  [🟢] FUEL SAVE                     │
│   -10% fuel use for 3 laps          │
│   Best for: Defending position      │
│                                     │
│  [🟡] BALANCED PUSH                 │
│   +0.3s/lap for 1 lap               │
│   Best for: Any situation           │
│                                     │
│ Track Section: CORNERS (Next 30s)   │
│                                     │
│    [ACTIVATE]       [CANCEL]        │
└─────────────────────────────────────┘
```

**Context-Aware Suggestions:**
- Recommends best boost for current situation
- Shows track section timing
- Explains strategic implications

### 6. Race Results & Analysis
```
┌─────────────────────────────────────┐
│         RACE COMPLETE!              │
│ Final Position: P4  (+1 position)   │
│                                     │
│ PERFORMANCE ANALYSIS:               │
│ 🏆 Pit Strategy: A (Perfect timing)  │
│ 🔥 Boost Usage: B (Good, but late)   │
│ 🛞 Tire Management: C (High wear)    │
│                                     │
│ KEY DECISION:                       │
│ Early pit on lap 18 gained position │
│                                     │
│ [REPLAY]  [NEW RACE]  [SHARE]       │
└─────────────────────────────────────┘
```

**Learning & Progression:**
- Grades each strategic area
- Highlights key decision impact
- Encourages replay with different strategies

## Mobile-First Design Considerations

**Touch Targets:**
- Buttons: Minimum 44×44 pixels
- Boost cards: Easy tap targets
- Swipe gestures for additional info

**Information Hierarchy:**
1. Position & gap (most important)
2. Tire/Fuel status
3. Boost availability
4. Control buttons

**Performance Optimization:**
- 8-bit graphics = low memory usage
- Minimal animations for battery life
- Offline-capable (cached scenarios)

## Next Steps for Development

**Phase 1 Wireframes Needed:**
1. Detailed 8-bit car sprites and animations
2. Boost card visual states (full/half/empty)
3. Track section indicator animations
4. Pit stop countdown visualization

**Technical Assets:**
- 8-bit color palette (16 colors max)
- Pixel art style guide
- Sound effects (8-bit style)
- UI component library