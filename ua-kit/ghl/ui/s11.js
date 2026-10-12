await page.mouse.click(420, 144); await page.waitForTimeout(1500);
await page.mouse.click(1003, 434); await page.waitForTimeout(4000);
const f = page.frames().find(f => f.url().includes('client-app-automation-workflows'));
const txt = await f.evaluate(() => document.body.innerText);
const m = txt.match(/https:\/\/services\.leadconnectorhq\.com\/hooks\/\S+/);
const vals = await f.evaluate(() => [...document.querySelectorAll('input,textarea')].map(i=>i.value).filter(v=>/http/.test(v)));
return { url: m && m[0], vals };
