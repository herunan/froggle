# 🐸 Froggle

A daily Frogger-style game where everyone gets the same unique traffic pattern each day. Built with React, Vite, and Tailwind CSS.

**[Play Froggle Daily →](https://froggle-daily.surge.sh)**

![Froggle Game](https://froggle-daily.surge.sh/vite.svg)

## 🎮 About

Froggle is a modern take on the classic Frogger arcade game with a daily puzzle twist. Each day generates a unique lane layout based on the date, ensuring everyone worldwide plays the same pattern. Your challenge: cross the road and river with as few lives lost and as quickly as possible.

## 🕹️ How to Play

### Objective
Guide your frog from the bottom of the screen to the goal at the top, avoiding traffic and crossing the river safely.

### Controls
- **Keyboard**: Arrow keys (↑ ↓ ← →)
- **Touch**: On-screen directional buttons

### Scoring
- **Lives**: You start with 3 lives (❤️❤️❤️)
- **Time**: The faster you cross, the better your score
- **Share**: Copy your results to clipboard and challenge friends!

## 🎯 Game Mechanics

### Traffic Lanes (Road)
- **Cars** 🚗: Fast-moving obstacles (1 block wide)
- **Trucks** 🚚: Larger obstacles (2 blocks wide)
- Get hit = lose a life and restart

### River Lanes (Water)
- **Logs** 🪵: Safe platforms (1-3 blocks, variable lengths)
- **Turtles** 🐢: Safe platforms that **sink intermittently** (1 block)
  - Visible for 3 seconds, sink for 2 seconds in predictable cycles
  - Landing on a sinking turtle = death!
- **Lily Pads** 🌿: Stationary safe spots (1 block)
- Fall in water = lose a life and restart

### Special Features
- **Smart Centering**: Frog automatically centers on platforms when jumping vertically
- **Precise Hitboxes**: Collision detection uses 30% smaller hitboxes for fair gameplay
- **Varied Patterns**: Adjacent lanes rarely share the same speed AND direction (80% variation)
- **Daily Seed**: Same pattern for everyone worldwide using UTC date

## 🛠️ Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Surge.sh** - Deployment

## 🏃 Running Locally

```bash
# Clone the repository
git clone https://github.com/herunan/froggle.git
cd froggle

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📦 Project Structure

```
froggle/
├── src/
│   ├── components/
│   │   ├── Game.jsx          # Main game loop and state
│   │   ├── Lane.jsx           # Individual lane rendering
│   │   ├── Frog.jsx           # Player character
│   │   ├── Controls.jsx       # Touch controls
│   │   ├── ScoreBoard.jsx     # Lives and timer display
│   │   └── GameOver.jsx       # End game screen with sharing
│   ├── utils/
│   │   ├── dailySeed.js       # Seeded random number generator
│   │   ├── gameLogic.js       # Collision detection and movement
│   │   └── constants.js       # Game configuration
│   └── index.css              # Global styles
└── dist/                      # Production build
```

## 🎨 Features

- ✅ Daily unique patterns (synchronized globally via UTC)
- ✅ Variable log lengths (1-3 blocks with weighted probabilities)
- ✅ Turtle sinking mechanics (predictable 5-second cycles)
- ✅ Smart platform centering
- ✅ Tighter collision detection for fair gameplay
- ✅ Keyboard and touch controls
- ✅ Share results via clipboard
- ✅ Responsive design
- ✅ Classic pixel art aesthetic

## 🚀 Deployment

Deployed to Surge.sh:
```bash
npm run build
surge ./dist froggle-daily.surge.sh
```

## 📝 License

MIT License - feel free to fork and modify!

## 🙏 Acknowledgments

Inspired by the classic Frogger arcade game (1981) by Konami.
