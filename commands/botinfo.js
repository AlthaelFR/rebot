const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("ReBot - Inviter Le Bot")
    .setURL("https://discordapp.com/oauth2/authorize?client_id=548209733752848394&scope=bot&permissions=2146958839")
    .setDescription("Informations du BOT")
    .setColor("#008ae6")
    .setThumbnail(bicon)
    .addField("Nom du bot:", bot.user.username)
    .addField("Créer le:", "15/02/2019")
    .addField("Par:", "<@245616875654873089>")
    .addField("Vous avez un problème avec le bot ?", `**-help**`)
    .setImage("https://media.giphy.com/media/WwZuCwZo7Bdi0TXXsc/giphy.gif");
    
    return message.channel.send(botembed)
}

module.exports.help = {
    name: "botinfo"
}