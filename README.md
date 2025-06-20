# WKO - Windows Keep On

A simple system tray application that prevents Windows from entering screen saver or sleep mode.

## Features

- Runs silently in system tray
- Prevents screen saver activation
- Prevents system sleep/hibernation
- Minimal resource usage
- Simple one-click operation

## Installation

1. Download `wko.exe`
2. Run the executable
3. Look for the green circle icon in your system tray

## Usage

- The application starts automatically preventing sleep mode
- Right-click the tray icon to access the menu
- Use "Exit" to close the application

## Development

Requirements:
- Node.js
- npm

```bash
# Install dependencies
npm install

# Run in development
npm start

# Build for Windows
npm run build
```

## Build

The built executable will be available in:
```
dist/win-unpacked/wko.exe
```

{
  "name": "wko",
  "productName": "WKO",
  "version": "1.0.0",
  "description": "Keep Windows awake preventing screen saver/sleep mode",
  "main": "./src/main.js",
  "scripts": {
    "start": "electron .",
    "build": "electron-builder --win --x64",
    "pack": "electron-builder --dir"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/yourusername/wko.git"
  },
  "keywords": [
    "windows",
    "keep-awake",
    "screen-saver",
    "system-tray",
    "electron"
  ],
  "author": "",
  "license": "MIT",
  "build": {
    "productName": "WKO",
    "appId": "com.wko.app",
    "win": {
      "target": [
        {
          "target": "portable",
          "arch": ["x64"]
        }
      ],
      "icon": "build/icon.png"
    },
    "directories": {
      "output": "dist"
    }
  },
  "devDependencies": {
    "electron": "^26.0.0",
    "electron-builder": "^24.6.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}