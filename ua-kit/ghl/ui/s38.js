const f = () => page.frames().find(f => f.url().includes('client-app-automation-workflows'));
await page.mouse.click(420, 144).catch(()=>{}); await page.waitForTimeout(1000);
const t = await f().evaluate(() => document.body.innerText);
const i = t.indexOf('Add new trigger');
return t.slice(Math.max(0,i-300), i);
