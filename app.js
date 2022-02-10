const express = require('express')
const app = express()
const port = 3000

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/data.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/:url', (req, res) => {
  res.send('Hello World!')
})

app.post('/new', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})