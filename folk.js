class Folk {
    constructor(connection) {
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

    getPerson(navn) {
        return this.makeQuery(`SELECT * FROM folk WHERE navn LIKE '%${navn}%';`);
    }
}


module.exports = Folk