const f = () => page.frames().find(f => f.url().includes('client-app-automation-workflows'));
await f().getByText('Fetch sample requests').click(); await page.waitForTimeout(5000);
await f().getByText('Select reference payload').click(); await page.waitForTimeout(1500);
await f().locator('.n-base-select-option, [role=option]').first().click(); await page.waitForTimeout(1500);
await f().getByRole('button', { name: 'Save trigger' }).click(); await page.waitForTimeout(3000);
// open the create/update action
await f().getByText('Create/Update contact from webhook data').last().click(); await page.waitForTimeout(3000);
const eds = () => f().locator('.cv-tiptap-input__prosemirror');
const out=[];
for (const [label, key] of [['First Name','first_name'],['Email','email'],['Phone','phone'],['Lead source page','source']]) {
  await f().getByText('Add field').last().click(); await page.waitForTimeout(1000);
  const ph = f().getByText('Select field', { exact: true }).last(); await ph.scrollIntoViewIfNeeded(); await ph.click(); await page.waitForTimeout(800);
  await page.keyboard.type(label); await page.waitForTimeout(1500);
  const opts = f().getByText(new RegExp('^' + label + '$', 'i')); const n = await opts.count(); let ok=false;
  for (let i=n-1;i>=0;i--){ const o=opts.nth(i); const bb=await o.boundingBox(); if (bb) { await o.click(); ok=true; break; } }
  await page.waitForTimeout(900);
  const e = eds().last(); await e.scrollIntoViewIfNeeded(); await e.click(); await page.keyboard.type(`{{inboundWebhookRequest.${key}}}`); await page.waitForTimeout(500);
  out.push([label, ok]);
}
await f().getByRole('button', { name: 'Save action' }).click(); await page.waitForTimeout(6000);
const hdr = JSON.parse(require('fs').readFileSync('hdr.json'));
const r = await ctx.request.get('https://backend.leadconnectorhq.com/workflow/bvVdY6uxwZibc7vKkknQ/57a9db92-7f48-4756-9cbd-d0e5156226ad', { headers: hdr });
const j = await r.json();
return { out, fields: j.workflowData.templates[0].attributes.fields.map(x => x.title + ' = ' + x.value) };
