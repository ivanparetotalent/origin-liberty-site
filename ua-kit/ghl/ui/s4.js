const f = page.frames().find(f => f.url().includes('client-app-automation-workflows'));
if (!f) return page.frames().map(x=>x.url().slice(0,100));
const btns = await f.$$eval('button', bs => bs.map(b => b.innerText.trim()).filter(Boolean).slice(0,30));
return btns;
