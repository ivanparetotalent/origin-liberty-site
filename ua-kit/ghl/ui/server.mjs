// Keeps one headless Playwright Chromium alive on the saved GHL session,
// exposing CDP on :9333 so step scripts can connect, act and disconnect.
import { createRequire } from 'node:module'; import { homedir } from 'node:os'; import { join } from 'node:path';
const require = createRequire(join(homedir(), 'package.json')); const { chromium } = require('playwright');
const ctx = await chromium.launchPersistentContext(join(homedir(), '.config/ghl-ol/browser-profile'), {
  headless: true, viewport: { width: 1440, height: 900 }, args: ['--remote-debugging-port=9333'] });
const p = ctx.pages()[0] ?? await ctx.newPage();
await p.goto('https://app.gohighlevel.com/', { waitUntil: 'domcontentloaded' });
console.log('ready');
setInterval(() => {}, 1 << 30);
