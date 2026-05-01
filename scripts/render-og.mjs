import { readFileSync } from 'fs';
import sharp from 'sharp';
const svg = readFileSync('public/og-default.svg');
await sharp(svg, { density: 200 })
  .resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile('public/og-default.jpg');
console.log('Wrote public/og-default.jpg');
