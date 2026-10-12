const f = () => page.frames().find(f => f.url().includes('client-app-automation-workflows'));
await f().getByRole('button', { name: 'Save action' }).click(); await page.waitForTimeout(7000);
const err = await f().evaluate(() => { const t=document.body.innerText; const i=t.indexOf('required'); return i>0 ? t.slice(i-80,i+60) : null; });
const hdr = JSON.parse(require('fs').readFileSync('hdr.json'));
const r = await ctx.request.get('https://backend.leadconnectorhq.com/workflow/bvVdY6uxwZibc7vKkknQ/7e15b85d-c61c-4e34-aca0-2c6da0a65afa', { headers: hdr });
const j = await r.json(); require('fs').writeFileSync('wf_checklist.json', JSON.stringify(j,null,1));
return { err, version: j.version, fields: j.workflowData.templates[0].attributes.fields.map(x => x.title + ' = ' + x.value) };
