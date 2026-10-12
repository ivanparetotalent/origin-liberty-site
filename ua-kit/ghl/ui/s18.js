await page.mouse.click(1318, 683); await page.waitForTimeout(1500);
const f = page.frames().find(f => f.url().includes('client-app-automation-workflows'));
return await f.evaluate(() => {
  const panel = [...document.querySelectorAll('*')].find(e => e.innerText && e.innerText.startsWith('ACTION NAME'));
  const root = document.querySelector('.n-drawer, [class*=drawer], [class*=sidebar-panel]') || document.body;
  return [...root.querySelectorAll('input, textarea, [contenteditable=true]')].map(e => ({tag:e.tagName, ce:e.getAttribute('contenteditable'), cls:(e.className||'').toString().slice(0,60), ph:e.placeholder||'', val:(e.value||e.innerText||'').slice(0,40)}));
});
