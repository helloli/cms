const mysql = require('mysql');
const log = require('../utils/log');
const config = require('config');
const pool = mysql.createPool(config.get('db'));

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        log.error(err);
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            log.error(err);
            reject();
          } else {
            resolve(rows);
          }
          connection.end();
        })
      }
    })
  })
};

module.exports = {
  query
}