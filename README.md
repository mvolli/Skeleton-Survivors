# 🦴 Skeleton Survivors

A fast-paced bullet hell survivor game built with HTML5 Canvas and JavaScript. Fight waves of skeletons, defeat powerful bosses, and upgrade your arsenal with an extensive weapon and powerup system.

## 🎮 Play the Game

**[Play Skeleton Survivors Online](https://mvolli.github.io/Skeleton-Survivors/)**

## ✨ Features

### 🔥 Combat System
- **4 Base Weapons**: Basic Gun, Laser, Sword, Fireball
- **4 New Weapons**: Grenade Launcher, Mine Layer, Chain Lightning, Boomerang
- **Advanced Mechanics**: Penetration, multishot bullet splitting, critical hits
- **Visual Effects**: Unique projectile colors, particle systems, weapon status HUD

### 👹 Enemy System
- **Regular Enemies**: Basic, Fast, and Tank skeletons with scaling health
- **Epic Bosses**: Skeleton Lord (charge attacks) and Bone Colossus (stomp attacks)
- **Smart AI**: Enemies pursue player, bosses have special abilities
- **Boss Indicators**: Warning system and off-screen direction arrows

### ⚡ Powerup System
- **Offensive**: Increased Damage, Attack Speed, Critical Hit, Penetration
- **Defensive**: Health Boost, Life Steal, Reflect, Invincibility Duration  
- **Utility**: Speed Boost, XP Multiplier, Pickup Range, Projectile Size
- **Special**: Freeze enemies, multishot splitting, regeneration

### 💎 Meta Progression
- **12 Permanent Upgrades**: Spend diamonds on persistent character improvements
- **Strategic Choices**: Max Health, Starting Damage, Move Speed, Luck
- **Advanced Options**: Attack Speed, Penetration, Multishot, XP Boost
- **Quality of Life**: Invincibility Duration, Pickup Range, Boss Timer
- **Save System**: Multiple character slots with backwards compatibility

### 🎯 Game Balance
- **Scaling Difficulty**: Enemy health increases after level 10
- **Aggressive Spawning**: Faster enemy spawn rates over time
- **Rare Resources**: Balanced drop rates for health and diamonds
- **Boss Mechanics**: 2-minute intervals, massive health pools, high XP rewards

## 🎮 Controls

- **WASD** or **Arrow Keys**: Move your character
- **Weapons**: Auto-fire at nearest enemies
- **P** or **Escape**: Manually pause/unpause the game
- **F**: Toggle performance mode (reduces enemy/particle limits)
- **C**: Toggle cursor-based aiming mode
- **Auto-Pause**: Game automatically pauses when window loses focus

## 🚀 Getting Started

### Play Online
Simply visit the [GitHub Pages link](https://mvolli.github.io/Skeleton-Survivors/) to play instantly in your browser.

### Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/mvolli/Skeleton-Survivors.git
   ```
2. Open `index.html` in your web browser
3. Start playing!

## 🛠️ Technical Details

- **Engine**: Pure HTML5 Canvas with JavaScript
- **Graphics**: Sprite animations and procedural effects
- **Save System**: LocalStorage with version migration
- **Performance**: Optimized for 60 FPS gameplay
- **Responsive**: Adapts to different screen sizes

## 📈 Game Stats

- **8 Weapon Types** with upgrade paths
- **12 Powerup Categories** with stacking effects
- **12 Meta Progression** upgrades across 4 categories
- **3 Enemy Types** + 2 Boss varieties
- **Multiple Save Slots** with character persistence

## 🎨 Assets

Game includes custom sprite animations and visual effects:
- Animated skeleton enemies
- Ghost player character
- Particle systems for explosions and hits
- Dynamic weapon and UI indicators

## 🏆 Gameplay Tips

1. **Early Game**: Focus on damage and attack speed upgrades
2. **Mid Game**: Get penetration and multishot for crowd control  
3. **Late Game**: Invest in defensive upgrades and boss timer
4. **Meta Progression**: Prioritize health and damage for consistent runs
5. **Weapon Synergy**: Combine Chain Lightning with freeze/crit powerups

## 📜 Version History

### v0.5.0 (Current) - Major QoL Update
- ✅ **Performance Optimization**: Improved late-game performance with enemy/particle limits and culling
- ✅ **Cursor-Based Aiming**: Optional cursor targeting mode (C key)
- ✅ **Enhanced Loot Indicators**: Colored glow effects when items are within pickup range
- ✅ **Performance Mode Toggle**: F key to reduce limits for better FPS on lower-end devices
- ✅ **Optimized Collision Detection**: Faster collision calculations using squared distance

### v0.4.4
- Enhanced pause screen UI/UX with glassmorphism design and smooth animations

### v0.4.3
- Auto-pause feature when game window loses focus or tab switches

### v0.4.2
- Enhanced boss mechanics with proper health scaling
- 4 new weapons with unique projectile systems
- 4 new powerups with combat integration
- Expanded meta progression (12 total upgrades)
- Improved balance and difficulty scaling
- Fixed boss targeting and invincibility systems

## 🔧 Development Status

### ✅ Completed Features
- [x] Performance optimization for late-game (v0.5.0)
- [x] Cursor-based aiming mode toggle (v0.5.0)
- [x] Enhanced loot indicators with proximity glow (v0.5.0)
- [x] Performance mode toggle for low-end devices (v0.5.0)
- [x] Optimized pause screen UI/UX (v0.4.4)
- [x] Auto-pause on window focus loss (v0.4.3)
- [x] Manual pause controls (P/Escape)
- [x] 8 weapon types with unique mechanics
- [x] 12 powerup categories with stacking effects
- [x] Boss system with 2 unique bosses
- [x] Meta progression with 12 permanent upgrades
- [x] Multiple save slots system

### 🚧 Planned Features
- [ ] Additional weapon types
- [ ] New enemy varieties
- [ ] Achievement system
- [ ] Sound effects and music
- [ ] Mobile touch controls
- [ ] Leaderboard system
- [ ] Additional boss encounters

### 🐛 Known Issues
- [ ] Performance optimization for large enemy counts
- [ ] Mobile responsiveness improvements
- [ ] Save system edge case handling

## 🤝 Contributing

This is an open-source project! Feel free to:
- Report bugs or suggest features
- Submit pull requests with improvements
- Share your high scores and strategies

## 📄 License

Open source - feel free to use, modify, and distribute!

---

**Enjoy the game and try to survive as long as possible! 🦴⚔️**