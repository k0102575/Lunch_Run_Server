"use strict"
const mysql = require('mysql')
const con = mysql.createConnection({
  host: "lunchrun.cltkz1clzxsd.ap-northeast-2.rds.amazonaws.com",
  database: 'lunchRun',
  user: 'root',
  password: '123123as'
})
con.connect()

module.exports = {
  getConnection() {
    return con
  }
}