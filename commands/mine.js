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
                  (
                     mine.kgps *
                     10 *
                     Math.pow(1.025, minedb.level - 1) *
                     Math.pow(1.02, minedb.prestige) *
                     Math.pow(1.05, db.rebirth)
                  ).toFixed(2)
               );
               let time = Number(
                  (
                     new Date().getTime() / 1000 -
                     new Date(minedb.lastsell_timestamp).getTime() / 1000
                  ).toFixed(2)
               );
               let gen = Number(
                  (
                     mine.kgps *
                     Math.pow(1.035, minedb.prestige) *
                     Math.pow(1.05, db.rebirth) *
                     time
                  ).toFixed(2)
               );
               if (gen >= backpacksize) gen = backpacksize;
               let percentbpfull = Number(
                  ((gen / backpacksize) * 100).toFixed(2)
               );
               let amountforlevel = Number(
                  (
                     mine.kgps *
                     120 *
                     Math.pow(1.05, minedb.level - 1) *
                     mine.ppk
                  ).toFixed(2)
               );
               return resolve({
                  name: mine.type,
                  rarity: mine.rarity,
                  prestige: prestige,
                  level: level,
                  balance: balance,
                  backpacksize: backpacksize,
                  generated: gen,
                  percentbpfull: percentbpfull,
                  amountforlevel: amountforlevel
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
         let embed = {
            embed: {
               color: message.guild.me.displayHexColor,
               title: `${message.author.username}${
                  message.author.username.endsWith("s") ? `'` : `'s`
               } ${mine.name} Mine:`,
               description: `Backpack: [${
                  mine.percentbpfull >= 100
                     ? `:white_small_square::white_small_square::white_small_square::white_small_square::white_small_square:`
                     : mine.percentbpfull >= 80
                     ? `:white_small_square::white_small_square::white_small_square::white_small_square::black_small_square:`
                     : mine.percentbpfull >= 60
                     ? `:white_small_square::white_small_square::white_small_square::black_small_square::black_small_square:`
                     : mine.percentbpfull >= 40
                     ? `:white_small_square::white_small_square::black_small_square::black_small_square::black_small_square:`
                     : mine.percentbpfull >= 20
                     ? `:white_small_square::black_small_square::black_small_square::black_small_square::black_small_square:`
                     : `:black_small_square::black_small_square::black_small_square::black_small_square::black_small_square:`
               }] **${mine.percentbpfull}%**`,
               fields: [
                  {
                     name: `Rarity`,
                     value: client.functions.noToStarEmoji(mine.rarity)
                  },
                  {
                     name: `Prestige`,
                     value: mine.prestige
                  },
                  {
                     name: `Level`,
                     value: `${mine.level} (${
                        Number(
                           ((mine.balance / mine.amountforlevel) * 100).toFixed(
                              2
                           )
                        ) >= 100
                           ? `100`
                           : Number(
                                (
                                   (mine.balance / mine.amountforlevel) *
                                   100
                                ).toFixed(2)
                             )
                     }%)`,
                     inline: true
                  },
                  {
                     name: `Price To Level Up`,
                     value: `$${client.functions.formatNumber(
                        mine.amountforlevel
                     )}${
                        String(
                           client.functions.formatNumber(mine.amountforlevel)
                        ).includes(".")
                           ? String(
                                client.functions.formatNumber(
                                   mine.amountforlevel
                                )
                             ).split(".")[1].length == 1
                              ? `0`
                              : ""
                           : ""
                     }`,
                     inline: true
                  },
                  {
                     name: `Balance`,
                     value: `$${client.functions.formatNumber(mine.balance)}${
                        String(
                           client.functions.formatNumber(mine.balance)
                        ).includes(".")
                           ? String(
                                client.functions.formatNumber(mine.balance)
                             ).split(".")[1].length == 1
                              ? `0`
                              : ""
                           : ""
                     }`
                  }
               ]
            }
         };
         message.channel.send(JSON.stringify(mine));
         message.channel.send(embed);
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
