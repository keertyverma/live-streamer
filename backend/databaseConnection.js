const mysql = require('mysql');

//DB Connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: 'utc'
});

connection.connect((err) => {
    if (err) {
        console.log("Connection to DB failed !!!");
        throw err
    }
    console.log('Connected to DB!');
});

module.exports = connection;