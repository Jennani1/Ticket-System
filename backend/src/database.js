const Database = require("better-sqlite3");

const db = new Database("tickets.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    created_at TEXT NOT NULL,
    used INTEGER DEFAULT 0,
    used_at TEXT
  )
`).run();

module.exports = db;