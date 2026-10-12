const f = () => page.frames().find(f => f.url().includes('client-app-automation-workflows'));
await page.mouse.click(420, 144).catch(()=>{}); await page.waitForTimeout(800);
const t = f().getByText('Publish', { exact: true }).last();
const sw = f().locator('[role=switch], .hr-switch, .n-switch').first();
await sw.click(); await page.waitForTimeout(4000);
const txt = await f().evaluate(() => document.body.innerText.slice(0, 400));
return txt;
