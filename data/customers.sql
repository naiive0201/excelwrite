CREATE TABLE IF NOT EXISTS customer (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  name TEXT, 
  phone TEXT, 
  address TEXT, 
  boxes INTEGER, 
  tags INTEGER, 
  memo TEXT, 
  createdAt TEXT, 
  sendedAt TEXT
)