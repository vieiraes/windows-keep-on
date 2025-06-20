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