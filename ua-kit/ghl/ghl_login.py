"""One-time GHL login for UI automation (workflows, forms, pipeline).

Opens a visible Chromium window with a dedicated profile. Ivan signs in
himself (password + 2FA). The session is saved to the profile, and later
headless runs reuse it. Claude never sees or types the password.
"""
import pathlib
from playwright.sync_api import sync_playwright

PROFILE = pathlib.Path.home() / ".config" / "ghl-ol" / "browser-profile"
PROFILE.mkdir(parents=True, exist_ok=True)

with sync_playwright() as p:
    ctx = p.chromium.launch_persistent_context(str(PROFILE), headless=False, viewport={"width": 1440, "height": 900})
    page = ctx.pages[0] if ctx.pages else ctx.new_page()
    page.goto("https://app.gohighlevel.com/")
    print("Sign in to GoHighLevel in the window that opened, and open the Origin Liberty location.")
    print("This window closes by itself once the location dashboard loads (up to 10 minutes).")
    page.wait_for_url("**/location/**", timeout=600_000)
    page.wait_for_timeout(3000)
    print("Saved session. You can close this terminal.")
    ctx.close()
