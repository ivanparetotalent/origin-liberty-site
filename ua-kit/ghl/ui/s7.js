const f = () => page.frames().find(f => f.url().includes('client-app-automation-workflows'));
await f().getByRole('button', { name: 'Enable auto save now' }).click();
await page.waitForTimeout(2000);
return await f().evaluate(() => [...document.querySelectorAll('textarea, [contenteditable=true]')].map(e => e.tagName + ' ' + (e.placeholder || e.getAttribute('aria-label') || '')));
