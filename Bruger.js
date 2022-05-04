const SQLBase = require("./SQLBase");

class Bruger extends SQLBase {

    constructor(connection) {
        super(connection);
    }
    getIdFromDiscord(discord) {
        return this.makeQuery(`SELECT id FROM Bruger WHERE discordid ="${discord}";`);
    }
    createBruger(navn, discord) {
        return this.makeQuery(`INSERT INTO Bruger(navn, discordid, mahogony_coin, d_slot1, d_slot2, d_slot3, rank_score, xp_multiplier, last_login, created_at, last_used) VALUES("${navn}", "${discord}", 10, NULL, NULL, NULL, 0, 1, NOW(), NOW(), NOW())`);
    }
    getBruger(id) {
        return this.makeQuery(`SELECT * FROM bruger WHERE id = ${id};`);
    }
    
    updateMahogony(change, id){
        this.makeQuery(`UPDATE bruger SET mahogony_coin = mahogony_coin + ${change} WHERE id = ${id};`);
    }
    updateXp(change, id) {
        this.makeQuery(`UPDATE bruget SET xp_multiplier = xp_multiplier + ${change} WHERE id = ${id};`);
    }
}

module.exports = Bruger;
