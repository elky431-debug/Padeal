// Creates minimal placeholder PNG assets for Expo
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../apps/mobile/assets');

// Minimal valid 1x1 green PNG (base64)
const greenPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

['icon.png', 'splash.png', 'adaptive-icon.png'].forEach((file) => {
  const dest = path.join(assetsDir, file);
  if (!fs.existsSync(dest)) {
    fs.writeFileSync(dest, greenPng);
    console.log('Created', file);
  }
});

console.log('Assets ready.');
