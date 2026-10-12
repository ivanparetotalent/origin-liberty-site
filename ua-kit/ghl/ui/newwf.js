// creates a new workflow from scratch and sends PROMPT (from prompt.txt) to GHL AI
const fs = require('fs'); const PROMPT = fs.readFileSync('prompt.txt','utf8');
await page.goto('https://app.gohighlevel.com/v2/location/bvVdY6uxwZibc7vKkknQ/automation/workflows', {waitUntil:'domcontentloaded'});
const f = () => page.frames().find(f => f.url().includes('client-app-automation-workflows'));
for (let i=0;i<30 && !(f() && await f().getByRole('button', { name: 'Create workflow' }).count());i++) await page.waitForTimeout(1000);
await f().getByRole('button', { name: 'Create workflow' }).first().click(); await page.waitForTimeout(1500);
await f().getByText('Start from Scratch', { exact: true }).last().click({ force: true }); await page.waitForTimeout(9000);
const ab = f().getByRole('button', { name: 'Enable auto save now' }); if (await ab.count()) { await ab.click(); await page.waitForTimeout(1500); }
const ta = f().locator('textarea').first(); await ta.fill(PROMPT); await ta.press('Enter');
await page.waitForTimeout(150000);
const url = page.url(); const id = url.split('/workflow/')[1];
const hdr = JSON.parse(fs.readFileSync('hdr.json'));
const r = await ctx.request.get(`https://backend.leadconnectorhq.com/workflow/bvVdY6uxwZibc7vKkknQ/${id}`, { headers: hdr });
const j = await r.json(); fs.writeFileSync(`wf_${id}.json`, JSON.stringify(j,null,1));
return { id, name: j.name, steps: (j.workflowData?.templates||[]).map(t => t.type + ': ' + t.name + (t.attributes?.subject ? ' | ' + t.attributes.subject : '')) };
