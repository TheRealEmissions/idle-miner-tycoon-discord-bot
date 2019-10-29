module.exports = (client, message) => {
    message.channel.send(new client.modules.Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`You must select a mine to run this command! \`.select\``)
    );
}