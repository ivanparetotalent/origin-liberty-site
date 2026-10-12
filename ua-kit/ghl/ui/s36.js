const f = () => page.frames().find(f => f.url().includes('client-app-automation-workflows'));
await f().locator('[role=switch], .hr-switch, .n-switch').first().click(); await page.waitForTimeout(5000);
const hdr = JSON.parse(require('fs').readFileSync('hdr.json'));
const r = await ctx.request.get('https://backend.leadconnectorhq.com/workflow/bvVdY6uxwZibc7vKkknQ/57a9db92-7f48-4756-9cbd-d0e5156226ad', { headers: hdr });
return (await r.json()).status;
