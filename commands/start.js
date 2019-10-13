module.exports = class start {
    constructor() {
        this.name = 'start',
        this.alias = [],
        this.usage = '#start'
    }

    async run(client, message, args) {
        const msg = await message.channel.send(new client.modules.Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`Constructing your profile... <:evilpatrick:630505477062787092>`)
        );
        client.models.userCrates.findOne({
            "user_id": message.author.id
        }, (err, db) => {
            if (err) return console.error(err);
        });
    }
}