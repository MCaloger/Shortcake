const logger = require('./logger');

const sqlite3 = require('sqlite3').verbose();

class DataConnector {
  constructor() {
    try {
      const path = process.env.DB;
      this.database = new sqlite3.Database(path, (error) => {
        this.database.run('DROP TABLE IF EXISTS urls;');

        this.database.run(`
                CREATE TABLE IF NOT EXISTS urls (
                    url_id INTEGER PRIMARY KEY,
                    url_code TEXT NOT NULL UNIQUE,
                    url_address TEXT NOT NULL
                );`);
      });
    } catch (error) {
      logger.error('db', error);
      throw new Error('Database error.');
    }
  }
}

module.exports = new DataConnector();
