from pathlib import Path
import json, zipfile

ROOT = Path(__file__).resolve().parents[2]
manifest = json.loads((ROOT / "module.json").read_text(encoding="utf-8"))
module_id = manifest["id"]
version = manifest["version"]
dist = ROOT / "dist"
dist.mkdir(exist_ok=True)

exclude_top = {"dist", ".git", ".github"}
files = [p for p in ROOT.rglob("*") if p.is_file() and not any(part in exclude_top for part in p.relative_to(ROOT).parts)]

for name in (f"{module_id}-{version}.zip", f"{module_id}.zip"):
    target = dist / name
    with zipfile.ZipFile(target, "w", zipfile.ZIP_DEFLATED) as zf:
        for p in files:
            zf.write(p, Path(module_id) / p.relative_to(ROOT))
    print(target)
