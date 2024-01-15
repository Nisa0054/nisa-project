const mysql = require('mysql');
const DB = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_POST,
    
    //port mssql: 1433
    
})

module.exports = DB;