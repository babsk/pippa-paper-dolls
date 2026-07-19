import sqlite3
from pathlib import Path

db = Path("pippaDB.db")

print("File:", db.resolve())
print("Size:", db.stat().st_size, "bytes")

conn = sqlite3.connect(db)
cur = conn.cursor()

print("\nSQLite version:")
cur.execute("SELECT sqlite_version()")
print(cur.fetchone()[0])

print("\nTables:")
cur.execute("""
    SELECT type, name
    FROM sqlite_master
    ORDER BY type, name
""")

rows = cur.fetchall()

if rows:
    for row in rows:
        print(row)
else:
    print("(no tables found)")

conn.close()