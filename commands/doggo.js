const superagent = require("superagent");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let {body} = await superagent
    .get(`https://random.dog/woof.json`);

    let doggoEmbed = new Discord.RichEmbed()
    .setColor("#fff200")
    .setTitle("~CHIEN~")
    .setImage(body.url);

    message.channel.send(doggoEmbed);

}

module.exports.help = {
    name: "doggo"
}