const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");
const talkedRecently = new Set();

module.exports.run = async (bot, message, args) => {

    let sCoins = coins[message.author.id].coins;
    let bicon = bot.user.displayAvatarURL;
    let author = message.author.id;
    let authorname = message.member.user.tag;
    let dailyEmbed = new Discord.RichEmbed()
    .setTitle("ReBot - Récompense quotidienne", bicon)
    .addField("💰 RÉCOMPENSE QUOTIDIENNE 💰", `<@${author}> a récupéré sa récompense quotidienne de 25 pièces ! 🤑`)
    .addField("Quand re-faire cette commande ?", "Tu pourras re-faire cette commande dans **12 heures**")
    .setAuthor(authorname)
    .setFooter("De toute façon tu ne seras pas aussi riche que moi :)", bicon)
    .setColor("#faff00");

    if (talkedRecently.has(message.author.id)) {
        return message.channel.send("Veuillez patienter avant de pouvoir re-faire cette commande." + message.author);
    } else {

    coins[message.author.id] = {
        coins: sCoins + 25
      };

    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
        if(err) cosole.log(err)
    });

    talkedRecently.add(message.author.id);
    setTimeout(() => {
      // Removes the user from the set after a minute
      talkedRecently.delete(message.author.id);
    }, 43200000);
    }

    return message.channel.send(dailyEmbed);

}

module.exports.help = {
    name: "daily"
}
