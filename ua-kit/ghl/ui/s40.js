const f = () => page.frames().find(f => f.url().includes('client-app-automation-workflows'));
await page.mouse.click(420, 144).catch(()=>{}); await page.waitForTimeout(1000);
const t = await f().evaluate(() => document.body.innerText); const i = t.indexOf('Add new trigger');
const trig = t.slice(Math.max(0,i-250), i);
await f().locator('[role=switch], .hr-switch, .n-switch').first().click(); await page.waitForTimeout(5000);
const hdr = JSON.parse(require('fs').readFileSync('hdr.json'));
const r = await ctx.request.get('https://backend.leadconnectorhq.com/workflow/bvVdY6uxwZibc7vKkknQ/84d78469-d0ca-4e59-b79a-82c9b7235393', { headers: hdr });
return { trig, status: (await r.json()).status };
