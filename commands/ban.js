const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let bicon = message.guild.iconURL;

    let helpbanEmbed = new Discord.RichEmbed()
    .setDescription("~Aide BAN~")
    .setThumbnail(bicon)
    .setColor("#ff0000")
    .addField("Comment Ban ?", `Pour cela, <@${message.author.id}> tu dois faire la commande: \n**__-ban__ __{membre}__ __{raison}__**`);

    if(!bUser) return message.channel.send(helpbanEmbed);
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission de faire ceci !");
    if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Vous ne pouvez pas bannir cette personne !");
    if(!bReason) return message.channel.send("Merci d'inclure une raison.\nPour plus d'aide faite __**-ban**__.")

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~BAN~")
    .setThumbnail(bicon)
    .setColor("#ff0000")
    .addField("Membre visé:", `${bUser} avec l'ID ${bUser.id}`)
    .addField("Bannis par:", `<@${message.author.id}> avec l'ID ${message.author.id}`)
    .addField("Dans le salon:", message.channel)
    .addField("À:", message.createdAt)
    .addField("Pour:", bReason);

    let banChannel = message.guild.channels.find(`name`, "📄logs");
    if(!banChannel) return message.channel.send("Salon ``📄logs`` introuvable !");

    message.guild.member(bUser).ban(bReason);
    banChannel.send(banEmbed);

    return;
}

module.exports.help = {
    name: "ban"
}