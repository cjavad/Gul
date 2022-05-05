const SQLBase = require("./SQLBase");

class FighterPedia extends SQLBase{
    constructor(connection){
        super(connection);
    }
    createFighter(fighterId, navn, price, rarity) {
        return this.makeQuery(`INSERT INTO FighterPedia(id, navn, billede, moves, types, stats, price, rarity) VALUES(${fighterId}, "${navn}, BLOB, JSON, JSON, JSON, ${price}, ${rarity});`);
    }
    
}