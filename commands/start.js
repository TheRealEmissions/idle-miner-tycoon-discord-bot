class setupDatabase {
    constructor(client, message) {
        this.client = client;
        this.message = message;
    };

    init() {
        return new Promise(async(resolve, reject) => {
            await Promise.all([
                this.userProfiles().catch(err => reject(err)),
                this.userCrates().catch(err => reject(err))
            ]);
            return resolve();
        });
    }

    userProfiles() {
        return new Promise((resolve, reject) => {
            this.client.models.userProfiles.findOne({
                user_id: this.message.author.id
            }, (err, db) => {
                if (err) return reject(err);
                if (!db) {
                    const newdb = new this.client.models.userProfiles({
                        user_id: this.message.author.id
                    });
                    newdb.save((err) => {
                        if (err) return reject(err);
                        else return resolve();
                    });
                } else return resolve();
            });
        });
    }

    userCrates() {
        return new Promise((resolve, reject) => {
            this.client.models.userCrates.findOne({
                user_id: this.message.author.id
            }, (err, db) => {
                if (err) return reject(err);
                if (!db) {
                    const newdb = new this.client.models.userCrates({
                        user_id: this.message.author.id
                    });
                    newdb.save(async (err) => {
                        if (err) return reject(err);
                        else {
                            await this.postUserCrates();
                            return resolve();
                        }
                    });
                } else return resolve();
            })
        });
    }

    postUserCrates() {
        return new Promise((resolve, reject) => {
            this.client.models.userCrates.findOne({
                user_id: this.message.author.id
            }, (err, db) => {
                if (err) return reject(err);
                let x = 1;
                while (x <= 6) {
                    db.mine_crates.push({
                        star: x,
                    });
                    x++;
                }
                db.save((err) => {
                    if (err) return reject(err);
                    else return resolve();
                });
            });
        });
    }
}

module.exports = class start {
    constructor() {
        this.name = 'start',
        this.alias = [],
        this.usage = '.start'
    }

    async run(client, message, args) {
        const msg = await message.channel.send(new client.modules.Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`Constructing your profile... <:evilpatrick:630505477062787092>`)
        );
        client.models.userProfiles.findOne({
            "user_id": message.author.id
        }, async (err, db) => {
            if (err) return console.error(err);
            if (!db) {
                await new setupDatabase(client, message).init().catch(err => console.error(err));
                msg.edit(new client.modules.Discord.MessageEmbed()
                    .setColor(message.guild.me.displayHexColor)
                    .setDescription(`Created your profile... :ballot_box_with_check:`)
                );
                client.models.userCrates.findOne({
                    "user_id": message.author.id
                }, (err, db) => {
                    if (err) return console.error(err);
                    db.mine_crates.find(x => x.star == 1).amount += 1;
                    db.save((err) => {
                        if (err) return console.error(err);
                    });
                });
                message.channel.send(new client.modules.Discord.MessageEmbed()
                    .setColor(message.guild.me.displayHexColor)
                    .setTitle(`**Welcome to Idle Miner Tycoon**`)
                    .setDescription(`** **`)
                    .addField(`To begin:`, `You have been awarded a :star: Mine Crate. Open this with \`.open\`. This will unlock your first mine.\n \nFrom here, select your mine with \`.select 1\`, and begin earning money!`)
                    .addField(`Basic commands:`, `\`.sell\` Sell the materials you have mined in your selected mine.\n\`.select\` Select a mine\n\`.open\` Open a crate\n\`.profile\` View your profile\n\`.upgrade\` Upgrade your selected mine or profile`)
                );
            } else {
                msg.edit(new client.modules.Discord.MessageEmbed()
                    .setColor(message.guild.me.displayHexColor)
                    .setDescription(`Unfortunately, a profile already exists for your user! You can reset your profile by running \`.restart\``)
                );
            }
        });
    }
}