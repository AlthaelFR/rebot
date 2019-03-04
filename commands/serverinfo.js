const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("~Informations du SERVEUR~")
    .setColor("#008ae6")
    .setThumbnail(sicon)
    .addField("Nom du serveur:", message.guild.name)
    .addField("Créer le:", message.guild.createdAt)
    .addField("Vous avez rejoins:", message.member.joinedAt)
    .addField("Nombre de membres:", message.guild.memberCount);

    return message.channel.send(serverembed);
}

module.exports.help = {
    name: "serverinfo"
}