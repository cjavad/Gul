const mysql = require('mysql8');
const folkClass = require('./folk.js');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hus'
});

connection.connect();

const folk = new folkClass(connection);

folk.getPerson('Søren')
    .then(rows => {
        console.log(rows);
    })
    .catch(error => {
        throw error;
    });

connection.end();