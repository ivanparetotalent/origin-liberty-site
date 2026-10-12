const f = page.frames().find(f => f.url().includes('client-app-automation-workflows'));
await f.getByText('Select reference payload').click(); await page.waitForTimeout(2000);
const opts = await f.evaluate(() => [...document.querySelectorAll('.n-base-select-option, [role=option]')].map(e=>e.innerText.trim()));
if (opts.length) { await f.locator('.n-base-select-option, [role=option]').first().click(); await page.waitForTimeout(2000); }
const txt = await f.evaluate(() => document.body.innerText);
return { opts, after: txt.slice(txt.indexOf('MAPPING REFERENCE'), txt.indexOf('MAPPING REFERENCE')+900) };
