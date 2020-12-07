class CustomerRepository {
  constructor (dao) {
    this.dao = dao
  }

  createTable () {
    const sql = `
      CREATE TABLE IF NOT EXISTS customer (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        phone TEXT, 
        address TEXT, 
        boxes INTEGER, 
        tags INTEGER, 
        memo TEXT, 
        createdAt TEXT, 
        sendedAt TEXT)
      `
    return this.dao.run(sql)
  }

  create ({ name, phone, address, boxes, tags, memo, createdAt, sendedAt }) {
    return this.dao.run(
      `INSERT INTO customer 
        (
         name, 
         phone, 
         address,
         boxes, 
         tags, 
         memo, 
         createdAt, 
         sendedAt
        ) 
      VALUES (
        ?, 
        ?, 
        ?, 
        ?, 
        ?, 
        ?, 
        ?, 
        ?
      )`,
      [name, phone, address, boxes, tags, memo, createdAt, sendedAt]
    )
  }

  update (customer) {
    const { id, name, phone, address, boxes, tags, memo } = customer
    return this.dao.run(
      `UPDATE customer
      SET name = ?,
        phone = ?,
        address = ?,
        boxes = ?,
        tags = ?,
        memo = ?
      WHERE id = ?
      `,
      [name, phone, address, boxes, tags, memo, id]
    )
  }

  delete (id) {
    return this.dao.run(
      `DELETE FROM 
        customer 
       WHERE id = ?
      `,
      [id]
    )
  }

  getById (id) {
    return this.dao.get(
      `SELECT 
        * 
       FROM customer
       WHERE id = ?`,
      [id]
    )
  }

  getAll () {
    return this.dao.all(
      `SELECT 
        * 
       FROM customer`)
  }
}

module.exports = CustomerRepository
