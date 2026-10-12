// node step.mjs <file.js> : runs file body as async fn(page) on the live browser, then screenshots.
import { createRequire } from 'node:module'; import { homedir } from 'node:os'; import { join } from 'node:path'; import { readFileSync } from 'node:fs';
const require = createRequire(join(homedir(), 'package.json')); const { chromium } = require('playwright');
const b = await chromium.connectOverCDP('http://127.0.0.1:9333');
const ctx = b.contexts()[0]; const page = ctx.pages().at(-1);
const body = readFileSync(process.argv[2], 'utf8');
const fn = new Function('page', 'ctx', 'require', `return (async () => { ${body} })()`);
let out; try { out = await fn(page, ctx, require); } catch (e) { out = 'ERROR: ' + e.message.split('\n')[0]; }
const shot = process.argv[3] || '/private/tmp/claude-501/-Users-ivanbunin-Library-CloudStorage-GoogleDrive-ivan-paretotalent-com-Shared-drives-Pareto-Talent-Internal-Pareto-OS/89b6d386-4d6e-4ac7-af52-08c8265f3678/scratchpad/ghl.png';
await ctx.pages().at(-1).screenshot({ path: shot });
console.log('url:', ctx.pages().at(-1).url()); if (out !== undefined) console.log(typeof out === 'string' ? out : JSON.stringify(out, null, 1));
process.exit(0);
