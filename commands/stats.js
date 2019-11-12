module.exports = class stats {
   constructor() {
      (this.name = "stats"), (this.alias = ["statistics", "info"]);
      this.usage = ".stats";
   }

   userProfiles(client) {
      return new Promise((re, r) => {
         client.models.userProfiles
            .find({})
            .lean()
            .exec((err, docs) => {
               if (err) return r(err);
               let mine = 0;
               let rebirth = 0;
               for (const doc of docs) {
                  mine += doc.mines.length;
                  rebirth += doc.rebirth;
               }
               return re({
                  users: docs.length,
                  mines: mine,
                  rebirths: rebirth
               });
            });
      });
   }

   guildMines(client) {
      return new Promise((re, r) => {
         client.models.guildMines
            .find({})
            .lean()
            .exec((err, docs) => {
               if (err) return r(err);
               let sumkg = 0;
               let sum$ = 0;
               let sumprest = 0;
               for (const doc of docs) {
                  sumkg += doc.sum_kg;
                  sum$ += doc.sum_money;
                  sumprest += doc.sum_prestiges;
               }
               return re({
                  sumkg: sumkg,
                  sum$: sum$,
                  sumprest: sumprest
               });
            });
      });
   }

   async run(client, message, args) {
      const guildMines = await this.guildMines(client);
      const userProfiles = await this.userProfiles(client);
      message.channel.send(
         new client.modules.Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setTitle(`**Idle Mining Statistics:**`)
            .addField(`Amount of users registered:`, userProfiles.users, true)
            .addField(`Amount of mines:`, userProfiles.mines, true)
            .addField(`Total KG mined:`, guildMines.sumkg, true)
            .addField(`Total $ earned:`, guildMines.sum$, true)
            .addField(`Total amount of prestiges:`, guildMines.sumprest, true)
            .addField(`Total amount of rebirths:`, userProfiles.rebirths, true)
      );
   }
};
