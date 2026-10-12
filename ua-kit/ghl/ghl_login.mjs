// One-time GoHighLevel login for UI automation (workflows, forms, pipeline).
//
// Uses the Playwright install in ~/node_modules (v1.64, Chromium 1248): the
// dedicated, isolated AI browser Christina recommended, never your own Chrome
// or its saved passwords. The window opens visibly ONCE so you can sign in
// yourself (password + 2FA); the session is saved to its own profile, and
// every later run reuses it headless. Claude never sees or types the password.
import { createRequire } from 'node:module';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { mkdirSync } from 'node:fs';

const require = createRequire(join(homedir(), 'package.json'));
const { chromium } = require('playwright');

const PROFILE = join(homedir(), '.config', 'ghl-ol', 'browser-profile');
mkdirSync(PROFILE, { recursive: true });

const ctx = await chromium.launchPersistentContext(PROFILE, {
  headless: false,
  viewport: { width: 1440, height: 900 },
});
const page = ctx.pages()[0] ?? (await ctx.newPage());
await page.goto('https://app.gohighlevel.com/');
console.log('Sign in to GoHighLevel in the window that opened, then open the Origin Liberty location.');
console.log('The window closes by itself once the location dashboard loads (up to 10 minutes).');
await page.waitForURL('**/location/**', { timeout: 600_000 });
await page.waitForTimeout(3000);
console.log('Session saved to', PROFILE);
await ctx.close();
