globalThis.__log = [];
const f = page.frames().find(f => f.url().includes('client-app-automation-workflows'));
await f.getByRole('button', { name: 'Create workflow' }).first().click();
await page.waitForTimeout(3000);
const f2 = page.frames().find(f => f.url().includes('client-app-automation-workflows'));
return await f2.evaluate(() => [...document.querySelectorAll('button, [role=menuitem], .n-dropdown-option, li')].map(e=>e.innerText.trim()).filter(t=>t && t.length<60).slice(0,40));
