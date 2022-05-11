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

    setCustomName(customName, fighterId) {
        return this.makeQuery(`UPDATE Fighter SET custom_name = "${customName}" WHERE id = ${fighterId};`);
    }
    
    getAllFighters(brugerId){
        return this.makeQuery(`SELECT * FROM Fighter WHERE bid = ${brugerId};`);
    }

    upgradeFighter(addedStats,fighterId){
        return this.makeQuery(`UPDATE Fighter SET added_stats = "${JSON.stringify(addedStats)}" WHERE id = ${fighterId}`); 
    }
    
}