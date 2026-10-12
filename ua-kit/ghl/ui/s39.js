const f = () => page.frames().find(f => f.url().includes('client-app-automation-workflows'));
await f().locator('[role=switch], .hr-switch, .n-switch').first().click(); await page.waitForTimeout(5000);
const hdr = JSON.parse(require('fs').readFileSync('hdr.json'));
const r = await ctx.request.get('https://backend.leadconnectorhq.com/workflow/bvVdY6uxwZibc7vKkknQ/808a30ac-0427-4e09-9010-1a84aa6aa11d', { headers: hdr });
return (await r.json()).status;
