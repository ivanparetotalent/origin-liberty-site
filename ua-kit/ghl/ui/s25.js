const f = () => page.frames().find(f => f.url().includes('client-app-automation-workflows'));
const eds = () => f().locator('.cv-tiptap-input__prosemirror');
const vals = {2:'family', 3:'business_500k', 4:'source'};
for (const [i, key] of Object.entries(vals)) {
  const e = eds().nth(Number(i)); await e.scrollIntoViewIfNeeded();
  const txt = await e.innerText();
  if (!txt.trim()) { await e.click(); await page.keyboard.type(`{{inboundWebhookRequest.${key}}}`); await page.waitForTimeout(300); }
}
const added = [];
for (const [label, key] of [['First Name','first_name'],['Email','email'],['Phone','phone']]) {
  await f().getByText('Add field', { exact: false }).last().click(); await page.waitForTimeout(900);
  // the new row's field selector is the last panel selection
  const sels = f().locator('.hr-base-selection');
  const last = sels.last(); await last.scrollIntoViewIfNeeded(); await last.click(); await page.waitForTimeout(500);
  await page.keyboard.type(label); await page.waitForTimeout(1200);
  const opt = f().locator('.hr-base-select-option, .n-base-select-option').filter({ hasText: new RegExp('^' + label + '$') }).first();
  if (await opt.count()) { await opt.click(); } else { await page.keyboard.press('Enter'); }
  await page.waitForTimeout(800);
  const e = eds().last(); await e.scrollIntoViewIfNeeded(); await e.click(); await page.keyboard.type(`{{inboundWebhookRequest.${key}}}`);
  await page.waitForTimeout(400);
  added.push(label);
}
const panel = await f().evaluate(() => { const t=document.body.innerText; const i=t.lastIndexOf('FIELDS'); return t.slice(i, i+900); });
return { added, panel };
