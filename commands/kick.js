const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
        //-kick @althael c'est la raison //

        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let kicon = message.guild.iconURL;

        let helpkickEmbed = new Discord.RichEmbed()
        .setDescription("~Aide KICK~")
        .setThumbnail(kicon)
        .setColor("#f47142")
        .addField("Comment kick ?", `Pour cela, <@${message.author.id}> tu dois faire la commande: \n**__-kick__ __{membre}__ __{raison}__**`);
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas la permission de faire ceci !");
        if(!kUser) return message.channel.send(helpkickEmbed);
        let kReason = args.join(" ").slice(22);
        if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Vous ne pouvez pas kick cette personne !");
        if(!kReason) return message.channel.send("Merci d'inclure une raison.\nPour plus d'aide faite __**-kick**__.")
    
        let kickEmbed = new Discord.RichEmbed()
        .setDescription("~Kick~")
        .setColor("#f47142")
        .setThumbnail(kicon)
        .addField("Membre visé", `${kUser} avec l'ID ${kUser.id}`)
        .addField("Kick par:", `<@${message.author.id}> avec l'ID ${message.author.id}`)
        .addField("Dans le salon:", message.channel)
        .addField("À:", message.createdAt)
        .addField("Raison:", kReason);

        let kickChannel = message.guild.channels.find(`name`, "📄logs");
        if (!kickChannel) return message.channel.send("Salon ``📄logs`` introuvable !");
    
        message.guild.member(kUser).kick(kReason);
        kickChannel.send(kickEmbed);
    
        return;
}

module.exports.help = {
    name: "kick"
}