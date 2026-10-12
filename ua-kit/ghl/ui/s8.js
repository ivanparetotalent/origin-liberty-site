const log=[];
ctx.on('request', r => { const u=r.url(); if (/\/workflow\//.test(u) && ['PUT','POST','PATCH'].includes(r.method())) log.push({m:r.method(), u:u.split('?')[0], body:(r.postData()||'')}); });
const f = () => page.frames().find(f => f.url().includes('client-app-automation-workflows'));
const prompt = `Build this exact workflow, named "UA · Checklist opt-in":
Trigger: Inbound Webhook.
1. Create/Update contact from the webhook data: first_name, email, phone.
2. Add tags: ua-lead, ua-checklist.
3. Send email using template "UA 00 · Ваш чек-лист переїзду в Уругвай".
4. If/else: webhook field business_500k equals "Так" -> add tag ua-premium and send internal notification email to ivan@ivanbunin.com "Premium UA lead". Otherwise continue.
5. Wait 1 day, send email template "UA 01 · Як нас занесло в Латинську Америку".
6. Wait 2 days, send email template "UA 02 · $7 900 чи $2 000?".
7. Wait 2 days, send email template "UA 03 · 4 помилки, які коштують місяців".
8. Wait 2 days, send email template "UA 04 · Запрошую на ефір (і про консультацію)".
9. Wait 3 days, send email template "UA 05 · Останнє на сьогодні від мене".`;
const ta = f().locator('textarea').first();
await ta.fill(prompt);
await ta.press('Enter');
await page.waitForTimeout(60000);
require('fs').writeFileSync('cap2.json', JSON.stringify(log,null,1));
return log.map(x=>x.m+' '+x.u+' '+x.body.length);
