"""Render emails.py into email-safe HTML (one file per email) plus
index.html, a single page that previews the whole sequence."""
import html, pathlib, sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from emails import EMAILS, SIGN  # noqa: E402

OUT = pathlib.Path(__file__).parent / "html"
OUT.mkdir(exist_ok=True)

OX, BONE, INK, MUTED, BRASS = "#591C2A", "#F5F0E8", "#1B1B1B", "#5A5A5A", "#A47148"
SERIF = "Georgia, 'Times New Roman', serif"
SANS = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"


def esc(s):  # keep GHL {{ }} merge tags intact
    return html.escape(s, quote=False)


def block(b):
    kind = b[0]
    if kind == "p":
        return f'<p style="margin:0 0 16px;font:16px/1.6 {SANS};color:{INK};">{esc(b[1])}</p>'
    if kind == "h":
        return f'<p style="margin:24px 0 8px;font:600 17px/1.4 {SANS};color:{INK};">{esc(b[1])}</p>'
    if kind == "ul":
        items = "".join(f'<li style="margin:0 0 6px;">{esc(i)}</li>' for i in b[1])
        return f'<ul style="margin:0 0 16px;padding-left:22px;font:16px/1.6 {SANS};color:{INK};">{items}</ul>'
    if kind == "quote":
        return f'<p style="margin:0 0 16px;padding-left:14px;border-left:3px solid {BRASS};font:italic 16px/1.6 {SERIF};color:{INK};">{esc(b[1])}</p>'
    if kind == "btn":
        return (
            f'<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 24px;"><tr>'
            f'<td style="background:{OX};border-radius:999px;"><a href="{b[2]}" '
            f'style="display:inline-block;padding:14px 28px;font:600 15px/1 {SANS};color:#ffffff;text-decoration:none;">'
            f"{esc(b[1])} &rarr;</a></td></tr></table>"
        )
    raise ValueError(kind)


def render(e):
    body = "".join(block(b) for b in e["body"])
    return f"""<!doctype html><html lang="uk"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{esc(e['subject'])}</title></head>
<body style="margin:0;padding:0;background:{BONE};">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">{esc(e['preview'])}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:{BONE};"><tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">
<tr><td style="padding:0 4px 18px;font:15px/1 {SERIF};color:{INK};">Origin Liberty <span style="color:{BRASS};">&middot; Україна</span></td></tr>
<tr><td style="background:#ffffff;border:1px solid #E5E0D8;border-radius:16px;padding:32px 28px;">
{body}
<p style="margin:24px 0 0;font:16px/1.6 {SANS};color:{INK};">{esc(SIGN)}</p>
</td></tr>
<tr><td style="padding:18px 4px 0;font:12px/1.6 {SANS};color:{MUTED};">
Даша · Origin Liberty Україна · Монтевідео, Уругвай<br>Практичний супровід переїзду, не юридична консультація.<br>
<a href="{{{{unsubscribe_link}}}}" style="color:{MUTED};">Відписатися</a>
</td></tr></table></td></tr></table></body></html>"""


cards = []
for i, e in enumerate(EMAILS):
    h = render(e)
    (OUT / f"{i:02d}-{e['key']}.html").write_text(h, encoding="utf-8")
    cards.append(
        f'<section class="card"><div class="meta"><span class="flow">{e["flow"]}</span> · {esc(e["when"])}</div>'
        f'<h2>{esc(e["subject"])}</h2><p class="pre">{esc(e["preview"])}</p>'
        f'<iframe srcdoc="{html.escape(h, quote=True)}" loading="lazy"></iframe></section>'
    )

flows = {"checklist": "Чек-лист", "efir": "Ефір", "consult": "Консультація", "package": "Супровід"}
index = f"""<!doctype html><html lang="uk"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Email sequences</title><style>
body{{margin:0;background:{BONE};font-family:{SANS};color:{INK}}} main{{max-width:760px;margin:0 auto;padding:32px 16px}}
h1{{font-family:{SERIF};font-weight:400;font-size:32px;margin:0 0 6px}} .lead{{color:{MUTED};margin:0 0 28px}}
.card{{background:#fff;border:1px solid #E5E0D8;border-radius:16px;padding:20px;margin:0 0 20px}}
.meta{{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:{BRASS};font-weight:600}}
.card h2{{font-size:19px;margin:8px 0 4px}} .pre{{color:{MUTED};margin:0 0 12px;font-size:14px}}
iframe{{width:100%;height:560px;border:1px solid #E5E0D8;border-radius:12px;background:{BONE}}}
</style></head><body><main><h1>Листи Даші: {len(EMAILS)} шт.</h1>
<p class="lead">Чек-лист (6), ефір (4), консультація (3), супровід (2). Поля в {{{{ }}}} GHL підставляє сам.</p>
{''.join(cards)}</main></body></html>"""
(OUT / "index.html").write_text(index, encoding="utf-8")
print(f"rendered {len(EMAILS)} emails -> {OUT}")
