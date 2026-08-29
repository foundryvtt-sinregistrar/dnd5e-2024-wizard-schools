from pathlib import Path
import json, zipfile

ROOT = Path(__file__).resolve().parents[2]
manifest = json.loads((ROOT / "module.json").read_text(encoding="utf-8"))
module_id = manifest["id"]
version = manifest["version"]
dist = ROOT / "dist"
dist.mkdir(exist_ok=True)

exclude_parts = {"dist", ".git", ".github", ".idea", ".vscode", "__pycache__"}
exclude_files = {"staged.txt"}
files = [
    p for p in ROOT.rglob("*")
    if p.is_file()
    and p.name not in exclude_files
    and not any(part in exclude_parts for part in p.relative_to(ROOT).parts)
]

for name in (f"{module_id}-{version}.zip", f"{module_id}.zip"):
    target = dist / name
    with zipfile.ZipFile(target, "w", zipfile.ZIP_DEFLATED) as zf:
        for p in files:
            zf.write(p, Path(module_id) / p.relative_to(ROOT))
    print(target)
