const timeout = new Set();
module.exports = class {
   constructor() {
      this.name = "sell";
      this.alias = ["s"];
      this.usage = ".sell";
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
                     (1.025 ^ (minedb.level - 1)) *
                     (1.02 ^ minedb.prestige) *
                     (1.05 ^ db.rebirth)
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
                     (1.035 ^ minedb.prestige) *
                     (1.05 ^ db.rebirth) *
                     time
                  ).toFixed(2)
               );
               if (gen >= backpacksize) gen = backpacksize;
               let percentbpfull = Number(
                  ((gen / backpacksize) * 100).toFixed(2)
               );
               let amountforlevel = Number(
                  (
                     (mine.kgps * 120 * (1.05 ^ (mine.level - 1))) /
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
                  ppk: mine.ppk,
                  percentbpfull: percentbpfull,
                  amountforlevel: amountforlevel
               });
            }
         );
      });
   }

   async run(client, message, args) {
    if (timeout.has(message.author.id)) {
        return message.channel.send(new client.modules.Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`You cannot run this command yet, you are on cooldown!`)
       )
    }
    if (client.mineSelected.has(message.author.id)) {
         client.models.userProfiles.findOne(
            {
               user_id: message.author.id
            },
            (err, db) => {
               if (err) return console.error(err);
               if (!db) {
                  return console.error(`what the fuck`);
               }
               const mine = await this.mineInfo(client, message.author.id, client.mineSelected.get(message.author.id));
               db.mines.find(x => x.index == client.mineSelected.get(message.author.id)).lastsell_timestamp = new Date();
               db.mines.find(x => x.index == client.mineSelected.get(message.author.id)).balance += mine.generated * mine.ppk;
               db.markModified("mines");
               db.save((err) => {
                   if (err) return console.error(err);
                   else {
                       timeout.add(message.author.id);
                       message.channel.send(new client.modules.Discord.MessageEmbed()
                        .setColor(message.guild.me.displayHexColor)
                        .setDescription(`Sold **${mine.generated} KG** of ${mine.type.charAt(0)}${mine.type.toLowerCase().slice(1)} for **$${client.functions.formatNumber(mine.generated * mine.ppk)}**`)
                       )
                       setTimeout(() => {
                        timeout.delete(message.author.id);
                       }, 2000);
                       client.models.guildStats.findOne({
                           "guild_id": message.guild.id
                       }, (err, db) => {
                           if (err) return console.error(err);
                           sum_sells += 1;
                           db.save((err) => {
                               if (err) return console.error(err);
                           });
                       });
                       client.models.guildMines.findOne({
                           "guild_id": message.guild.id,
                           "type": `${mine.type.charAt(0)}${mine.type.toLowerCase().slice(1)}`
                       }, (err, db) => {
                           if (err) return console.error(err);
                           db.sum_kg += mine.generated;
                           db.sum_money += mine.generated * mine.ppk;
                           db.save((err) => {
                               if (err) return console.error(err);
                           });
                       })
                   }
               });
            }
         );
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
