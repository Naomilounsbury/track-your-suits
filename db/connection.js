//This file is so I can export the database connection everywhere
const mysql = require('mysql2');
require('dotenv').config();
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: 'suitTracker'
    },
    console.log('Connected to the suitTracker database.')
);
module.exports = db