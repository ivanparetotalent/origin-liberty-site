const log=[];
ctx.on('request', r => { const u=r.url(); if (/\/workflow\//.test(u) && r.method()!=='GET') log.push({m:r.method(), u:u.split('?')[0], body:(r.postData()||'').slice(0,1500)}); });
ctx.on('response', async r => { const u=r.url(); if (/\/workflow\/bvVdY6uxwZibc7vKkknQ$|\/workflow\/bvVdY6uxwZibc7vKkknQ\/[a-f0-9-]{20,}/.test(u.split('?')[0]) && r.request().method()!=='GET') { try { log.push({resp:u.split('?')[0], status:r.status(), body:(await r.text()).slice(0,800)}); } catch{} } });
const f = page.frames().find(f => f.url().includes('client-app-automation-workflows'));
await f.getByText('Start from Scratch').click();
await page.waitForTimeout(8000);
require('fs').writeFileSync('cap1.json', JSON.stringify(log,null,1));
return log.map(x=> (x.m||'RESP')+' '+(x.u||x.resp));
