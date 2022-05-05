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

function createUserIfNotExists(username,discordId){
    return Bruger.getIdFromDiscord(discordId).then(([userId]) => {
        if(!userId){
            return Bruger.createBruger(username,discordId)
                .then((responsible)=>{
                    return responsible.insertId;
                });   
        }
        else {
            return userId.id;
        }
    });
}

client.on('messageCreate',(message) => {
   if(message.content.startsWith(prefix)){
       createUserIfNotExists(message.author.username,message.author.id).then((brugerId)=>{
            console.log(brugerId);
       });
   }
});

//using dotenv, login using the discord token :)
client.login(process.env.DISCORD_TOKEN);

FighterPedia.createFighter("Søren", )