const f = () => page.frames().find(f => f.url().includes('client-app-automation-workflows'));
await f().getByRole('button', { name: 'Save trigger' }).click(); await page.waitForTimeout(3000);
// open AI panel
await page.mouse.click(32, 472); await page.waitForTimeout(2500);
const ta = f().locator('textarea').last();
await ta.fill(`In the "Create/Update contact from webhook" action, map these fields from the inbound webhook payload (the reference payload is now selected on the trigger):
First Name = first_name
Email = email
Phone = phone
custom field "Country now" = country_now
custom field "Move timeline" = move_timeline
custom field "Family" = family
custom field "Business 500k" = business_500k
custom field "Lead source page" = source
Also change the If/Else condition to use the contact custom field "Business 500k" equals "Так", if that is more reliable.`);
await ta.press('Enter');
await page.waitForTimeout(100000);
const txt = await f().evaluate(() => document.body.innerText);
return txt.slice(-1800);
