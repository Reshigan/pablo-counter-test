// Database schema definitions for SQLite
export interface Counter {
  id: number;
  value: number;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  isActive: boolean;
}

// Table creation SQL
export const CREATE_COUNTER_TABLE = `
  CREATE TABLE IF NOT EXISTS counter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    value INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
    isActive BOOLEAN NOT NULL DEFAULT 1
  )
`;

// Indexes
export const CREATE_COUNTER_INDEXES = `
  CREATE INDEX IF NOT EXISTS idx_counter_createdAt ON counter(createdAt);
  CREATE INDEX IF NOT EXISTS idx_counter_updatedAt ON counter(updatedAt);
  CREATE INDEX IF NOT EXISTS idx_counter_isActive ON counter(isActive);
`;