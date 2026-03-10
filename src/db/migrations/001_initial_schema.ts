import { Database } from 'better-sqlite3';
import { CREATE_COUNTER_TABLE, CREATE_COUNTER_INDEXES } from '../schema';

export const migrationId = '001_initial_schema';
export const timestamp = '2023-11-15T00:00:00Z';

export function up(db: Database) {
  db.exec('BEGIN TRANSACTION;');
  try {
    db.exec(CREATE_COUNTER_TABLE);
    db.exec(CREATE_COUNTER_INDEXES);

    // Insert initial counter if not exists
    const row = db.prepare('SELECT COUNT(*) as count FROM counter').get();
    if (row.count === 0) {
      db.prepare('INSERT INTO counter (value, isActive) VALUES (?, ?)')
        .run(0, 1);
    }

    db.exec('COMMIT;');
    console.log('Migration 001_initial_schema applied successfully');
  } catch (err) {
    db.exec('ROLLBACK;');
    console.error('Migration 001_initial_schema failed:', err);
    throw err;
  }
}

export function down(db: Database) {
  db.exec('BEGIN TRANSACTION;');
  try {
    db.exec('DROP TABLE IF EXISTS counter');
    db.exec('COMMIT;');
    console.log('Migration 001_initial_schema rolled back successfully');
  } catch (err) {
    db.exec('ROLLBACK;');
    console.error('Rollback of 001_initial_schema failed:', err);
    throw err;
  }
}