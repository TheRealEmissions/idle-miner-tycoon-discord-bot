module.exports = class addPoints {
    constructor(client, user, amount = 0) {
        this.client = client;
        this.user = user;
        this.amount = amount;
        this.run();
    }

    run() {
        return new Promise((resolve, reject) => {
            this.client.models.userProfiles.findOne({
                "user_id": this.user.id
            }, (err, db) => {
                if (err) return reject(err);
                if (!db) return reject(`No database found.`);
                let points = Math.floor(this.amount * Math.pow(1.5, db.rebirth));
                db.points += points;
                db.save((err) => {
                    if (err) return console.error(err);
                    return resolve(points);
                });
            });
        });
    }

}