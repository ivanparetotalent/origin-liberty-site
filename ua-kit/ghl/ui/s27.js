const f = () => page.frames().find(f => f.url().includes('client-app-automation-workflows'));
await page.mouse.click(965, 771); await page.waitForTimeout(1200);
const e = f().locator('.cv-tiptap-input__prosemirror').last(); await e.scrollIntoViewIfNeeded(); await e.click();
await page.keyboard.type('{{inboundWebhookRequest.first_name}}'); await page.waitForTimeout(600);
return await f().locator('.cv-tiptap-input__prosemirror').count();
