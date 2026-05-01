/**
 * Pipeline: take a source photo, bake in EXIF rotation, generate web-ready
 * variants (WebP + JPG) at the sizes the site actually uses. Run with:
 *   npm run images
 */
import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

const HOME = homedir();

const jobs = [
  {
    src: join(import.meta.dirname || new URL('.', import.meta.url).pathname, '..', 'montevideo.JPG'),
    out: 'public/images/hero-montevideo',
    widths: [800, 1200, 1600],
    aspect: { width: 4, height: 5 },
    description: 'Hero — Palacio in Montevideo fog (portrait crop)',
  },
  {
    src: join(HOME, 'Downloads', 'ivan-and-lev.jpg'),
    out: 'public/images/story-ivan',
    widths: [600, 900, 1200],
    aspect: { width: 4, height: 5 },
    description: 'Story — Ivan and Lev on the rocks, B&W',
  },
  {
    src: join(HOME, 'Downloads', 'new-york-1933.png'),
    out: 'public/images/history-ny-1933',
    widths: [800, 1200, 1600],
    aspect: { width: 3, height: 2 },
    description: 'History — three men outside Western Trust, NYC 1933',
  },
];

await mkdir('public/images', { recursive: true });

for (const job of jobs) {
  if (!existsSync(job.src)) {
    console.warn(`SKIP ${job.out} — source missing: ${job.src}`);
    continue;
  }
  console.log(`\n${job.description}`);
  console.log(`  source: ${job.src}`);

  for (const width of job.widths) {
    const height = Math.round((width * job.aspect.height) / job.aspect.width);

    const base = sharp(job.src).rotate(); // .rotate() with no args bakes EXIF orientation
    const cropped = base.resize(width, height, { fit: 'cover', position: 'attention' });

    const webpPath = `${job.out}-${width}.webp`;
    const jpgPath = `${job.out}-${width}.jpg`;

    await cropped.clone().webp({ quality: 82, effort: 6 }).toFile(webpPath);
    await cropped.clone().jpeg({ quality: 84, mozjpeg: true, progressive: true }).toFile(jpgPath);

    console.log(`    ${width}×${height} → ${webpPath}, ${jpgPath}`);
  }
}

console.log('\nDone.');
