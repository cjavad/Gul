//importing and configures dotenv
const dotenv = require('dotenv');
dotenv.config();

// MySQL Stuff
const mysql = require('mysql8');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect();

const createTables = require('./createTables');
createTables.forEach(table => connection.query(table));

const Discord = require('discord.js');


//creating instance of this library
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.DIRECT_MESSAGES] });


// "Models" til de forskellige data struktuere fra MySQL
const Bruger = new(require('./Bruger'))(connection);


//this is an event listener. Looks out for the "ready" event
client.on("ready", () => {
    console.log("LET'S GET READY TO do stuff :)");

    // Test kode: På start lav en bruger eller tjek om den findes.
    Bruger.getIdFromDiscord("207096175327707136").then(([userId]) => {
            if (!userId) {
                Bruger.createBruger("Javad", "207096175327707136");
                console.log("Created user Javad");
                return;
            }
            console.log("User exists!");
            console.log(userId);
        })
        .catch(error => {
            console.log(error);
        });
});
//function(){} is the same as ()=>{}

//using dotenv, login using the discord token :)
client.login(process.env.DISCORD_TOKEN);