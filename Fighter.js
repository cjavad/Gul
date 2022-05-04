const SQLBase = require("./SQLBase");

class Fighter extends SQLBase {
    constructor(connection) {
        super(connection);
    }
    pullFighter(brugerId) {
        return this.makeQuery(`SELECT * FROM FighterPedia;`)
            .then(fp => {
                const randomFighter = fp[Math.floor(Math.random()*fp.length)];
                return this.makeQuery(`INSERT INTO Fighter(custom_name, fid, xp, added_stats, bid) VALUES("${randomFighter.navn}", ${randomFighter.fid}, 0, "{}", ${brugerId})`)
                    .then(response => {
                        return response.insertId;
                    });
            });
    }
    createCustomName(customName) {
        this.makeQuery(`U`)
    }
}