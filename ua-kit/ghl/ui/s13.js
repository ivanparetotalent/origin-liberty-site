const f = page.frames().find(f => f.url().includes('client-app-automation-workflows'));
await f.getByText('Fetch sample requests').click(); await page.waitForTimeout(5000);
const txt = await f.evaluate(() => document.body.innerText);
return txt.slice(txt.indexOf('MAPPING REFERENCE'), txt.indexOf('MAPPING REFERENCE')+800);
