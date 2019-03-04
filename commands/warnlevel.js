const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  let wlvlicon = message.author.avatarURL;
  let wUserIcon = wUser.avatarURL;
  let helpwarnlevelEmbed = new Discord.RichEmbed()
  .setDescription("~Aide WARNLEVEL~")
  .setThumbnail(wUser)
  .setColor("#01fc06")
  .addField("Comment warnlevel ?", `Pour cela, <@${message.author.id}> tu dois faire la commande: \n**__-warnlevel__ __{membre}__**`);

  if(!wUser) return message.reply(helpwarnlevelEmbed);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };
  
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu n'as pas la permission de faire ça !");

  let warnlevel = warns[wUser.id].warns;

  let warnlevelEmbed = new Discord.RichEmbed()
  .setDescription("~WARNLEVEL~")
  .setThumbnail(wlvlicon)
  .setColor("01fc06")
  .addField("WarnLevel:", `<@${wUser.id}> a ${warnlevel} warns.`);

  message.channel.send(warnlevelEmbed);

}

module.exports.help = {
  name: "warnlevel"
}