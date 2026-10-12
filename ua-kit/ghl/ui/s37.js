const hdr = JSON.parse(require('fs').readFileSync('hdr.json'));
const r = await ctx.request.get('https://backend.leadconnectorhq.com/workflow/bvVdY6uxwZibc7vKkknQ/808a30ac-0427-4e09-9010-1a84aa6aa11d/triggers', { headers: hdr });
return { s: r.status(), t: (await r.text()).slice(0,800) };
