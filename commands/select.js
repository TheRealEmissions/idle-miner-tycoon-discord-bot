module.exports = class select {
    constructor() {
        this.name = 'select',
        this.alias = ['sel'],
        this.usage = '.select <mine number>'
    }

    async run(client, message, args) {
        client.models.userProfiles.findOne({
            "user_id": message.author.id
        }).lean().exec((err, docs) => {
            if (err) return console.error(err);
            if (docs.mines.length < 1) {
                message.channel.send(new client.modules.Discord.MessageEmbed()
                    .setColor(message.guild.me.displayHexColor)
                    .setDescription(`You currently do not have any mines to select. Please use your ${client.functions.noToStarEmoji(1)} Mine Crate to claim your first mine!`)
                );
                return;
            }
            let embed = {
                embed: {
                    color: message.guild.me.displayHexColor,
                    title: `**Select a Mine:**`,
                    description: client.mineSelected.has(message.author.id) ? `Mine currently selected: ${docs.mines.find(x => x.index == client.mineSelected.get(message.author.id)).type.charAt(0)}${docs.mines.find(x => x.index == client.mineSelected.get(message.author.id)).type.slice(1).toLowerCase()} (${client.mineSelected.get(message.author.id)})` : null,
                    fields: []
                }
            }  
            for (const mine of docs.mines) {
                embed.embed.fields.push({
                    name: `${mine.type.charAt(0)}${mine.type.slice(1).toLowerCase()} Mine \`${mine.index}\``,
                    value: `\`Prestige\` ${mine.prestige}\n\`Level\` ${mine.level}\n\`Balance\` $${client.functions.formatNumber(mine.balance)}`
                });
            }
            message.channel.send(embed).then(msg => {
                let collector = new client.modules.Discord.MessageCollector(message.channel, m => m.author.id == message.author.id, {
                    max: 1
                });
                collector.on('collect', m => {
                    collector.stop();
                    msg.delete();
                    m.delete();
                    m = m.content;
                    const mine = docs.mines.find(x => x.index == m);
                    if (!mine) {
                        message.channel.send(new client.modules.Discord.MessageEmbed()
                            .setColor(message.guild.me.displayHexColor)
                            .setDescription(`This is not an available mine. Please run the command again and enter a mine that is listed.`)
                        );
                        return;
                    }
                    client.mineSelected.set(message.author.id, m);
                    message.channel.send(new client.modules.Discord.MessageEmbed()
                        .setColor(message.guild.me.displayHexColor)
                        .setDescription(`Set your currently selected mine to your ${docs.mines.find(x => x.index == m).type.charAt(0)}${docs.mines.find(x => x.index == m).type.slice(1).toLowerCase()} Mine :white_check_mark:`)
                    );
                });
            });
        });
    }
}