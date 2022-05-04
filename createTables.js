const fs = require('fs');
// Læs createTables.sql filen for at hente database creations queries
const sqlTables = fs.readFileSync('./createTables.sql');
// Ekspotere en liste med alle create table queries seperede i filen med --
module.exports = sqlTables.toString().split('--');