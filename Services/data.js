const sqlite3 = require('sqlite3').verbose();

class DataConnector {
    constructor() {
        let path = process.env.DB;
        this.database = new sqlite3.Database(process.env.DB, (err) => {
            if (err) {
                console.error(err.message)
            }
    
            this.database.run('DROP TABLE IF EXISTS urls;')
    
            this.database.run(`
            CREATE TABLE IF NOT EXISTS urls (
                url_id INTEGER PRIMARY KEY,
                url_code TEXT NOT NULL UNIQUE,
                url_address TEXT NOT NULL
            );`)
        })
    }
}

module.exports = new DataConnector();