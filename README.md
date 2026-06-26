# CyberPet 🐱🐕🐰🐹

A pixel-art cyber pet living in your browser corner. Feed it, clean it, pet it — it responds with personality. Built-in **Pomodoro focus timer** with slack-off detection.

![CyberPet Demo](https://img.shields.io/badge/version-1.0.0-orange)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4)

---

## ✨ Features

### 🎮 Four Pets to Choose
| Pet | Idle Animation | Special Moves |
|-----|---------------|---------------|
| 🐱 **CyberCat** | Breathe + tail wag | Glasses on focus, scared jump |
| 🐕 **Shiba** | Head sway + tongue pant | Tongue jiggle, excited shake |
| 🐰 **Bunny** | Ear jiggle (left/right offset) | Sleep: ears droop; Work: ear wiggle |
| 🐹 **Groundhog** | Gentle breathing | Panic mode: full-body shake + teeth chatter |

### 📊 Pet Stats
- **Fullness** 🍗 — decays every 5 min, refill by feeding
- **Cleanliness** 🛁 — decays every 5 min, refill by bathing
- **Mood** ❤️ — affected by the other two, boost by petting

### ⏱️ Pomodoro Focus Timer
- 25-minute focus sessions
- Cat **puts on glasses** and starts working 👓
- **Slack-off detection** — visit YouTube/Twitter/Reddit during focus and your pet calls you out
- **Mood bonus** +30 on completion

### 🎨 Animations
- **Organic behaviors**: grooming, stretching, yawning (varies by pet)
- **Blinking eyes** every 2-6 seconds
- **Eye tracking** — follows your cursor
- **Auto-sleep** after 2 minutes of inactivity
- **Particle effects**: ❤️ on pet, 🍖 on feed, ✨ on bath
- **Double-click** for special reaction

---

## 🚀 Installation

### From Chrome Web Store (coming soon)

### Manual (Developer Mode)
1. Download or clone this repo
   ```bash
   git clone git@github.com:boweryoung-alt/CyberPet.git
   ```
2. Open `chrome://extensions/`
3. Enable **Developer mode** (top right)
4. Click **Load unpacked**
5. Select the `CyberPet-Extension` folder

---

## 🎯 Usage

| Action | How |
|--------|-----|
| **Open control panel** | Click the extension icon 🐱 |
| **Feed** | Click 🍖 Feed in popup |
| **Bath** | Click 🧼 Bath in popup |
| **Pet** | Click 🤚 Pet in popup |
| **Click pet** | Random reaction (meow, purr, tilt, surprise) |
| **Double-click** | Special happy reaction + hearts ❤️ |
| **Drag pet** | Move it up/down along the right edge |
| **Switch pet** | Click pet buttons in the popup header |
| **Start focus** | Click "Start Focus" in popup |
| **Stop focus** | Click "Stop Focus" |

---

## 🏗️ Project Structure

```
CyberPet-Extension/
├── manifest.json       # Chrome Extension Manifest V3
├── background.js       # Service worker: decay, focus, alarms
├── content.js          # Injected pet engine (SVG + state machine)
├── content.css         # Pet animations + UI styling
├── popup.html          # Control panel UI
├── popup.js            # Panel logic
└── icon.png            # Extension icon
```

---

## 🧑‍💻 Development

```bash
# After editing, reload the extension:
chrome://extensions/ → Ctrl+R → refresh your page
```

**State class naming convention:**
- Format: `.pet-{name}.state-{state}`
- Example: `.pet-shiba.state-working`, `.pet-marmot.state-surprised`

---

## 📝 License

MIT
