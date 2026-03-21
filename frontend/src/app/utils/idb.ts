import { openDB, DBSchema, IDBPDatabase } from 'idb';

export interface ScoreData {
  id?: number;
  userId: string;
  date: string;
  score: number;
  timeTaken: number;
  streak: number;
  hintsUsed: number;
  hintsRemaining: number;
  isSynced: number; // 0 for false, 1 for true
}

interface LogicLooperDB extends DBSchema {
  scores: {
    key: number;
    value: ScoreData;
    indexes: { 'by-date': string; 'by-sync': number };
  };
}

let dbPromise: Promise<IDBPDatabase<LogicLooperDB>> | null = null;

const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB<LogicLooperDB>('logic-looper-db', 1, {
      upgrade(db) {
        const store = db.createObjectStore('scores', {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('by-date', 'date', { unique: true });
        store.createIndex('by-sync', 'isSynced');
      },
    });
  }
  return dbPromise;
};

export const saveScoreLocally = async (data: Omit<ScoreData, 'id' | 'isSynced'>) => {
  const db = await getDB();
  const existing = await db.getFromIndex('scores', 'by-date', data.date);
  
  if (existing) {
    await db.put('scores', { ...existing, ...data, isSynced: 0 });
  } else {
    await db.add('scores', { ...data, isSynced: 0 });
  }
};

export const getUnsyncedScores = async () => {
  const db = await getDB();
  return db.getAllFromIndex('scores', 'by-sync', 0);
};

export const markScoreAsSynced = async (id: number) => {
  const db = await getDB();
  const score = await db.get('scores', id);
  if (score) {
    await db.put('scores', { ...score, isSynced: 1 });
  }
};
