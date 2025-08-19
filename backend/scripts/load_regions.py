import json
from pathlib import Path
from sqlalchemy.orm import Session

from backend.app.database import SessionLocal
from backend.app.models import Region


def load_regions(db: Session, path: Path):
    data = json.loads(path.read_text(encoding="utf-8"))
    for item in data:
        exists = db.query(Region).filter(Region.name == item["name"]).one_or_none()
        if exists:
            continue
        region = Region(name=item["name"], state=item.get("state"))
        db.add(region)
    db.commit()


if __name__ == "__main__":
    db = SessionLocal()
    try:
        load_regions(db, Path(__file__).parent.parent / "data" / "regions.json")
        print("Regions loaded.")
    finally:
        db.close()




