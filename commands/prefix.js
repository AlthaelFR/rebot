const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args, prefix) => {

    let sicon = message.guild.iconURL;
    let prefixHelpEmbed = new Discord.RichEmbed()
    .setDescription("~AIDE PREFIX~")
    .setColor("#0dcc00")
    .addField("Comment changer le prefix ?", `Pour cela <@${message.author.id}> tu dois faire la commande:\n**-prefix** {**lettre** / **symbole**}.`)
    .setThumbnail(sicon);

    if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("Tu n'as pas la permission de faire ceci !");
    if(!args[0] || args[0 == "help"]) return message.channel.send(prefixHelpEmbed)

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    prefixes[message.guild.id] = {
        prefixes: args[0]
    };

    fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) console.log(err)
    });

    let sEmbed = new Discord.RichEmbed()
    .setColor("#0dcc00")
    .setTitle("~CHANGEMENT DE PREFIX~")
    .setDescription(`Le prefix est désormais: "**${args[0]}**"`)
    .setThumbnail(sicon);

    message.channel.send(sEmbed);

}

module.exports.help = {
    name: "prefix"
}