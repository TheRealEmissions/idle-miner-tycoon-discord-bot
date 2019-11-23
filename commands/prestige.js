module.exports = class {
    constructor() {
        this.name = 'prestige';
        this.alias = ['p', 'pres'];
        this.usage = '.prestige';
        this.description = "Prestige your currently selected mine";
    }

    async run(client, message, args) {
        if (client.mineSelected.has(message.author.id)) {
            client.models.userProfiles.findOne({
                "user_id": message.author.id
            }, (err, db) => {
                if (err) return console.error(err);
                if (!db) return;
                let mine = db.mines.find(x => x.index == client.mineSelected.get(message.author.id));
                if (mine.level >= 250) {
                    message.channel.send(new client.modules.Discord.MessageEmbed()
                        .setColor(message.guild.me.displayHexColor)
                        .setDescription(`**Are you sure to want to Prestige this mine?** Your mine balance will be reset upon prestiging. This cannot be undone.`)
                    ).then(msg => {
                        let emojis = ["✅", "❌"];
                        for (const emoji of emojis) {
                            msg.react(emoji);
                        }
                        let collector = new client.modules.Discord.ReactionCollector(msg, (reaction, user) => emojis.includes(reaction.emoji.name) && user.id == message.author.id, {
                            max: 1
                        });
                        collector.on('collect', reaction => {
                            if (reaction.emoji.name == emojis[0]) {
                                msg.delete();
                                db.mines.find(x => x.index == client.mineSelected.get(message.author.id)).level = 1;
                                db.mines.find(x => x.index == client.mineSelected.get(message.author.id)).prestige += 1;
                                db.mines.find(x => x.index == client.mineSelected.get(message.author.id)).balance = 0;
                                db.mines.find(x => x.index == client.mineSelected.get(message.author.id)).lastsell_timestamp = new Date();
                                db.markModified("mines");
                                db.save((err) => {
                                    if (err) return console.error(err);
                                    else {
                                        message.channel.send(new client.modules.Discord.MessageEmbed()
                                            .setColor(message.guild.me.displayHexColor)
                                            .setTitle(`Prestiged!`)
                                            .setDescription(`You have prestiged your **${mine.type.charAt(0)}${mine.type.toLowerCase().slice(1)} Mine** to **Prestige ${db.mines.find(x => x.index == client.mineSelected.get(message.author.id)).prestige}**! :partying_face:`)
                                            .addField(`Changes:`, `**+3.5%++ KG/s mined\n**+2%** Backpack Size`)
                                        );
                                        client.models.guildMines.findOne({
                                            "guild_id": message.guild.id,
                                            "type": db.mines.find(x => x.index == client.mineSelected.get(message.author.id)).type
                                        }, (err, db) => {
                                            if (err) return console.error(err);
                                            if (!db) return;
                                            db.sum_prestiges += 1;
                                            db.save((err) => {
                                                if (err) return console.error(err);
                                                else return;
                                            });
                                        });
                                    }
                                });
                            }
                            if (reaction.emoji.name == emojis[1]) {
                                message.delete();
                                msg.delete();
                                return;
                            }
                        });
                    });
                } else {
                    message.channel.send(new client.modules.Discord.MessageEmbed()
                        .setColor(message.guild.me.displayHexColor)
                        .setDescription(`Your mine needs to be Level 250 before you can prestige! Your mine is currently Level ${mine.level}.`)
                    );
                    return;
                }
            });
        } else {
            message.channel.send(new client.modules.Discord.MessageEmbed()
                .setColor(message.guild.me.displayHexColor)
                .setDescription(`You do not have a mine selected! Please select a mine with \`.select\``)
            );
            return;
        }
    }
}