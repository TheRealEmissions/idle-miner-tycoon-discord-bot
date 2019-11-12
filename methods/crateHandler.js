module.exports = class crateHandler {
   constructor(client, message, msg, id) {
      this.client = client;
      this.message = message;
      this.msg = msg;
      this.id = id;
      this.mcdrop = new Map();
      this.processCrate();
   }

   idToObj() {
      return new Promise((resolve, reject) => {
         let obj;
         switch (this.id) {
            case "mc1":
               obj = {
                  type: "MINECRATE",
                  star: 1
               };
               break;
            case "mc2":
               obj = {
                  type: "MINECRATE",
                  star: 2
               };
               break;
            case "mc3":
               obj = {
                  type: "MINECRATE",
                  star: 3
               };
               break;
            case "mc4":
               obj = {
                  type: "MINECRATE",
                  star: 4
               };
               break;
            case "mc5":
               obj = {
                  type: "MINECRATE",
                  star: 5
               };
               break;
            case "mc6":
               obj = {
                  type: "MINECRATE",
                  star: 6
               };
               break;
         }
         return resolve(obj);
      });
   }

   processCrate() {
      return new Promise(async (resolve, reject) => {
         let id = await this.idToObj();
         if (id.type == "MINECRATE") {
            this.openMineCrate(id.star);
         }
      });
   }

   getMineCrateDrop(star) {
      return new Promise((resolve, reject) => {
         let drop = this.client.storage.mines[
            this.client.functions.genNumberBetween(
               0,
               this.client.storage.mines.length - 1
            )
         ];
         while (drop.rarity > star) {
            drop = this.client.storage.mines[
               this.client.functions.genNumberBetween(
                  0,
                  this.client.storage.mines.length - 1
               )
            ];
         }
         return resolve(drop);
      });
   }

   async openMineCrate(star) {
      this.msg.edit(
         new this.client.modules.Discord.MessageEmbed()
            .setColor(this.message.guild.me.displayHexColor)
            .setTitle(
               `**Opening a ${this.client.functions.noToStarEmoji(
                  star
               )} Mine Crate:**`
            )
            .setDescription(`** **\n**Please select a crate from below**`)
      );
      let emojis = [
         "632981632273350656",
         "632983812023910430",
         "632983891313164289",
         "632983923286343698",
         "632983991833722902"
      ];
      for (const n in emojis) {
         this.msg.react(emojis[n]);
         let drop = await this.getMineCrateDrop(star);
         this.mcdrop.set(emojis[n], drop);
      }
      let collector = new this.client.modules.Discord.ReactionCollector(
         this.msg,
         (reaction, user) =>
            emojis.includes(reaction.emoji.id) &&
            user.id == this.message.author.id,
         {
            max: 1
         }
      );
      collector.on("collect", reaction => {
         let drop = this.mcdrop.get(reaction.emoji.id);
         setTimeout(() => {
            this.msg.reactions.removeAll();
         }, 5000);
         this.msg.edit(
            new this.client.modules.Discord.MessageEmbed()
               .setColor(this.message.guild.me.displayHexColor)
               .setTitle(
                  `**Opened a ${this.client.functions.noToStarEmoji(
                     star
                  )} Mine Crate:**`
               )
               .setDescription(
                  `> **In that box, you found:**\n**${
                     drop.type
                  } Mine**\n \`Rarity\` ${this.client.functions.noToStarEmoji(
                     drop.rarity
                  )}\n \`Sell price/KG\` $${this.client.functions.formatNumber(
                     drop.ppk
                  )}\n \`KG/s\` ${drop.kgps}`
               )
         );
         this.client.models.userCrates.findOne(
            {
               user_id: this.message.author.id
            },
            (err, db) => {
               if (err) return reject(err);
               db.mine_crates.find(x => x.star == 1).amount -= 1;
               db.markModified("mine_crates");
               db.save(err => {
                  if (err) return reject(err);
               });
            }
         );
         this.client.models.userProfiles.findOne(
            {
               user_id: this.message.author.id
            },
            (err, db) => {
               if (err) return reject(err);
               db.mines.push({
                  index: db.mines.length + 1,
                  type: drop.type.toUpperCase(),
                  prestige: 0,
                  level: 1,
                  balance: 0,
                  sum_kg: 0,
                  lastsell_timestamp: new Date()
               });
               db.save(err => {
                  if (err) return reject(err);
               });
            }
         );
      });
   }
};
