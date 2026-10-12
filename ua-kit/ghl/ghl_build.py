"""Build Dasha's funnel in the Origin Liberty GHL location via API.
Idempotent: looks things up by name before creating.

Creds come from the macOS keychain:
  ghl-pit-originliberty       private integration token
  ghl-location-originliberty  location id

Usage: python3 ghl_build.py [check|tags|fields|values|emails|all]
"""
import json, pathlib, subprocess, sys, urllib.request, urllib.error

HERE = pathlib.Path(__file__).parent
sys.path.insert(0, str(HERE.parent / "emails"))
from emails import EMAILS  # noqa: E402

API = "https://services.leadconnectorhq.com"


def kc(service):
    return subprocess.run(["security", "find-generic-password", "-a", "ivan", "-s", service, "-w"],
                          capture_output=True, text=True, check=True).stdout.strip()


TOKEN, LOC = kc("ghl-pit-originliberty"), kc("ghl-location-originliberty")


def call(method, path, body=None, version="2021-07-28"):
    req = urllib.request.Request(API + path, method=method,
                                 data=json.dumps(body).encode() if body is not None else None,
                                 headers={"Authorization": f"Bearer {TOKEN}", "Version": version,
                                          "Content-Type": "application/json", "Accept": "application/json"})
    try:
        with urllib.request.urlopen(req) as r:
            raw = r.read()
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        raise SystemExit(f"{method} {path} -> {e.code}: {e.read().decode()[:500]}")


TAGS = ["ua-lead", "ua-checklist", "ua-efir", "ua-efir-attended", "ua-consult-booked",
        "ua-client", "ua-premium", "ua-not-now", "ua-source-dasha", "ua-source-ol"]

FIELDS = [  # name, dataType, options
    ("Country now", "TEXT", None),
    ("Move timeline", "SINGLE_OPTIONS", ["Протягом 3 місяців", "Через 3–6 місяців", "Через 6–12 місяців", "Поки просто вивчаю"]),
    ("Family", "SINGLE_OPTIONS", ["Я сам(а)", "Пара", "Сім’я з дітьми"]),
    ("Business 500k", "SINGLE_OPTIONS", ["Так", "Ні"]),
    ("Lead source page", "TEXT", None),
]

VALUES = {
    "ua_checklist_link": "https://originliberty.com/ua/uruguay-checklist.pdf",
    "ua_efir_link": "https://originliberty.com/ua/efir",
    "ua_efir_date": "четвер, 29 жовтня, 19:00 за Києвом (14:00 в Монтевідео)",
    "ua_efir_zoom": "https://zoom.us/  (Dasha's meeting link goes here)",
    "ua_efir_replay": "https://originliberty.com/ua/efir",
    "ua_consult_link": "https://originliberty.com/ua#book",
}


def check():
    loc = call("GET", f"/locations/{LOC}").get("location", {})
    print("location:", loc.get("name"), "|", loc.get("timezone"), "|", loc.get("email"))


def tags():
    have = {t["name"] for t in call("GET", f"/locations/{LOC}/tags").get("tags", [])}
    for t in TAGS:
        if t not in have:
            call("POST", f"/locations/{LOC}/tags", {"name": t}); print("tag +", t)
    print("tags ok")


def fields():
    have = {f["name"] for f in call("GET", f"/locations/{LOC}/customFields").get("customFields", [])}
    for name, dtype, opts in FIELDS:
        if name in have:
            continue
        body = {"name": name, "dataType": dtype, "model": "contact"}
        if opts:
            body["options"] = opts
        call("POST", f"/locations/{LOC}/customFields", body); print("field +", name)
    print("fields ok")


def values():
    have = {v["name"]: v for v in call("GET", f"/locations/{LOC}/customValues").get("customValues", [])}
    for name, val in VALUES.items():
        if name in have:
            continue  # never overwrite: Dasha may have edited it
        call("POST", f"/locations/{LOC}/customValues", {"name": name, "value": val}); print("value +", name)
    print("values ok")


def emails():
    html_dir = HERE.parent / "emails" / "html"
    existing = call("GET", f"/emails/builder?locationId={LOC}&limit=100").get("builders", [])
    by_name = {b.get("name") or b.get("title"): b for b in existing}
    for i, e in enumerate(EMAILS):
        title = f"UA {i:02d} · {e['subject']}"
        html = (html_dir / f"{i:02d}-{e['key']}.html").read_text(encoding="utf-8")
        tpl = by_name.get(title)
        if not tpl:
            tpl = call("POST", "/emails/builder", {"locationId": LOC, "title": title, "name": title, "type": "html"})
            print("email +", title)
        tid = tpl.get("id") or tpl.get("templateId") or tpl.get("_id")
        call("POST", "/emails/builder/data", {"locationId": LOC, "templateId": tid, "updatedBy": "claude",
                                              "html": html, "editorType": "html", "previewText": e["preview"],
                                              "dnd": {"elements": [], "attrs": {}, "templateSettings": {}}})
    print("emails ok")


STEPS = {"check": check, "tags": tags, "fields": fields, "values": values, "emails": emails}

if __name__ == "__main__":
    arg = sys.argv[1] if len(sys.argv) > 1 else "check"
    for name in (STEPS if arg == "all" else [arg]):
        STEPS[name]()
