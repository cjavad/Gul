const SQLBase = require("./SQLBase");

class Bruger extends SQLBase {

    constructor(connection) {
        super(connection, "CREATE DATABASE IF NOT EXISTS Gul; USE DATABASE Gul; CREATE TABLE IF NOT EXISTS Bruger (id INT PRIMARY KEY AUTO_INCREMENT, navn VARCHAR(256), discordid VARCHAR(28) UNIQUE, mahogony_coin INT, d_slot1 INT UNIQUE, d_slot2 INT UNIQUE, d_slot3 INT UNIQUE, rank_score INT, xp_multiplier FLOAT, last_login DATE, created_at DATE, last_used DATE);")
    }
    getIdFromDiscord(discord) {
        return this.makeQuery(`SELECT id FROM Bruger WHERE discord ="${discord}";`);
    }
    createBruger(navn, discord) {
        this.makeQuery(`INSERT INTO Bruger(navn, discordid, mahogony_coin, d_slot1, d_slot2, d_slot3, rank_score, xp_multiplier, last_login, created_at, last_used) VALUES("${navn}", "${discord}", 10, NULL, NULL, NULL, 0, 1, NOW(), NOW(), NOW())`);
    }
}