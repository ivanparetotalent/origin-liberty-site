const f = () => page.frames().find(f => f.url().includes('client-app-automation-workflows'));
const fr = await (await f().frameElement()).boundingBox();
const done = [];
for (let k = 0; k < 3; k++) {
  const r = await f().evaluate(() => {
    const s = [...document.querySelectorAll('.hr-base-selection')].find(e => { const b=e.getBoundingClientRect(); return b.x > 880 && !e.closest('[class*=field-select]') && e.getBoundingClientRect().width < 470; });
    if (!s) return null; s.scrollIntoView({block:'center'}); const b = s.getBoundingClientRect(); return {x:b.right, y:b.y+b.height/2, w:b.width};
  });
  if (!r) break;
  done.push(r);
  await page.mouse.click(fr.x + r.x + 19, fr.y + r.y); await page.waitForTimeout(700);
  const d = f().getByText('Dynamic', { exact: true });
  if (!(await d.count())) { done.push('no dynamic menu'); break; }
  await d.last().click(); await page.waitForTimeout(700);
}
const n = await f().locator('.cv-tiptap-input__prosemirror').count();
return { done, editors: n };
