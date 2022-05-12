const Discord = require('discord.js');

function combineStats(base_stats, added_stats) {
    return Object.entries(base_stats).reduce((acc, [key, value]) =>
        // if key is already in map1, add the values, otherwise, create new pair
        ({...acc, [key]: (acc[key] || 0) + value }), {...added_stats });
}

module.exports = connection => {
    const Bruger = new(require('./Bruger'))(connection);
    const Fighter = new(require('./Fighter'))(connection);
    const FighterPedia = new(require('./FighterPedia'))(connection);

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
                    const formatFighter = fighter => {
                        const embed = new Discord.MessageEmbed()
                            .setThumbnail(fighter.billede)
                            .setTitle(fighter.custom_name)
                            .addField('xp', fighter.xp.toString())
                            .setAuthor({
                                name: message.author.username,
                                iconURL: message.author.avatarURL()
                            });

                        const moves = JSON.parse(fighter.moves);
                        const types = JSON.parse(fighter.types);

                        embed.setDescription(`Moves: ${fighter.moves}\nTypes: ${fighter.types}`);

                        const added_stats = JSON.parse(fighter.added_stats)
                        const base_stats = JSON.parse(fighter.stats)

                        const combined_stats = combineStats(base_stats, added_stats);

                        for (const key in combined_stats) {
                            if (combined_stats[key]) {
                                embed.addField(key, combined_stats[key].toString(), true);
                            }
                        }

                        return embed;
                    }

                    Fighter.getFighter(brugerId, args[0])
                        .then(([fighter]) => {
                            if (!fighter) return message.reply(`Fighter ${args[0]} not found.`);
                            message.reply({ embeds: [formatFighter(fighter)] });
                        });
                } else {
                    Fighter.getAllFighters(brugerId)
                        .then(fighters => {
                            let out = "";
                            fighters.forEach(fighter => {
                                console.log(fighter);
                                out += `${fighter.id} | ${fighter.custom_name} of type ${fighter.navn}\n`
                            });
                            message.reply(out);
                        })
                }
            },
        },
        {
            command: 'pull',
            alias: ['gacha'],
            args: [{}],
            cb: (message, args, brugerId) => {
                Fighter.pullFighter(brugerId)
                    .then(insertId => {
                        message.reply(`Pulled new character with id ${insertId}`);
                    });
            }
        },
        {
            command: 'pediaadd',
            alias: ['add'],
            args: [{
                    name: 'navn',
                    pattern: /.+/g
                },
                {
                    name: 'url',
                    pattern: /.+/g
                },
                {
                    name: 'price',
                    pattern: /.+/g
                },
                {
                    name: 'rarity',
                    pattern: /.+/g
                }
            ],
            cb: (message, args, brugerId) => {
                return FighterPedia.createFighter(args[0], args[1], args[2], args[3], {}, ["pound"], ["normal"])
                    .then(response => {
                        message.reply(`Added new fighter ${args[0]} on ID ${response.insertId}`);
                    });
            }
        },
        {
            command: 'fight',
            alias: [],
            args: [{
                name: 'mention',
                pattern: /.+/g
            }],
            cb: (message, args, brugerId) => {
                if (message.mentions.users.size !== 1) return message.reply('No or too many opponenent mentioned!');
                let opponent = message.mentions.users.first();
                Bruger.getIdFromDiscord(opponent.id).then(([response]) => {
                    let opponent_id = response.id;

                    // All out war med alle figthers.
                    Fighter.getAllFighters(brugerId)
                        .then(fighters => {
                            Fighter.getAllFighters(opponent_id)
                                .then(opponent_fighters => {
                                    const yourcard = fighters[Math.floor(Math.random() * fighters.length)];
                                    const theircard = opponent_fighters[Math.floor(Math.random() * opponent_fighters.length)];

                                    message.channel.send(`<@${message.author.id}> selected ${yourcard.id} | ${yourcard.custom_name}`);
                                    message.channel.send(`<@${opponent.id}> selected ${theircard.id} | ${theircard.custom_name}`);

                                    const yourstats = combineStats(JSON.parse(yourcard.stats), JSON.parse(yourcard.added_stats));
                                    const theirstats = combineStats(JSON.parse(theircard.stats), JSON.parse(theircard.added_stats));

                                    const x = Math.floor(theirstats.Hp - (yourstats.Atk * yourstats.Spd * Math.random()));
                                    const y = Math.floor(yourstats.Hp - (theirstats.Atk * theirstats.Spd * Math.random()));

                                    if (x > y) {
                                        // Du taber
                                        message.channel.send(`<@${opponent.id}> Wins with ${x} hp left! <@${message.author.id}> had ${y} hp left.`);
                                    } else {
                                        message.channel.send(`<@${message.author.id}> Wins with ${y} hp left! <@${opponent.id}> had ${x} hp left.`);
                                    }
                                });
                        });
                });
            }

        }
    ]
}