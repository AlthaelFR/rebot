const superagent = require("superagent");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let {body} = await superagent
    .get(`http://aws.random.cat//meow`);

    let catsEmbed = new Discord.RichEmbed()
    .setColor("#fff200")
    .setTitle("~CHAT~")
    .setImage(body.file);

    message.channel.send(catsEmbed);

}

module.exports.help = {
    name: "cat"
}