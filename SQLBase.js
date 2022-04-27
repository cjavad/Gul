class SQLBase {
    constructor(connection, tableBase) {
        this.connection = connection;
        //Laver table ved start, ud fra vores SQL kode.
        this.makeQuery(tableBase);
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