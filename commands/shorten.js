const Discord = require("discord.js");
const shorten = require("isgd");

module.exports.run = async (bot, message, args) => {

    let sicon = message.guild.iconURL;
    let shortenHelpEmbed = new Discord.RichEmbed()
    .setDescription("~Aide SHORTEN~")
    .setColor("#00d0ff")
    .addField("Comment réduire une URL ?", `C'est simple <@${message.author.id}> il suffit de faire la commande:\n**-shorten {URL} {Titre}**`)
    .setThumbnail(sicon);

    if(!args[0]) return message.channel.send(shortenHelpEmbed)
    if(!args[1]) {
        shorten.shorten(args[0], function(res) {
            if (res.startsWith('Error:')) return message.channel.send("Entre une URL valide s'il-te-plait !");

            message.channel.send(`**<${res}>**`);
        })
    } else {
        shorten.custom(args[0], args[1], function(res) {
            if (res.startsWith('Error:')) return message.channel.send(`**${res}**`);
            
            message.channel.send(`**<${res}>**`);
        })
    }

}

module.exports.help = {
    name: "shorten"
}