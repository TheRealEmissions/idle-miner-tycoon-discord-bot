class database {
   constructor(client) {
      this.client = client;
      this.guildMines();
      this.guildStats();
      this.userCratesCheck();
   }

   userCratesCheck() {
      return new Promise(async (resolve, reject) => {
         for (const user of this.client.users) {
            this.client.models.userCrates.findOne(
               {
                  user_id: user.id
               },
               (err, db) => {
                  if (err) return reject(err);
                  let cs1 = db.mine_crates;
                  let cs2 = db.standard_crates;
                  if (db.mine_crates.length < 6) {
                     db.mine_crates = [];
                     let ax = 1;
                     while (ax <= 6) {
                        db.mine_crates.push({
                           star: ax
                        });
                        ax++;
                     }
                  }
                  if (db.standard_crates.length < 6) {
                     db.standard_crates = [];
                     let bx = 1;
                     while (bx <= 6) {
                        db.standard_crates.push({
                           star: bx
                        });
                        bx++;
                     }
                  }
                  if (cs1 == db.mine_crates && cs2 == db.standard_crates) {
                     return;
                  } else
                     db.save(err => {
                        if (err) return reject(err);
                     });
               }
            );
         }
      });
   }

   guildStats() {
      return new Promise(async (resolve, reject) => {
         this.client.guilds.forEach(g => {
            this.client.models.guildStats.findOne(
               {
                  guild_id: g.id
               },
               (err, db) => {
                  if (err) return reject(err);
                  if (!db) {
                     const newdb = new this.client.models.guildStats({
                        guild_id: g.id
                     });
                     newdb.save(err => {
                        if (err) return reject(err);
                     });
                  } else {
                     if (!db.sum_rebirths) db.sum_rebirths = 0;
                     if (!db.sum_sells) db.sum_sells = 0;
                     if (!db.sum_levelups) db.sum_levelups = 0;
                     if (!db.sum_points) db.sum_points = 0;
                     db.save(err => {
                        if (err) return console.error(err);
                     });
                  }
               }
            );
         });
         return resolve();
      });
   }

   guildMines() {
      return new Promise(async (resolve, reject) => {
         for (const index in this.client.storage.mines) {
            this.client.guilds.forEach(g => {
               this.client.models.guildMines.findOne(
                  {
                     guild_id: g.id,
                     type: this.client.storage.mines[index].type
                  },
                  (err, db) => {
                     if (err) return reject(err);
                     if (!db) {
                        const newdb = new this.client.models.guildMines({
                           guild_id: g.id,
                           type: this.client.storage.mines[index].type
                        });
                        newdb.save(err => {
                           if (err) return reject(err);
                        });
                     }
                  }
               );
            });
         }
         return resolve();
      });
   }
}

module.exports = async client => {
   console.log(`[LOG] Bot successfully initialized:`);
   console.log(`- Username: ${client.user.username}`);
   console.log(`- Discriminator: ${client.user.discriminator}`);
   console.log(`- ID: ${client.user.id}`);
   new database(client);
};
