const reqs=[];
ctx.on('request', r => { const u=r.url(); if (/backend\.leadconnectorhq\.com|services\.leadconnectorhq/.test(u)) reqs.push(r.method()+' '+u.split('?')[0]); });
await page.reload({waitUntil:'domcontentloaded'}); await page.waitForTimeout(15000);
return [...new Set(reqs)];
