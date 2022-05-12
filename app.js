//importing and configures dotenv
const dotenv = require('dotenv');
dotenv.config();
const prefix = process.env.DISCORD_PREFIX;

// MySQL Stuff
const mysql = require('mysql8');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect();

// :o
const commands = require('./commands')(connection);

const createTables = require('./createTables');
createTables.forEach(table => connection.query(table));

const Discord = require('discord.js');


//creating instance of this library
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.DIRECT_MESSAGES] });


// "Models" til de forskellige data struktuere fra MySQL
const Bruger = new(require('./Bruger'))(connection);

// Initialisere Fighterpedia og skaber en connection til GUL
const FighterPedia = new(require('./FighterPedia'))(connection);


//this is an event listener. Looks out for the "ready" event
client.on("ready", () => {
    console.log("LET'S GET READY TO do stuff :)");
});
//function(){} is the same as ()=>{}

function createUserIfNotExists(username, discordId) {
    return Bruger.getIdFromDiscord(discordId).then(([userId]) => {
        if (!userId) {
            return Bruger.createBruger(username, discordId)
                .then((responsible) => {
                    return responsible.insertId;
                });
        } else {
            return userId.id;
        }
    });
}

// Funktion der tager discord besked (det antages det starter med et prefix termineret med et whitespace)
// Og retunerer et objekt med kommandoen og dens argumenter.
function parseArgs(command) {
    // Normaliser mellemrum så X antal mellemrum bliver til 1
    // Herefter del med ' ' for at opdele argumenter
    command = command.replace(/\s+/g, ' ').split(' ');
    // Behanld første arg som kommandoen, herefter er resten argumenterne.
    return {
        command: command[1] || '',
        args: command.splice(2)
    }
}

client.on('messageCreate', (message) => {
    if (message.content.startsWith(prefix)) {
        createUserIfNotExists(message.author.username, message.author.id).then((brugerId) => {
            let parsedCommand = parseArgs(message.content);

            for (const command of commands) {
                if ([command.command, ...command.alias].includes(parsedCommand.command)) {
                    if (command.args.length < parsedCommand.args.length) {
                        return message.reply(`Too many arguments for the command ${command.command} expected max ${command.args.length}`);
                    } else if (parsedCommand.args.length > 0) {
                        for (const arg of command.args) {
                            for (const narg of parsedCommand.args) {
                                if (arg.pattern.test(narg)) {
                                    return command.cb(message, parsedCommand.args, brugerId);
                                }
                            }
                        }
                    } else {
                        return command.cb(message, parsedCommand.args, brugerId);
                    }
                }
            }

            // If no command 
            message.reply(`${parsedCommand.command} is not valid. Try the "${prefix} help" command.`);
        });
    }
});

//using dotenv, login using the discord token :)
client.login(process.env.DISCORD_TOKEN);