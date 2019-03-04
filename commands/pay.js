const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
  //-pay @isatisfied 59345

  if(!coins[message.author.id]){
    return message.reply("Vous n'avez pas d'argent !")
  }

  let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

  if(!coins[pUser.id]){
    coins[pUser.id] = {
      coins: 0
    };
  }

  let pCoins = coins[pUser.id].coins;
  let sCoins = coins[message.author.id].coins;

  if(sCoins < args[0]) return message.reply("Vous n'avez pas assez d'agent !");

  coins[message.author.id] = {
    coins: sCoins - parseInt(args[1])
  };

  coins[pUser.id] = {
    coins: pCoins + parseInt(args[1])
  };
  let somme = args[1];
  let payauthor = message.member.user.tag;
  let payauthormention = message.author;
  let payEmbed = new Discord.RichEmbed()
  .setDescription("~ENVOI D'ARGENT~")
  .setColor("#ffdd00")
  .addField("Membre visé", pUser)
  .addField("Donneur", payauthormention)
  .addField("Somme", `${somme} pièces`)
  .setAuthor(`${payauthor}`);

  message.channel.send(payEmbed);

  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if(err) cosole.log(err)
  });


}

module.exports.help = {
  name: "pay"
}