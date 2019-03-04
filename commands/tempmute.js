const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args [0]));
    let micon = message.guild.iconURL;
    let helptempmuteEmbed= new Discord.RichEmbed()
    .setDescription("~Aide TEMP-MUTE~")
    .setThumbnail(micon)
    .setColor("#2802fc")
    .addField("Comment temp-mute ?", `Pour cela, <@${message.author.id}> tu dois faire la commande: \n**__-tempmute__ __{membre}__ __{temps}__**`);

    if(!tomute) return message.channel.send(helptempmuteEmbed);
    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("Vous n'avez pas la permission de faire ceci !");
    if(tomute.hasPermission("MUTE_MEMBERS")) return message.reply("Je ne peux pas mute ce membre !")
    let muterole = message.guild.roles.find(`name`, "❰ Muté ❱");
    //Création du role ❰ Muté ❱
    if(!muterole){
        try{
            muterole = await message.guild.createRole({
                name: "❰ Muté ❱",
                color: "#920303",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }catch(e){
            console.log(e.stack);
        }
    }
    //Fin de la création du role ❰ Muté ❱
    let mutetime = args[1];
    if(!mutetime) return message.reply("Vous n'avez pas spécifié de temps !");

    await(tomute.addRole(muterole));

    let muteEmbed = new Discord.RichEmbed()
    .setDescription("~TEMP-MUTE~")
    .setColor("#2802fc")
    .setThumbnail(micon)
    .addField("Membre visé", `${tomute} avec l'ID ${tomute.id}`)
    .addField("Mute par:", `<@${message.author.id}> avec l'ID ${message.author.id}`)
    .addField("Dans le salon:", message.channel)
    .addField("À:", message.createdAt)
    .addField("Pour:", mutetime);

    let muteChannel = message.guild.channels.find(`name`, "📄logs");
    if(!muteChannel) return message.channel.send("Salon ``📄logs`` introuvable !")
    muteChannel.send(muteEmbed);

    let unmuteEmbed = new Discord.RichEmbed()
    .setDescription("~UN-MUTE~")
    .setColor("#2802fc")
    .setThumbnail(micon)
    .addField("Membre un-mute:", `${tomute} avec l'ID ${tomute.id}`)
    .addField("Mute par:", `<@${message.author.id}> avec l'ID ${message.author.id}`)
    .addField("Dans le salon:", message.channel)
    .addField("À:", message.createdAt)
    .addField("Pour:", mutetime);

    setTimeout(function(){
        tomute.removeRole(muterole.id);
        muteChannel.send(unmuteEmbed);
    }, ms(mutetime));


//fin du module
}

module.exports.help = {
    name: "tempmute"
}