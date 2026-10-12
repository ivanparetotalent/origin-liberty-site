const f = () => page.frames().find(f => f.url().includes('client-app-automation-workflows'));
const fr = await (await f().frameElement()).boundingBox();
for (let k = 0; k < 4; k++) {
  const rect = await f().evaluate(() => {
    const sel = document.querySelector('.hr-base-selection-input'); if (!sel) return null;
    let el = sel; for (let i=0;i<6 && el;i++) { el = el.parentElement; const b = el && [...el.querySelectorAll('button, [role=button], svg')].find(x => x.closest('.hr-base-selection') === null && x.getBoundingClientRect().width>8); if (b) { b.scrollIntoView({block:'center'}); const r=b.getBoundingClientRect(); return {x:r.x+r.width/2, y:r.y+r.height/2}; } }
    return null; });
  if (!rect) break;
  await page.mouse.click(fr.x + rect.x, fr.y + rect.y); await page.waitForTimeout(800);
  const dyn = f().getByText('Dynamic', { exact: true });
  if (await dyn.count()) { await dyn.last().click(); await page.waitForTimeout(800); } else break;
}
return await f().evaluate(() => document.querySelectorAll('.cv-tiptap-input__prosemirror').length + ' editors, ' + document.querySelectorAll('.hr-base-selection-input').length + ' selects');
