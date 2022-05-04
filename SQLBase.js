class SQLBase {
    constructor(connection, tableBase) {
        this.connection = connection;
    }

    makeQuery(queryString) {
        return new Promise((resolve, reject) => {
            this.connection.query(queryString, function(error, rows, fields) {
                if (error) reject(error);
                resolve(rows);
            });
        });
    }
}

module.exports = SQLBase;