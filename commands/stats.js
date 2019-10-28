module.exports = class stats {
    constructor() {
        this.name = 'stats',
        this.alias = ["statistics", "info"]
        this.usage = '.stats'
    }

    userProfiles(client) {
        return new Promise((re, r) => {
            client.models.userProfiles.find({}).lean().exec((err, docs) => {
                if (err) return r(err);
                return re({
                    users: docs.length
                });
            });
        });
    }

    guildMines(client) {
        return new Promise((re, r) => {
            client.models.guildMines.find({}).lean().exec((err, docs) => {
                if (err) return r(err);
                let sumkg = 0;
                let sum$ = 0;
                let sumprest = 0;
                let sumrebirth = 0;
                for (const doc of docs) {
                    sumkg += doc.sum_kg;
                    sum$ += doc.sum_money;
                    sumprest += doc.sum_prestiges;
                    sumrebirth += doc.sum_rebirths;
                }
                return re({
                    sumkg: sumkg,
                    sum$: sum$,
                    sumprest: sumprest,
                    sumrebirth: sumrebirth
                });
            });
        });
    }
    
    async run(client, message, args) {
        const guildMines = await this.guildMines(client);
        const userProfiles = await this.userProfiles(client);
        message.channel.send(new client.modules.Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setTitle(`**Idle Mining Statistics:**`)
            .addField(`Amount of users registered:`, userProfiles.users, true)
            .addField(`Total KG mined:`, guildMines.sumkg, true)
            .addField(`Total $ earned:`, guildMines.sum$, true)
            .addField(`Total amount of prestiges:`, guildMines.sumprest, true)
            .addField(`Total amount of rebirths:`, guildMines.sumrebirth, true)
        )
    }
}