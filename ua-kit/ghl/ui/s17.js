await page.mouse.click(1381, 597); await page.waitForTimeout(1500);
const f = page.frames().find(f => f.url().includes('client-app-automation-workflows'));
return await f.evaluate(() => [...document.querySelectorAll('.n-dropdown-option, [role=menuitem], .n-popover')].map(e=>e.innerText.trim()).filter(Boolean).slice(0,10));
