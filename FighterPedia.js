const SQLBase = require("./SQLBase");
const defaultStats = require("./stats.json");
const allMoves = require("./moves.json");
const allTypes = require("./types.json");

class FighterPedia extends SQLBase {
    constructor(connection){
        super(connection);
    }
    createFighter(navn, url, price, rarity, statsOption, possibleMoves, possibleTypes) {
        let stats = {
            ...defaultStats,
            ...statsOption
        }
        let types = allTypes.filter(v => possibleTypes.includes(v));
        
        let moves = Object.keys(allMoves).filter(v => possibleMoves.includes(v));

        return this.makeQuery(`INSERT INTO FighterPedia(navn, billede, moves, types, stats, price, rarity) VALUES("${navn}", "${url}", '${JSON.stringify(moves)}', '${JSON.stringify(types)}', '${JSON.stringify(stats)}', ${price}, ${rarity});`);
    }
}

module.exports = FighterPedia;