const sqlite3 = require('sqlite3')
const Promise = require('bluebird')
const { resolve, reject } = require('bluebird')

class AppDAO {
  // 생성자
  constructor (dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.log('DB에 연결할 수 없습니다.', err)
      } else {
        console.log('DB에 연결되었습니다.')
      }
    })
  }

  // SQL 실행
  run (sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, (err) => {
        if (err) {
          console.log('SQL 실행중 오류가 발생했습니다. ' + sql)
          console.log(err)
        } else {
          resolve({ id: this.lastId })
        }
      })
    })
  }

  //
  get (sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log('SQL 실행중 오류가 발생했습니다. ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  //
  all (sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log('SQL 실행중 오류가 발생했습니다. ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }
}

module.exports = AppDAO
