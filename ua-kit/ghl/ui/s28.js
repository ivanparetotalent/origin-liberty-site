const f = () => page.frames().find(f => f.url().includes('client-app-automation-workflows'));
const res = [];
for (const [label, key] of [['Email','email'],['Phone','phone']]) {
  await f().getByText('Add field').last().click(); await page.waitForTimeout(1000);
  const ph = f().getByText('Select field', { exact: true }).last(); await ph.scrollIntoViewIfNeeded(); await ph.click(); await page.waitForTimeout(800);
  await page.keyboard.type(label); await page.waitForTimeout(1500);
  const opts = f().getByText(label, { exact: true });
  const n = await opts.count(); let clicked=false;
  for (let i = n-1; i >= 0; i--) { const o = opts.nth(i); const bb = await o.boundingBox(); if (bb && bb.y > 0) { const tag = await o.evaluate(e => e.closest('input') ? 'input' : e.tagName); if (tag !== 'input') { await o.click(); clicked=true; break; } } }
  await page.waitForTimeout(900);
  const e = f().locator('.cv-tiptap-input__prosemirror').last(); await e.scrollIntoViewIfNeeded(); await e.click();
  await page.keyboard.type(`{{inboundWebhookRequest.${key}}}`); await page.waitForTimeout(600);
  res.push([label, clicked]);
}
return res;
