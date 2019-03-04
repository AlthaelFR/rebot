const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let bicon = bot.user.displayAvatarURL;
    let setupEmbed = new Discord.RichEmbed()
    .setDescription("~Installation du serveur~")
    .addField("Première étape:", "Mettre le role ReBot au dessus des membres")
    .addField("Seconde étape:", "Créer le salon ``📄logs`` il ne doit être visible que par le staff et ReBot")
    .addField("Troisième étape:", "Choisis ton prefix en faisant le commande ``-prefix``\n**Pour plus d'aide vous pouvez toujours faire ``-help``.**")
    .setColor("#ffd800")
    .setAuthor("ReBot - BOT FRANCAIS", bicon);

    return message.channel.send(setupEmbed)

}

module.exports.help = {
    name: "setup"
}