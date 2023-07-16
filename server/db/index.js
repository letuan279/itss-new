const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'food'
});

connection.connect((error) => {
    if (error) {
        console.error('Error connecting to database: ', error);
        return;
    }
    console.log('Connected to database successfully!');
});

module.exports = connection