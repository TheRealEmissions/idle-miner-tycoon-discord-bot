const sudb = new Set();
const sgdb = new Set();

class setupDatabase {
    constructor(client, message) {
        this.client = client;
        this.message = message;
    };

    guildMines() {
        return new Promise((resolve, reject) => {
            for (const index in this.client.storage.mines) {
                this.client.models.guildMines.findOne({
                    guild_id: this.message.guild.id,
                    type: this.client.storage.mines[index].type
                }, (err, db) => {
                    if (err) return reject(err);
                    if (!db) {
                        const newdb = new this.client.models.guildMines({
                            guild_id: this.message.guild.id,
                            type: this.client.storage.mines[index].type
                        });
                        newdb.save((err) => {
                            if (err) return reject(err);
                        });
                    };
                });
            }
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
                    newdb.save((err) => {
                        if (err) return reject(err);
                        else {
                            this.postUserCrates();
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

module.exports = async (client, message) => {
    if (message.channel.type !== "text") return;
    if (message.author.id == client.user.id) return;
    if (message.author.bot) return;
    if (!sudb.has(message.author.id)) {
        new setupDatabase(client, message).userProfiles();
        new setupDatabase(client, message).userCrates();
        sudb.add(message.author.id);

    }
    if (!sgdb.has(message.guild.id)) {
        new setupDatabase(client, message).guildMines();
        sgdb.add(message.guild.id);
    }
    if (message.content.toString().startsWith(".")) {
        let args = message.content.split(" ");
        let command = args[0];
        let cmd = client.commandHandler.getCommand(command);
        if (!cmd) return;
        try {
            cmd.run(client, message, args);
        } catch (err) {
            console.error(err);
        }
    }
}