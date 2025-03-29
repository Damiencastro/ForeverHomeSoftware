require('dotenv').config({path: '../.env'});
const mysql = require('mysql2/promise');

const mysqlPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});

mysqlPool.query("SELECT 1")
    .then(data => console.log('DB connection successful'))
    .catch(err => console.log('DB connection failed. \n' + err));

module.exports = mysqlPool;