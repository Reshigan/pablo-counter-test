import Database from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';

interface Migration {
  migrationId: string;
  timestamp: string;
  up: (db: Database.Database) => void;
  down: (db: Database.Database) => void;
}

export async function runMigrations(dbPath: string = './data/counter.db') {
  const db = new Database(dbPath);

  // Create migrations table if not exists
  db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
      id TEXT PRIMARY KEY,
      timestamp TEXT NOT NULL,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Get already applied migrations
  const applied = db.prepare('SELECT id FROM migrations').all()
    .map(row => row.id);

  // Load all migration files
  const migrationsDir = path.join(__dirname, 'migrations');
  const migrationFiles = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.ts') || file.endsWith('.js'))
    .sort();

  for (const file of migrationFiles) {
    const migrationId = file.split('_')[0];
    if (applied.includes(migrationId)) {
      continue;
    }

    const migration: Migration = await import(path.join(migrationsDir, file));
    console.log(`Applying migration ${migration.migrationId}...`);
    migration.up(db);

    // Record migration
    db.prepare('INSERT INTO migrations (id, timestamp) VALUES (?, ?)')
      .run(migration.migrationId, migration.timestamp);
  }

  db.close();
}

if (require.main === module) {
  runMigrations().catch(console.error);
}