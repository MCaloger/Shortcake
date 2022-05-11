const logger = require('./logger');

const sqlite3 = require('sqlite3').verbose();

const ServerError = require('../Models/ServerError');

class DataConnector {
  constructor() {
    try {
      const path = process.env.DB;
      this.database = new sqlite3.Database(`db/${path}`, (error) => {

        if(error) {
            logger.error('db', error);
            throw new ServerError('Unable to connect to database.', 'Database Error', 500, true);
        } else {
            this.database.run('DROP TABLE IF EXISTS urls;');

            this.database.run(`
                    CREATE TABLE IF NOT EXISTS urls (
                        url_id INTEGER PRIMARY KEY,
                        url_code TEXT NOT NULL UNIQUE,
                        url_address TEXT NOT NULL
                    );`);
        }
        
      });
    } catch (error) {
      logger.error('db', error);
      throw new ServerError('Unable to connect to database.', 'Database Error', 500, true);
    }
  }
}

module.exports = new DataConnector();
