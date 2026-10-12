const f = () => page.frames().find(f => f.url().includes('client-app-automation-workflows'));
await page.mouse.click(420, 144).catch(()=>{}); await page.waitForTimeout(1000);
await f().getByText('Inbound Webhook', { exact: true }).first().click(); await page.waitForTimeout(3500);
const url = await f().evaluate(() => [...document.querySelectorAll('input')].map(i=>i.value).find(v=>v.includes('/hooks/')));
require('fs').writeFileSync('efir_hook.txt', url || '');
return url;
