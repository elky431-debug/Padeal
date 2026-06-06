// Download fonts for mobile app — run: node scripts/download-fonts.js

const https = require('https');
const fs = require('fs');
const path = require('path');

const FONTS_DIR = path.join(__dirname, '../apps/mobile/assets/fonts');

const fonts = [
  {
    name: 'Boldonse-Regular.ttf',
    url: 'https://github.com/google/fonts/raw/main/ofl/boldonse/Boldonse-Regular.ttf',
  },
  {
    name: 'Inter-Regular.ttf',
    url: 'https://github.com/rsms/inter/raw/master/docs/font-files/Inter-Regular.woff2',
  },
];

// Inter from Google Fonts API (TTF)
const interFonts = [
  'Inter-Regular',
  'Inter-Medium',
  'Inter-SemiBold',
  'Inter-Bold',
].map((name) => ({
  name: `${name}.ttf`,
  url: `https://github.com/rsms/inter/raw/master/docs/font-files/${name}.ttf`,
}));

const boldonse = {
  name: 'Boldonse-Regular.ttf',
  url: 'https://github.com/google/fonts/raw/main/ofl/boldonse/Boldonse-Regular.ttf',
};

const allFonts = [boldonse, ...interFonts];

if (!fs.existsSync(FONTS_DIR)) {
  fs.mkdirSync(FONTS_DIR, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('Downloading fonts to', FONTS_DIR);
  for (const font of allFonts) {
    const dest = path.join(FONTS_DIR, font.name);
    if (fs.existsSync(dest)) {
      console.log(`Skip ${font.name} (exists)`);
      continue;
    }
    console.log(`Downloading ${font.name}...`);
    try {
      await download(font.url, dest);
      console.log(`✓ ${font.name}`);
    } catch (e) {
      console.error(`✗ ${font.name}:`, e.message);
    }
  }
  console.log('Done.');
}

main();
