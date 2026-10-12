const f = () => page.frames().find(f => f.url().includes('client-app-automation-workflows'));
await page.keyboard.press('Escape'); await page.waitForTimeout(500);
await page.mouse.click(1150, 632); await page.waitForTimeout(1000);
await page.keyboard.type('First Name'); await page.waitForTimeout(1500);
return await f().evaluate(() => [...document.querySelectorAll('[class*=select-option], [role=option]')].filter(e=>e.getBoundingClientRect().width>0).map(e=>e.innerText.trim()).slice(0,12));
