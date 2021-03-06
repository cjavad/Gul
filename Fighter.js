const SQLBase = require("./SQLBase");

class Fighter extends SQLBase {
    constructor(connection) {
        super(connection);
    }

    pullFighter(brugerId) {
        return this.makeQuery(`SELECT * FROM FighterPedia;`)
            .then(fp => {
                const randomFighter = fp[Math.floor(Math.random() * fp.length)];
                return this.makeQuery(`INSERT INTO Fighter(custom_name, fid, xp, added_stats, bid) VALUES("${randomFighter.navn}", ${randomFighter.id}, 0, "{}", ${brugerId})`)
                    .then(response => {
                        return response.insertId;
                    });
            });
    }

    setCustomName(fighterId, customName) {
        return this.makeQuery(`UPDATE Fighter SET custom_name = "${customName}" WHERE id = ${fighterId};`);
    }

    getAllFighters(brugerId) {
        return this.makeQuery(`SELECT Fighter.id, FighterPedia.id as id2, custom_name, fid, xp, added_stats, bid, navn, billede, moves, types, stats, price, rarity FROM Fighter LEFT JOIN FighterPedia ON Fighter.fid = FighterPedia.id WHERE Fighter.bid = ${brugerId};`);
    }

    getFighter(brugerId, fighterId) {
        return this.makeQuery(`SELECT Fighter.id, FighterPedia.id as id2, custom_name, fid, xp, added_stats, bid, navn, billede, moves, types, stats, price, rarity FROM Fighter LEFT JOIN FighterPedia ON Fighter.fid = FighterPedia.id WHERE Fighter.bid = ${brugerId} AND Fighter.id = ${fighterId};`);
    }

    upgradeFighter(fighterId, addedStats) {
        return this.makeQuery(`UPDATE Fighter SET added_stats = "${JSON.stringify(addedStats)}" WHERE id = ${fighterId}`);
    }
}

module.exports = Fighter;