import sys, pathlib
from playwright.sync_api import sync_playwright
here = pathlib.Path(__file__).parent.resolve()
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page()
    pg.goto((here/'checklist.html').as_uri(), wait_until='networkidle')
    pg.wait_for_timeout(800)
    pg.pdf(path=str(here/'checklist-uruguay.pdf'), format='A4', print_background=True, prefer_css_page_size=True)
    pg.set_viewport_size({'width': 794, 'height': 1123})
    for i, el in enumerate(pg.query_selector_all('section.page')):
        el.screenshot(path=str(here/f'page-{i+1}.png'))
    b.close()
