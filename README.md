# Highscore RPC

Enhance your Discord with rich presence for Highscore games. Shows the game you're playing and updates in real time.

MACOS ONLY -> Windows version coming soon...

---

## Downloads

- [HighscoreRPC Helper](HighscoreRPChelper.zip) – Runs in the background, communicates with Discord.
- [HighscoreRP Extension](HighscoreRPextension.zip) – Chrome extension that detects the game you're playing and tells the helper.

---

## Setup Instructions

### 1. Install Node.js (if not already installed)

Highscore RPC helper requires Node.js. You can download it here:

[https://nodejs.org/](https://nodejs.org/)

Make sure `node` is accessible in your terminal:

```bash
node -v
```

## 2. Run Highscore Helper

Extract HighscoreRPChelper.zip & Run exe

Check start at login in menu bar if you want it to stay on after restarts

## 3. Install Chrome Extension

Unzip HighscoreRPextension.zip.

Open Chrome → chrome://extensions/ → Enable Developer mode.

Click Load unpacked → select the unzipped extension folder.

Make sure the extension is enabled.

## 3. Using Highscore RPC

Launch a Highscore game in Chrome.

The extension detects the game and sends the App ID to the helper.

Discord Rich Presence updates automatically showing the game name and "Playing via Highscore".

## 5. Stopping the Helper

macOS: Click menu bar icon → Quit.
Windows: Coming soon...