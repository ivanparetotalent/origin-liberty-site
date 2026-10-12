const reqs=[];
ctx.on('request', r => { const u=r.url(); if (/leadconnectorhq|msgsndr|gohighlevel/.test(u) && /workflow/i.test(u)) reqs.push({m:r.method(), u:u.slice(0,160), h:Object.keys(r.headers()).filter(k=>/token|auth|version|channel|source/i.test(k))}); });
await page.reload({waitUntil:'domcontentloaded'}); await page.waitForTimeout(15000);
return reqs.slice(0,25);
