class database {
    constructor(client) {
        this.client = client;
        this.guildMines();
        this.guildStats();
    }

    guildStats() {
        return new Promise(async(resolve, reject) => {
                this.client.guilds.forEach(g => {
                    this.client.models.guildStats.findOne({
                        "guild_id": g.id
                    }, (err, db) => {
                        if (err) return reject(err);
                        if (!db) {
                            const newdb = new this.client.models.guildStats({
                                guild_id: g.id
                            });
                            newdb.save((err) => {
                                if (err) return reject(err);
                            });
                        }
                    });
                });
            return resolve();
        });
    }

    guildMines() {
        return new Promise(async (resolve, reject) => {
            for (const index in this.client.storage.mines) {
                this.client.guilds.forEach(g => {
                    this.client.models.guildMines.findOne({
                        "guild_id": g.id,
                        "type": this.client.storage.mines[index].type
                    }, (err, db) => {
                        if (err) return reject(err);
                        if (!db) {
                            const newdb = new this.client.models.guildMines({
                                guild_id: g.id,
                                type: this.client.storage.mines[index].type
                            });
                            newdb.save((err) => {
                                if (err) return reject(err);
                            });
                        };
                    });
                });
            }
            return resolve();
        });
    }
}

module.exports = async (client) => {
    console.log(`[LOG] Bot successfully initialized:`);
    console.log(`- Username: ${client.user.username}`);
    console.log(`- Discriminator: ${client.user.discriminator}`);
    console.log(`- ID: ${client.user.id}`);
    new database(client);
}