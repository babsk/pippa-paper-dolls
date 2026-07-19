#!/usr/bin/env python3

"""
Export Pippa SQLite database to a JSON file suitable for the web app.

Authoritative source:
    SQLite database

Output:
    gameData.json

Usage:
    python export_pippa.py pippaDB.db
"""

import json
import sqlite3
import sys
from pathlib import Path


# ------------------------------------------------------------
# Helper
# ------------------------------------------------------------

def rows_as_dict(cursor):
    """Return query results as dictionaries."""
    columns = [c[0] for c in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]


# ------------------------------------------------------------
# Main export
# ------------------------------------------------------------

def export_database(db_file, output_file):

    conn = sqlite3.connect(db_file)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    print("Opening:", Path(db_file).resolve())


    cur.execute("""
    SELECT name 
    FROM sqlite_master 
    WHERE type='table'
    ORDER BY name
    """)

    tables = cur.fetchall()

    print("Tables found:")
    for t in tables:
        print(" -", t[0])

    # --------------------------------------------------------
    # Read tables
    # --------------------------------------------------------

    cur.execute("SELECT * FROM Collections")
    collections = rows_as_dict(cur)

    cur.execute("SELECT * FROM Outfits")
    outfits = rows_as_dict(cur)

    cur.execute("SELECT * FROM Articles")
    articles = rows_as_dict(cur)

    cur.execute("SELECT * FROM Categories")
    categories = rows_as_dict(cur)

    cur.execute("SELECT * FROM OutfitDetails")
    outfit_details = rows_as_dict(cur)

    # --------------------------------------------------------
    # Build JSON structure
    # --------------------------------------------------------

    data = {
        "collections": {},
        "outfits": {},
        "articles": {},
        "categories": {}
    }

    # --------------------------------------------------------
    # Categories
    # --------------------------------------------------------

    for cat in categories:

        cat_id = str(cat["CategoryID"])

        data["categories"][cat_id] = {
            "id": cat["CategoryID"],
            "name": cat["Name"],
            "crop": {
                "x": cat["CropX"],
                "y": cat["CropY"],
                "width": cat["CropWidth"]
            },
            "articles": []
        }

    # --------------------------------------------------------
    # Collections
    # --------------------------------------------------------

    for c in collections:

        cid = str(c["CollectionID"])

        data["collections"][cid] = {
            "id": c["CollectionID"],
            "name": c["Name"],
            "year": c.get("Year"),
            "special": str(c.get("Special", "")).lower() == "true",
            "outfits": []
        }

    # --------------------------------------------------------
    # Outfits
    # --------------------------------------------------------

    for o in outfits:

        oid = str(o["OutfitID"])

        data["outfits"][oid] = {
            "id": o["OutfitID"],
            "name": o["Name"],
            "collection": o["CollectionID"],
            "description": o.get("Description"),
            "year": o.get("Year"),
            "free": bool(o.get("Free", 0)),
            "articles": []
        }

        collection_id = str(o["CollectionID"])

        if collection_id in data["collections"]:
            data["collections"][collection_id]["outfits"].append(
                o["OutfitID"]
            )

    # --------------------------------------------------------
    # Articles
    # --------------------------------------------------------

    for a in articles:

        aid = str(a["ArticleID"])

        data["articles"][aid] = {
            "id": a["ArticleID"],
            "name": a["Name"],
            "category": a["Type"],
            "background": a.get("Background"),
            "subtype": a.get("SubType"),
            "position": a.get("Position"),
            "outfits": []
        }

        category = str(a["Type"])

        if category in data["categories"]:
            data["categories"][category]["articles"].append(
                a["ArticleID"]
            )

    # --------------------------------------------------------
    # OutfitDetails relationships
    # --------------------------------------------------------

    for r in outfit_details:

        outfit = str(r["OutfitID"])
        article = r["ArticleID"]

        if outfit in data["outfits"]:

            data["outfits"][outfit]["articles"].append(article)

        article_key = str(article)

        if article_key in data["articles"]:

            data["articles"][article_key]["outfits"].append(
                r["OutfitID"]
            )

    # --------------------------------------------------------
    # Write JSON
    # --------------------------------------------------------

    with open(output_file, "w", encoding="utf-8") as f:

        json.dump(
            data,
            f,
            indent=2,
            ensure_ascii=False
        )

    conn.close()

    print(f"Exported to {output_file}")


# ------------------------------------------------------------
# Entry point
# ------------------------------------------------------------

if __name__ == "__main__":

    if len(sys.argv) != 2:
        print("Usage:")
        print("    python export_pippa.py pippaDB.db")
        sys.exit(1)

    db_file = Path(sys.argv[1])

    if not db_file.exists():
        print("Database not found.")
        sys.exit(1)

    output_file = db_file.with_name("gameData.json")

    export_database(db_file, output_file)