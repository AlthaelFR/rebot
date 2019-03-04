const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let uicon = bot.user.displayAvatarURL;
    let helpEmbed = new Discord.RichEmbed()
    .setAuthor("ReBot - Menu D'aide", uicon)
    .setTitle("**Besoin d'aide ? Rejoignez le serveur discord du Bot !**")
    .setURL("https://discord.gg/XDUU7AA")
    .addField("Admin", "**-setup**     -> *Pour rendre l'expérience optimale*\n**-prefix {nouveau prefix}**     -> *Pour changer le prefix du bot*")
    .addField("Modération", "**-ban {membre} {raison}**     -> *Pour ban quelqu'un définitivement*\n**-kick {membre} {raison}**     -> *Pour expulser quelqu'un de façon temporaire*\n**-tempmute {membre} {durée}/s/m/h/d/**     -> *Pour rendre muet une personne de façon temporaire*\n**-warn {membre} {raison}**     -> *Pour avertir une personne, au bout de 3 warns elle est ban*\n**-warnlevel {membre}**     -> *Voir le niveau d'avertissement de quelqu'un*\n**-clear {nombre de message}**     -> *Pour supprimer des messages de façon efficace*")
    .addField("Utilisateur", "**-help**     -> *Afficher ce menu*\n**-shorten {url} {titre}**    -> *Rendre une URL plus courte*\n**-level**     -> *Voir son niveau actuel*\n**-coins**     -> *Voir son nombre de pièces*\n**-pay {membre} {somme}**    -> *Payer un membre avec ses pièces*\n**-report {membre} {raison}**    -> *Pour signaler un membre au staff*\n**-cat**      -> *Voir une image/gif de chat aléatoire*\n**-doggo**     -> *Voir une image/gif de chiens aléatoire*")
    .addField("Informations", "**-botinfo**      -> *Voir les informations du bot*\n**-serverinfo**     -> *Voir les informations du serveur*")
    .setColor("#0061ff")
    .setFooter("© Tout droits rerservé réservé à Althael", uicon)
    .setThumbnail(uicon);

    message.channel.send(helpEmbed)

}

module.exports.help = {
  name: "help"
}