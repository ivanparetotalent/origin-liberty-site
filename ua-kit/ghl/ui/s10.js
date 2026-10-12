const f = () => page.frames().find(f => f.url().includes('client-app-automation-workflows'));
await f().getByText('Inbound Webhook', { exact: false }).first().click();
await page.waitForTimeout(4000);
const txt = await f().evaluate(() => document.body.innerText);
const m = txt.match(/https:\/\/services\.leadconnectorhq\.com\/hooks\/[^\s]+/);
const inputs = await f().evaluate(() => [...document.querySelectorAll('input')].map(i=>i.value).filter(v=>v.includes('hooks')));
return { url: m && m[0], inputs };
