const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(':memory:')

db.serialize(() => {
  db.run('CREATE TABLE h_customers (seq INTEGER, name TEXT, phone TEXT, address TEXT, boxes INTEGER, tags INTEGER, memo TEXT, createdAt TEXT, sendedAt TEXT)')

  const stmt = db.prepare('INSERT INTO h_customer VALUES (?)')

  for (let i = 0; i < 10; i++) {
    stmt.run('Customer' + i)
  }
  stmt.finalize()

  db.each('SELECT rowid AS id, name FROM h_customer', (err, row) => {
    if (err) {
      console.err('Error Occurs When Getting Data')
    } else {
      console.log(row.id + ': ' + row.info)
    }
  })
})

db.close()
