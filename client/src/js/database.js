import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    // Open the database
    const db = await initdb();
    // Add or update the content in the 'jate' object store
    await db.put('jate', { content });
    console.log('Content added to the database');
  } catch (error) {
    console.error('Failed to add content to the database:', error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    // Open the database
    const db = await initdb();
    // Get all records from the 'jate' object store
    const allRecords = await db.getAll('jate');
    console.log('Content retrieved from the database:', allRecords);
    return allRecords;
  } catch (error) {
    console.error('Failed to retrieve content from the database:', error);
    return [];
  }
};
initdb();
