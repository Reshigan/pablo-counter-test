import Database from 'better-sqlite3';
import { Counter, CREATE_COUNTER_TABLE, CREATE_COUNTER_INDEXES } from './schema';

let db: Database.Database;

export function initDb() {
  db = new Database(process.env.DB_PATH || './data/counter.db');

  // Initialize schema
  db.exec(CREATE_COUNTER_TABLE);
  db.exec(CREATE_COUNTER_INDEXES);

  // Ensure we have at least one counter record
  const row = db.prepare('SELECT COUNT(*) as count FROM counter').get();
  if (row.count === 0) {
    db.prepare('INSERT INTO counter (value, isActive) VALUES (?, ?)')
      .run(0, 1);
  }

  return db;
}

export function getDb() {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
}

export const CounterModel = {
  get: (): Counter => {
    const db = getDb();
    const row = db.prepare('SELECT * FROM counter WHERE isActive = 1 LIMIT 1').get() as Counter;
    if (!row) {
      throw new Error('No active counter found');
    }
    return row;
  },

  increment: (): Counter => {
    const db = getDb();
    try {
      db.exec('BEGIN TRANSACTION');
      const counter = CounterModel.get();
      const updatedAt = new Date().toISOString();

      db.prepare(`
        UPDATE counter
        SET value = value + 1, updatedAt = ?
        WHERE id = ?
      `).run(updatedAt, counter.id);

      const updatedCounter = db.prepare('SELECT * FROM counter WHERE id = ?').get(counter.id) as Counter;
      db.exec('COMMIT');
      return updatedCounter;
    } catch (error) {
      db.exec('ROLLBACK');
      throw error;
    }
  },

  decrement: (): Counter => {
    const db = getDb();
    try {
      db.exec('BEGIN TRANSACTION');
      const counter = CounterModel.get();
      const updatedAt = new Date().toISOString();

      db.prepare(`
        UPDATE counter
        SET value = value - 1, updatedAt = ?
        WHERE id = ?
      `).run(updatedAt, counter.id);

      const updatedCounter = db.prepare('SELECT * FROM counter WHERE id = ?').get(counter.id) as Counter;
      db.exec('COMMIT');
      return updatedCounter;
    } catch (error) {
      db.exec('ROLLBACK');
      throw error;
    }
  }
};