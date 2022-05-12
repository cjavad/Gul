const Discord = require('discord.js');

module.exports = connection => {
    const Fighter = new(require('./Fighter'))(connection);

    return [{
        command: 'list',
        alias: ['stats'],
        args: [{
            name: 'id',
            required: false,
            pattern: /\d+/g,
            errmsg: 'Fighter ID needs to be a Integer'
        }],
        cb: (message, args, brugerId) => {
            if (args.length == 1) {
                Fighter.getFighter(brugerId, args[0])
                    .then(fighter => {
                        console.log(fighter)
                    });
            } else {
                Fighter.getAllFighters(brugerId)
                    .then(fighters => {
                        console.log(fighters);
                    })
            }
        }
    }]
}