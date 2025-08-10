import SQLite from 'react-native-sqlite-storage';

// Enable promise for SQLite
SQLite.enablePromise(true);

const DATABASE_NAME = 'NotesDB.db';
const DATABASE_VERSION = '1.0';
const DATABASE_DISPLAYNAME = 'Notes Database';
const DATABASE_SIZE = 200000;

class DatabaseManager {
  constructor() {
    this.database = null;
  }

  async initDB() {
    console.log('Opening database...');
    try {
      this.database = await SQLite.openDatabase({
        name: DATABASE_NAME,
        version: DATABASE_VERSION,
        displayName: DATABASE_DISPLAYNAME,
        size: DATABASE_SIZE,
      });
      console.log('Database opened successfully');
      await this.createTable();
    } catch (error) {
      console.error('Error opening database:', error);
      throw error;
    }
  }

  async createTable() {
    try {
      await this.database.executeSql(`
        CREATE TABLE IF NOT EXISTS notes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          content TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Table created successfully');
    } catch (error) {
      console.error('Error creating table:', error);
      throw error;
    }
  }

  async addNote(title, content) {
    try {
      const result = await this.database.executeSql(
        'INSERT INTO notes (title, content) VALUES (?, ?)',
        [title, content]
      );
      return result[0].insertId;
    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  }

  async getNotes() {
    try {
      const results = await this.database.executeSql(
        'SELECT * FROM notes ORDER BY updated_at DESC'
      );
      const notes = [];
      for (let i = 0; i < results[0].rows.length; i++) {
        notes.push(results[0].rows.item(i));
      }
      return notes;
    } catch (error) {
      console.error('Error getting notes:', error);
      throw error;
    }
  }

  async updateNote(id, title, content) {
    try {
      await this.database.executeSql(
        'UPDATE notes SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [title, content, id]
      );
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  }

  async deleteNote(id) {
    try {
      await this.database.executeSql('DELETE FROM notes WHERE id = ?', [id]);
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  }

  async closeDB() {
    if (this.database) {
      await this.database.close();
      console.log('Database closed');
    }
  }
}

export default new DatabaseManager();