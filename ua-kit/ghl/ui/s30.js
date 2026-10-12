const f = () => page.frames().find(f => f.url().includes('client-app-automation-workflows'));
await page.mouse.click(1396, 147).catch(()=>{}); await page.waitForTimeout(800);
await page.mouse.click(32, 472); await page.waitForTimeout(2500);
const ta = f().locator('textarea').last();
await ta.fill(`Change only these settings, keep the templates and everything else exactly as is:
Set the email SUBJECT of each email action to:
- "UA 00 ..." action: Ваш чек-лист переїзду в Уругвай
- "UA 01 ..." action: Як нас занесло в Латинську Америку
- "UA 02 ..." action: $7 900 чи $2 000?
- "UA 03 ..." action: 4 помилки, які коштують місяців
- "UA 04 ..." action: Запрошую на ефір (і про консультацію)
- "UA 05 ..." action: Останнє на сьогодні від мене
Set the internal notification "Notify Ivan: premium UA lead" subject to "Premium UA lead: {{contact.first_name}}" and body to:
Premium lead from Dasha's Ukrainian funnel. Name: {{contact.first_name}}. Email: {{contact.email}}. Phone: {{contact.phone}}. Country: {{contact.country_now}}. Timeline: {{contact.move_timeline}}. Family: {{contact.family}}.`);
await ta.press('Enter');
await page.waitForTimeout(90000);
const hdr = JSON.parse(require('fs').readFileSync('hdr.json'));
const r = await ctx.request.get('https://backend.leadconnectorhq.com/workflow/bvVdY6uxwZibc7vKkknQ/7e15b85d-c61c-4e34-aca0-2c6da0a65afa', { headers: hdr });
const j = await r.json(); require('fs').writeFileSync('wf_checklist.json', JSON.stringify(j,null,1));
return j.workflowData.templates.filter(t => ['email','internal_notification'].includes(t.type)).map(t => t.type==='email' ? t.attributes.subject + ' [' + t.attributes.template_id + ']' : JSON.stringify(t.attributes.email));
