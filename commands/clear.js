const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let wicon = message.guild.iconURL;
    let clearhelpEmbed = new Discord.RichEmbed()
    .setDescription("~Aide CLEAR~")
    .setThumbnail(wicon)
    .setColor("#ff6a00")
    .addField("Comment clear ?", `Pour cela, <@${message.author.id}> tu dois faire la commande: \n**__-clear__ __{nombre de messages}__**`)
    .addField("Limite :", "Vous ne devez pas dépasser 100 messages à supprimer, si vous voulez en supprimer plus faites plusieurs fois la commande.");

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Vous n'avez pas la permission de faire ceci.");
    if(!args[0]) return message.channel.send(clearhelpEmbed);
    if(args[0] > 100) return message.reply("**Vous ne pouvez pas supprimer + de 100 messages.**");
    message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`**${args[0]} messages ont été supprimés**`).then(msg => msg.delete(2000));
});

}

module.exports.help = {
  name: "clear"
}