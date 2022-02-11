const express = require('express')
const app = express()
const port = 3000
const sqlite3 = require('sqlite3').verbose();

const sanitizeUrl = require("@braintree/sanitize-url").sanitizeUrl;

app.use(express.json());

let db = new sqlite3.Database('./db/data.db', (err) => {
  if (err) {
    console.error(err.message);
  }

  console.log('Connected to the database.');
});

const createTable = () => {
  db.serialize(() => {
    db.run('DROP TABLE IF EXISTS urls;')
    db.run(`
    CREATE TABLE IF NOT EXISTS urls (
      url_id INTEGER PRIMARY KEY,
      url_code TEXT NOT NULL UNIQUE,
      url_address TEXT NOT NULL
    );`)
  });
}

const pickCode = (num) => {
  let code = "";
  const chars = [
    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
  ]

  for(let i = 0 ; i < num ; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code;
}

const addURL = (url) => {
  return new Promise(resolve => {
    let code = pickCode(10)

    db.run("INSERT INTO urls (url_code, url_address) VALUES($code, $url);", {
      $code: code,
      $url: url
    }, (err) => {
      if(err === null) {
        resolve ({
          err: null,
          code: code
        });
      } else {
        resolve ({
          err: "Unable to add URL" + err,
          code: null
        })
      }
  })
  

  });

}

const getURL = (code) => {
    return new Promise(resolve => {
      db.get(`SELECT url_address FROM urls WHERE url_code=$code;`, {
            $code: code,
          }, (err, row) => {
            if(row === undefined ) {
              resolve ({
                err: "Unable to find url." + err,
                result: ""
              });
            } else {
              resolve ({
                err: null,
                result: row.url_address
              })
              
            }

          });  
    })
    
}


app.get('/', async (req, res) => {
  res.send('Hello World!')
})

app.get('/:url', async (req, res) => {
  let url = await getURL(req.params.url)
  let err = url.err
  let result = url.result

  if(err === null) {
    res.send(`<a href="${result}">Go to ${result}</a>`)
  } else {
    res.send(url.err)
  }
  
})

app.post('/new', async (req, res, next) => {
  try {
    let baseUrl = req.body.url
    if(baseUrl != "") {
      let sanitized = sanitizeUrl(baseUrl)
      let addToDb = await addURL(sanitized);

      let err = addToDb.err
      let code = addToDb.code
  
      if(err === null) {
        res.send("https://localhost/" + code)
      } else {
        res.send(err)
      }
    } else {
      res.send ("System Error")
    }
  } catch(err) {
    return next(err)
  }
  
})

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`)
  createTable();
})