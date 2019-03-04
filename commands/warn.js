const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    //warn @althael raison
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Vous n'avez pas la permission de faire ceci !");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])

    let wicon = message.guild.iconURL;
    let helpwarnEmbed = new Discord.RichEmbed()
    .setDescription("~Aide WARN~")
    .setThumbnail(wicon)
    .setColor("#01fc06")
    .addField("Comment warn ?", `Pour cela, <@${message.author.id}> tu dois faire la commande: \n**__-warn__ __{membre}__ __{raison}__**`);

    if(!wUser) return message.channel.send(helpwarnEmbed)
    if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Vous ne pouvez pas warn cette personne !");
    let reason = args.join(" ").slice(22);

    if(!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    }; 

    warns[wUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
      if (err) console.log(err)
    });

    let warnEmbed = new Discord.RichEmbed()
    .setDescription("~WARNS~")
    .setAuthor(message.author.username)
    .setColor("#01fc06")
    .setThumbnail(wicon)
    .addField("Membre visé", `${wUser} avec l'ID ${wUser.id}`)
    .addField("Warn par:", `<@${message.author.id}> avec l'ID ${message.author.id}`)
    .addField("Dans le salon:", message.channel)
    .addField("À:", message.createdAt)
    .addField("Raison:", reason)
    .addField("Nombre de warns:", warns[wUser.id].warns);

    let warnchannel = message.guild.channels.find(`name`, "📄logs");
    if(!warnchannel) return message.channel.send("Salon ``📄logs`` introuvable !");

    warnchannel.send(warnEmbed);

    if(warns[wUser.id].warns == 2){
        let muterole = message.guild.roles.find(`name`, "❰ Muté ❱");
        if(!muterole) return message.channel.send("Role ❰ Muté ❱ introuvable !");

        let mutetime = "10s";
        await(wUser.addRole(muterole.id));
        message.channel.send(`${wUser.tag} a été temporairement muté (pour ${mutetime})`);

        setTimeout(function(){
            wUser.removeRole(muterole.id)
            message.channel.reply(`${wUser.tag} a été un-mute.`)
        })
    }

    if(warns[wUser.id].warns == 3){
        message.guild.member(wUser).kick(reason);
        message.channel.send(`${wUser} a été kick pour avoir obtenu 3 warns`)
    }



}

module.exports.help = {
    name: "warn"
}