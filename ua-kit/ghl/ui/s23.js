const f = () => page.frames().find(f => f.url().includes('client-app-automation-workflows'));
return await f().evaluate(() => {
  const sel = document.querySelector('.hr-base-selection-input');
  let el = sel, out=[];
  for (let i=0;i<5;i++){ el=el.parentElement; out.push(el.tagName+'.'+String(el.className).slice(0,80)+' kids:'+el.children.length); }
  const row = el; 
  return {chain: out, html: row.outerHTML.replace(/<svg[\s\S]*?<\/svg>/g,'<svg/>').slice(0,1500)};
});
