module.exports = class {
   constructor() {
      this.name = "mine";
      this.alias = ["m"];
      this.usage = ".mine";
      this.description = "View information on your currently selected mine";
   }

   mineInfo(client, id, index) {
      return new Promise((resolve, reject) => {
         client.models.userProfiles.findOne(
            {
               user_id: id
            },
            (err, db) => {
               if (err) return console.error(err);
               const minedb = db.mines.find(x => x.index == index);
               const mine = client.storage.mines.find(
                  x =>
                     x.type ==
                     `${minedb.type.charAt(0)}${minedb.type
                        .toLowerCase()
                        .slice(1)}`
               );
               let prestige = minedb.prestige;
               let level = minedb.level;
               let balance = Number(minedb.balance.toFixed(2));
               let backpacksize = Number(
                  (mine.kgps * 10 * (1.025 ^ (minedb.level - 1))).toFixed(2)
               );
               let time = Number(
                  (
                     new Date().getTime() / 1000 -
                     new Date(minedb.lastsell_timestamp).getTime() / 1000
                  ).toFixed(2)
               );
               let gen = Number((mine.kgps * time).toFixed(2));
               if (gen >= backpacksize) gen = backpacksize;
               let percentbpfull = Number(
                  ((gen / backpacksize) * 100).toFixed(2)
               );
               return resolve({
                  prestige: prestige,
                  level: level,
                  balance: balance,
                  backpacksize: backpacksize,
                  generated: gen,
                  percentbpfull: percentbpfull
               });
            }
         );
      });
   }

   async run(client, message, args) {
      if (client.mineSelected.has(message.author.id)) {
         const mine = await this.mineInfo(
            client,
            message.author.id,
            client.mineSelected.get(message.author.id)
         );
         message.channel.send(JSON.stringify(mine));
      } else {
         message.channel.send(
            new client.modules.Discord.MessageEmbed()
               .setColor(message.guild.me.displayHexColor)
               .setDescription(
                  `You do not have a mine selected! Please select a mine with \`.select\``
               )
         );
      }
   }
};
