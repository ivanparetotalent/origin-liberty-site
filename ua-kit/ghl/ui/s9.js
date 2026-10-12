await page.waitForTimeout(90000); const f = page.frames().find(f => f.url().includes("client-app-automation-workflows")); return (await f.evaluate(() => document.body.innerText)).slice(0,2500);
