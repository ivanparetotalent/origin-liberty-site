const f = () => page.frames().find(f => f.url().includes('client-app-automation-workflows'));
await page.mouse.click(420, 144); await page.waitForTimeout(1500); // close AI panel
await f().getByText('Create/Update contact from webhook').last().click(); await page.waitForTimeout(3500);
const txt = await f().evaluate(() => document.body.innerText);
const i = txt.indexOf('Create/Update contact');
return txt.slice(txt.lastIndexOf('ACTION NAME')-200, txt.lastIndexOf('ACTION NAME')+1500);
