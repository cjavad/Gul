//importing the discord library
const Discord = require('discord.js');

//importing and configures dotenv
const dotenv = require('dotenv');
dotenv.config();

//creating instance of this library
const client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILD_MESSAGES,Discord.Intents.FLAGS.GUILDS,Discord.Intents.FLAGS.GUILD_MEMBERS,Discord.Intents.FLAGS.DIRECT_MESSAGES]});

//this is an event listener. Looks out for the "ready" event
client.on("ready", () => {
    console.log("LET'S GET READY TO do stuff :)");
});
//function(){} is the same as ()=>{}

//using dotenv, login using the discord token :)
client.login(process.env.DISCORD_TOKEN);

