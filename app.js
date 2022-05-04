// MySQL Stuff
const mysql = require('mysql8');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Gul'
});

connection.connect();

const createTables = require('./createTables');
createTables.forEach(table => connection.query(table));

const Discord = require('discord.js');

//importing and configures dotenv
const dotenv = require('dotenv');
dotenv.config();

//creating instance of this library
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.DIRECT_MESSAGES] });


// "Models" til de forskellige data struktuere fra MySQL
const Bruger = new(require('./Bruger'))();


//this is an event listener. Looks out for the "ready" event
client.on("ready", () => {
    console.log("LET'S GET READY TO do stuff :)");
});
//function(){} is the same as ()=>{}

//using dotenv, login using the discord token :)
client.login(process.env.DISCORD_TOKEN);